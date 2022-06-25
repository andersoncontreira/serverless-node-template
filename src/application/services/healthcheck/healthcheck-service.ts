import {Logger} from "winston";
import {AbstractHealthCheck, HealthCheckResponse, HealthStatus} from "./index";
import {Response} from 'express';

interface EntryType {
  name: string;
  healthCheck: AbstractHealthCheck | Function;
  tags: Array<string>;
  args: object;
}

export interface HealthCheckServiceResult {
  status: string;
  totalDuration: [number, number];
  entries: object;
}

export class HealthCheckService {
  private logger: Logger;
  private entries: Array<EntryType>;
  private debug: boolean = false;

  constructor(logger: Logger = null) {
    this.logger = logger;
    this.entries = [];
  }

  addCheck(name: string, healthCheck: AbstractHealthCheck | Function, tags: string[], args: object = null) {
    const entry = {
      name: name,
      healthCheck: healthCheck,
      tags: tags,
      args: args
    } as EntryType;

    this.entries.push(entry);
  }

  async getResult() {
    let serviceStatus = HealthStatus.HEALTHY;
    let totalDuration = process.hrtime();
    let result = {
      status: serviceStatus,
      totalDuration: totalDuration,
      entries: {}
    } as HealthCheckServiceResult;

    return new Promise<HealthCheckServiceResult>((resolve, reject) => {
      resolve(this.processEntries(result));
      reject(result);
    })

    // const __ret = await this.processEntries(totalDuration, serviceStatus, result);
    // totalDuration = __ret.totalDuration;
    // serviceStatus = __ret.serviceStatus;

    // //update variables
    // result.status = serviceStatus;
    // result.totalDuration = totalDuration;

    // return result

  }

  async processEntries(result: HealthCheckServiceResult) {
    for (const entry of this.entries) {
      const startTime = process.hrtime();
      let status = HealthStatus.UNHEALTHY;
      let check = null;
      let description = null;

      try {
        if (entry.healthCheck instanceof AbstractHealthCheck) {
          check = await entry.healthCheck.checkHealth();
        } else if (typeof entry.healthCheck == 'function') {
          if (entry.args && Object.keys(entry.args).length > 0) {
            check = entry.healthCheck.apply(null, Object.values(entry.args));
          } else {
            check = entry.healthCheck();
          }
        }

        if (check != null) {
          status = check.status;
          description = check.description;
        }
      } catch (e) {
        this.logger.error(e);
      }

      //TODO revisar
      const end = process.hrtime(startTime);
      const duration = process.hrtime(startTime);
      //const duration = (end - startTime);
      result.totalDuration = process.hrtime(end);

      if (status != HealthStatus.HEALTHY) {
        if (result.status == HealthStatus.HEALTHY) {
          result.status = HealthStatus.DEGRADED;
        } else {
          result.status = HealthStatus.UNHEALTHY;
        }
      }
      result.entries[entry.name] = {
        status: status,
        duration: duration,
        tags: entry.tags,
        description: description
      }
    }
    return result;
  }

  async getResponse(response: Response = null) {
    let result = await this.getResult();
    const healthCheckResponse = new HealthCheckResponse(response);
    healthCheckResponse.status = result["status"];
    healthCheckResponse.totalDuration = result["totalDuration"];
    healthCheckResponse.setData(result["entries"]);
    return healthCheckResponse;
  }

  setDebug(flag: boolean = true) {
    this.debug = flag;
  }
}

import {Logger} from "winston";
import getLogger from "../../logging";
import {ApiResponse} from "../../http/response";
import {Response} from "express";


export enum HealthStatus {
  // all available
  HEALTHY = 'healthy',
  // partial
  DEGRADED = 'degraded',
  // unavailable
  UNHEALTHY = 'unhealthy',
}

export class HealthCheckResult {
  public status: HealthStatus;
  public description: string;

  /**
   *
   * @param status
   * @param description
   */
  constructor(status: HealthStatus = null, description: string = null) {
    if (status == null) {
      status = HealthStatus.UNHEALTHY;
    }
    this.status = status;
    this.description = description;
  }

  /**
   *
   * @param description
   */
  static healthy(description) {
    return new HealthCheckResult(HealthStatus.HEALTHY, description)
  }

  /**
   *
   * @param description
   */
  static unhealthy(description) {
    return new HealthCheckResult(HealthStatus.UNHEALTHY, description)
  }

  /**
   *
   * @param description
   */
  static degraded(description) {
    return new HealthCheckResult(HealthStatus.DEGRADED, description)
  }


}


export abstract class AbstractHealthCheck {
  protected logger: Logger;

  /**
   *
   * @param logger
   */
  protected constructor(logger: Logger = null) {
    if (logger == null) {
      logger = getLogger();
    }
    this.logger = logger;
  }

  abstract checkHealth(): Promise<HealthCheckResult>
}

export class HealthCheckResponse extends ApiResponse {
  status: string;
  totalDuration: [number, number];
  protected duration: [number, number];
  protected entries: {};

  constructor(response: Response = null, logger: Logger = null) {
    super(response, logger);
    this.statusCode = 200;
    this.status = HealthStatus.HEALTHY;
    this.totalDuration = process.hrtime();
    this.duration = process.hrtime();
    this.entries = {};
  }

  getResponse(statusCode: number = null) {
    if (!statusCode) {
      if (this.status == HealthStatus.UNHEALTHY) {
        this.statusCode = 503;
      } else if (this.status == HealthStatus.DEGRADED) {
        this.statusCode = 424;
      }
    } else {
      this.statusCode = statusCode;
    }
    let headers = this.headers;

    const body = {
      "status": this.status,
      "totalDuration": this.totalDuration,
      "entries": this.entries
    }

    this.response.set(headers);
    this.response.statusCode = this.statusCode;
    if (
      this.response.hasHeader('Content-Type') && this.response.get('Content-Type').indexOf('application/json') > -1
    ) {
      this.response.end(JSON.stringify(body));
    } else {
      this.response.end(body.toString());
    }

    return this.response;
  }


}

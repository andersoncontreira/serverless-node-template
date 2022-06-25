import {Logger} from "winston";
import {HealthCheckService} from "./healthcheck/healthcheck-service";
import {SelfConnectionHealthCheck} from "./healthcheck/checks/self.connection";
import {HealthCheckResult} from "./healthcheck";
import {Response} from 'express';

export class HealthCheckManagerFacade {
  private static DEBUG: boolean = false;
  private logger: Logger;
  private healthcheckService: HealthCheckService;

  constructor(logger: Logger = null, healthcheckService: any = null) {
    this.logger = logger;
    if (healthcheckService == null) {
      healthcheckService = new HealthCheckService(this.logger);
    }
    this.healthcheckService = healthcheckService;
  }

  debug(flag: boolean = true) {
    HealthCheckManagerFacade.DEBUG = flag
    this.healthcheckService.setDebug(flag);
  }

  check(response:Response=null) {
    this.healthcheckService.addCheck("self", new SelfConnectionHealthCheck(this.logger), [])
    //TODO to be implemented
    // this.healthcheckService.addCheck(
    //   "mysql", new MysqlConnectionHealthCheck(this.logger), ["db"])
    // this.healthcheckService.addCheck("redis", new RedisConnectionHealthCheck(
    //   this.logger), ["redis"])
    this.healthcheckService.addCheck("internal",
      () => {return HealthCheckResult.healthy("connect")}, ["example"])

    return this.healthcheckService.getResponse(response)
  }

  getResult() {
    return this.healthcheckService.getResult();
  }
}

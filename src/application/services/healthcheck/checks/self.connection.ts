import {AbstractHealthCheck, HealthCheckResult} from "../index";
import {Logger} from "winston";
import axios, {AxiosInstance} from 'axios';

export interface SelfConnectionConfigType {
  url: string;
  axiosConfig: object;
}
const defaultConfig:SelfConnectionConfigType = {
  url: (process.env.API_SERVER || 'http://localhost:3000') + '/docs/',
  axiosConfig: {}
};

export class SelfConnectionHealthCheck extends AbstractHealthCheck {
  private httpClient: AxiosInstance;
  private config: SelfConnectionConfigType;

  constructor(logger: Logger = null, config:SelfConnectionConfigType = null, httpClient: AxiosInstance = null) {
    super(logger);
    if (config == null) {
      config = defaultConfig;
    }
    if (httpClient == null) {
      httpClient = axios.create(config.axiosConfig)
    }
    this.config = config;
    this.httpClient = httpClient;
  }

  checkHealth() {
    let description = "Unable to connect";
    let checkResult = HealthCheckResult.unhealthy(description);

    return new Promise<HealthCheckResult>((resolve, reject) => {
      resolve(this.doRequest());
      reject(checkResult);
    })
  }

  async doRequest() {
    let description = "Something wrong";
    let checkResult = HealthCheckResult.degraded(description);
    try {
      this.logger.info(`doing a GET request to ${this.config.url}`);
      const {status} = await this.httpClient.get(this.config.url);
      if (status == 200) {
        description = "Connection successful";
        checkResult = HealthCheckResult.healthy(description);
      }
    } catch (e) {
      this.logger.error(e);
    }

    return checkResult;
  }
}

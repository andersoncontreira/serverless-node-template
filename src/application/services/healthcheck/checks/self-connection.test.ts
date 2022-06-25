import {Logger} from "winston";
import {AbstractHealthCheck, HealthCheckResult, HealthStatus} from "../index";
import {SelfConnectionConfigType, SelfConnectionHealthCheck} from "./self.connection";
import axios from "axios";
import getLogger from "../../../logging";
import {HealthCheckService} from "../healthcheck-service";

// mocking
jest.mock("axios");

describe('SelfConnectionHealthCheck - UnitTestCase', () => {

  let healthCheck: AbstractHealthCheck;
  let logger: Logger;
  beforeAll(() => {
    logger = getLogger();
  });

  beforeEach(() => {
    healthCheck = new SelfConnectionHealthCheck();
  });

  it('should be defined', () => {
    expect(healthCheck).toBeDefined();
  });

  describe('SelfConnectionHealthCheck', () => {
    it('CheckHealth should return health', (done) => {

      // mocking result of the get
      // @ts-ignore
      axios.get.mockResolvedValueOnce({data: 'some data', status: 200});

      healthCheck = new SelfConnectionHealthCheck(logger, null, axios);
      const promise =  healthCheck.checkHealth();
      promise.then((result) => {
        logger.info(`status: ${result.status} description: ${result.description}`)
        expect(result).toBeInstanceOf(HealthCheckResult);
        expect(result.status).toEqual(HealthStatus.HEALTHY);
        done()
      });
    });
    it('CheckHealth should return unhealth', (done) => {

      // mocking result of the get
      // @ts-ignore
      axios.get.mockResolvedValueOnce({data: 'some data', status: 500});

      const config = {
        url: 'http://localhost:9999/docs'
      } as SelfConnectionConfigType;
      healthCheck = new SelfConnectionHealthCheck(logger, config, axios);
      const promise =  healthCheck.checkHealth();
      promise.then((result) => {
        logger.info(`status: ${result.status} description: ${result.description}`)
        expect(result).toBeInstanceOf(HealthCheckResult);
        expect(result.status).toEqual(HealthStatus.DEGRADED);
        done()
      })

    });

  });

});

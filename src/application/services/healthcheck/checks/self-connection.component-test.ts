import {Logger} from "winston";
import {AbstractHealthCheck, HealthCheckResult, HealthStatus} from "../index";
import {SelfConnectionConfigType, SelfConnectionHealthCheck} from "./self.connection";
import getLogger from "../../../logging";

describe('SelfConnectionHealthCheck - ComponentTestCase', () => {

  let EXECUTE_FIXTURE = true;
  let healthCheck: AbstractHealthCheck;
  let logger: Logger;
  beforeAll(() => {
    logger = getLogger();
    // fixture
    if (EXECUTE_FIXTURE) {
      logger.info('Fixture: Database');

      logger.info('Fixture: Queue');
    }

  });

  beforeEach(() => {
    healthCheck = new SelfConnectionHealthCheck(logger);
  });

  it('should be defined', () => {
    expect(healthCheck).toBeDefined();
  });

  describe('SelfConnectionHealthCheck', () => {
    it('CheckHealth should return health', (done) => {

      const promise =  healthCheck.checkHealth();
      promise.then((result) => {
        logger.info(`status: ${result.status} description: ${result.description}`)
        expect(result).toBeInstanceOf(HealthCheckResult);
        expect(result.status).toEqual(HealthStatus.HEALTHY);
        done()
      });
    });
    it('CheckHealth should return unhealth', (done) => {

      const config = {
        url: 'http://localhost:9999/docs'
      } as SelfConnectionConfigType;
      healthCheck = new SelfConnectionHealthCheck(logger, config);
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

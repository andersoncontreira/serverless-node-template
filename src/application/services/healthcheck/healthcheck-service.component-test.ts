import {HealthCheckService} from "./healthcheck-service";
import getLogger from "../../logging";
import {Logger} from "winston";
import {SelfConnectionHealthCheck} from "./checks/self.connection";
import {HealthCheckResult, HealthStatus} from "./index";

describe('HealthCheckService - ComponentTestCase', () => {
  let EXECUTE_FIXTURE = true;
  let service: HealthCheckService;
  let logger: Logger;
  beforeAll(() => {
    logger = getLogger();
    //fixture
    if (EXECUTE_FIXTURE) {
      logger.info('Fixture: Database');
      //TODO to be implmented yet
      logger.info('Fixture: Queue');
      //TODO to be implmented yet
    }

  });

  beforeEach(() => {
    service = new HealthCheckService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addCheck', () => {
    const lambdaArgs = [
      null,
      {'name': 'test X'}
    ];
    lambdaArgs.forEach((args) => {
      it(`should return a helf entry of type lambda with args: ${JSON.stringify(args)}`, (done) => {
        service.addCheck('lambda', (name = null) => {
          if (name == null) {
            name = 'unknown';
          }
          return HealthCheckResult.healthy(`test lambda with name: ${name}`)
          },
          ['lambda'], args);
        const promise = service.getResult();
        promise.then((result) => {
          logger.info(`status: ${result.status} entries: ${JSON.stringify(result.entries)}`)
          expect(result.status).toEqual(HealthStatus.HEALTHY);
          done()
        });
      });
    })

    it('should return a helf entry of type self', (done) => {
      service.addCheck('self', new SelfConnectionHealthCheck(logger), ['self'], {});
      const promise = service.getResult();
      promise.then((result) => {
        logger.info(`status: ${result.status} entries: ${JSON.stringify(result.entries)}`)
        expect(result.status).toEqual(HealthStatus.HEALTHY);
        done()
      });
    });

  });
});

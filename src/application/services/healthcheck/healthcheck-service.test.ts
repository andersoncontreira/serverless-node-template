import {HealthCheckService} from "./healthcheck-service";
import getLogger from "../../logging";
import {Logger} from "winston";
import {SelfConnectionHealthCheck} from "./checks/self.connection";
import {HealthCheckResult, HealthStatus} from "./index";
import axios from "axios";

// mocking
jest.mock("axios");


describe('HealthCheckService - UnitTestCase', () => {
  let service: HealthCheckService;
  let logger: Logger;
  beforeAll(() => {
    logger = getLogger();
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
      // mocking result of the get
      // @ts-ignore
      axios.get.mockResolvedValueOnce({data: 'some data', status: 200});

      service.addCheck('self', new SelfConnectionHealthCheck(logger, null, axios), ['self'], {});
      const promise = service.getResult();
      promise.then((result) => {
        logger.info(`status: ${result.status} entries: ${JSON.stringify(result.entries)}`)
        expect(result.status).toEqual(HealthStatus.HEALTHY);
        done()
      });
    });

  });
});

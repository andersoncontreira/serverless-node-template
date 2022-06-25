import {Response} from 'express';
import {HealthCheckManagerFacade} from "./healthcheck-manager-facade";
import {Logger} from "winston";
import getLogger from "../logging";
import {createResponse, MockResponse,} from 'node-mocks-http';
import {HealthCheckResponse, HealthStatus} from "./healthcheck";

describe('HealthCheckManagerFacade - ComponentTestCase', () => {
  let EXECUTE_FIXTURE = true;
  let service: HealthCheckManagerFacade;
  let logger: Logger;
  let response: MockResponse<Response>;
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
    service = new HealthCheckManagerFacade();
    service.debug(true);
    /** Response Mock */
    response = createResponse();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('check', () => {
    it('should return a healthcheck response', (done) => {
      const promise = service.check(response);
      promise.then((healthCheckResponse) => {
        // console.log(healthCheckResponse.status);
        // console.log(healthCheckResponse.totalDuration);
        expect(healthCheckResponse).toBeInstanceOf(HealthCheckResponse);
        expect(healthCheckResponse.status).toEqual(HealthStatus.HEALTHY);
        done()
      });
    });
  });
});

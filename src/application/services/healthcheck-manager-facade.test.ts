import {Response} from 'express';
import {HealthCheckManagerFacade} from "./healthcheck-manager-facade";
import {Logger} from "winston";
import getLogger from "../logging";
import {createResponse, MockResponse,} from 'node-mocks-http';
import {HealthCheckResponse, HealthStatus} from "./healthcheck";
import axios from "axios";
import {HealthCheckService} from "./healthcheck/healthcheck-service";

// https://jestjs.io/pt-BR/docs/es6-class-mocks
// mocking

jest.mock('./healthcheck/healthcheck-service');
//const mockHealthCheckService = jest.fn().mockImplementation();

describe('HealthCheckManagerFacade - UnitTestCase', () => {
  let service: HealthCheckManagerFacade;
  let logger: Logger;
  let response: MockResponse<Response>;
  beforeAll(() => {
    logger = getLogger();
  });

  beforeEach(() => {
    // Limpa todas as instâncias e chamadas de construtor e todos os métodos:
    // @ts-ignore
    HealthCheckService.mockClear();
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

      // mocking
      const healthCheckResponseMock = new HealthCheckResponse(null, logger);
      healthCheckResponseMock.status = HealthStatus.HEALTHY
      healthCheckResponseMock.totalDuration = process.hrtime()

      // mocking getResponse
      // @ts-ignore
      service.healthcheckService.getResponse.mockResolvedValue(
        healthCheckResponseMock
      );

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

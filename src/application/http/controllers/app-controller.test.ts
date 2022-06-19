import { Request, Response } from 'express';
import {
  createRequest, createResponse, MockRequest, MockResponse,
} from 'node-mocks-http';
import { AppController } from './app-controller';
import { APP_NAME, APP_VERSION } from '../../constants';

describe('AppController - UnitTestCase', () => {
  let controller: AppController;
  let request: MockRequest<Request>;
  let response: MockResponse<Response>;
  beforeEach(() => {
    controller = new AppController();
    /** Response Mock */
    response = createResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /', () => {
    it('should return 200 and API Name + API Version', (done) => {
      /** Request Mock */
      request = createRequest({
        method: 'GET',
        url: '/',
      });

      AppController.index(request, response);

      const body = { app: `${APP_NAME}:${APP_VERSION}` };
      const result = response._getJSONData();
      expect(result).toMatchObject(body);
      expect(result.app).toEqual(body.app);
      expect(response.getHeaders()).toHaveProperty('content-type');
      console.log('headers', response.getHeaders());
      console.log('response body', result);
      done();
    });
  });
});

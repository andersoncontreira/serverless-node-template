import { Request, Response } from 'express';
import request from 'supertest';
import { AppController } from './app-controller';
import { APP_NAME, APP_VERSION } from '../../constants';
import app from '../../../app';

describe('AppController - ComponentTestCase', () => {
  let controller: AppController;
  // let request: MockRequest<Request>;
  // let response: MockResponse<Response>;
  beforeEach(() => {
    controller = new AppController();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /', () => {
    it('should return 200 and API Name + API Version', (done) => {
      const body = { app: `${APP_NAME}:${APP_VERSION}` };
      request(app).get('/').expect(200, JSON.stringify(body), done);
    });
  });
});

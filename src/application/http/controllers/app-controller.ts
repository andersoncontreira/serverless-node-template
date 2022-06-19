import { Request, Response } from 'express';
import { APP_NAME, APP_VERSION } from '../../constants';
import { createResponse } from '../response';

export class AppController {
  static index(request: Request, response: Response) {
    const body = { app: `${APP_NAME}:${APP_VERSION}` };
    return createResponse(response, body, 200);
  }
}

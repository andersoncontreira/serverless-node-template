import { Response } from 'express';
import { Logger } from 'winston';
import getLogger from '../logging';
import { CUSTOM_DEFAULT_HEADERS } from './helpers';

export class ApiResponse {
  private response: Response;

  private logger: Logger = null;

  private hateos = true;

  private statusCode = 200;

  private headers: any;

  constructor(response: Response, logger: Logger) {
    this.response = response;
    this.logger = logger != null ? logger : getLogger();
    this.headers = CUSTOM_DEFAULT_HEADERS;
  }

  json() {
    // this.response.setHeader('Content-type', 'application/json')
    // this.response.end(JSON.stringify(this.body))
  }
}

/**
 * Create a simple http response in JSON or other
 * @param response
 * @param body
 * @param statusCode
 * @param headers
 */
export function createResponse(
  response: Response,
  body: any,
  statusCode = 200,
  headers: any = CUSTOM_DEFAULT_HEADERS,
) {
  response.set(headers);
  response.statusCode = statusCode;
  if (
    response.hasHeader('Content-Type')
    && response.get('Content-Type').indexOf('application/json') > -1
  ) {
    response.end(JSON.stringify(body));
  } else {
    response.end(body.toString());
  }
}

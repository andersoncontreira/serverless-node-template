import express from 'express';
import compression from 'compression'; // compresses requests
import cors from 'cors';
import bodyParser from 'body-parser';
import { getEnvironment, logRoutes } from './application/helpers';
import { loadEnv } from './boot';
import getLogger from './application/logging';
import OpenApi from "./application/openapi/openapi";

// logger
const logger = getLogger();
// load env
loadEnv();
// get the environment name
const env = getEnvironment();
// router
const router = express.Router();
// Express App
const app = express();
app.set('APP_PORT', process.env.APP_PORT || 3000);
app.set('APP_ENV', env || 'development');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// OpenAPI features
OpenApi.configure();
OpenApi.initialize(app)
.then((result) => {

  // prepare documentation endpoint
  OpenApi.route(app);

  // log the routes
  logRoutes(app, router, logger);

})


export default app;

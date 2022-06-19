import express from 'express';
import compression from 'compression'; // compresses requests
import cors from 'cors';
import bodyParser from 'body-parser';
import { getEnvironment, logRoutes } from './application/helpers';
import { AppController } from './application/http/controllers/app-controller';
import { loadEnv } from './boot';
import getLogger from './application/logging';

// logger
const logger = getLogger();
// load env
loadEnv();
// get the environment name
const env = getEnvironment();

const app = express();
app.set('APP_PORT', process.env.APP_PORT || 3000);
app.set('APP_ENV', env || 'development');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.enableCors();
app.get('/', AppController.index);
// SwaggerSpec.generateDocs(app);

logRoutes(app, logger);

export default app;

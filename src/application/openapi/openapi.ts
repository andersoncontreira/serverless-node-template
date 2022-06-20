import {APP_NAME, APP_VERSION} from "../constants";
import {initialize} from "express-openapi";
import {Express} from "express";
import {serveFiles, setup} from 'swagger-ui-express';
import fs from "fs";

export default class OpenApi {
  static documentationPath: string = '/docs'
  static configure() {
    // wait the env to be loaded
    let servers = [
      {
        url: process.env?.API_SERVER ? process.env.API_SERVER : "",
        description: process.env?.API_SERVER_DESCRIPTION ? process.env.API_SERVER_DESCRIPTION : "",
      }
    ];

    return {
      openapi: '3.0.2',
      info: {
        title: APP_NAME,
        version: APP_VERSION
      },
      servers: servers,
      paths: {}
    };


  }

  static initialize(app: Express) {
    let paths = `${process.cwd()}/src/application/http/routes`;
    if (!fs.existsSync(paths)) {
      paths = `${process.cwd()}/application/http/routes`;
    }

    return initialize({
      docsPath: `${OpenApi.documentationPath}/openapi.json`,
      apiDoc: JSON.stringify(OpenApi.configure()),
      app,
      promiseMode: false,
      //-----------------------------------
      // OK
      //-----------------------------------
      routesGlob: '**/**/*.js',
      paths: paths,
      //-----------------------------------
      // NOK
      //-----------------------------------
      // paths: "./src/application/http/routes",
      // routesGlob: '**/**/*.{ts,js}',
      // routesIndexFileRegExp: /(?:index)?\.[tj]s$/
      //-------------------------------
    });
  }

  static generate() {
    //to generate the file
  }

  static route(app:Express) {
    // OpenAPI Swagger UI
    const configuration = {
      swaggerOptions: {
        url: `${process.env.API_SERVER}${OpenApi.documentationPath}/openapi.json`
      }
    }
    // static files
    app.use(OpenApi.documentationPath, serveFiles(null, configuration));
    // route docs
    app.get(OpenApi.documentationPath, setup(configuration));
  }
}

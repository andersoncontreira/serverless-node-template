export function getEnvironment() {
  let environment = 'development';
  if (process.env?.NODE_ENV) {
    environment = process.env.NODE_ENV;
  } else if (process.env?.ENVIRONMENT) {
    environment = process.env.ENVIRONMENT;
  } else if (process.env?.ENVIRONMENT_NAME) {
    environment = process.env.ENVIRONMENT_NAME;
  } else if (process.env?.APP_ENV) {
    environment = process.env.APP_ENV;
  }
  if (environment === 'dev') {
    environment = 'development';
  }

  return environment;
}

export function logRoutes(app, logger) {
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      logger.info(`Route: ${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);
    }
  });
}

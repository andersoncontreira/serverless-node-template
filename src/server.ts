import app from './app';
import getLogger from './application/logging';

// /**
//  * Error Handler. Provides full stack
//  */
// if (process.env.NODE_ENV === 'development') {
//   // app.use(errorHandler());
// }

/**
 * Start Express server.
 */
const server = app.listen(app.get('APP_PORT'), () => {
  const logger = getLogger();
  const port = app.get('APP_PORT');
  const env = app.get('APP_ENV');
  logger.info(
    `App is running at http://localhost:${port} in ${env} mode`,
  );
  logger.info('Press CTRL-C to stop');
});

export default server;

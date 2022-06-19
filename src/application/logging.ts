import winston from 'winston';
import { getEnvironment } from './helpers';

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: getEnvironment() === 'production' ? 'error' : 'debug',
    }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
  ],
};

const logger = winston.createLogger(options);

if (getEnvironment() !== 'production') {
  logger.debug('Logging initialized at debug level');
}

function getLogger() {
  return logger;
}

// export default logger;
export default getLogger;

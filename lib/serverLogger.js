import { createLogger, format, transports } from 'winston';
import { parseConfig } from './config';

const config = parseConfig();
const level = config['server-logging-level'] || 'info';
const loggingEnabled = config['server-logging'] === 'true';
const logFilePath = config['server-log-file'] || 'server.log';

const logger = createLogger({
  level: level,
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logFilePath })
  ]
});

if (!loggingEnabled) {
  logger.transports.forEach((t) => (t.silent = true));
}

export default logger;

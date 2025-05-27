import winston from 'winston';
import { config } from '../config/config';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: config.logging.level,
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        logFormat
      )
    }),
    new winston.transports.File({
      filename: config.logging.file,
      maxsize: parseInt(config.logging.maxSize),
      maxFiles: parseInt(config.logging.maxFiles)
    })
  ]
});

// Create a stream object for Morgan
export const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  }
}; 
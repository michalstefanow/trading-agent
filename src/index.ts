import mongoose from 'mongoose';
import { config } from './config/config';
import { logger } from './utils/logger';
import { TradingBot } from './services/tradingBot';

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
  logger.error(`Unhandled promise rejection: ${error.message}`);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error(`Uncaught exception: ${error.message}`);
  process.exit(1);
});

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongodb.uri, config.mongodb.options);
    logger.info('Connected to MongoDB');

    // Initialize and start trading bot
    const tradingBot = new TradingBot();
    await tradingBot.start();
    logger.info('Trading bot started successfully');

    // Handle graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received. Shutting down gracefully...');
      await tradingBot.stop();
      await mongoose.connection.close();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT received. Shutting down gracefully...');
      await tradingBot.stop();
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    logger.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
}

startServer(); 
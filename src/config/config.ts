import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },

  // Exchange configuration
  exchange: {
    name: process.env.EXCHANGE_NAME || 'binance',
    apiKey: process.env.EXCHANGE_API_KEY || '',
    apiSecret: process.env.EXCHANGE_API_SECRET || '',
    testnet: process.env.EXCHANGE_TESTNET === 'true'
  },

  // Trading parameters
  trading: {
    symbol: process.env.TRADING_SYMBOL || 'BTC/USDT',
    timeframe: process.env.TRADING_TIMEFRAME || '1h',
    baseOrderSize: parseFloat(process.env.BASE_ORDER_SIZE || '0.001'),
    maxOrderSize: parseFloat(process.env.MAX_ORDER_SIZE || '0.01'),
    stopLossPercentage: parseFloat(process.env.STOP_LOSS_PERCENTAGE || '2'),
    takeProfitPercentage: parseFloat(process.env.TAKE_PROFIT_PERCENTAGE || '4'),
    maxOpenPositions: parseInt(process.env.MAX_OPEN_POSITIONS || '3', 10)
  },

  // Strategy parameters
  strategy: {
    name: process.env.STRATEGY_NAME || 'combined',
    rsiPeriod: parseInt(process.env.RSI_PERIOD || '14', 10),
    rsiOverbought: parseInt(process.env.RSI_OVERBOUGHT || '70', 10),
    rsiOversold: parseInt(process.env.RSI_OVERSOLD || '30', 10),
    macdFastPeriod: parseInt(process.env.MACD_FAST_PERIOD || '12', 10),
    macdSlowPeriod: parseInt(process.env.MACD_SLOW_PERIOD || '26', 10),
    macdSignalPeriod: parseInt(process.env.MACD_SIGNAL_PERIOD || '9', 10),
    emaShortPeriod: parseInt(process.env.EMA_SHORT_PERIOD || '9', 10),
    emaLongPeriod: parseInt(process.env.EMA_LONG_PERIOD || '21', 10)
  },

  // AI model configuration
  ai: {
    modelPath: process.env.AI_MODEL_PATH || './models/trading_model.h5',
    confidenceThreshold: parseFloat(process.env.AI_CONFIDENCE_THRESHOLD || '0.7'),
    trainingDataPath: process.env.TRAINING_DATA_PATH || './data/training_data.csv'
  },

  // Notifications
  notifications: {
    telegram: {
      enabled: process.env.TELEGRAM_ENABLED === 'true',
      botToken: process.env.TELEGRAM_BOT_TOKEN || '',
      chatId: process.env.TELEGRAM_CHAT_ID || ''
    },
    email: {
      enabled: process.env.EMAIL_ENABLED === 'true',
      smtpHost: process.env.SMTP_HOST || '',
      smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
      smtpUser: process.env.SMTP_USER || '',
      smtpPass: process.env.SMTP_PASS || '',
      fromEmail: process.env.FROM_EMAIL || '',
      toEmail: process.env.TO_EMAIL || ''
    }
  },

  // Monitoring
  monitoring: {
    prometheus: {
      enabled: process.env.PROMETHEUS_ENABLED === 'true',
      port: parseInt(process.env.PROMETHEUS_PORT || '9090', 10)
    },
    healthCheck: {
      enabled: process.env.HEALTH_CHECK_ENABLED === 'true',
      interval: parseInt(process.env.HEALTH_CHECK_INTERVAL || '300000', 10)
    }
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || './logs/trading-agent.log',
    maxSize: process.env.LOG_MAX_SIZE || '10m',
    maxFiles: process.env.LOG_MAX_FILES || '5'
  },

  // Database
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/trading-agent',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    }
  }
}; 
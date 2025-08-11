# Bitcoin Trading Agent

An AI-powered trading bot for Bitcoin that uses technical analysis and machine learning to make trading decisions.

## Features

- Real-time market data analysis
- Multiple technical indicators (RSI, MACD, EMA)
- Automated trading execution
- Risk management with stop-loss and take-profit
- Position management
- Performance monitoring
- Telegram notifications
- Email alerts
- Prometheus metrics

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Exchange API keys (e.g., Binance)
- Telegram Bot Token (optional)
- SMTP Server (optional)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/michalstefanow/trading-agent.git
cd trading-agent
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
# Server
PORT=3000
NODE_ENV=development

# Exchange
EXCHANGE_NAME=binance
EXCHANGE_API_KEY=your_api_key
EXCHANGE_API_SECRET=your_api_secret
EXCHANGE_TESTNET=true

# Trading
TRADING_SYMBOL=BTC/USDT
TRADING_TIMEFRAME=1h
BASE_ORDER_SIZE=0.001
MAX_ORDER_SIZE=0.01
STOP_LOSS_PERCENTAGE=2
TAKE_PROFIT_PERCENTAGE=4
MAX_OPEN_POSITIONS=3

# Strategy
STRATEGY_NAME=combined
RSI_PERIOD=14
RSI_OVERBOUGHT=70
RSI_OVERSOLD=30
MACD_FAST_PERIOD=12
MACD_SLOW_PERIOD=26
MACD_SIGNAL_PERIOD=9
EMA_SHORT_PERIOD=9
EMA_LONG_PERIOD=21

# AI Model
AI_MODEL_PATH=./models/trading_model.h5
AI_CONFIDENCE_THRESHOLD=0.7
TRAINING_DATA_PATH=./data/training_data.csv

# Notifications
TELEGRAM_ENABLED=true
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

EMAIL_ENABLED=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
FROM_EMAIL=your_email
TO_EMAIL=recipient_email

# Monitoring
PROMETHEUS_ENABLED=true
PROMETHEUS_PORT=9090
HEALTH_CHECK_ENABLED=true
HEALTH_CHECK_INTERVAL=300000

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/trading-agent.log
LOG_MAX_SIZE=10m
LOG_MAX_FILES=5

# Database
MONGODB_URI=mongodb://localhost:27017/trading-agent
```

## Usage

1. Start the trading bot:
```bash
npm start
```

2. For development:
```bash
npm run dev
```

3. Build the project:
```bash
npm run build
```

## Project Structure

```
trading-agent/
├── src/
│   ├── config/
│   │   └── config.ts
│   ├── services/
│   │   ├── tradingBot.ts
│   │   ├── marketData.ts
│   │   ├── strategy.ts
│   │   └── exchange.ts
│   ├── utils/
│   │   └── logger.ts
│   └── index.ts
├── logs/
├── models/
├── data/
├── package.json
├── tsconfig.json
└── README.md
```

## Trading Strategies

The bot implements several trading strategies:

1. RSI (Relative Strength Index)
   - Oversold/Overbought conditions
   - Divergence detection

2. MACD (Moving Average Convergence Divergence)
   - Signal line crossovers
   - Histogram analysis

3. EMA (Exponential Moving Average)
   - Short-term vs Long-term crossovers
   - Trend direction

## Risk Management

- Stop-loss orders
- Take-profit targets
- Position sizing
- Maximum open positions limit
- Risk per trade percentage

## Monitoring

- Real-time performance metrics
- Trade history
- Profit/Loss tracking
- System health monitoring
- Error logging

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This software is for educational purposes only. Do not risk money which you are afraid to lose. USE THE SOFTWARE AT YOUR OWN RISK. THE AUTHORS AND ALL AFFILIATES ASSUME NO RESPONSIBILITY FOR YOUR TRADING RESULTS. #


import { MarketDataService } from './marketData';
import { StrategyService, TradingSignal } from './strategy';
import { ExchangeService } from './exchange';
import { config } from '../config/config';
import { logger } from '../utils/logger';

export class TradingBot {
  private marketData: MarketDataService;
  private strategy: StrategyService;
  private exchange: ExchangeService;
  private isRunning: boolean = false;
  private tradingInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.marketData = new MarketDataService();
    this.strategy = new StrategyService(this.marketData);
    this.exchange = new ExchangeService();
  }

  async start(): Promise<void> {
    try {
      logger.info('Starting trading bot...');
      this.isRunning = true;
      await this.startTradingLoop();
    } catch (error) {
      logger.error(`Error starting trading bot: ${error.message}`);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      logger.info('Stopping trading bot...');
      this.isRunning = false;
      if (this.tradingInterval) {
        clearInterval(this.tradingInterval);
        this.tradingInterval = null;
      }
    } catch (error) {
      logger.error(`Error stopping trading bot: ${error.message}`);
      throw error;
    }
  }

  private async startTradingLoop(): Promise<void> {
    try {
      // Initial market analysis
      await this.executeTrades();

      // Set up interval for continuous trading
      this.tradingInterval = setInterval(async () => {
        if (this.isRunning) {
          await this.executeTrades();
        }
      }, this.getTradingInterval());
    } catch (error) {
      logger.error(`Error in trading loop: ${error.message}`);
      throw error;
    }
  }

  private async executeTrades(): Promise<void> {
    try {
      // Get trading signal
      const signal = await this.strategy.analyzeMarket();
      logger.info(`Trading signal: ${JSON.stringify(signal)}`);

      // Execute trade based on signal
      if (signal.action !== 'hold') {
        const order = await this.exchange.executeTrade(signal);
        if (order) {
          logger.info(`Trade executed: ${JSON.stringify(order)}`);
        }
      }

      // Check and manage open positions
      await this.manageOpenPositions();
    } catch (error) {
      logger.error(`Error executing trades: ${error.message}`);
      throw error;
    }
  }

  private async manageOpenPositions(): Promise<void> {
    try {
      const openOrders = await this.exchange.getOpenOrders();
      
      for (const order of openOrders) {
        // Check if stop loss or take profit has been hit
        const currentPrice = (await this.marketData.getTicker()).last;
        
        if (currentPrice) {
          const orderPrice = order.price || 0;
          const priceChange = ((currentPrice - orderPrice) / orderPrice) * 100;

          if (order.side === 'buy') {
            // Check stop loss for long positions
            if (priceChange <= -config.trading.stopLossPercentage) {
              logger.info(`Stop loss triggered for order ${order.id}`);
              await this.exchange.cancelOrder(order.id);
            }
            // Check take profit for long positions
            else if (priceChange >= config.trading.takeProfitPercentage) {
              logger.info(`Take profit triggered for order ${order.id}`);
              await this.exchange.cancelOrder(order.id);
            }
          } else {
            // Check stop loss for short positions
            if (priceChange >= config.trading.stopLossPercentage) {
              logger.info(`Stop loss triggered for order ${order.id}`);
              await this.exchange.cancelOrder(order.id);
            }
            // Check take profit for short positions
            else if (priceChange <= -config.trading.takeProfitPercentage) {
              logger.info(`Take profit triggered for order ${order.id}`);
              await this.exchange.cancelOrder(order.id);
            }
          }
        }
      }
    } catch (error) {
      logger.error(`Error managing open positions: ${error.message}`);
      throw error;
    }
  }

  private getTradingInterval(): number {
    // Convert timeframe to milliseconds
    const timeframe = config.trading.timeframe;
    const unit = timeframe.slice(-1);
    const value = parseInt(timeframe.slice(0, -1));

    switch (unit) {
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        return 60 * 1000; // Default to 1 minute
    }
  }
} 
import ccxt from 'ccxt';
import { config } from '../config/config';
import { logger } from '../utils/logger';
import { TradingSignal } from './strategy';

export class ExchangeService {
  private exchange: ccxt.Exchange;
  private symbol: string;

  constructor() {
    this.exchange = new ccxt[config.exchange.name]({
      apiKey: config.exchange.apiKey,
      secret: config.exchange.apiSecret,
      enableRateLimit: true,
      options: {
        testnet: config.exchange.testnet
      }
    });

    this.symbol = config.trading.symbol;
  }

  async executeTrade(signal: TradingSignal): Promise<ccxt.Order | null> {
    try {
      if (signal.confidence < config.ai.confidenceThreshold) {
        logger.info(`Signal confidence too low: ${signal.confidence}`);
        return null;
      }

      const balance = await this.exchange.fetchBalance();
      const ticker = await this.exchange.fetchTicker(this.symbol);
      const currentPrice = ticker.last;

      if (!currentPrice) {
        throw new Error('Unable to fetch current price');
      }

      let order: ccxt.Order | null = null;

      switch (signal.action) {
        case 'buy':
          order = await this.executeBuyOrder(currentPrice, balance);
          break;
        case 'sell':
          order = await this.executeSellOrder(currentPrice, balance);
          break;
        case 'hold':
          logger.info('Holding position');
          break;
      }

      if (order) {
        logger.info(`Executed ${signal.action} order: ${JSON.stringify(order)}`);
      }

      return order;
    } catch (error) {
      logger.error(`Error executing trade: ${error.message}`);
      throw error;
    }
  }

  private async executeBuyOrder(currentPrice: number, balance: ccxt.Balances): Promise<ccxt.Order | null> {
    const usdtBalance = balance.USDT?.free || 0;
    const orderSize = this.calculateOrderSize(currentPrice, usdtBalance, 'buy');

    if (orderSize <= 0) {
      logger.info('Insufficient balance for buy order');
      return null;
    }

    return await this.exchange.createMarketBuyOrder(this.symbol, orderSize);
  }

  private async executeSellOrder(currentPrice: number, balance: ccxt.Balances): Promise<ccxt.Order | null> {
    const btcBalance = balance.BTC?.free || 0;
    const orderSize = this.calculateOrderSize(currentPrice, btcBalance, 'sell');

    if (orderSize <= 0) {
      logger.info('Insufficient balance for sell order');
      return null;
    }

    return await this.exchange.createMarketSellOrder(this.symbol, orderSize);
  }

  private calculateOrderSize(currentPrice: number, balance: number, type: 'buy' | 'sell'): number {
    let orderSize: number;

    if (type === 'buy') {
      // Calculate how much BTC we can buy with available USDT
      orderSize = (balance * config.trading.baseOrderSize) / currentPrice;
    } else {
      // Calculate how much BTC we can sell
      orderSize = balance * config.trading.baseOrderSize;
    }

    // Ensure order size is within limits
    orderSize = Math.min(orderSize, config.trading.maxOrderSize);
    orderSize = Math.max(orderSize, 0);

    return orderSize;
  }

  async getOpenOrders(): Promise<ccxt.Order[]> {
    try {
      return await this.exchange.fetchOpenOrders(this.symbol);
    } catch (error) {
      logger.error(`Error fetching open orders: ${error.message}`);
      throw error;
    }
  }

  async cancelOrder(orderId: string): Promise<boolean> {
    try {
      await this.exchange.cancelOrder(orderId, this.symbol);
      return true;
    } catch (error) {
      logger.error(`Error canceling order: ${error.message}`);
      return false;
    }
  }

  async getOrderStatus(orderId: string): Promise<ccxt.Order> {
    try {
      return await this.exchange.fetchOrder(orderId, this.symbol);
    } catch (error) {
      logger.error(`Error fetching order status: ${error.message}`);
      throw error;
    }
  }
} 
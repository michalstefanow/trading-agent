import ccxt from 'ccxt';
import { config } from '../config/config';
import { logger } from '../utils/logger';
import { RSI, MACD, EMA } from 'technicalindicators';

export class MarketDataService {
  private exchange: ccxt.Exchange;
  private symbol: string;
  private timeframe: string;

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
    this.timeframe = config.trading.timeframe;
  }

  async getOHLCV(limit: number = 100): Promise<ccxt.OHLCV[]> {
    try {
      const ohlcv = await this.exchange.fetchOHLCV(this.symbol, this.timeframe, undefined, limit);
      return ohlcv;
    } catch (error) {
      logger.error(`Error fetching OHLCV data: ${error.message}`);
      throw error;
    }
  }

  async getTicker(): Promise<ccxt.Ticker> {
    try {
      const ticker = await this.exchange.fetchTicker(this.symbol);
      return ticker;
    } catch (error) {
      logger.error(`Error fetching ticker: ${error.message}`);
      throw error;
    }
  }

  calculateRSI(prices: number[]): number[] {
    const rsi = RSI.calculate({
      values: prices,
      period: config.strategy.rsiPeriod
    });
    return rsi;
  }

  calculateMACD(prices: number[]): { MACD: number[], signal: number[], histogram: number[] } {
    const macd = MACD.calculate({
      values: prices,
      fastPeriod: config.strategy.macdFastPeriod,
      slowPeriod: config.strategy.macdSlowPeriod,
      signalPeriod: config.strategy.macdSignalPeriod
    });
    return macd;
  }

  calculateEMA(prices: number[]): { shortEMA: number[], longEMA: number[] } {
    const shortEMA = EMA.calculate({
      values: prices,
      period: config.strategy.emaShortPeriod
    });

    const longEMA = EMA.calculate({
      values: prices,
      period: config.strategy.emaLongPeriod
    });

    return { shortEMA, longEMA };
  }

  async getOrderBook(limit: number = 20): Promise<ccxt.OrderBook> {
    try {
      const orderBook = await this.exchange.fetchOrderBook(this.symbol, limit);
      return orderBook;
    } catch (error) {
      logger.error(`Error fetching order book: ${error.message}`);
      throw error;
    }
  }

  async getBalance(): Promise<ccxt.Balances> {
    try {
      const balance = await this.exchange.fetchBalance();
      return balance;
    } catch (error) {
      logger.error(`Error fetching balance: ${error.message}`);
      throw error;
    }
  }

  async getRecentTrades(limit: number = 50): Promise<ccxt.Trade[]> {
    try {
      const trades = await this.exchange.fetchTrades(this.symbol, undefined, limit);
      return trades;
    } catch (error) {
      logger.error(`Error fetching recent trades: ${error.message}`);
      throw error;
    }
  }
} 
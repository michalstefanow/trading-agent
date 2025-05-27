import { MarketDataService } from './marketData';
import { config } from '../config/config';
import { logger } from '../utils/logger';

export interface TradingSignal {
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  reason: string;
}

export class StrategyService {
  private marketData: MarketDataService;

  constructor(marketData: MarketDataService) {
    this.marketData = marketData;
  }

  async analyzeMarket(): Promise<TradingSignal> {
    try {
      const ohlcv = await this.marketData.getOHLCV();
      const prices = ohlcv.map(candle => candle[4]); // Closing prices

      // Calculate technical indicators
      const rsi = this.marketData.calculateRSI(prices);
      const macd = this.marketData.calculateMACD(prices);
      const ema = this.marketData.calculateEMA(prices);

      // Get the latest values
      const currentRSI = rsi[rsi.length - 1];
      const currentMACD = macd.MACD[macd.MACD.length - 1];
      const currentSignal = macd.signal[macd.signal.length - 1];
      const currentShortEMA = ema.shortEMA[ema.shortEMA.length - 1];
      const currentLongEMA = ema.longEMA[ema.longEMA.length - 1];

      // Combine signals from different strategies
      const signals = [
        this.analyzeRSI(currentRSI),
        this.analyzeMACD(currentMACD, currentSignal),
        this.analyzeEMA(currentShortEMA, currentLongEMA)
      ];

      // Weight the signals
      const weightedSignal = this.combineSignals(signals);

      return weightedSignal;
    } catch (error) {
      logger.error(`Error analyzing market: ${error.message}`);
      throw error;
    }
  }

  private analyzeRSI(rsi: number): TradingSignal {
    if (rsi <= config.strategy.rsiOversold) {
      return {
        action: 'buy',
        confidence: 0.8,
        reason: `RSI oversold (${rsi})`
      };
    } else if (rsi >= config.strategy.rsiOverbought) {
      return {
        action: 'sell',
        confidence: 0.8,
        reason: `RSI overbought (${rsi})`
      };
    }
    return {
      action: 'hold',
      confidence: 0.5,
      reason: `RSI neutral (${rsi})`
    };
  }

  private analyzeMACD(macd: number, signal: number): TradingSignal {
    if (macd > signal) {
      return {
        action: 'buy',
        confidence: 0.7,
        reason: 'MACD above signal line'
      };
    } else if (macd < signal) {
      return {
        action: 'sell',
        confidence: 0.7,
        reason: 'MACD below signal line'
      };
    }
    return {
      action: 'hold',
      confidence: 0.5,
      reason: 'MACD neutral'
    };
  }

  private analyzeEMA(shortEMA: number, longEMA: number): TradingSignal {
    if (shortEMA > longEMA) {
      return {
        action: 'buy',
        confidence: 0.6,
        reason: 'Short EMA above Long EMA'
      };
    } else if (shortEMA < longEMA) {
      return {
        action: 'sell',
        confidence: 0.6,
        reason: 'Short EMA below Long EMA'
      };
    }
    return {
      action: 'hold',
      confidence: 0.5,
      reason: 'EMA neutral'
    };
  }

  private combineSignals(signals: TradingSignal[]): TradingSignal {
    const weights = {
      buy: 0,
      sell: 0,
      hold: 0
    };

    signals.forEach(signal => {
      weights[signal.action] += signal.confidence;
    });

    const maxWeight = Math.max(weights.buy, weights.sell, weights.hold);
    const action = Object.keys(weights).find(key => weights[key] === maxWeight) as 'buy' | 'sell' | 'hold';

    return {
      action,
      confidence: maxWeight / signals.length,
      reason: `Combined signal from ${signals.length} indicators`
    };
  }
} 
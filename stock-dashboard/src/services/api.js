import axios from 'axios';

const API_CONFIG = {
  ALPHA_VANTAGE: {
    baseURL: 'https://www.alphavantage.co/query',
    apiKey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY || 'demo',
  },
  
  FINNHUB: {
    baseURL: 'https://finnhub.io/api/v1',
    apiKey: process.env.REACT_APP_FINNHUB_API_KEY || 'demo',
  },
  
  YAHOO_FINANCE: {
    baseURL: 'https://query1.finance.yahoo.com/v8/finance/chart',
  }
};

const SAMPLE_STOCKS = [
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX'
];

export const alphaVantageAPI = {
  async getStockQuote(symbol) {
    try {
      const response = await axios.get(API_CONFIG.ALPHA_VANTAGE.baseURL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: API_CONFIG.ALPHA_VANTAGE.apiKey,
        }
      });
      
      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }
      
      const quote = response.data['Global Quote'];
      if (!quote) {
        throw new Error('No data received for this symbol');
      }
      
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: parseInt(quote['06. volume']),
        name: quote['01. symbol'],
      };
    } catch (error) {
      console.error(`Error fetching ${symbol} from Alpha Vantage:`, error);
      throw error;
    }
  },
  
  async getMultipleStocks(symbols = SAMPLE_STOCKS) {
    try {
      const promises = symbols.map(symbol => this.getStockQuote(symbol));
      const results = await Promise.allSettled(promises);
      
      return results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
    } catch (error) {
      console.error('Error fetching multiple stocks:', error);
      throw error;
    }
  }
};

export const finnhubAPI = {
  async getStockQuote(symbol) {
    try {
      const response = await axios.get(`${API_CONFIG.FINNHUB.baseURL}/quote`, {
        params: {
          symbol: symbol,
          token: API_CONFIG.FINNHUB.apiKey,
        }
      });
      
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      
      return {
        symbol: symbol,
        price: response.data.c,
        change: response.data.d,
        changePercent: response.data.dp,
        volume: response.data.v,
        name: symbol,
      };
    } catch (error) {
      console.error(`Error fetching ${symbol} from Finnhub:`, error);
      throw error;
    }
  },
  
  async getMultipleStocks(symbols = SAMPLE_STOCKS) {
    try {
      const promises = symbols.map(symbol => this.getStockQuote(symbol));
      const results = await Promise.allSettled(promises);
      
      return results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
    } catch (error) {
      console.error('Error fetching multiple stocks:', error);
      throw error;
    }
  }
};

export const yahooFinanceAPI = {
  async getStockQuote(symbol) {
    try {
      const response = await axios.get(`${API_CONFIG.YAHOO_FINANCE.baseURL}/${symbol}`, {
        params: {
          range: '1d',
          interval: '1m',
        }
      });
      
      const result = response.data.chart.result[0];
      const quote = result.indicators.quote[0];
      const meta = result.meta;
      
      const currentPrice = meta.regularMarketPrice;
      const previousClose = meta.previousClose;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;
      
      return {
        symbol: symbol,
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        volume: quote.volume[quote.volume.length - 1] || 0,
        name: symbol,
      };
    } catch (error) {
      console.error(`Error fetching ${symbol} from Yahoo Finance:`, error);
      throw error;
    }
  },
  
  async getMultipleStocks(symbols = SAMPLE_STOCKS) {
    try {
      const promises = symbols.map(symbol => this.getStockQuote(symbol));
      const results = await Promise.allSettled(promises);
      
      return results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
    } catch (error) {
      console.error('Error fetching multiple stocks:', error);
      throw error;
    }
  }
};

export const stockAPI = {
  async getStockQuote(symbol) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const sampleData = {
      'AAPL': { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.15, changePercent: 1.45, volume: 45678900 },
      'GOOGL': { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -15.20, changePercent: -0.55, volume: 23456700 },
      'MSFT': { symbol: 'MSFT', name: 'Microsoft Corporation', price: 310.45, change: 8.75, changePercent: 2.90, volume: 34567800 },
      'AMZN': { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3200.00, change: 45.30, changePercent: 1.44, volume: 56789000 },
      'TSLA': { symbol: 'TSLA', name: 'Tesla Inc.', price: 850.75, change: -25.50, changePercent: -2.91, volume: 67890100 },
      'META': { symbol: 'META', name: 'Meta Platforms Inc.', price: 320.60, change: 12.40, changePercent: 4.03, volume: 45678900 },
      'NVDA': { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 450.25, change: 18.75, changePercent: 4.35, volume: 34567800 },
      'NFLX': { symbol: 'NFLX', name: 'Netflix Inc.', price: 580.90, change: -8.20, changePercent: -1.39, volume: 23456700 },
    };
    
    return sampleData[symbol] || {
      symbol: symbol,
      name: `${symbol} Inc.`,
      price: Math.random() * 1000 + 50,
      change: (Math.random() - 0.5) * 20,
      changePercent: (Math.random() - 0.5) * 10,
      volume: Math.floor(Math.random() * 50000000) + 1000000,
    };
  },
  
  async getMultipleStocks(symbols = SAMPLE_STOCKS) {
    const promises = symbols.map(symbol => this.getStockQuote(symbol));
    return Promise.all(promises);
  }
};

export const fetchStockData = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const sampleData = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.15, changePercent: 1.45, volume: 45678900 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -15.20, changePercent: -0.55, volume: 23456700 },
      { symbol: 'MSFT', name: 'Microsoft Corporation', price: 310.45, change: 8.75, changePercent: 2.90, volume: 34567800 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3200.00, change: 45.30, changePercent: 1.44, volume: 56789000 },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 850.75, change: -25.50, changePercent: -2.91, volume: 67890100 },
      { symbol: 'META', name: 'Meta Platforms Inc.', price: 320.60, change: 12.40, changePercent: 4.03, volume: 45678900 },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 450.25, change: 18.75, changePercent: 4.35, volume: 34567800 },
      { symbol: 'NFLX', name: 'Netflix Inc.', price: 580.90, change: -8.20, changePercent: -1.39, volume: 23456700 },
    ];
    
    return sampleData;
  } catch (error) {
    throw new Error('Failed to fetch stock data. Please try again later.');
  }
};

export default stockAPI;

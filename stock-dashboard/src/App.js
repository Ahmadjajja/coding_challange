import React, { useState, useEffect } from 'react';
import StockTable from './components/StockTable';
import StockChart from './components/StockChart';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import SearchBar from './components/SearchBar';
import { FaChartLine, FaTable, FaRedo } from 'react-icons/fa';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'chart'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Sample stock data (in real app, this would come from API)
  const sampleStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.15, changePercent: 1.45, volume: 45678900 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -15.20, changePercent: -0.55, volume: 23456700 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 310.45, change: 8.75, changePercent: 2.90, volume: 34567800 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3200.00, change: 45.30, changePercent: 1.44, volume: 56789000 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 850.75, change: -25.50, changePercent: -2.91, volume: 67890100 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 320.60, change: 12.40, changePercent: 4.03, volume: 45678900 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 450.25, change: 18.75, changePercent: 4.35, volume: 34567800 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 580.90, change: -8.20, changePercent: -1.39, volume: 23456700 },
  ];

  useEffect(() => {
    fetchStockData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would fetch from an API like:
      // const response = await axios.get('https://api.example.com/stocks');
      // setStocks(response.data);
      
      setStocks(sampleStocks);
    } catch (err) {
      setError('Failed to fetch stock data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchStockData();
  };

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container">
        <ErrorMessage message={error} onRetry={fetchStockData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>📈 Stock Price Dashboard</h1>
          <p>Real-time stock market data and analytics</p>
        </div>

        {/* Controls */}
        <div className="controls">
          <div className="controls-content">
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="Search stocks by symbol or name..."
            />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* View Mode Toggle */}
              <div className="view-toggle">
                <button
                  onClick={() => setViewMode('table')}
                  className={`view-button ${viewMode === 'table' ? 'active' : ''}`}
                >
                  <FaTable />
                  Table
                </button>
                <button
                  onClick={() => setViewMode('chart')}
                  className={`view-button ${viewMode === 'chart' ? 'active' : ''}`}
                >
                  <FaChartLine />
                  Chart
                </button>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="refresh-button"
              >
                <FaRedo />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="main-content">
          {viewMode === 'table' ? (
            <StockTable 
              stocks={sortedStocks} 
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          ) : (
            <StockChart stocks={sortedStocks} />
          )}
        </div>

        {/* Footer */}
        <div className="footer">
          <p>Data is for demonstration purposes. In production, connect to a real stock API.</p>
        </div>
      </div>
    </div>
  );
}

export default App;

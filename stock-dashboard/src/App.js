import React, { useState, useEffect } from 'react';
import StockTable from './components/StockTable';
import StockChart from './components/StockChart';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import SearchBar from './components/SearchBar';
import { FaRedo, FaTable, FaChartBar } from 'react-icons/fa';
import { fetchStockData } from './services/api';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    fetchStockData()
      .then(data => {
        setStocks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    fetchStockData()
      .then(data => {
        setStocks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedStocks = stocks
    .filter(stock =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRefresh} />;
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-shadow">
            📈 Stock Dashboard
          </h1>
          <p className="text-gray-200 text-lg">
            Real-time stock market data and analytics
          </p>
        </header>

        <div className="card p-4 md:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search stocks..."
            />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex bg-white/20 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'table'
                      ? 'bg-white text-gray-800'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <FaTable />
                  Table
                </button>
                <button
                  onClick={() => setViewMode('chart')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'chart'
                      ? 'bg-white text-gray-800'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <FaChartBar />
                  Charts
                </button>
              </div>
              
              <button
                onClick={handleRefresh}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <FaRedo className="text-sm" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        <main className="card p-4 md:p-6">
          {viewMode === 'table' ? (
            <StockTable 
              stocks={filteredAndSortedStocks}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          ) : (
            <StockChart stocks={filteredAndSortedStocks} />
          )}
        </main>

        <footer className="text-center mt-8 text-gray-300 text-sm">
          <p>Stock data for demonstration purposes</p>
          <p className="mt-1">Built with React, Tailwind CSS, and Recharts</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

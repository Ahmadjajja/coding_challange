import React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StockTable = ({ stocks, onSort, sortConfig }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort style={{ color: '#9ca3af' }} />;
    return sortConfig.direction === 'asc' 
      ? <FaSortUp style={{ color: '#3b82f6' }} /> 
      : <FaSortDown style={{ color: '#3b82f6' }} />;
  };

  const getChangeColor = (change) => {
    return change >= 0 ? 'positive' : 'negative';
  };

  const getChangeIcon = (change) => {
    return change >= 0 ? <FaArrowUp /> : <FaArrowDown />;
  };

  return (
    <div className="table-container">
      <table className="stock-table">
        <thead>
          <tr>
            <th onClick={() => onSort('symbol')}>
              <div className="sort-content">
                Symbol
                {getSortIcon('symbol')}
              </div>
            </th>
            <th onClick={() => onSort('name')}>
              <div className="sort-content">
                Company Name
                {getSortIcon('name')}
              </div>
            </th>
            <th onClick={() => onSort('price')}>
              <div className="sort-content">
                Price
                {getSortIcon('price')}
              </div>
            </th>
            <th onClick={() => onSort('change')}>
              <div className="sort-content">
                Change
                {getSortIcon('change')}
              </div>
            </th>
            <th onClick={() => onSort('changePercent')}>
              <div className="sort-content">
                Change %
                {getSortIcon('changePercent')}
              </div>
            </th>
            <th onClick={() => onSort('volume')}>
              <div className="sort-content">
                Volume
                {getSortIcon('volume')}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={stock.symbol}>
              <td>
                <div className="stock-symbol">
                  <div className="symbol-avatar">
                    {stock.symbol.charAt(0)}
                  </div>
                  {stock.symbol}
                </div>
              </td>
              <td>{stock.name}</td>
              <td style={{ fontWeight: '600' }}>{formatPrice(stock.price)}</td>
              <td>
                <div className={`price-change ${getChangeColor(stock.change)}`}>
                  {getChangeIcon(stock.change)}
                  {formatPrice(Math.abs(stock.change))}
                </div>
              </td>
              <td>
                <span className={`change-badge ${getChangeColor(stock.changePercent)}`}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
              </td>
              <td>{formatNumber(stock.volume)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {stocks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
          <p>No stocks found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StockTable;

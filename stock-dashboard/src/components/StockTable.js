import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const StockTable = ({ stocks, onSort, sortConfig }) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === 'asc' 
      ? <FaSortUp className="text-blue-400" /> 
      : <FaSortDown className="text-blue-400" />;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const formatVolume = (volume) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(volume);
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-300';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return '↗';
    if (change < 0) return '↘';
    return '→';
  };

  if (stocks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No stocks found</div>
        <div className="text-gray-500 text-sm">Try adjusting your search criteria</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-white/20">
            <th 
              className="table-header cursor-pointer hover:bg-white/10 transition-colors duration-200"
              onClick={() => onSort('symbol')}
            >
              <div className="flex items-center gap-2">
                Symbol
                {getSortIcon('symbol')}
              </div>
            </th>
            <th 
              className="table-header cursor-pointer hover:bg-white/10 transition-colors duration-200"
              onClick={() => onSort('name')}
            >
              <div className="flex items-center gap-2">
                Company
                {getSortIcon('name')}
              </div>
            </th>
            <th 
              className="table-header cursor-pointer hover:bg-white/10 transition-colors duration-200"
              onClick={() => onSort('price')}
            >
              <div className="flex items-center gap-2">
                Price
                {getSortIcon('price')}
              </div>
            </th>
            <th 
              className="table-header cursor-pointer hover:bg-white/10 transition-colors duration-200"
              onClick={() => onSort('change')}
            >
              <div className="flex items-center gap-2">
                Change
                {getSortIcon('change')}
              </div>
            </th>
            <th 
              className="table-header cursor-pointer hover:bg-white/10 transition-colors duration-200"
              onClick={() => onSort('changePercent')}
            >
              <div className="flex items-center gap-2">
                Change %
                {getSortIcon('changePercent')}
              </div>
            </th>
            <th 
              className="table-header cursor-pointer hover:bg-white/10 transition-colors duration-200"
              onClick={() => onSort('volume')}
            >
              <div className="flex items-center gap-2">
                Volume
                {getSortIcon('volume')}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr 
              key={stock.symbol} 
              className={`border-b border-white/10 hover:bg-white/5 transition-colors duration-200 ${
                index % 2 === 0 ? 'bg-white/5' : ''
              }`}
            >
              <td className="table-cell">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold text-xs">
                    {stock.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{stock.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="table-cell">
                <div className="text-white">{stock.name}</div>
              </td>
              <td className="table-cell">
                <div className="font-semibold text-white">{formatPrice(stock.price)}</div>
              </td>
              <td className="table-cell">
                <div className={`flex items-center gap-1 font-medium ${getChangeColor(stock.change)}`}>
                  <span>{getChangeIcon(stock.change)}</span>
                  <span>{formatPrice(Math.abs(stock.change))}</span>
                </div>
              </td>
              <td className="table-cell">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/10 ${getChangeColor(stock.change)}`}>
                  {stock.change > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
              </td>
              <td className="table-cell">
                <div className="text-gray-300">{formatVolume(stock.volume)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;

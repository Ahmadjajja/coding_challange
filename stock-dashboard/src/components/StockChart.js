import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const StockChart = ({ stocks }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatPercent = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const COLORS = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
  ];

  if (!stocks || stocks.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '3rem',
        color: '#9ca3af'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
          No Data Available
        </h3>
        <p>No stocks found matching your search criteria.</p>
        <p>Try adjusting your search terms or refresh the data.</p>
      </div>
    );
  }

  const barChartData = stocks.map(stock => ({
    symbol: stock.symbol,
    price: stock.price,
    change: stock.change,
    changePercent: stock.changePercent
  }));

  const pieChartData = stocks.map((stock, index) => ({
    name: stock.symbol,
    value: Math.abs(stock.changePercent),
    color: COLORS[index % COLORS.length]
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(4px)',
          padding: '12px',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <p style={{ fontWeight: '600', color: '#111827' }}>{label}</p>
          <p style={{ color: '#374151' }}>Price: {formatPrice(data.price)}</p>
          <p style={{ 
            fontWeight: '500', 
            color: data.change >= 0 ? '#059669' : '#dc2626' 
          }}>
            Change: {formatPercent(data.changePercent)}
          </p>
        </div>
      );
    }
    return null;
  };

  const averagePrice = stocks.length > 0 
    ? stocks.reduce((sum, stock) => sum + stock.price, 0) / stocks.length 
    : 0;

  const bestPerformer = stocks.length > 0 
    ? stocks.reduce((best, stock) => 
        stock.changePercent > best.changePercent ? stock : best
      )
    : { symbol: 'N/A' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="chart-section">
        <h3 className="chart-title">Stock Prices</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="symbol" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
                tickFormatter={(value) => formatPrice(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="price" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">Price Change Percentage</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="symbol" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="changePercent" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">Market Activity (by Change %)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value.toFixed(2)}%`, 'Change %']}
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem' 
              }}>
                {stocks.map((stock, index) => (
                  <div 
                    key={stock.symbol}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '0.5rem'
                    }}
                  >
                    <div 
                      style={{
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '50%',
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
                    <div>
                      <p style={{ color: 'white', fontWeight: '500' }}>{stock.symbol}</p>
                      <p style={{ 
                        fontSize: '0.875rem',
                        color: stock.changePercent >= 0 ? '#34d399' : '#f87171'
                      }}>
                        {formatPercent(stock.changePercent)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-stats">
        <div className="stat-card">
          <p className="stat-label">Total Stocks</p>
          <p className="stat-value">{stocks.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Average Price</p>
          <p className="stat-value">
            {formatPrice(averagePrice)}
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Best Performer</p>
          <p className="stat-value best-performer">
            {bestPerformer.symbol}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockChart;

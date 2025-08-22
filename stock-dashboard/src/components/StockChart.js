import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockChart = ({ stocks }) => {
  const [activeChart, setActiveChart] = useState('bar');

  if (!stocks || stocks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No Data Available</div>
        <div className="text-gray-500 text-sm">Try searching for different stocks</div>
      </div>
    );
  }

  const chartData = stocks.map(stock => ({
    name: stock.symbol,
    price: stock.price,
    change: stock.change,
    volume: stock.volume,
    changePercent: stock.changePercent
  }));

  const pieData = stocks.map(stock => ({
    name: stock.symbol,
    value: Math.abs(stock.changePercent)
  }));

  const averagePrice = stocks.reduce((sum, stock) => sum + stock.price, 0) / stocks.length;
  const bestPerformer = stocks.reduce((best, stock) => 
    stock.changePercent > best.changePercent ? stock : best, stocks[0]);

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16', '#F97316'];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setActiveChart('bar')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeChart === 'bar'
              ? 'bg-blue-600 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Bar Chart
        </button>
        <button
          onClick={() => setActiveChart('line')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeChart === 'line'
              ? 'bg-blue-600 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Line Chart
        </button>
        <button
          onClick={() => setActiveChart('pie')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeChart === 'pie'
              ? 'bg-blue-600 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Pie Chart
        </button>
      </div>

      <div className="bg-white/5 rounded-lg p-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === 'bar' && (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
              <Bar dataKey="price" fill="#3B82F6" />
              <Bar dataKey="change" fill="#10B981" />
            </BarChart>
          )}

          {activeChart === 'line' && (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="changePercent" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          )}

          {activeChart === 'pie' && (
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="card p-4 text-center">
          <div className="text-gray-300 text-sm mb-2">Average Price</div>
          <div className="text-2xl font-bold text-white">
            ${averagePrice.toFixed(2)}
          </div>
        </div>
        
        <div className="card p-4 text-center">
          <div className="text-gray-300 text-sm mb-2">Best Performer</div>
          <div className="text-2xl font-bold text-green-400">
            {bestPerformer.symbol}
          </div>
          <div className="text-sm text-green-400">
            +{bestPerformer.changePercent.toFixed(2)}%
          </div>
        </div>
        
        <div className="card p-4 text-center">
          <div className="text-gray-300 text-sm mb-2">Total Stocks</div>
          <div className="text-2xl font-bold text-white">
            {stocks.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;

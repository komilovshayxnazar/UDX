import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { mockMarketTrends } from '../../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MarketTrendsScreenProps {
  onBack: () => void;
}

export function MarketTrendsScreen({ onBack }: MarketTrendsScreenProps) {
  const latestPrice = mockMarketTrends[mockMarketTrends.length - 1].price;
  const previousPrice = mockMarketTrends[mockMarketTrends.length - 2].price;
  const priceChange = latestPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100).toFixed(2);
  const isPositive = priceChange > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-4 text-white shadow-lg">
        <button
          onClick={onBack}
          className="mb-2 flex items-center gap-2 text-white/90 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        <h2 className="text-white">Market Trends</h2>
        <p className="text-white/80">Real-time agricultural market data</p>
      </div>

      <div className="px-4 py-6">
        {/* Current Price Card */}
        <Card className="mb-6 p-6">
          <div className="mb-2 text-gray-600">Tomatoes (avg. price/kg)</div>
          <div className="mb-2 flex items-end gap-3">
            <span className="text-[#af47ff]">${latestPrice.toFixed(2)}</span>
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              <span>{isPositive ? '+' : ''}{percentChange}%</span>
            </div>
          </div>
          <p className="text-gray-500">Last 7 days</p>
        </Card>

        {/* Chart */}
        <Card className="mb-6 p-6">
          <h3 className="mb-4">Price History</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockMarketTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => `$${value}`}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#af47ff" 
                strokeWidth={3}
                dot={{ fill: '#af47ff', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Market Insights */}
        <Card className="p-6">
          <h3 className="mb-4">Market Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Weekly High</span>
              <span className="text-green-600">${Math.max(...mockMarketTrends.map(t => t.price)).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Weekly Low</span>
              <span className="text-red-600">${Math.min(...mockMarketTrends.map(t => t.price)).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Price</span>
              <span className="text-[#af47ff]">
                ${(mockMarketTrends.reduce((sum, t) => sum + t.price, 0) / mockMarketTrends.length).toFixed(2)}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

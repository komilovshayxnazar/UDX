import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Eye, ShoppingBag, DollarSign, Package, Plus, TrendingUp, Mail, Globe, Settings, Heart, Search } from 'lucide-react';
import { mockSellerStats, products } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from '../../context/TranslationContext';

interface SellerDashboardProps {
  onManageProducts: () => void;
  onManageOrders: () => void;
  onViewAnalytics: () => void;
  onMyProducts?: () => void;
  onSettingsClick?: () => void;
  onLanguageClick?: () => void;
  onFavoritesClick?: () => void;
  onMessagesClick?: () => void;
  onSearchClick?: () => void;
}

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 5200 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 6100 },
  { month: 'May', revenue: 7300 },
  { month: 'Jun', revenue: 8200 },
];

export function SellerDashboard({ 
  onManageProducts, 
  onManageOrders, 
  onViewAnalytics,
  onMyProducts,
  onSettingsClick,
  onLanguageClick,
  onFavoritesClick,
  onMessagesClick,
  onSearchClick 
}: SellerDashboardProps) {
  const { t } = useTranslation();
  const sellerName = "Your Farm"; // In a real app, get from user profile
  const sellerAvatar = "🌾";
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-6 text-white">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">
              {sellerAvatar}
            </div>
            <div>
              <h2 className="text-white">{sellerName}</h2>
              <p className="text-white/80">{t('seller.dashboard')}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {onSearchClick && (
              <button onClick={onSearchClick} className="rounded-full p-2 hover:bg-white/10">
                <Search className="h-6 w-6" />
              </button>
            )}
            {onMessagesClick && (
              <button onClick={onMessagesClick} className="rounded-full p-2 hover:bg-white/10">
                <Mail className="h-6 w-6" />
              </button>
            )}
            {onLanguageClick && (
              <button onClick={onLanguageClick} className="rounded-full p-2 hover:bg-white/10">
                <Globe className="h-6 w-6" />
              </button>
            )}
            {onSettingsClick && (
              <button onClick={onSettingsClick} className="rounded-full p-2 hover:bg-white/10">
                <Settings className="h-6 w-6" />
              </button>
            )}
            {onFavoritesClick && (
              <button onClick={onFavoritesClick} className="rounded-full p-2 hover:bg-white/10">
                <Heart className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="mb-2 flex items-center gap-2 text-gray-600">
              <Eye className="h-5 w-5" />
              <span>Views</span>
            </div>
            <div className="mb-1 text-[#af47ff]">{mockSellerStats.totalViews.toLocaleString()}</div>
            <p className="text-green-600">+12.5%</p>
          </Card>

          <Card className="p-4">
            <div className="mb-2 flex items-center gap-2 text-gray-600">
              <ShoppingBag className="h-5 w-5" />
              <span>Sales</span>
            </div>
            <div className="mb-1 text-[#af47ff]">{mockSellerStats.totalSales}</div>
            <p className="text-green-600">+8.3%</p>
          </Card>

          <Card className="p-4">
            <div className="mb-2 flex items-center gap-2 text-gray-600">
              <DollarSign className="h-5 w-5" />
              <span>Revenue</span>
            </div>
            <div className="mb-1 text-[#af47ff]">${mockSellerStats.totalRevenue.toFixed(2)}</div>
            <p className="text-green-600">+15.7%</p>
          </Card>

          <Card className="p-4">
            <div className="mb-2 flex items-center gap-2 text-gray-600">
              <Package className="h-5 w-5" />
              <span>Products</span>
            </div>
            <div className="mb-1 text-[#af47ff]">{mockSellerStats.activeProducts}</div>
            <p className="text-gray-600">Active</p>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="mb-6 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3>Revenue Trend</h3>
            <Button variant="ghost" size="sm" onClick={onViewAnalytics}>
              <TrendingUp className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#af47ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#af47ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#af47ff" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            <Button 
              onClick={onManageProducts}
              className="h-20 bg-[#af47ff] hover:bg-[#9935e6]"
            >
              <div className="flex flex-col items-center gap-2">
                <Plus className="h-6 w-6" />
                <span className="text-xs">Add Product</span>
              </div>
            </Button>
            <Button 
              onClick={onMyProducts}
              variant="outline"
              className="h-20"
            >
              <div className="flex flex-col items-center gap-2">
                <Package className="h-6 w-6 text-[#af47ff]" />
                <span className="text-xs">My Products</span>
              </div>
            </Button>
            <Button 
              onClick={onManageOrders}
              variant="outline"
              className="h-20"
            >
              <div className="flex flex-col items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-[#af47ff]" />
                <span className="text-xs">Orders ({mockSellerStats.newOrders})</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Recent Products */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3>Your Products</h3>
            <Button variant="ghost" size="sm" onClick={onManageProducts}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {products.slice(0, 3).map((product) => (
              <Card key={product.id} className="p-4">
                <div className="flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="mb-1">{product.name}</h4>
                    <div className="mb-2 text-[#af47ff]">
                      ${product.price}/{product.unit}
                    </div>
                    <div className="flex gap-2 text-gray-600">
                      <span>👁️ {product.views}</span>
                      <span>🛒 {product.sales} sold</span>
                    </div>
                  </div>
                  <Badge className={product.inStock ? 'bg-green-500' : 'bg-red-500'}>
                    {product.inStock ? 'In Stock' : 'Out'}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

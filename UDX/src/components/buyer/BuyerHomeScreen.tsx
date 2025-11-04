import { useState } from 'react';
import { motion } from 'motion/react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Heart, Star, MapPin, ShoppingCart, Award, TrendingUp, Cloud, Mail, Globe, Settings } from 'lucide-react';
import { products as initialProducts, farmers, categories, mockWeather, mockChats, type Product } from '../../data/mockData';
import { useTranslation } from '../../context/TranslationContext';

interface BuyerHomeScreenProps {
  onProductClick: (productId: string) => void;
  onFarmerClick: (farmerId: string) => void;
  onCartClick: () => void;
  onMarketTrendsClick: () => void;
  onSettingsClick: () => void;
  onLanguageClick: () => void;
  onFavoritesClick: () => void;
  onMessagesClick: () => void;
  onSearchClick?: () => void;
  cartItemCount: number;
  products?: Product[];
}

export function BuyerHomeScreen({ 
  onProductClick, 
  onFarmerClick, 
  onCartClick, 
  onMarketTrendsClick,
  onSettingsClick,
  onLanguageClick,
  onFavoritesClick,
  onMessagesClick,
  onSearchClick,
  cartItemCount,
  products = initialProducts
}: BuyerHomeScreenProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedFarmers, setSelectedFarmers] = useState<Set<string>>(new Set());

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalUnreadMessages = mockChats.reduce((sum, chat) => sum + chat.unreadCount, 0);
  
  const onlineFarmers = farmers.filter(f => f.isOnline);

  const handleSelectFarmer = (farmerId: string) => {
    if (!selectedFarmers.has(farmerId)) {
      setSelectedFarmers(new Set([...selectedFarmers, farmerId]));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-4 text-white shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-white">UDX</h2>
            <p className="text-white/80">Agricultural Marketplace</p>
          </div>
          <div className="flex gap-2">
            <button onClick={onMessagesClick} className="relative">
              <Mail className="h-6 w-6" />
              {totalUnreadMessages > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
                  {totalUnreadMessages}
                </span>
              )}
            </button>
            <button onClick={onLanguageClick} className="relative">
              <Globe className="h-6 w-6" />
            </button>
            <button onClick={onSettingsClick} className="relative">
              <Settings className="h-6 w-6" />
            </button>
            <button onClick={onFavoritesClick} className="relative">
              <Heart className="h-6 w-6" />
            </button>
            <button onClick={onCartClick} className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative" onClick={onSearchClick}>
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={t('common.search') + ' (@nickname, name, phone)'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none bg-white pl-10 pr-4 cursor-pointer"
            readOnly
          />
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Weather & Market Trends */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <Card className="overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-white/80">{t('buyer.home.weather')}</span>
              <span className="text-white">{mockWeather.icon}</span>
            </div>
            <div className="mb-1">{mockWeather.temperature}°C</div>
            <p className="text-white/90">{mockWeather.condition}</p>
          </Card>

          <Card 
            className="overflow-hidden bg-gradient-to-br from-green-500 to-green-600 p-4 text-white"
            onClick={onMarketTrendsClick}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-white/80">{t('buyer.home.title')}</span>
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="mb-1">{t('trends.title')}</div>
            <p className="text-white/90">{t('seller.analytics')}</p>
          </Card>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="mb-3">{t('manageProducts.category')}</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-shrink-0 flex-col items-center gap-2 rounded-xl p-4 transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#af47ff] text-white'
                    : 'bg-white text-gray-700'
                }`}
                style={{ minWidth: '100px' }}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="whitespace-nowrap text-center">{t(category.name)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Online Farmers */}
        {onlineFarmers.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3">🟢 Online Farmers</h3>
            <div className="space-y-3">
              {onlineFarmers.map((farmer) => {
                const isSelected = selectedFarmers.has(farmer.id);
                const farmerProducts = products.filter(p => p.farmerId === farmer.id);
                
                return (
                  <Card key={farmer.id} className="overflow-hidden">
                    <div className="p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={farmer.logo}
                            alt={farmer.name}
                            className="h-16 w-16 rounded-full object-cover"
                          />
                          <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
                        </div>
                        <div className="flex-1">
                          <h4>{farmer.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{farmer.rating}</span>
                            <span>•</span>
                            <span>{farmer.distance} km away</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleSelectFarmer(farmer.id)}
                          disabled={isSelected}
                          className={isSelected ? 'bg-gray-300' : 'bg-[#af47ff] hover:bg-[#9935e6]'}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </Button>
                      </div>
                      
                      {/* Farmer's Products */}
                      {farmerProducts.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {farmerProducts.map((product) => (
                            <div
                              key={product.id}
                              onClick={() => onProductClick(product.id)}
                              className="flex-shrink-0 cursor-pointer"
                              style={{ width: '120px' }}
                            >
                              <div className="mb-2 aspect-square overflow-hidden rounded-lg">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <p className="line-clamp-1 text-sm">{product.name}</p>
                              <p className="text-sm text-[#af47ff]">${product.price}/{product.unit}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Products */}
        <div className="mb-4 flex items-center justify-between">
          <h3>{t('buyer.home.allProducts')}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onProductClick(product.id)}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                  {product.certified && (
                    <Badge className="absolute right-2 top-2 bg-green-500">
                      <Award className="mr-1 h-3 w-3" />
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="mb-1 line-clamp-1">{product.name}</h4>
                  <div className="mb-2 flex items-center gap-2 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{product.distance} km</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#af47ff]">
                        ${product.price}
                      </span>
                      <span className="text-gray-500">/{product.unit}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

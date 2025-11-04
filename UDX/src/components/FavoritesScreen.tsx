import { useState } from 'react';
import { ArrowLeft, Search, Heart, Star, MapPin, MessageCircle, X, TrendingUp, TrendingDown } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { products } from '../data/mockData';

interface FavoritesScreenProps {
  onBack: () => void;
  onProductClick: (productId: string) => void;
  onChatClick?: (farmerId: string, farmerName: string) => void;
  favoriteProductIds: string[];
  onRemoveFavorite: (productId: string) => void;
}

export function FavoritesScreen({ 
  onBack, 
  onProductClick, 
  onChatClick,
  favoriteProductIds,
  onRemoveFavorite 
}: FavoritesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterCategory, setFilterCategory] = useState('all');

  const favoriteProducts = products.filter(p => favoriteProductIds.includes(p.id));

  const filteredProducts = favoriteProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const categories = Array.from(new Set(favoriteProducts.map(p => p.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={onBack} className="rounded-full p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h2>Favorites</h2>
            <p className="text-gray-600">{favoriteProducts.length} products</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search favorites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date Added</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products List */}
      <div className="px-4 py-4">
        {sortedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Heart className="mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2">No Favorites Yet</h3>
            <p className="text-center text-gray-600">
              {favoriteProducts.length === 0 
                ? "Start adding products to your favorites!"
                : "No products match your search"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="flex gap-4 p-4">
                  {/* Product Image */}
                  <div 
                    onClick={() => onProductClick(product.id)}
                    className="relative h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col">
                    <div className="mb-2 flex items-start justify-between">
                      <div 
                        onClick={() => onProductClick(product.id)}
                        className="flex-1 cursor-pointer"
                      >
                        <h4 className="mb-1">{product.name}</h4>
                        <div className="mb-2 flex items-center gap-2 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{product.rating}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{product.distance} km</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveFavorite(product.id)}
                        className="rounded-full p-1 hover:bg-gray-100"
                      >
                        <X className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>

                    {/* Seller & Price */}
                    <div className="mb-2">
                      <p className="text-gray-600">{product.farmerName}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#af47ff]">
                          ${product.price}
                        </span>
                        <span className="text-gray-500">/{product.unit}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-3">
                      <Badge variant={product.inStock ? "default" : "secondary"} className={product.inStock ? "bg-green-500" : ""}>
                        {product.inStock ? "Active" : "Out of Stock"}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => onProductClick(product.id)}
                        size="sm"
                        className="flex-1 bg-[#af47ff] hover:bg-[#8b2dd1]"
                      >
                        View Details
                      </Button>
                      {onChatClick && (
                        <Button
                          onClick={() => onChatClick(product.farmerId, product.farmerName)}
                          size="sm"
                          variant="outline"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

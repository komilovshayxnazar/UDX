import { useState } from 'react';
import { ArrowLeft, Search, Filter, Edit, Trash2, Eye, ShoppingCart } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { products as initialProducts, type Product } from '../../data/mockData';
import { useTranslation } from '../../context/TranslationContext';

interface MyProductsScreenProps {
  onBack: () => void;
  products?: Product[];
}

export function MyProductsScreen({ onBack, products = initialProducts }: MyProductsScreenProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && product.inStock) || 
      (statusFilter === 'inactive' && !product.inStock);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-6 text-white">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={onBack} className="rounded-full p-2 hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-white">My Products</h2>
            <p className="text-white/80">{filteredProducts.length} products listed</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('common.search')}
            className="bg-white/10 pl-10 text-white placeholder:text-white/60 border-white/20"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-4 bg-white border-b">
        <div className="grid grid-cols-2 gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="meat">Meat</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products List */}
      <div className="px-4 py-4">
        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="flex gap-3 p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h4 className="truncate">{product.name}</h4>
                      <Badge className={product.inStock ? 'bg-green-500' : 'bg-red-500'}>
                        {product.inStock ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="mb-2 text-[#af47ff]">
                      ${product.price}/{product.unit}
                    </div>
                    <div className="mb-3 flex gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {product.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingCart className="h-4 w-4" />
                        {product.sales}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

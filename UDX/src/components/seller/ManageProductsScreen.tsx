import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { products as initialProducts, categories, type Product } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';
import { useTranslation } from '../../context/TranslationContext';

interface ManageProductsScreenProps {
  onBack: () => void;
  products?: Product[];
  onProductAdded?: (product: Product) => void;
}

export function ManageProductsScreen({ onBack, products = initialProducts, onProductAdded }: ManageProductsScreenProps) {
  const { t } = useTranslation();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    unit: 'kg',
    category: '',
    description: '',
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      unit: newProduct.unit,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      farmerId: 'current-user',
      farmerName: 'Your Farm',
      description: newProduct.description,
      category: newProduct.category,
      rating: 0,
      reviewCount: 0,
      distance: 0,
      certified: false,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'],
    };
    
    onProductAdded?.(product);
    toast.success('Product added successfully!');
    setIsAddDialogOpen(false);
    setNewProduct({ name: '', price: '', unit: 'kg', category: '', description: '' });
  };

  const handleDeleteProduct = (productName: string) => {
    toast.success(`${productName} deleted`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-4 text-white shadow-lg">
        <button
          onClick={onBack}
          className="mb-2 flex items-center gap-2 text-white/90 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          {t('common.back')}
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white">{t('manageProducts.title')}</h2>
            <p className="text-white/80">{products.length} {t('buyer.home.allProducts')}</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-[#af47ff] hover:bg-gray-100">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Organic Tomatoes"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="4.99"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit *</Label>
                    <Select value={newProduct.unit} onValueChange={(value) => setNewProduct({...newProduct, unit: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="piece">piece</SelectItem>
                        <SelectItem value="liter">liter</SelectItem>
                        <SelectItem value="dozen">dozen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(0, 4).map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Product description..."
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddProduct} className="w-full bg-[#af47ff] hover:bg-[#9935e6]">
                  Add Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="space-y-3">
          {products.map((product) => (
            <Card key={product.id} className="p-4">
              <div className="flex gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="mb-1">{product.name}</h4>
                      <div className="mb-2 text-[#af47ff]">
                        ${product.price}/{product.unit}
                      </div>
                    </div>
                    <Badge className={product.inStock ? 'bg-green-500' : 'bg-red-500'}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <div className="mb-3 flex gap-4 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {product.views}
                    </span>
                    <span>🛒 {product.sales} sold</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600"
                      onClick={() => handleDeleteProduct(product.name)}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { useTranslation } from '../context/TranslationContext';
import { categories } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

interface AddAdScreenProps {
  onProductAdded?: (product: any) => void;
}

export function AddAdScreen({ onProductAdded }: AddAdScreenProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: 'kg',
    category: '',
    description: '',
    stock: '',
  });
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      unit: formData.unit,
      image: images[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      farmerId: 'current-user',
      farmerName: 'Your Farm',
      description: formData.description,
      category: formData.category,
      rating: 0,
      reviewCount: 0,
      distance: 0,
      certified: false,
      inStock: parseInt(formData.stock || '0') > 0,
      gallery: images.length > 0 ? images : ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'],
    };

    onProductAdded?.(newProduct);
    
    toast.success(t('manageProducts.addProduct') + ' successful!');
    
    // Reset form
    setFormData({
      name: '',
      price: '',
      unit: 'kg',
      category: '',
      description: '',
      stock: '',
    });
    setImages([]);
  };

  const handleAddImage = () => {
    // In a real app, this would open image picker
    const sampleImages = [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
    ];
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setImages([...images, randomImage]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-6 text-white">
        <h2 className="text-white">{t('manageProducts.addProduct')}</h2>
        <p className="text-white/80">List your products for sale</p>
      </div>

      <div className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images */}
          <Card className="p-4">
            <Label className="mb-3 block">{t('product.description')} Images</Label>
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img src={image} alt={`Product ${index + 1}`} className="h-full w-full rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                  <Camera className="h-6 w-6 text-gray-400" />
                  <span className="text-xs text-gray-500">{t('common.add')}</span>
                </button>
              )}
            </div>
          </Card>

          {/* Product Details */}
          <Card className="p-4 space-y-4">
            <div>
              <Label htmlFor="name">{t('manageProducts.productName')} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">{t('manageProducts.category')} *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {t(cat.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">{t('manageProducts.price')} *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="lb">lb</SelectItem>
                    <SelectItem value="piece">piece</SelectItem>
                    <SelectItem value="box">box</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="stock">{t('manageProducts.stock')}</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="Available quantity"
              />
            </div>

            <div>
              <Label htmlFor="description">{t('product.description')}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product..."
                rows={4}
              />
            </div>
          </Card>

          <Button type="submit" className="w-full bg-[#af47ff] hover:bg-[#9837e6]" size="lg">
            {t('manageProducts.addProduct')}
          </Button>
        </form>
      </div>
    </div>
  );
}

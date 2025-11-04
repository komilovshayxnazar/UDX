import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { ArrowLeft, Star, MapPin, Phone, MessageCircle, Video, Award } from 'lucide-react';
import { farmers, products } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

interface FarmerProfileScreenProps {
  farmerId: string;
  onBack: () => void;
  onProductClick: (productId: string) => void;
}

export function FarmerProfileScreen({ farmerId, onBack, onProductClick }: FarmerProfileScreenProps) {
  const farmer = farmers.find(f => f.id === farmerId);
  const farmerProducts = farmer ? products.filter(p => p.farmerId === farmer.id) : [];

  if (!farmer) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Farmer not found</p>
      </div>
    );
  }

  const handleContact = (type: string) => {
    toast.info(`${type} feature coming soon`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      {/* Farm Header */}
      <div className="bg-white px-4 py-6">
        <div className="mb-6 flex items-start gap-4">
          <img
            src={farmer.logo}
            alt={farmer.name}
            className="h-20 w-20 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <h2 className="mb-2">{farmer.name}</h2>
            <div className="mb-2 flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{farmer.rating}</span>
              <span className="text-gray-600">({farmer.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{farmer.distance} km away</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        {farmer.certifications.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {farmer.certifications.map((cert, index) => (
              <Badge key={index} className="bg-green-500">
                <Award className="mr-1 h-3 w-3" />
                {cert}
              </Badge>
            ))}
          </div>
        )}

        {/* Contact Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            onClick={() => handleContact('Message')}
            className="flex flex-col gap-1 py-4"
          >
            <MessageCircle className="h-5 w-5 text-[#af47ff]" />
            <span>Message</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleContact('Call')}
            className="flex flex-col gap-1 py-4"
          >
            <Phone className="h-5 w-5 text-[#af47ff]" />
            <span>Call</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleContact('Video Chat')}
            className="flex flex-col gap-1 py-4"
          >
            <Video className="h-5 w-5 text-[#af47ff]" />
            <span>Video</span>
          </Button>
        </div>
      </div>

      {/* About */}
      <div className="mt-4 bg-white px-4 py-6">
        <h3 className="mb-3">About</h3>
        <p className="text-gray-600">{farmer.description}</p>
      </div>

      {/* Gallery */}
      {farmer.gallery.length > 0 && (
        <div className="mt-4 bg-white px-4 py-6">
          <h3 className="mb-3">Gallery</h3>
          <div className="grid grid-cols-2 gap-3">
            {farmer.gallery.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={`${farmer.name} gallery ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="mt-4 bg-white px-4 py-6">
        <h3 className="mb-3">Products ({farmerProducts.length})</h3>
        <div className="grid grid-cols-2 gap-4">
          {farmerProducts.map((product) => (
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
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#af47ff]">
                        ${product.price}
                      </span>
                      <span className="text-gray-500">/{product.unit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
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

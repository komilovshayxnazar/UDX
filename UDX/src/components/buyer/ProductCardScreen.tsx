import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { ArrowLeft, Star, MapPin, Award, ShoppingCart, MessageCircle, Plus, Minus, Mic, StopCircle, Play, Pause, Send } from 'lucide-react';
import { products as initialProducts, farmers, type Product } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

interface ProductCardScreenProps {
  productId: string;
  onBack: () => void;
  onFarmerClick: (farmerId: string) => void;
  onChatClick: (farmerId: string) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  products?: Product[];
}

export function ProductCardScreen({ 
  productId, 
  onBack, 
  onFarmerClick, 
  onChatClick,
  onAddToCart,
  products = initialProducts
}: ProductCardScreenProps) {
  const product = products.find(p => p.id === productId);
  const farmer = product ? farmers.find(f => f.id === product.farmerId) : null;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [productRating, setProductRating] = useState(0);
  const [sellerRating, setSellerRating] = useState(0);
  const [review, setReview] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  if (!product || !farmer) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    toast.success(`Added ${quantity} ${product.unit}(s) to cart`);
  };

  const handleSubmitReview = () => {
    if (productRating === 0 && sellerRating === 0) {
      toast.error('Please provide at least one rating');
      return;
    }
    toast.success('Review submitted successfully!');
    setProductRating(0);
    setSellerRating(0);
    setReview('');
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
    toast.info('Recording started...');
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    setHasRecording(true);
    toast.success('Voice message recorded!');
  };

  const sendVoiceMessage = () => {
    if (hasRecording) {
      toast.success('Voice message sent to seller!');
      setHasRecording(false);
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white">
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

      {/* Image Gallery */}
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={product.gallery[currentImageIndex]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        
        {product.gallery.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {product.gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {product.certified && (
          <Badge className="absolute right-4 top-4 bg-green-500">
            <Award className="mr-1 h-4 w-4" />
            Certified
          </Badge>
        )}
      </div>

      <div className="px-4 py-6">
        {/* Product Info */}
        <div className="mb-6">
          <h2 className="mb-2">{product.name}</h2>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
              <span className="text-gray-600">({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>{product.distance} km</span>
            </div>
          </div>
          <div className="mb-4">
            <span className="text-[#af47ff]">${product.price}</span>
            <span className="text-gray-600"> / {product.unit}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="mb-2">Description</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* Farmer Info */}
        <div className="mb-6 rounded-2xl bg-gray-50 p-4">
          <h3 className="mb-3">Sold by</h3>
          <div className="mb-4 flex items-center gap-3">
            <img
              src={farmer.logo}
              alt={farmer.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4>{farmer.name}</h4>
              <div className="flex items-center gap-1 text-gray-600">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{farmer.rating} ({farmer.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onFarmerClick(farmer.id)}
            >
              View Profile
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onChatClick(farmer.id)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat
            </Button>
          </div>
        </div>

        {/* Quantity */}
        {product.inStock && (
          <div className="mb-6">
            <h3 className="mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <span className="text-gray-600">{product.unit}(s)</span>
            </div>
          </div>
        )}

        {/* Voice Message */}
        <Card className="mb-6 p-4">
          <h3 className="mb-3">Send Voice Message to Seller</h3>
          <div className="flex flex-col gap-3">
            {!isRecording && !hasRecording && (
              <Button
                onClick={startRecording}
                className="w-full bg-green-500 hover:bg-green-600"
                size="lg"
              >
                <Mic className="mr-2 h-5 w-5" />
                Start Recording
              </Button>
            )}
            
            {isRecording && (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3 rounded-lg bg-red-50 p-4">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
                  <span className="text-red-600">Recording: {formatTime(recordingTime)}</span>
                </div>
                <Button
                  onClick={stopRecording}
                  className="w-full bg-red-500 hover:bg-red-600"
                  size="lg"
                >
                  <StopCircle className="mr-2 h-5 w-5" />
                  Stop Recording
                </Button>
              </div>
            )}

            {hasRecording && !isRecording && (
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-2">
                      <Mic className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Voice message ({formatTime(recordingTime)})</span>
                  </div>
                  <Play className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setHasRecording(false);
                      setRecordingTime(0);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={sendVoiceMessage}
                    className="flex-1 bg-[#af47ff] hover:bg-[#9935e6]"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Rate & Review */}
        <Card className="mb-6 p-4">
          <h3 className="mb-4">Rate & Review</h3>
          
          {/* Product Rating */}
          <div className="mb-4">
            <h4 className="mb-2 text-sm">Rate Product</h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setProductRating(rating)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      rating <= productRating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Seller Rating */}
          <div className="mb-4">
            <h4 className="mb-2 text-sm">Rate Seller</h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSellerRating(rating)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      rating <= sellerRating
                        ? 'fill-blue-400 text-blue-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Comment */}
          <div className="mb-3">
            <h4 className="mb-2 text-sm">Your Comment</h4>
            <Textarea
              placeholder="Share your experience with this product and seller..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSubmitReview}
            variant="outline"
            className="w-full"
          >
            Submit Review
          </Button>
        </Card>

        {/* Add to Cart */}
        {product.inStock && (
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#af47ff] hover:bg-[#9935e6]"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart - ${(product.price * quantity).toFixed(2)}
          </Button>
        )}
      </div>
    </div>
  );
}

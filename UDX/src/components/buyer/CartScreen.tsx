import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Truck, CreditCard, Wallet, CheckCircle2 } from 'lucide-react';
import { products, type CartItem, type Order } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

interface CartScreenProps {
  onBack: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  orderHistory: Order[];
}

export function CartScreen({ onBack, cart, onUpdateQuantity, onRemoveItem, orderHistory }: CartScreenProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup'>('courier');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash'>('online');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartItems = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!,
  })).filter(item => item.product);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = deliveryMethod === 'courier' ? 5.99 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setIsCheckingOut(true);
    setTimeout(() => {
      toast.success('Order placed successfully!');
      setIsCheckingOut(false);
    }, 2000);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
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
          Back
        </button>
        <h2 className="text-white">Cart & Orders</h2>
      </div>

      <div className="px-4 py-6">
        <Tabs defaultValue="cart">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cart">Cart ({cart.length})</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>

          {/* Cart Tab */}
          <TabsContent value="cart" className="mt-6">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center">
                <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <p className="mb-2 text-gray-600">Your cart is empty</p>
                <p className="text-gray-500">Add some products to get started</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="mb-6 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.productId} className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="mb-1">{item.product.name}</h4>
                          <p className="mb-2 text-gray-600">{item.product.farmerName}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[#af47ff]">
                              ${item.product.price} / {item.product.unit}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500"
                                onClick={() => onRemoveItem(item.productId)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Delivery Method */}
                <Card className="mb-6 p-4">
                  <h3 className="mb-4">Delivery Method</h3>
                  <RadioGroup value={deliveryMethod} onValueChange={(value) => setDeliveryMethod(value as 'courier' | 'pickup')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="courier" id="courier" />
                      <Label htmlFor="courier" className="flex flex-1 items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck className="h-5 w-5 text-[#af47ff]" />
                          <span>Courier Delivery</span>
                        </div>
                        <span className="text-gray-600">${deliveryFee.toFixed(2)}</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex flex-1 items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="h-5 w-5 text-[#af47ff]" />
                          <span>Self Pickup</span>
                        </div>
                        <span className="text-green-600">Free</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </Card>

                {/* Payment Method */}
                <Card className="mb-6 p-4">
                  <h3 className="mb-4">Payment Method</h3>
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'online' | 'cash')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-[#af47ff]" />
                        <span>Online Payment</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-[#af47ff]" />
                        <span>Cash on Delivery</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </Card>

                {/* Order Summary */}
                <Card className="mb-6 p-4">
                  <h3 className="mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>{deliveryMethod === 'courier' ? `$${deliveryFee.toFixed(2)}` : 'Free'}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span className="text-[#af47ff]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#af47ff] hover:bg-[#9935e6]"
                  size="lg"
                >
                  {isCheckingOut ? (
                    'Processing...'
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Place Order - ${total.toFixed(2)}
                    </>
                  )}
                </Button>
              </>
            )}
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders" className="mt-6">
            {orderHistory.length === 0 ? (
              <div className="py-12 text-center">
                <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <p className="mb-2 text-gray-600">No orders yet</p>
                <p className="text-gray-500">Your order history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <Card key={order.id} className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="mb-1">Order #{order.id}</p>
                        <p className="text-gray-600">{order.date}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <Separator className="my-3" />
                    <div className="space-y-2">
                      {order.items.map((item) => {
                        const product = products.find(p => p.id === item.productId);
                        return product ? (
                          <div key={item.productId} className="flex justify-between text-gray-600">
                            <span>{product.name} x{item.quantity}</span>
                            <span>${(product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ) : null;
                      })}
                      <Separator />
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span className="text-[#af47ff]">${order.total.toFixed(2)}</span>
                      </div>
                      <p className="text-gray-600">
                        {order.deliveryMethod === 'courier' ? 'Courier Delivery' : 'Self Pickup'}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

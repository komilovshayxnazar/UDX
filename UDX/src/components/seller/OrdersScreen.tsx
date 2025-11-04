import { useState } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useTranslation } from '../../context/TranslationContext';

interface OrdersScreenProps {
  onBack: () => void;
}

interface Order {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  total: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  date: string;
  address: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    productName: 'Organic Tomatoes',
    quantity: 5,
    total: 24.95,
    status: 'pending',
    date: '2025-10-16',
    address: '123 Main St, City',
  },
  {
    id: 'ORD-002',
    customerName: 'Sarah Johnson',
    productName: 'Fresh Carrots',
    quantity: 3,
    total: 8.97,
    status: 'confirmed',
    date: '2025-10-15',
    address: '456 Oak Ave, Town',
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Brown',
    productName: 'Sweet Apples',
    quantity: 10,
    total: 59.90,
    status: 'completed',
    date: '2025-10-14',
    address: '789 Pine Rd, Village',
  },
  {
    id: 'ORD-004',
    customerName: 'Emma Davis',
    productName: 'Organic Lettuce',
    quantity: 2,
    total: 5.98,
    status: 'cancelled',
    date: '2025-10-13',
    address: '321 Elm St, City',
  },
];

export function OrdersScreen({ onBack }: OrdersScreenProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = selectedTab === 'all' || order.status === selectedTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <Package className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    // In a real app, this would update the order status in the database
    alert(`Order ${orderId} status updated to: ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-4 text-white shadow-lg">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={onBack} className="rounded-full p-2 hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-white">{t('seller.viewOrders')}</h2>
            <p className="text-white/80">Manage your customer orders</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none bg-white pl-10"
          />
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <div className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h4>{order.id}</h4>
                      <Badge className={getStatusColor(order.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-gray-600">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#af47ff]">${order.total.toFixed(2)}</div>
                    <p className="text-gray-500">{order.date}</p>
                  </div>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-3">
                  <div className="mb-1">{order.productName}</div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>{t('product.quantity')}: {order.quantity}</span>
                    <span>${(order.total / order.quantity).toFixed(2)} each</span>
                  </div>
                </div>

                <div className="mb-3 text-gray-600">
                  <p className="text-xs">Delivery Address:</p>
                  <p>{order.address}</p>
                </div>

                {/* Action Buttons */}
                {order.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      size="sm"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                      variant="outline"
                      className="flex-1"
                      size="sm"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                  </div>
                )}

                {order.status === 'confirmed' && (
                  <Button
                    onClick={() => handleUpdateStatus(order.id, 'completed')}
                    className="w-full bg-[#af47ff] hover:bg-[#9837e6]"
                    size="sm"
                  >
                    Mark as Completed
                  </Button>
                )}
              </div>
            </Card>
          ))}

          {filteredOrders.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              <Package className="mx-auto mb-3 h-12 w-12 text-gray-400" />
              <p>No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

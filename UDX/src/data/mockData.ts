export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  farmerId: string;
  farmerName: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  distance: number;
  certified: boolean;
  inStock: boolean;
  gallery: string[];
  views?: number;
  sales?: number;
}

export interface Farmer {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  description: string;
  gallery: string[];
  phone: string;
  distance: number;
  tin: string;
  certifications: string[];
  products: string[];
  isOnline?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'vegetables', name: 'category.vegetables', icon: '🥕' },
  { id: 'fruits', name: 'category.fruits', icon: '🍎' },
  { id: 'dairy', name: 'category.dairy', icon: '🥛' },
  { id: 'meat', name: 'category.meat', icon: '🥩' },
  { id: 'b2b', name: 'category.b2b', icon: '🏢' },
  { id: 'machinery', name: 'category.machinery', icon: '🚜' },
  { id: 'fertilizers', name: 'category.fertilizers', icon: '🧪' },
  { id: 'tools', name: 'category.tools', icon: '📦' },
  { id: 'grains', name: 'category.grains', icon: '🌾' },
  { id: 'finance', name: 'category.finance', icon: '💰' },
  { id: 'consulting', name: 'category.consulting', icon: '⚖️' },
  { id: 'organic', name: 'category.organic', icon: '🌿' },
  { id: 'seeds', name: 'category.seeds', icon: '🌱' },
  { id: 'storage', name: 'category.storage', icon: '🏗️' },
  { id: 'transport', name: 'category.transport', icon: '🚚' },
  { id: 'insurance', name: 'category.insurance', icon: '🛡️' },
  { id: 'livestock', name: 'category.livestock', icon: '🐄' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    price: 4.99,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1546470427-227e99f9a46e?w=800',
    farmerId: 'f1',
    farmerName: 'Green Valley Farm',
    description: 'Fresh, organic tomatoes grown without pesticides. Perfect for salads, cooking, and canning.',
    category: 'vegetables',
    rating: 4.8,
    reviewCount: 45,
    distance: 2.5,
    certified: true,
    inStock: true,
    gallery: [
      'https://images.unsplash.com/photo-1546470427-227e99f9a46e?w=800',
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800',
    ],
    views: 1234,
    sales: 89,
  },
  {
    id: '2',
    name: 'Fresh Lettuce',
    price: 2.99,
    unit: 'piece',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800',
    farmerId: 'f2',
    farmerName: 'Sunny Acres',
    description: 'Crisp, fresh lettuce harvested daily. Perfect for salads and sandwiches.',
    category: 'vegetables',
    rating: 4.6,
    reviewCount: 32,
    distance: 5.0,
    certified: true,
    inStock: true,
    gallery: ['https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800'],
    views: 876,
    sales: 54,
  },
  {
    id: '3',
    name: 'Farm Fresh Milk',
    price: 5.99,
    unit: 'liter',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800',
    farmerId: 'f3',
    farmerName: 'Happy Cow Dairy',
    description: 'Fresh pasteurized milk from grass-fed cows. Rich in nutrients.',
    category: 'dairy',
    rating: 4.7,
    reviewCount: 67,
    distance: 8.0,
    certified: false,
    inStock: true,
    gallery: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800'],
    views: 2100,
    sales: 143,
  },
];

export const farmers: Farmer[] = [
  {
    id: 'f1',
    name: 'Green Valley Farm',
    logo: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    rating: 4.8,
    reviewCount: 127,
    description: 'Family-owned organic farm specializing in vegetables and fruits.',
    gallery: [
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
    ],
    phone: '+1 (555) 123-4567',
    distance: 2.5,
    tin: '123456789',
    certifications: ['USDA Organic', 'Non-GMO'],
    products: ['1'],
    isOnline: true,
  },
  {
    id: 'f2',
    name: 'Sunny Acres',
    logo: 'https://images.unsplash.com/photo-1595855759920-86a3c7c65f5c?w=400',
    rating: 4.6,
    reviewCount: 89,
    description: 'Modern hydroponic farm producing fresh greens year-round.',
    gallery: ['https://images.unsplash.com/photo-1595855759920-86a3c7c65f5c?w=800'],
    phone: '+1 (555) 234-5678',
    distance: 5.0,
    tin: '987654321',
    certifications: ['Certified Naturally Grown'],
    products: ['2'],
    isOnline: false,
  },
  {
    id: 'f3',
    name: 'Happy Cow Dairy',
    logo: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400',
    rating: 4.7,
    reviewCount: 156,
    description: 'Small-scale dairy farm with grass-fed cows.',
    gallery: ['https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800'],
    phone: '+1 (555) 345-6789',
    distance: 8.0,
    tin: '456789123',
    certifications: ['Grass-Fed Certified'],
    products: ['3'],
    isOnline: true,
  },
];

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'new' | 'in-process' | 'completed' | 'cancelled';
  deliveryMethod: 'courier' | 'pickup';
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MarketTrend {
  date: string;
  price: number;
}

export interface Weather {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export const mockWeather: Weather = {
  temperature: 24,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  icon: '⛅',
};

export const mockMarketTrends: MarketTrend[] = [
  { date: '2025-10-01', price: 4.50 },
  { date: '2025-10-02', price: 4.65 },
  { date: '2025-10-03', price: 4.55 },
  { date: '2025-10-04', price: 4.80 },
  { date: '2025-10-05', price: 4.99 },
  { date: '2025-10-06', price: 5.10 },
  { date: '2025-10-07', price: 5.05 },
];

export interface SellerStats {
  totalViews: number;
  totalSales: number;
  totalRevenue: number;
  activeProducts: number;
  newOrders: number;
}

export const mockSellerStats: SellerStats = {
  totalViews: 5430,
  totalSales: 342,
  totalRevenue: 15680.50,
  activeProducts: 12,
  newOrders: 8,
};

export interface FavoriteProduct {
  productId: string;
  addedDate: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  productId?: string;
  productName?: string;
  productImage?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  orderStatus?: 'pending' | 'confirmed' | 'in-transit' | 'delivered' | 'completed';
  messages: ChatMessage[];
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

export const mockChats: Chat[] = [
  {
    id: 'c1',
    userId: 'f1',
    userName: 'Green Valley Farm',
    userAvatar: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    productId: '1',
    productName: 'Organic Tomatoes',
    productImage: 'https://images.unsplash.com/photo-1546470427-227e99f9a46e?w=200',
    lastMessage: 'Yes, we can deliver tomorrow morning',
    lastMessageTime: '10:30 AM',
    unreadCount: 2,
    orderStatus: 'confirmed',
    messages: [
      { id: 'm1', senderId: 'buyer', text: 'Hello, is this product available?', timestamp: '10:15 AM' },
      { id: 'm2', senderId: 'f1', text: 'Yes, we have fresh stock today!', timestamp: '10:20 AM' },
      { id: 'm3', senderId: 'buyer', text: 'Can you deliver tomorrow?', timestamp: '10:25 AM' },
      { id: 'm4', senderId: 'f1', text: 'Yes, we can deliver tomorrow morning', timestamp: '10:30 AM' },
    ]
  },
  {
    id: 'c2',
    userId: 'f2',
    userName: 'Sunny Acres',
    userAvatar: 'https://images.unsplash.com/photo-1595855759920-86a3c7c65f5c?w=400',
    productId: '2',
    productName: 'Fresh Lettuce',
    productImage: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200',
    lastMessage: 'Your order is ready for pickup',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    orderStatus: 'completed',
    messages: [
      { id: 'm5', senderId: 'f2', text: 'Your order is ready for pickup', timestamp: 'Yesterday' },
    ]
  },
  {
    id: 'c3',
    userId: 'support',
    userName: 'UDX Support',
    userAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400',
    lastMessage: 'How can we help you today?',
    lastMessageTime: 'Oct 10',
    unreadCount: 0,
    messages: [
      { id: 'm6', senderId: 'support', text: 'How can we help you today?', timestamp: 'Oct 10' },
    ]
  },
];

import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { AuthScreen } from './components/AuthScreen';
import { BuyerProfileScreen } from './components/BuyerProfileScreen';
import { SellerProfileScreen } from './components/SellerProfileScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { BuyerHomeScreen } from './components/buyer/BuyerHomeScreen';
import { ProductCardScreen } from './components/buyer/ProductCardScreen';
import { FarmerProfileScreen } from './components/buyer/FarmerProfileScreen';
import { CartScreen } from './components/buyer/CartScreen';
import { MarketTrendsScreen } from './components/buyer/MarketTrendsScreen';
import { SellerDashboard } from './components/seller/SellerDashboard';
import { ManageProductsScreen } from './components/seller/ManageProductsScreen';
import { MyProductsScreen } from './components/seller/MyProductsScreen';
import { OrdersScreen } from './components/seller/OrdersScreen';
import { CommunicationTypeScreen } from './components/communication/CommunicationTypeScreen';
import { VideoChatScreen } from './components/communication/VideoChatScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { LanguageSelectionScreen } from './components/LanguageSelectionScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { LiveScreen } from './components/LiveScreen';
import { AddAdScreen } from './components/AddAdScreen';
import { ContractsScreen } from './components/ContractsScreen';
import { AddContractOptionsScreen } from './components/AddContractOptionsScreen';
import { CreateContractScreen } from './components/CreateContractScreen';
import { MultiDeviceContractScreen } from './components/MultiDeviceContractScreen';
import { SearchScreen } from './components/SearchScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { Toaster } from './components/ui/sonner';
import { TranslationProvider, useTranslation } from './context/TranslationContext';
import type { CartItem, Order, Product } from './data/mockData';
import { products as initialProducts } from './data/mockData';

type OnboardingScreen = 'welcome' | 'role' | 'auth' | 'profile' | 'complete' | 'language' | 'settings';
type BuyerScreen = 'home' | 'product' | 'farmer' | 'cart' | 'trends' | 'communication' | 'video' | 'settings' | 'language' | 'favorites' | 'messages' | 'live' | 'add' | 'contracts' | 'add-contract-options' | 'create-contract' | 'multi-device-contract' | 'search';
type SellerScreen = 'dashboard' | 'products' | 'my-products' | 'orders' | 'settings' | 'language' | 'messages' | 'favorites' | 'live' | 'add' | 'trends' | 'contracts' | 'add-contract-options' | 'create-contract' | 'multi-device-contract' | 'search';
type Role = 'buyer' | 'seller' | null;
type BottomTab = 'home' | 'live' | 'add' | 'contracts' | 'trends' | 'profile';

function AppContent() {
  const { setLanguage } = useTranslation();
  const [currentOnboardingScreen, setCurrentOnboardingScreen] = useState<OnboardingScreen>('welcome');
  const [currentBuyerScreen, setCurrentBuyerScreen] = useState<BuyerScreen>('home');
  const [currentSellerScreen, setCurrentSellerScreen] = useState<SellerScreen>('dashboard');
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);
  const [selectedFarmerName, setSelectedFarmerName] = useState<string>('');
  const [buyerBottomTab, setBuyerBottomTab] = useState<BottomTab>('home');
  const [sellerBottomTab, setSellerBottomTab] = useState<BottomTab>('home');
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([
    {
      id: '001',
      date: '2025-10-15',
      status: 'delivered',
      total: 45.99,
      deliveryMethod: 'courier',
      items: [
        { productId: '1', quantity: 2 },
        { productId: '2', quantity: 3 },
      ],
    },
    {
      id: '002',
      date: '2025-10-10',
      status: 'processing',
      total: 28.50,
      deliveryMethod: 'pickup',
      items: [
        { productId: '3', quantity: 1 },
      ],
    },
  ]);
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>(['1', '3']); // Mock favorites
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [previousOnboardingScreen, setPreviousOnboardingScreen] = useState<OnboardingScreen | null>(null);

  // Onboarding
  const handleContinueFromWelcome = () => setCurrentOnboardingScreen('role');
  const handleSelectRole = (role: 'buyer' | 'seller') => {
    setSelectedRole(role);
    setCurrentOnboardingScreen('auth');
  };
  const handleAuthComplete = () => setCurrentOnboardingScreen('profile');
  const handleProfileComplete = () => {
    setCurrentOnboardingScreen('complete');
    setTimeout(() => setIsOnboarded(true), 3000);
  };
  const handleOnboardingBack = () => {
    switch (currentOnboardingScreen) {
      case 'role': setCurrentOnboardingScreen('welcome'); break;
      case 'auth': setCurrentOnboardingScreen('role'); setSelectedRole(null); break;
      case 'profile': setCurrentOnboardingScreen('auth'); break;
    }
  };

  // Buyer navigation
  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentBuyerScreen('product');
  };
  const handleFarmerClick = (farmerId: string) => {
    setSelectedFarmerId(farmerId);
    setCurrentBuyerScreen('farmer');
  };
  const handleCartClick = () => setCurrentBuyerScreen('cart');
  const handleMarketTrendsClick = () => setCurrentBuyerScreen('trends');
  const handleChatClick = (farmerId: string, farmerName: string) => {
    setSelectedFarmerId(farmerId);
    setSelectedFarmerName(farmerName);
    setCurrentBuyerScreen('communication');
  };
  const handleVideoChatStart = () => setCurrentBuyerScreen('video');
  const handleSettingsClick = () => setCurrentBuyerScreen('settings');
  const handleLanguageClick = () => setCurrentBuyerScreen('language');
  const handleFavoritesClick = () => setCurrentBuyerScreen('favorites');
  const handleMessagesClick = () => setCurrentBuyerScreen('messages');
  const handleSearchClick = () => setCurrentBuyerScreen('search');
  const handleBuyerBack = () => {
    setCurrentBuyerScreen('home');
    setSelectedProductId(null);
    setSelectedFarmerId(null);
  };
  
  // Favorites
  const handleRemoveFavorite = (productId: string) => {
    setFavoriteProductIds(prev => prev.filter(id => id !== productId));
  };
  
  // Language
  const handleLanguageSelect = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setLanguage(languageCode as any);
    // Return to previous screen instead of settings
    if (previousOnboardingScreen) {
      setCurrentOnboardingScreen(previousOnboardingScreen);
      setPreviousOnboardingScreen(null);
    }
  };

  const handleOnboardingLanguageClick = () => {
    setPreviousOnboardingScreen(currentOnboardingScreen);
    setCurrentOnboardingScreen('language');
  };

  const handleOnboardingSettingsClick = () => {
    setPreviousOnboardingScreen(currentOnboardingScreen);
    setCurrentOnboardingScreen('settings');
  };

  // Bottom navigation handlers
  const handleBuyerBottomTabChange = (tab: BottomTab) => {
    setBuyerBottomTab(tab);
    switch (tab) {
      case 'home':
        setCurrentBuyerScreen('home');
        break;
      case 'live':
        setCurrentBuyerScreen('live');
        break;
      case 'add':
        setCurrentBuyerScreen('add');
        break;
      case 'contracts':
        setCurrentBuyerScreen('contracts');
        break;
      case 'trends':
        setCurrentBuyerScreen('trends');
        break;
      case 'profile':
        setCurrentBuyerScreen('settings');
        break;
    }
  };

  const handleSellerBottomTabChange = (tab: BottomTab) => {
    setSellerBottomTab(tab);
    switch (tab) {
      case 'home':
        setCurrentSellerScreen('dashboard');
        break;
      case 'live':
        setCurrentSellerScreen('live');
        break;
      case 'add':
        setCurrentSellerScreen('add');
        break;
      case 'contracts':
        setCurrentSellerScreen('contracts');
        break;
      case 'trends':
        setCurrentSellerScreen('trends');
        break;
      case 'profile':
        setCurrentSellerScreen('settings');
        break;
    }
  };

  // Add product handler
  const handleProductAdded = (product: Product) => {
    setProducts([...products, product]);
  };
  
  // Logout
  const handleLogout = () => {
    setIsOnboarded(false);
    setSelectedRole(null);
    setCurrentOnboardingScreen('welcome');
    setCurrentBuyerScreen('home');
  };

  // Cart
  const handleAddToCart = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.productId === productId);
      if (existing) {
        return prevCart.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { productId, quantity }];
    });
  };
  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => prevCart.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    ));
  };
  const handleRemoveFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Onboarding flow
  if (!isOnboarded) {
    return (
      <div className="mx-auto max-w-md">
        {currentOnboardingScreen === 'welcome' && (
          <WelcomeScreen 
            onContinue={handleContinueFromWelcome} 
            onLanguageClick={handleOnboardingLanguageClick}
            onSettingsClick={handleOnboardingSettingsClick}
          />
        )}
        {currentOnboardingScreen === 'role' && (
          <RoleSelectionScreen 
            onSelectRole={handleSelectRole} 
            onBack={handleOnboardingBack}
            onLanguageClick={handleOnboardingLanguageClick}
            onSettingsClick={handleOnboardingSettingsClick}
          />
        )}
        {currentOnboardingScreen === 'auth' && selectedRole && (
          <AuthScreen 
            role={selectedRole} 
            onComplete={handleAuthComplete} 
            onBack={handleOnboardingBack}
          />
        )}
        {currentOnboardingScreen === 'profile' && selectedRole === 'buyer' && (
          <BuyerProfileScreen 
            onComplete={handleProfileComplete} 
            onBack={handleOnboardingBack}
          />
        )}
        {currentOnboardingScreen === 'profile' && selectedRole === 'seller' && (
          <SellerProfileScreen 
            onComplete={handleProfileComplete} 
            onBack={handleOnboardingBack}
          />
        )}
        {currentOnboardingScreen === 'complete' && selectedRole && (
          <CompletionScreen role={selectedRole} />
        )}
        {currentOnboardingScreen === 'language' && (
          <LanguageSelectionScreen
            onBack={() => {
              if (previousOnboardingScreen) {
                setCurrentOnboardingScreen(previousOnboardingScreen);
                setPreviousOnboardingScreen(null);
              }
            }}
            currentLanguage={currentLanguage}
            onLanguageSelect={handleLanguageSelect}
          />
        )}
        {currentOnboardingScreen === 'settings' && (
          <SettingsScreen
            onBack={() => {
              if (previousOnboardingScreen) {
                setCurrentOnboardingScreen(previousOnboardingScreen);
                setPreviousOnboardingScreen(null);
              }
            }}
            onLanguageClick={handleOnboardingLanguageClick}
            onLogout={() => {}}
          />
        )}
      </div>
    );
  }

  // Buyer module
  if (selectedRole === 'buyer') {
    return (
      <div className="mx-auto max-w-md relative">
        <Toaster />
        {currentBuyerScreen === 'home' && (
          <>
            <BuyerHomeScreen
              onProductClick={handleProductClick}
              onFarmerClick={handleFarmerClick}
              onCartClick={handleCartClick}
              onMarketTrendsClick={handleMarketTrendsClick}
              onSettingsClick={handleSettingsClick}
              onLanguageClick={handleLanguageClick}
              onFavoritesClick={handleFavoritesClick}
              onMessagesClick={handleMessagesClick}
              onSearchClick={handleSearchClick}
              cartItemCount={cartItemCount}
              products={products}
            />
            <BottomNavigation activeTab={buyerBottomTab} onTabChange={handleBuyerBottomTabChange} />
          </>
        )}
        {currentBuyerScreen === 'live' && (
          <>
            <LiveScreen userRole="buyer" />
            <BottomNavigation activeTab={buyerBottomTab} onTabChange={handleBuyerBottomTabChange} />
          </>
        )}
        {currentBuyerScreen === 'add' && (
          <>
            <AddAdScreen onProductAdded={handleProductAdded} />
            <BottomNavigation activeTab={buyerBottomTab} onTabChange={handleBuyerBottomTabChange} />
          </>
        )}
        {currentBuyerScreen === 'product' && selectedProductId && (
          <ProductCardScreen
            productId={selectedProductId}
            onBack={handleBuyerBack}
            onFarmerClick={handleFarmerClick}
            onChatClick={(farmerId) => {
              const product = products.find((p: any) => p.id === selectedProductId);
              handleChatClick(farmerId, product?.farmerName || 'Farmer');
            }}
            onAddToCart={handleAddToCart}
            products={products}
          />
        )}
        {currentBuyerScreen === 'farmer' && selectedFarmerId && (
          <FarmerProfileScreen
            farmerId={selectedFarmerId}
            onBack={handleBuyerBack}
            onProductClick={handleProductClick}
          />
        )}
        {currentBuyerScreen === 'cart' && (
          <CartScreen
            onBack={handleBuyerBack}
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            orderHistory={orderHistory}
          />
        )}
        {currentBuyerScreen === 'trends' && (
          <>
            <MarketTrendsScreen onBack={handleBuyerBack} />
            <BottomNavigation activeTab={buyerBottomTab} onTabChange={handleBuyerBottomTabChange} />
          </>
        )}
        {currentBuyerScreen === 'communication' && (
          <CommunicationTypeScreen
            farmerName={selectedFarmerName}
            onBack={handleBuyerBack}
            onSelectType={(type) => {
              if (type === 'video') handleVideoChatStart();
            }}
          />
        )}
        {currentBuyerScreen === 'video' && (
          <VideoChatScreen
            farmerName={selectedFarmerName}
            onEndCall={handleBuyerBack}
          />
        )}
        {currentBuyerScreen === 'settings' && (
          <SettingsScreen
            onBack={handleBuyerBack}
            onLanguageClick={handleLanguageClick}
            onLogout={handleLogout}
          />
        )}
        {currentBuyerScreen === 'language' && (
          <LanguageSelectionScreen
            onBack={() => setCurrentBuyerScreen('settings')}
            currentLanguage={currentLanguage}
            onLanguageSelect={handleLanguageSelect}
          />
        )}
        {currentBuyerScreen === 'favorites' && (
          <FavoritesScreen
            onBack={handleBuyerBack}
            onProductClick={handleProductClick}
            onChatClick={handleChatClick}
            favoriteProductIds={favoriteProductIds}
            onRemoveFavorite={handleRemoveFavorite}
          />
        )}
        {currentBuyerScreen === 'messages' && (
          <MessagesScreen
            onBack={handleBuyerBack}
            onChatClick={(chatId) => {
              // In a real app, this would open the chat detail screen
              console.log('Open chat:', chatId);
            }}
          />
        )}
        {currentBuyerScreen === 'contracts' && (
          <>
            <ContractsScreen
              onBack={handleBuyerBack}
              onAddContract={() => setCurrentBuyerScreen('add-contract-options')}
            />
            <BottomNavigation activeTab={buyerBottomTab} onTabChange={handleBuyerBottomTabChange} />
          </>
        )}
        {currentBuyerScreen === 'add-contract-options' && (
          <AddContractOptionsScreen
            onBack={() => setCurrentBuyerScreen('contracts')}
            onCreateNew={() => setCurrentBuyerScreen('create-contract')}
            onCreateMultiDevice={() => setCurrentBuyerScreen('multi-device-contract')}
            onSelectFromFiles={() => {
              // TODO: Implement file selection
              console.log('Select from files');
            }}
            onTakePicture={() => {
              // TODO: Implement camera
              console.log('Take picture');
            }}
          />
        )}
        {currentBuyerScreen === 'create-contract' && (
          <CreateContractScreen
            onBack={() => setCurrentBuyerScreen('add-contract-options')}
            onComplete={() => setCurrentBuyerScreen('contracts')}
          />
        )}
        {currentBuyerScreen === 'multi-device-contract' && (
          <MultiDeviceContractScreen
            onBack={() => setCurrentBuyerScreen('add-contract-options')}
            onComplete={() => setCurrentBuyerScreen('contracts')}
          />
        )}
        {currentBuyerScreen === 'search' && (
          <SearchScreen
            onBack={handleBuyerBack}
            onUserClick={(userId) => {
              // Navigate to user profile or chat
              console.log('View user profile:', userId);
            }}
            onSellerClick={(sellerId) => {
              handleFarmerClick(sellerId);
            }}
          />
        )}
      </div>
    );
  }

  // Seller module
  if (selectedRole === 'seller') {
    return (
      <div className="mx-auto max-w-md relative">
        <Toaster />
        {currentSellerScreen === 'dashboard' && (
          <>
            <SellerDashboard
              onManageProducts={() => setCurrentSellerScreen('products')}
              onManageOrders={() => setCurrentSellerScreen('orders')}
              onMyProducts={() => setCurrentSellerScreen('my-products')}
              onViewAnalytics={() => setCurrentSellerScreen('trends')}
              onSettingsClick={() => setCurrentSellerScreen('settings')}
              onLanguageClick={() => setCurrentSellerScreen('language')}
              onFavoritesClick={() => setCurrentSellerScreen('favorites')}
              onMessagesClick={() => setCurrentSellerScreen('messages')}
              onSearchClick={() => setCurrentSellerScreen('search')}
            />
            <BottomNavigation activeTab={sellerBottomTab} onTabChange={handleSellerBottomTabChange} />
          </>
        )}
        {currentSellerScreen === 'products' && (
          <ManageProductsScreen 
            onBack={() => setCurrentSellerScreen('dashboard')} 
            products={products}
            onProductAdded={handleProductAdded}
          />
        )}
        {currentSellerScreen === 'my-products' && (
          <MyProductsScreen
            onBack={() => setCurrentSellerScreen('dashboard')}
            products={products}
          />
        )}
        {currentSellerScreen === 'orders' && (
          <OrdersScreen onBack={() => setCurrentSellerScreen('dashboard')} />
        )}
        {currentSellerScreen === 'live' && (
          <>
            <LiveScreen userRole="seller" />
            <BottomNavigation activeTab={sellerBottomTab} onTabChange={handleSellerBottomTabChange} />
          </>
        )}
        {currentSellerScreen === 'add' && (
          <>
            <AddAdScreen onProductAdded={handleProductAdded} />
            <BottomNavigation activeTab={sellerBottomTab} onTabChange={handleSellerBottomTabChange} />
          </>
        )}
        {currentSellerScreen === 'trends' && (
          <>
            <MarketTrendsScreen onBack={() => setCurrentSellerScreen('dashboard')} />
            <BottomNavigation activeTab={sellerBottomTab} onTabChange={handleSellerBottomTabChange} />
          </>
        )}
        {currentSellerScreen === 'settings' && (
          <SettingsScreen
            onBack={() => setCurrentSellerScreen('dashboard')}
            onLanguageClick={() => setCurrentSellerScreen('language')}
            onLogout={handleLogout}
          />
        )}
        {currentSellerScreen === 'language' && (
          <LanguageSelectionScreen
            onBack={() => setCurrentSellerScreen('settings')}
            currentLanguage={currentLanguage}
            onLanguageSelect={handleLanguageSelect}
          />
        )}
        {currentSellerScreen === 'messages' && (
          <MessagesScreen
            onBack={() => setCurrentSellerScreen('dashboard')}
            onChatClick={(chatId) => {
              console.log('Open chat:', chatId);
            }}
          />
        )}
        {currentSellerScreen === 'favorites' && (
          <FavoritesScreen
            onBack={() => setCurrentSellerScreen('dashboard')}
            onProductClick={() => {}}
            onChatClick={() => {}}
            favoriteProductIds={favoriteProductIds}
            onRemoveFavorite={handleRemoveFavorite}
          />
        )}
        {currentSellerScreen === 'contracts' && (
          <>
            <ContractsScreen
              onBack={() => setCurrentSellerScreen('dashboard')}
              onAddContract={() => setCurrentSellerScreen('add-contract-options')}
            />
            <BottomNavigation activeTab={sellerBottomTab} onTabChange={handleSellerBottomTabChange} />
          </>
        )}
        {currentSellerScreen === 'add-contract-options' && (
          <AddContractOptionsScreen
            onBack={() => setCurrentSellerScreen('contracts')}
            onCreateNew={() => setCurrentSellerScreen('create-contract')}
            onCreateMultiDevice={() => setCurrentSellerScreen('multi-device-contract')}
            onSelectFromFiles={() => {
              // TODO: Implement file selection
              console.log('Select from files');
            }}
            onTakePicture={() => {
              // TODO: Implement camera
              console.log('Take picture');
            }}
          />
        )}
        {currentSellerScreen === 'create-contract' && (
          <CreateContractScreen
            onBack={() => setCurrentSellerScreen('add-contract-options')}
            onComplete={() => setCurrentSellerScreen('contracts')}
          />
        )}
        {currentSellerScreen === 'multi-device-contract' && (
          <MultiDeviceContractScreen
            onBack={() => setCurrentSellerScreen('add-contract-options')}
            onComplete={() => setCurrentSellerScreen('contracts')}
          />
        )}
        {currentSellerScreen === 'search' && (
          <SearchScreen
            onBack={() => setCurrentSellerScreen('dashboard')}
            onUserClick={(userId) => {
              // Navigate to user profile or chat
              console.log('View user profile:', userId);
            }}
            onSellerClick={(sellerId) => {
              // Navigate to seller profile
              console.log('View seller profile:', sellerId);
            }}
          />
        )}
      </div>
    );
  }

  return null;
}

export default function App() {
  return (
    <TranslationProvider>
      <AppContent />
    </TranslationProvider>
  );
}

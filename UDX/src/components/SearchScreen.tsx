import { useState } from 'react';
import { ArrowLeft, Search as SearchIcon, User, Store, AtSign, Phone, Hash } from 'lucide-react';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface SearchScreenProps {
  onBack: () => void;
  onUserClick?: (userId: string) => void;
  onSellerClick?: (sellerId: string) => void;
}

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  avatar: string;
  isOnline: boolean;
  role: 'buyer' | 'seller';
  company?: string;
  rating?: number;
  totalSales?: number;
}

// Mock user data
const mockUsers: UserProfile[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    nickname: 'johnsmith',
    phone: '+1234567890',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    isOnline: true,
    role: 'buyer',
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Garcia',
    nickname: 'mariagarcia',
    phone: '+1234567891',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    isOnline: false,
    role: 'buyer',
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Chen',
    nickname: 'davidchen',
    phone: '+1234567892',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    isOnline: true,
    role: 'seller',
    company: 'Green Valley Farm',
    rating: 4.8,
    totalSales: 1250,
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Johnson',
    nickname: 'sarahjohnson',
    phone: '+1234567893',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    isOnline: true,
    role: 'seller',
    company: 'Organic Orchards',
    rating: 4.9,
    totalSales: 2100,
  },
  {
    id: '5',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    nickname: 'ahmedhassan',
    phone: '+1234567894',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    isOnline: false,
    role: 'buyer',
  },
  {
    id: '6',
    firstName: 'Emily',
    lastName: 'Wilson',
    nickname: 'emilywilson',
    phone: '+1234567895',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    isOnline: true,
    role: 'seller',
    company: 'Sunny Acres Farm',
    rating: 4.7,
    totalSales: 980,
  },
  {
    id: '7',
    firstName: 'Michael',
    lastName: 'Brown',
    nickname: 'michaelbrown',
    phone: '+1234567896',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    isOnline: true,
    role: 'buyer',
  },
  {
    id: '8',
    firstName: 'Lisa',
    lastName: 'Anderson',
    nickname: 'lisaanderson',
    phone: '+1234567897',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    isOnline: false,
    role: 'seller',
    company: 'Fresh Harvest Co.',
    rating: 4.6,
    totalSales: 750,
  },
];

export function SearchScreen({ onBack, onUserClick, onSellerClick }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'buyers' | 'sellers'>('all');

  // Check if search starts with @
  const isUsernameSearch = searchQuery.startsWith('@');
  const cleanQuery = isUsernameSearch ? searchQuery.slice(1) : searchQuery;

  const searchUsers = (users: UserProfile[]) => {
    if (!cleanQuery) return users;

    return users.filter(user => {
      if (isUsernameSearch) {
        // Search by nickname when @ is used
        return user.nickname.toLowerCase().includes(cleanQuery.toLowerCase());
      } else {
        // Search by first name, last name, nickname, or phone
        return (
          user.firstName.toLowerCase().includes(cleanQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(cleanQuery.toLowerCase()) ||
          user.nickname.toLowerCase().includes(cleanQuery.toLowerCase()) ||
          user.phone.includes(cleanQuery)
        );
      }
    });
  };

  const filteredUsers = (() => {
    switch (activeTab) {
      case 'buyers':
        return searchUsers(mockUsers.filter(u => u.role === 'buyer'));
      case 'sellers':
        return searchUsers(mockUsers.filter(u => u.role === 'seller'));
      default:
        return searchUsers(mockUsers);
    }
  })();

  const handleUserClick = (user: UserProfile) => {
    if (user.role === 'seller' && onSellerClick) {
      onSellerClick(user.id);
    } else if (user.role === 'buyer' && onUserClick) {
      onUserClick(user.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-6 text-white">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={onBack} className="rounded-full p-2 hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-white">Search</h2>
            <p className="text-white/80">Find buyers and sellers</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, @nickname, or phone"
            className="bg-white/10 pl-10 text-white placeholder:text-white/60 border-white/20"
          />
          {isUsernameSearch && (
            <AtSign className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
          )}
        </div>

        {/* Search Hints */}
        {!searchQuery && (
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="bg-white/20 hover:bg-white/30 cursor-pointer" onClick={() => setSearchQuery('@')}>
              <AtSign className="mr-1 h-3 w-3" />
              @nickname
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 cursor-pointer">
              <Phone className="mr-1 h-3 w-3" />
              Phone
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 cursor-pointer">
              <Hash className="mr-1 h-3 w-3" />
              Name
            </Badge>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-12">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="buyers">
              <User className="mr-2 h-4 w-4" />
              Buyers
            </TabsTrigger>
            <TabsTrigger value="sellers">
              <Store className="mr-2 h-4 w-4" />
              Sellers
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results */}
      <div className="px-4 py-4">
        {filteredUsers.length === 0 ? (
          <div className="py-12 text-center">
            <SearchIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-500">
              {searchQuery ? 'No results found' : 'Start typing to search'}
            </p>
            {!searchQuery && (
              <div className="mt-4 text-sm text-gray-400">
                <p>• Use @ to search by nickname</p>
                <p>• Search by first/last name</p>
                <p>• Search by phone number</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <Card
                key={user.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleUserClick(user)}
              >
                <div className="flex items-center gap-3 p-4">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.firstName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    {user.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="truncate">
                        {user.firstName} {user.lastName}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {user.role === 'seller' ? (
                          <>
                            <Store className="mr-1 h-3 w-3" />
                            Seller
                          </>
                        ) : (
                          <>
                            <User className="mr-1 h-3 w-3" />
                            Buyer
                          </>
                        )}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <AtSign className="h-3 w-3" />
                      <span>@{user.nickname}</span>
                    </div>

                    {user.company && (
                      <p className="text-sm text-gray-500 mt-1">{user.company}</p>
                    )}

                    {user.role === 'seller' && user.rating && (
                      <div className="flex items-center gap-3 mt-2 text-sm">
                        <div className="flex items-center gap-1 text-yellow-500">
                          ⭐ {user.rating}
                        </div>
                        <div className="text-gray-500">
                          {user.totalSales} sales
                        </div>
                      </div>
                    )}
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

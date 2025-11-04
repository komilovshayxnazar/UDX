import { useState } from 'react';
import { ArrowLeft, Search, Filter, MessageCircle, Package, HelpCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { mockChats, type Chat } from '../data/mockData';

interface MessagesScreenProps {
  onBack: () => void;
  onChatClick?: (chatId: string) => void;
}

export function MessagesScreen({ onBack, onChatClick }: MessagesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredChats = mockChats.filter(chat => {
    const matchesSearch = chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (chat.productName?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'orders') return matchesSearch && chat.orderStatus;
    if (activeTab === 'support') return matchesSearch && chat.userId === 'support';
    
    return matchesSearch;
  });

  const totalUnread = mockChats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={onBack} className="rounded-full p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h2>Messages</h2>
            {totalUnread > 0 && (
              <p className="text-gray-600">{totalUnread} unread</p>
            )}
          </div>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Filter className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pt-4">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="orders">
            Orders
            {mockChats.filter(c => c.orderStatus).length > 0 && (
              <Badge className="ml-2 bg-[#af47ff]">
                {mockChats.filter(c => c.orderStatus).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <MessageCircle className="mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2">
                {mockChats.length === 0 ? 'No Messages Yet' : 'No Results'}
              </h3>
              <p className="text-center text-gray-600">
                {mockChats.length === 0 
                  ? "Find a product and write to the seller!"
                  : "Try adjusting your search"}
              </p>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {filteredChats.map((chat) => (
                <ChatItem 
                  key={chat.id} 
                  chat={chat} 
                  onClick={() => onChatClick?.(chat.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ChatItemProps {
  chat: Chat;
  onClick?: () => void;
}

function ChatItem({ chat, onClick }: ChatItemProps) {
  const getOrderStatusBadge = (status: Chat['orderStatus']) => {
    if (!status) return null;

    const statusConfig = {
      pending: { label: 'Awaiting Confirmation', variant: 'secondary' as const },
      confirmed: { label: 'Confirmed', variant: 'default' as const },
      'in-transit': { label: 'On the Way', variant: 'default' as const },
      delivered: { label: 'Delivered', variant: 'default' as const },
      completed: { label: 'Completed', variant: 'default' as const },
    };

    const config = statusConfig[status];
    return (
      <Badge 
        variant={config.variant}
        className={status === 'confirmed' || status === 'in-transit' ? 'bg-blue-500' : status === 'completed' ? 'bg-green-500' : ''}
      >
        {config.label}
      </Badge>
    );
  };

  return (
    <Card 
      className="cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex gap-4 p-4">
        {/* Avatar */}
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={chat.userAvatar} />
          <AvatarFallback>{chat.userName.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <div className="mb-1 flex items-start justify-between gap-2">
            <h4 className="truncate">{chat.userName}</h4>
            <span className="flex-shrink-0 text-gray-500">
              {chat.lastMessageTime}
            </span>
          </div>

          {/* Product Info (if applicable) */}
          {chat.productId && chat.productName && (
            <div className="mb-2 flex items-center gap-2">
              {chat.productImage && (
                <img 
                  src={chat.productImage} 
                  alt={chat.productName}
                  className="h-8 w-8 rounded object-cover"
                />
              )}
              <span className="truncate text-gray-600">{chat.productName}</span>
            </div>
          )}

          {/* Last Message */}
          <p className={`mb-2 truncate ${chat.unreadCount > 0 ? '' : 'text-gray-600'}`}>
            {chat.lastMessage}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {chat.orderStatus ? (
              getOrderStatusBadge(chat.orderStatus)
            ) : (
              <div />
            )}
            
            {chat.unreadCount > 0 && (
              <Badge className="bg-red-500">
                {chat.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

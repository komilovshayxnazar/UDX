import { useState, useEffect } from 'react';
import { Video, Users, MessageCircle, Heart, Share2, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { useTranslation } from '../context/TranslationContext';

interface LiveScreenProps {
  userRole: 'buyer' | 'seller';
}

interface LiveStream {
  id: string;
  title: string;
  seller: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
}

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
}

const mockLiveStreams: LiveStream[] = [
  {
    id: '1',
    title: 'Fresh Organic Vegetables Harvest',
    seller: 'Green Valley Farm',
    viewers: 234,
    thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    isLive: true,
  },
  {
    id: '2',
    title: 'Dairy Farm Tour - Fresh Milk',
    seller: 'Sunny Meadows Dairy',
    viewers: 156,
    thumbnail: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800',
    isLive: true,
  },
  {
    id: '3',
    title: 'Apple Orchard Picking Season',
    seller: 'Mountain View Orchards',
    viewers: 89,
    thumbnail: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800',
    isLive: false,
  },
];

const mockUsernames = ['FarmFan123', 'AgriLover', 'GreenThumb', 'Buyer2024', 'OrganicSeeker'];
const mockMessages = [
  'Great products!',
  'How much for the vegetables?',
  'Do you deliver?',
  'Quality looks amazing!',
  'Can you show more?',
];

export function LiveScreen({ userRole }: LiveScreenProps) {
  const { t } = useTranslation();
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Simulate viewer count changes
  useEffect(() => {
    if (isBroadcasting) {
      const interval = setInterval(() => {
        setViewerCount(prev => Math.max(0, prev + Math.floor(Math.random() * 10 - 3)));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isBroadcasting]);

  // Simulate incoming chat messages
  useEffect(() => {
    if (isBroadcasting) {
      const interval = setInterval(() => {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          username: mockUsernames[Math.floor(Math.random() * mockUsernames.length)],
          message: mockMessages[Math.floor(Math.random() * mockMessages.length)],
          timestamp: new Date(),
        };
        setChatMessages(prev => [...prev, newMessage].slice(-20)); // Keep last 20 messages
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isBroadcasting]);

  const handleStartLive = () => {
    setIsBroadcasting(true);
    setViewerCount(1);
    setChatMessages([]);
  };

  const handleEndLive = () => {
    setIsBroadcasting(false);
    setViewerCount(0);
    setChatMessages([]);
  };

  const handleSendMessage = () => {
    if (broadcastMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        username: 'You (Broadcaster)',
        message: broadcastMessage,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, newMessage]);
      setBroadcastMessage('');
    }
  };

  // Broadcasting view (for sellers)
  if (isBroadcasting) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="relative h-full w-full max-w-md mx-auto flex flex-col">
          {/* Video Preview */}
          <div className="relative flex-1 bg-gray-900">
            {/* Simulated camera view */}
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <Video className="h-24 w-24 text-gray-600" />
            </div>
            
            {/* End Broadcast Button */}
            <button 
              onClick={handleEndLive}
              className="absolute right-4 top-4 rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              End Live
            </button>

            {/* Live Badge */}
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-white">
              <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
              <span>LIVE</span>
            </div>

            {/* Viewers Count */}
            <div className="absolute left-4 top-16 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-white">
              <Users className="h-4 w-4" />
              <span>{viewerCount}</span>
            </div>

            {/* Stats */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/70 rounded-lg px-4 py-2 text-white">
                <div className="flex items-center justify-between text-sm">
                  <span>Viewers: {viewerCount}</span>
                  <span>Likes: {likes}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="h-80 bg-gray-900 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-700">
              <h3 className="text-white">Live Chat</h3>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
              {chatMessages.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Waiting for viewers to join...</p>
              ) : (
                chatMessages.map((msg) => (
                  <div key={msg.id} className="text-white">
                    <span className="text-[#af47ff]">{msg.username}: </span>
                    <span className="text-gray-300">{msg.message}</span>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Input
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Reply to viewers..."
                  className="bg-gray-800 text-white border-gray-700"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-[#af47ff] hover:bg-[#9333ea]"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Viewer mode (watching someone else's stream)
  if (selectedStream) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="relative h-full w-full max-w-md mx-auto">
          {/* Video Player */}
          <div className="relative h-2/3 bg-gray-900">
            <img 
              src={selectedStream.thumbnail} 
              alt={selectedStream.title}
              className="h-full w-full object-cover"
            />
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedStream(null)}
              className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Live Badge */}
            {selectedStream.isLive && (
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-white">
                <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
                <span>LIVE</span>
              </div>
            )}

            {/* Viewers Count */}
            <div className="absolute right-4 top-16 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-white">
              <Users className="h-4 w-4" />
              <span>{selectedStream.viewers}</span>
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-3">
              <button 
                onClick={() => setLikes(likes + 1)}
                className="flex flex-col items-center gap-1 text-white"
              >
                <div className="rounded-full bg-black/50 p-3">
                  <Heart className="h-6 w-6" />
                </div>
                <span className="text-xs">{likes}</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-white">
                <div className="rounded-full bg-black/50 p-3">
                  <Share2 className="h-6 w-6" />
                </div>
              </button>
            </div>
          </div>

          {/* Stream Info & Chat */}
          <div className="h-1/3 bg-gray-900 p-4 text-white">
            <h3 className="mb-2 text-white">{selectedStream.title}</h3>
            <p className="mb-4 text-gray-400">{selectedStream.seller}</p>

            {/* Chat Input */}
            <div className="flex gap-2">
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t('messages.title')}
                className="bg-gray-800 text-white border-gray-700"
              />
              <Button onClick={() => setComment('')} className="bg-[#af47ff]">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main live streams list
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white">Live Streams</h2>
          {userRole === 'seller' && (
            <Button 
              onClick={handleStartLive}
              className="bg-red-500 hover:bg-red-600"
              size="sm"
            >
              <Video className="mr-2 h-4 w-4" />
              Go Live
            </Button>
          )}
        </div>
        <p className="text-white/80">Watch live farm tours and product showcases</p>
      </div>

      {/* Live Streams Grid */}
      <div className="px-4 py-4">
        <div className="mb-4">
          <h3>{t('messages.online')}</h3>
        </div>
        
        <div className="grid gap-4">
          {mockLiveStreams.map((stream) => (
            <Card 
              key={stream.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedStream(stream)}
            >
              <div className="relative aspect-video">
                <img 
                  src={stream.thumbnail} 
                  alt={stream.title}
                  className="h-full w-full object-cover"
                />
                {stream.isLive && (
                  <div className="absolute left-2 top-2 flex items-center gap-1 rounded bg-red-500 px-2 py-1 text-white">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    <span className="text-xs">LIVE</span>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-white">
                  <Users className="h-3 w-3" />
                  <span className="text-xs">{stream.viewers}</span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="mb-1">{stream.title}</h4>
                <p className="text-gray-600">{stream.seller}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Phone, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Settings, 
  MessageCircle, 
  Languages 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface VideoChatScreenProps {
  farmerName: string;
  onEndCall: () => void;
}

export function VideoChatScreen({ farmerName, onEndCall }: VideoChatScreenProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [myLanguage, setMyLanguage] = useState('en');
  const [partnerLanguage, setPartnerLanguage] = useState('tr');
  const [chatMessage, setChatMessage] = useState('');
  const [translationMode, setTranslationMode] = useState<'chat' | 'voice'>('voice');
  
  // Simulated real-time translation
  const [liveTranscript, setLiveTranscript] = useState({
    original: 'Elmalar taze mi?',
    translated: 'Are the apples fresh?',
  });

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Message would be automatically translated
      setChatMessage('');
    }
  };

  return (
    <div className="flex h-screen flex-col bg-black">
      {/* Top Panel */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-3 text-white">
        <div>
          <h3 className="text-white">{farmerName}</h3>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500">Online</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className="text-white hover:bg-white/20"
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onEndCall}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Video Area */}
      <div className="relative flex-1 bg-gray-900">
        {/* Main video (partner) */}
        <div className="h-full w-full bg-gray-800 flex items-center justify-center">
          <div className="text-center text-white">
            <Video className="mx-auto mb-2 h-12 w-12" />
            <p>{farmerName}'s Video</p>
          </div>
        </div>

        {/* Picture-in-picture (self) */}
        <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 400, left: 0, right: 250 }}
          className="absolute right-4 top-4 h-32 w-24 cursor-move overflow-hidden rounded-xl border-2 border-white bg-gray-700"
        >
          <div className="flex h-full items-center justify-center text-white">
            <Video className="h-6 w-6" />
          </div>
        </motion.div>
      </div>

      {/* Translation Panel */}
      <div className="bg-white">
        <Tabs value={translationMode} onValueChange={(v) => setTranslationMode(v as 'chat' | 'voice')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">
              <MessageCircle className="mr-2 h-4 w-4" />
              Text Chat
            </TabsTrigger>
            <TabsTrigger value="voice">
              <Languages className="mr-2 h-4 w-4" />
              Voice Translation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-gray-600">Messages auto-translate</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Languages
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Translation Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block">My Language</label>
                      <Select value={myLanguage} onValueChange={setMyLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">🇺🇸 English</SelectItem>
                          <SelectItem value="ru">🇷🇺 Russian</SelectItem>
                          <SelectItem value="uz">🇺🇿 Uzbek</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="mb-2 block">Partner's Language</label>
                      <Select value={partnerLanguage} onValueChange={setPartnerLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tr">🇹🇷 Turkish</SelectItem>
                          <SelectItem value="en">🇺🇸 English</SelectItem>
                          <SelectItem value="ar">🇦🇪 Arabic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="bg-[#af47ff] hover:bg-[#9935e6]">
                Send
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="voice" className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-gray-600">Live voice translation</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    {myLanguage.toUpperCase()} → {partnerLanguage.toUpperCase()}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Translation Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block">I speak</label>
                      <Select value={myLanguage} onValueChange={setMyLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">🇺🇸 English</SelectItem>
                          <SelectItem value="ru">🇷🇺 Russian</SelectItem>
                          <SelectItem value="uz">🇺🇿 Uzbek</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="mb-2 block">Partner speaks</label>
                      <Select value={partnerLanguage} onValueChange={setPartnerLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tr">🇹🇷 Turkish</SelectItem>
                          <SelectItem value="en">🇺🇸 English</SelectItem>
                          <SelectItem value="ar">🇦🇪 Arabic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Live Subtitles */}
            <div className="space-y-3 rounded-xl bg-gray-50 p-4">
              <div>
                <Badge className="mb-2 bg-blue-500">Partner speaking (Turkish)</Badge>
                <p className="mb-1">{liveTranscript.original}</p>
                <p className="text-[#af47ff]">↓ {liveTranscript.translated}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-center gap-4 bg-white px-4 py-4">
        <Button
          variant={isMuted ? 'destructive' : 'outline'}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <Button
          variant={isVideoOff ? 'destructive' : 'outline'}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={() => setIsVideoOff(!isVideoOff)}
        >
          {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}

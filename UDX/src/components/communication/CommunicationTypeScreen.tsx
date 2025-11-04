import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ArrowLeft, MessageCircle, Phone, Video } from 'lucide-react';

interface CommunicationTypeScreenProps {
  farmerName: string;
  onBack: () => void;
  onSelectType: (type: 'chat' | 'audio' | 'video') => void;
}

export function CommunicationTypeScreen({ farmerName, onBack, onSelectType }: CommunicationTypeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#af47ff] to-[#8b2dd1] p-6">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-white/90 hover:text-white"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col justify-center"
      >
        <h2 className="mb-2 text-center text-white">Contact {farmerName}</h2>
        <p className="mb-12 text-center text-white/80">
          Choose how you'd like to communicate
        </p>

        <div className="space-y-4">
          <motion.button
            onClick={() => onSelectType('chat')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-2xl bg-white p-6 text-left transition-shadow hover:shadow-xl"
          >
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#af47ff]/10">
              <MessageCircle className="h-8 w-8 text-[#af47ff]" />
            </div>
            <h3 className="mb-2">Text Chat</h3>
            <p className="text-gray-600">
              Send and receive messages with automatic translation
            </p>
          </motion.button>

          <motion.button
            onClick={() => onSelectType('audio')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-2xl bg-white p-6 text-left transition-shadow hover:shadow-xl"
          >
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#af47ff]/10">
              <Phone className="h-8 w-8 text-[#af47ff]" />
            </div>
            <h3 className="mb-2">Audio Call</h3>
            <p className="text-gray-600">
              Voice call with real-time translation
            </p>
          </motion.button>

          <motion.button
            onClick={() => onSelectType('video')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-2xl bg-white p-6 text-left transition-shadow hover:shadow-xl"
          >
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#af47ff]/10">
              <Video className="h-8 w-8 text-[#af47ff]" />
            </div>
            <h3 className="mb-2">Video Chat</h3>
            <p className="text-gray-600">
              Face-to-face conversation with live subtitles and translation
            </p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Upload, Image as ImageIcon, Video } from 'lucide-react';

interface SellerProfileScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function SellerProfileScreen({ onComplete, onBack }: SellerProfileScreenProps) {
  const [farmName, setFarmName] = useState('');
  const [tin, setTin] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  const handleMediaUpload = (type: 'photo' | 'video') => {
    console.log(`Upload ${type}`);
  };

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
        className="flex-1"
      >
        <h2 className="mb-2 text-white">Farm Profile</h2>
        <p className="mb-8 text-white/80">
          Share details about your farm
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-6">
          <div>
            <Label htmlFor="farmName">Farm Name *</Label>
            <Input
              id="farmName"
              placeholder="Green Valley Farm"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="tin">Tax Identification Number (TIN) *</Label>
            <Input
              id="tin"
              placeholder="XX-XXXXXXX"
              value={tin}
              onChange={(e) => setTin(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Farm Description *</Label>
            <Textarea
              id="description"
              placeholder="Tell buyers about your farm..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>

          <div>
            <Label>Photo & Video Gallery</Label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex flex-col gap-2 py-8"
                onClick={() => handleMediaUpload('photo')}
              >
                <ImageIcon className="h-8 w-8 text-[#af47ff]" />
                <span>Add Photos</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex flex-col gap-2 py-8"
                onClick={() => handleMediaUpload('video')}
              >
                <Video className="h-8 w-8 text-[#af47ff]" />
                <span>Add Videos</span>
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#af47ff] hover:bg-[#9935e6]"
            disabled={!farmName || !tin || !description}
          >
            Complete Profile
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

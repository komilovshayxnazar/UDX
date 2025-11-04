import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Upload, Camera } from 'lucide-react';

interface BuyerProfileScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function BuyerProfileScreen({ onComplete, onBack }: BuyerProfileScreenProps) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  const handlePhotoUpload = () => {
    console.log('Upload photo');
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
        <h2 className="mb-2 text-white">Complete Your Profile</h2>
        <p className="mb-8 text-white/80">
          Tell us about yourself
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-6">
          <div className="flex flex-col items-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#af47ff]/20">
              {photo ? (
                <img src={photo} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <Camera className="h-10 w-10 text-[#af47ff]" />
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePhotoUpload}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
          </div>

          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#af47ff] hover:bg-[#9935e6]"
            disabled={!name}
          >
            Complete Profile
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

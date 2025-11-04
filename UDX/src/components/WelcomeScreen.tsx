import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ShoppingBag, Sprout, Globe, Settings } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface WelcomeScreenProps {
  onContinue: () => void;
  onLanguageClick?: () => void;
  onSettingsClick?: () => void;
}

export function WelcomeScreen({ onContinue, onLanguageClick, onSettingsClick }: WelcomeScreenProps) {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#af47ff] to-[#8b2dd1] p-6 text-white">
      {/* Top Navigation */}
      <div className="flex justify-end gap-2 mb-4">
        {onLanguageClick && (
          <button onClick={onLanguageClick} className="rounded-full p-2 hover:bg-white/10">
            <Globe className="h-6 w-6" />
          </button>
        )}
        {onSettingsClick && (
          <button onClick={onSettingsClick} className="rounded-full p-2 hover:bg-white/10">
            <Settings className="h-6 w-6" />
          </button>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-1 flex-col items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8 flex gap-4"
        >
          <Sprout className="h-16 w-16" />
          <ShoppingBag className="h-16 w-16" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-4 text-center text-8xl"
        >
          UDX
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12 max-w-sm text-center opacity-90"
        >
          {t('welcome.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Sprout className="h-5 w-5" />
            </div>
            <p>Direct from farm to table</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <p>Best prices for quality produce</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={onContinue}
          className="w-full bg-white text-[#af47ff] hover:bg-gray-100"
          size="lg"
        >
          {t('welcome.getStarted')}
        </Button>
      </motion.div>
    </div>
  );
}

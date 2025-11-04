import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ShoppingCart, Tractor, ArrowLeft, Globe, Settings } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface RoleSelectionScreenProps {
  onSelectRole: (role: 'buyer' | 'seller') => void;
  onBack: () => void;
  onLanguageClick?: () => void;
  onSettingsClick?: () => void;
}

export function RoleSelectionScreen({ onSelectRole, onBack, onLanguageClick, onSettingsClick }: RoleSelectionScreenProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#af47ff] to-[#8b2dd1] p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/90 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          {t('common.back')}
        </button>
        <div className="flex gap-2">
          {onLanguageClick && (
            <button onClick={onLanguageClick} className="rounded-full p-2 text-white hover:bg-white/10">
              <Globe className="h-6 w-6" />
            </button>
          )}
          {onSettingsClick && (
            <button onClick={onSettingsClick} className="rounded-full p-2 text-white hover:bg-white/10">
              <Settings className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1"
      >
        <h2 className="mb-2 text-white">{t('role.title')}</h2>
        <p className="mb-8 text-white/80">
          {t('welcome.subtitle')}
        </p>

        <div className="space-y-4">
          <motion.button
            onClick={() => onSelectRole('buyer')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-2xl border-2 border-white/30 bg-white p-6 text-left transition-all hover:border-white hover:shadow-xl"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#af47ff]/20">
              <ShoppingCart className="h-8 w-8 text-[#af47ff]" />
            </div>
            <h3 className="mb-2">{t('role.buyer')}</h3>
            <p className="text-gray-600">
              {t('role.buyerDesc')}
            </p>
          </motion.button>

          <motion.button
            onClick={() => onSelectRole('seller')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-2xl border-2 border-white/30 bg-white p-6 text-left transition-all hover:border-white hover:shadow-xl"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#af47ff]/20">
              <Tractor className="h-8 w-8 text-[#af47ff]" />
            </div>
            <h3 className="mb-2">{t('role.seller')}</h3>
            <p className="text-gray-600">
              {t('role.sellerDesc')}
            </p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

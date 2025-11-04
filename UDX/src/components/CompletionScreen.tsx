import { motion } from 'motion/react';
import { Button } from './ui/button';
import { CheckCircle2, ShoppingBag, Tractor } from 'lucide-react';

interface CompletionScreenProps {
  role: 'buyer' | 'seller';
}

export function CompletionScreen({ role }: CompletionScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#af47ff] to-[#8b2dd1] p-6 text-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        <CheckCircle2 className="h-24 w-24" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="mb-4">Welcome to AgroBazar!</h1>
        <p className="mb-8 max-w-md opacity-90">
          {role === 'buyer'
            ? 'Your profile is ready. Start browsing fresh produce from local farmers.'
            : 'Your farm profile is ready. Start listing your products and connect with buyers.'}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 flex justify-center"
        >
          {role === 'buyer' ? (
            <ShoppingBag className="h-16 w-16" />
          ) : (
            <Tractor className="h-16 w-16" />
          )}
        </motion.div>

        <Button
          onClick={() => console.log('Continue to app')}
          className="w-full bg-white text-[#af47ff] hover:bg-gray-100"
          size="lg"
        >
          {role === 'buyer' ? 'Start Shopping' : 'List Your Products'}
        </Button>
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Phone } from 'lucide-react';

interface AuthScreenProps {
  role: 'buyer' | 'seller';
  onComplete: () => void;
  onBack: () => void;
}

export function AuthScreen({ role, onComplete, onBack }: AuthScreenProps) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
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
        <h2 className="mb-2 text-white">
          {role === 'buyer' ? 'Buyer' : 'Seller'} Account
        </h2>
        <p className="mb-8 text-white/80">
          Enter your phone number to continue
        </p>

        <Tabs defaultValue="login" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/20">
            <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-[#af47ff]">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:text-[#af47ff]">
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                />
                <p className="mt-1 text-gray-500">
                  We'll send you a verification code
                </p>
              </div>

              <Button type="submit" className="w-full bg-[#af47ff] hover:bg-[#9935e6]">
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6">
              <div>
                <Label htmlFor="register-phone">Phone Number</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="register-code">Verification Code</Label>
                <Input
                  id="register-code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                />
                <p className="mt-1 text-gray-500">
                  We'll send you a verification code
                </p>
              </div>

              <Button type="submit" className="w-full bg-[#af47ff] hover:bg-[#9935e6]">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

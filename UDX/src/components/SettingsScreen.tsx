import { ArrowLeft, User, Phone, Lock, Shield, CreditCard, Bell, MessageSquare, DollarSign, TrendingUp, Globe, Eye, Ruler, MapPin, HelpCircle, FileText, Info, LogOut, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface SettingsScreenProps {
  onBack: () => void;
  onLanguageClick: () => void;
  onLogout: () => void;
}

export function SettingsScreen({ onBack, onLanguageClick, onLogout }: SettingsScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="rounded-full p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2>Settings</h2>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* User Profile Card */}
        <Card className="mb-6 p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3>John Doe</h3>
              <p className="text-gray-600">Buyer</p>
            </div>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Account and Security */}
        <div className="mb-6">
          <h3 className="mb-3 px-2 text-gray-600">Account & Security</h3>
          <Card className="overflow-hidden">
            <SettingsItem icon={<User />} label="Edit Profile" sublabel="Name, company, contacts" />
            <Separator />
            <SettingsItem icon={<Phone />} label="Phone Number" sublabel="+1 (555) 123-4567" />
            <Separator />
            <SettingsItem icon={<Lock />} label="Change Password" />
            <Separator />
            <SettingsItem icon={<Shield />} label="Two-Factor Authentication" hasSwitch />
            <Separator />
            <SettingsItem icon={<CreditCard />} label="Payment Details" sublabel="Manage cards and methods" />
          </Card>
        </div>

        {/* Notifications */}
        <div className="mb-6">
          <h3 className="mb-3 px-2 text-gray-600">Notifications</h3>
          <Card className="overflow-hidden">
            <SettingsItem icon={<Bell />} label="Push Notifications" hasSwitch defaultChecked />
            <Separator />
            <SettingsItem icon={<MessageSquare />} label="Messages from Sellers" hasSwitch defaultChecked />
            <Separator />
            <SettingsItem icon={<DollarSign />} label="Price Changes & Orders" hasSwitch defaultChecked />
            <Separator />
            <SettingsItem icon={<TrendingUp />} label="Market News & Analytics" hasSwitch />
            <Separator />
            <SettingsItem icon={<Info />} label="System Notifications" hasSwitch defaultChecked />
          </Card>
        </div>

        {/* Privacy */}
        <div className="mb-6">
          <h3 className="mb-3 px-2 text-gray-600">Privacy</h3>
          <Card className="overflow-hidden">
            <SettingsItem icon={<Eye />} label="Profile Visibility" sublabel="All users" />
          </Card>
        </div>

        {/* Preferences */}
        <div className="mb-6">
          <h3 className="mb-3 px-2 text-gray-600">Preferences</h3>
          <Card className="overflow-hidden">
            <SettingsItem icon={<Globe />} label="Language" sublabel="English" onClick={onLanguageClick} />
            <Separator />
            <SettingsItem icon={<Ruler />} label="Units of Measurement" sublabel="kg, tons, liters" />
            <Separator />
            <SettingsItem icon={<DollarSign />} label="Currency" sublabel="USD ($)" />
            <Separator />
            <SettingsItem icon={<MapPin />} label="Product Search Region" sublabel="Current location" />
          </Card>
        </div>

        {/* About */}
        <div className="mb-6">
          <h3 className="mb-3 px-2 text-gray-600">About the App</h3>
          <Card className="overflow-hidden">
            <SettingsItem icon={<HelpCircle />} label="Help & Support" sublabel="Chat, FAQ" />
            <Separator />
            <SettingsItem icon={<FileText />} label="Terms of Use" />
            <Separator />
            <SettingsItem icon={<FileText />} label="Privacy Policy" />
            <Separator />
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">App Version</span>
              </div>
              <span className="text-gray-500">v1.0.0</span>
            </div>
          </Card>
        </div>

        {/* Logout Button */}
        <Button 
          onClick={onLogout}
          variant="destructive" 
          className="w-full"
          size="lg"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  hasSwitch?: boolean;
  defaultChecked?: boolean;
  onClick?: () => void;
}

function SettingsItem({ icon, label, sublabel, hasSwitch, defaultChecked, onClick }: SettingsItemProps) {
  const content = (
    <>
      <div className="text-gray-500">{icon}</div>
      <div className="flex-1">
        <div>{label}</div>
        {sublabel && <div className="text-gray-500">{sublabel}</div>}
      </div>
      {hasSwitch ? (
        <Switch defaultChecked={defaultChecked} />
      ) : onClick ? (
        <ChevronRight className="h-5 w-5 text-gray-400" />
      ) : null}
    </>
  );

  if (hasSwitch) {
    return (
      <label className="flex w-full cursor-pointer items-center gap-3 p-4 text-left hover:bg-gray-50">
        {content}
      </label>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 p-4 text-left hover:bg-gray-50"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="flex w-full items-center gap-3 p-4 text-left">
      {content}
    </div>
  );
}

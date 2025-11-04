import { Home, Video, PlusCircle, TrendingUp, User, FileText } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface BottomNavigationProps {
  activeTab: 'home' | 'live' | 'add' | 'trends' | 'profile' | 'contracts';
  onTabChange: (tab: 'home' | 'live' | 'add' | 'trends' | 'profile' | 'contracts') => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const { t } = useTranslation();

  const tabs = [
    { id: 'home' as const, icon: Home, label: t('buyer.home.title') },
    { id: 'live' as const, icon: Video, label: 'Live' },
    { id: 'add' as const, icon: PlusCircle, label: t('common.add') },
    { id: 'contracts' as const, icon: FileText, label: 'Contracts' },
    { id: 'trends' as const, icon: TrendingUp, label: t('trends.title') },
    { id: 'profile' as const, icon: User, label: t('settings.profile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md border-t border-gray-200 bg-white shadow-lg">
      <div className="flex items-center justify-around px-1 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2 transition-all ${
                isActive 
                  ? 'bg-[#af47ff]/10 text-[#af47ff]' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-[10px] ${isActive ? 'font-medium' : ''}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

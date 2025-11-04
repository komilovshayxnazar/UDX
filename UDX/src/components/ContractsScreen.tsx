import { useState } from 'react';
import { ArrowLeft, Search, Plus, FileText, Calendar, User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useTranslation } from '../context/TranslationContext';

interface ContractsScreenProps {
  onBack: () => void;
  onAddContract: () => void;
  onViewContract?: (contractId: string) => void;
}

interface Contract {
  id: string;
  title: string;
  partnerName: string;
  partnerAvatar: string;
  type: string;
  date: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  amount: number;
}

const mockContracts: Contract[] = [
  {
    id: '1',
    title: 'Organic Vegetables Supply Agreement',
    partnerName: 'Green Valley Farm',
    partnerAvatar: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    type: 'Supply Contract',
    date: '2025-10-15',
    status: 'active',
    amount: 15000,
  },
  {
    id: '2',
    title: 'Dairy Products Purchase Order',
    partnerName: 'Happy Cow Dairy',
    partnerAvatar: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400',
    type: 'Purchase Order',
    date: '2025-10-20',
    status: 'pending',
    amount: 8500,
  },
  {
    id: '3',
    title: 'Seasonal Fruits Distribution',
    partnerName: 'Sunny Orchards',
    partnerAvatar: 'https://images.unsplash.com/photo-1595855759920-86a3c7c65f5c?w=400',
    type: 'Distribution Agreement',
    date: '2025-09-05',
    status: 'completed',
    amount: 22000,
  },
];

export function ContractsScreen({ onBack, onAddContract, onViewContract }: ContractsScreenProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'pending' | 'completed'>('all');

  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.partnerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || contract.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-6 text-white">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="rounded-full p-2 hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-white">Contracts</h2>
              <p className="text-white/80">{filteredContracts.length} contracts</p>
            </div>
          </div>
          <Button 
            onClick={onAddContract}
            size="sm"
            className="bg-white text-[#af47ff] hover:bg-white/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Contract
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contracts..."
            className="bg-white/10 pl-10 text-white placeholder:text-white/60 border-white/20"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b px-4 py-2">
        <div className="flex gap-2">
          {['all', 'active', 'pending', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as any)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                selectedTab === tab
                  ? 'bg-[#af47ff] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Contracts List */}
      <div className="px-4 py-4">
        {filteredContracts.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-500">No contracts found</p>
            <Button 
              onClick={onAddContract}
              className="mt-4 bg-[#af47ff] hover:bg-[#9333ea]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Contract
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredContracts.map((contract) => (
              <Card 
                key={contract.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onViewContract?.(contract.id)}
              >
                <div className="p-4">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1 truncate">{contract.title}</h4>
                      <p className="text-gray-600">{contract.type}</p>
                    </div>
                    <Badge className={getStatusColor(contract.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(contract.status)}
                        {contract.status}
                      </span>
                    </Badge>
                  </div>

                  <div className="mb-3 flex items-center gap-3">
                    <img 
                      src={contract.partnerAvatar} 
                      alt={contract.partnerName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{contract.partnerName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{contract.date}</span>
                    </div>
                    <div className="text-[#af47ff]">
                      ${contract.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

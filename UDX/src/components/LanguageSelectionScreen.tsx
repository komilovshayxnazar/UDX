import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { languages, type Language } from '../data/mockData';
import { useTranslation } from '../context/TranslationContext';

interface LanguageSelectionScreenProps {
  onBack: () => void;
  currentLanguage?: string;
  onLanguageSelect?: (languageCode: string) => void;
}

export function LanguageSelectionScreen({ 
  onBack, 
  currentLanguage = 'en',
  onLanguageSelect 
}: LanguageSelectionScreenProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    onLanguageSelect?.(languageCode);
    // Auto-close after selection
    setTimeout(() => {
      onBack();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={onBack} className="rounded-full p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2>{t('language.title')}</h2>
        </div>

        {/* Search */}
        <Input
          placeholder={t('common.search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Language List */}
      <div className="px-4 py-4">
        <Card className="overflow-hidden">
          {filteredLanguages.map((language, index) => (
            <div key={language.code}>
              {index > 0 && <div className="border-t" />}
              <button
                onClick={() => handleLanguageSelect(language.code)}
                className="flex w-full items-center gap-4 p-4 text-left hover:bg-gray-50"
              >
                <span className="text-3xl">{language.flag}</span>
                <div className="flex-1">
                  <div>{language.name}</div>
                  <div className="text-gray-500">{language.nativeName}</div>
                </div>
                {selectedLanguage === language.code && (
                  <Check className="h-5 w-5 text-[#af47ff]" />
                )}
              </button>
            </div>
          ))}
        </Card>

        {filteredLanguages.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No languages found
          </div>
        )}
      </div>
    </div>
  );
}

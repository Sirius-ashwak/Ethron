import React, { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface MultiLanguageSupportProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' }
];

export default function MultiLanguageSupport({ currentLanguage, onLanguageChange }: MultiLanguageSupportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const currentLang = supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0];

  const handleLanguageSelect = async (languageCode: string) => {
    if (languageCode === currentLanguage) {
      setIsOpen(false);
      return;
    }

    setIsTranslating(true);
    
    // Simulate translation API call
    setTimeout(() => {
      onLanguageChange(languageCode);
      setIsTranslating(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <div className="relative">
      {/* Language Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
        disabled={isTranslating}
      >
        {isTranslating ? (
          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <Globe className="w-4 h-4 text-gray-400" />
        )}
        <span className="text-sm font-medium text-gray-300">
          {currentLang.flag} {currentLang.code.toUpperCase()}
        </span>
      </button>

      {/* Language Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-xl border border-gray-700 z-50 animate-scale-in">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-400 px-3 py-2 border-b border-gray-700">
              Select Language
            </div>
            <div className="max-h-64 overflow-y-auto">
              {supportedLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-800 rounded-lg transition-colors ${
                    currentLanguage === language.code ? 'bg-cyan-500/20' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{language.flag}</span>
                    <div className="text-left">
                      <div className="font-medium text-white">
                        {language.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {language.nativeName}
                      </div>
                    </div>
                  </div>
                  {currentLanguage === language.code && (
                    <Check className="w-4 h-4 text-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Translation Status */}
          <div className="p-3 border-t border-gray-700 bg-gray-800 rounded-b-lg">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Powered by Google Cloud Translate</span>
            </div>
          </div>
        </div>
      )}

      {/* Translation Overlay */}
      {isTranslating && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <div className="font-medium text-white">
                  Translating Interface...
                </div>
                <div className="text-sm text-gray-400">
                  Switching to {supportedLanguages.find(l => l.code === currentLanguage)?.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
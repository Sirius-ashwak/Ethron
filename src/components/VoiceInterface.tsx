import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceInterfaceProps {
  onVoiceCommand: (command: string) => void;
  darkMode: boolean;
}

export default function VoiceInterface({ onVoiceCommand, darkMode }: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setTranscript(transcript);
          
          if (event.results[current].isFinal) {
            onVoiceCommand(transcript);
            setTranscript('');
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onVoiceCommand]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-3">
        {/* Transcript Display */}
        {transcript && (
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700 shadow-lg max-w-xs">
            <p className="text-sm text-gray-300">
              "{transcript}"
            </p>
          </div>
        )}

        {/* Voice Controls */}
        <div className="flex space-x-2">
          {/* Speech Output Control */}
          <button
            onClick={isSpeaking ? stopSpeaking : () => speak('Voice interface ready')}
            className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
              isSpeaking
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-gray-800/80 hover:bg-gray-800 text-gray-300'
            } backdrop-blur-sm border border-gray-700`}
            title={isSpeaking ? 'Stop Speaking' : 'Test Voice Output'}
          >
            {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Voice Input Control */}
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-4 rounded-full shadow-lg transition-all duration-200 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
            }`}
            title={isListening ? 'Stop Listening' : 'Start Voice Command'}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
        </div>

        {/* Status Indicator */}
        {isListening && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-red-300">
                Listening...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
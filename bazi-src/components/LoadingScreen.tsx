import React from 'react';

interface LoadingScreenProps {
  message: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-amber-900/30 rounded-full"></div>
        
        {/* Rotating Tai Chi / Yin Yang abstraction */}
        <div className="absolute inset-0 rounded-full border-t-4 border-amber-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-r-4 border-slate-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
        
        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-amber-500/80 font-serif animate-pulse tracking-widest text-lg">{message}</p>
    </div>
  );
};
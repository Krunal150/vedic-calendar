
import React from 'react';

interface PanchangDetailItemProps {
  label: string;
  value: string;
  icon?: string;
  isDevanagari?: boolean;
}

export const PanchangDetailItem: React.FC<PanchangDetailItemProps> = ({ label, value, icon, isDevanagari }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 hover:border-orange-400/50 transition-all">
      <span className={`text-[9px] uppercase tracking-widest text-orange-300 font-bold mb-1 opacity-70 ${isDevanagari ? 'font-devanagari' : ''}`}>
        {label}
      </span>
      <span className={`text-sm md:text-base font-semibold text-white text-center leading-tight ${isDevanagari ? 'font-devanagari' : ''}`}>
        {value}
      </span>
    </div>
  );
};

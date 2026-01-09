
import React, { useState, useEffect } from 'react';
import { PanchangData } from '../types';
import { PanchangDetailItem } from './PanchangDetailItem';

interface LockScreenProps {
  data: PanchangData;
  onRefresh: () => void;
  loading: boolean;
}

type Language = 'en' | 'hi';

export const LockScreen: React.FC<LockScreenProps> = ({ data, onRefresh, loading }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lang, setLang] = useState<Language>('hi');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable fullscreen: ${e.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const labels = {
    shaka: lang === 'hi' ? 'शालिवाहन शक' : 'Shaka Era',
    festivalTitle: lang === 'hi' ? 'आज का त्यौहार' : 'Festival Today',
    wisdom: lang === 'hi' ? 'आज का सुविचार' : 'Daily Wisdom',
    refresh: lang === 'hi' ? 'शुभ मुहूर्त देखें' : 'Check Shubh Muhurat',
    tithi: lang === 'hi' ? 'तिथि' : 'Tithi',
    vara: lang === 'hi' ? 'वार' : 'Vara',
    nakshatra: lang === 'hi' ? 'नक्षत्र' : 'Nakshatra',
    yoga: lang === 'hi' ? 'योग' : 'Yoga',
    maas: lang === 'hi' ? 'मास' : 'Maas',
    paksha: lang === 'hi' ? 'पक्ष' : 'Paksha',
    noFestival: lang === 'hi' ? 'आपका दिन शुभ हो' : 'May your day be blessed'
  };

  const spiritualBgs = [
    "https://images.unsplash.com/photo-1545062990-4a95e8e4b96d", 
    "https://images.unsplash.com/photo-1590766948562-0f69f152e417", 
    "https://images.unsplash.com/photo-1620311394132-706596357b28", 
    "https://images.unsplash.com/photo-1601050638917-3f0440019904", 
    "https://images.unsplash.com/photo-1596401057633-5339c656962e", 
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220", 
    "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8"  
  ];
  
  const dailyBg = spiritualBgs[new Date().getDay() % spiritualBgs.length] + "?q=80&w=1080&auto=format&fit=crop";

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between p-6 overflow-hidden select-none">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 transform scale-110"
        style={{ backgroundImage: `url(${dailyBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />

      {/* Top Utilities */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        <button 
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          className="px-3 py-2 bg-orange-600/60 backdrop-blur-md rounded-xl border border-orange-400/50 text-white text-xs font-bold tracking-widest font-cinzel hover:bg-orange-600 transition-all"
        >
          {lang === 'hi' ? 'EN' : 'अ'}
        </button>
        <button 
          onClick={toggleFullscreen}
          className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/70 hover:text-white"
        >
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 5M4 4v5M4 4h5m11 11l-5-5m5 5l-5-5m5 5v-5m0 5h-5" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
          )}
        </button>
      </div>

      {/* Top Section: Clock & Date */}
      <div className="relative z-10 w-full flex flex-col items-center pt-10 animate-in fade-in slide-in-from-top duration-1000">
        <div className="flex items-center space-x-2 text-orange-400 mb-2">
          <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l.395.17c.76.325 1.4.88 1.838 1.578L14.5 8.323V10a1 1 0 11-2 0V8.323l-1.267-1.267a2 2 0 00-2.466 0L7.5 8.323V10a1 1 0 11-2 0V8.323l1.267-1.267c.438-.698 1.078-1.253 1.838-1.578l.395-.17V3a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className={`text-[10px] md:text-xs tracking-[0.3em] uppercase ${lang === 'hi' ? 'font-devanagari' : 'font-cinzel'}`}>
            {labels.shaka} {data.shakaSamvat}
          </span>
        </div>
        <h1 className="text-[5.5rem] md:text-8xl font-cinzel font-bold text-white tracking-tighter drop-shadow-2xl leading-none">
          {formatTime(currentTime)}
        </h1>
        <p className={`text-base md:text-xl font-medium text-white/90 tracking-wide mt-2 drop-shadow-md ${lang === 'hi' ? 'font-devanagari' : ''}`}>
          {formatDate(currentTime)}
        </p>
      </div>

      {/* Middle Section: Festivals Notification */}
      <div className="relative z-10 w-full flex flex-col space-y-3 px-2 max-h-[25vh] overflow-y-auto no-scrollbar">
        {data.festivals.length > 0 ? (
          data.festivals.map((fest, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-r from-orange-600/40 to-amber-600/20 backdrop-blur-xl border border-orange-500/40 p-4 rounded-2xl flex items-center space-x-4 animate-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="bg-orange-600 shadow-lg shadow-orange-500/50 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <p className={`text-[10px] text-orange-200 font-bold uppercase tracking-widest opacity-90 ${lang === 'hi' ? 'font-devanagari' : ''}`}>
                  {labels.festivalTitle}
                </p>
                <p className={`text-base font-bold text-white drop-shadow-sm ${lang === 'hi' ? 'font-devanagari' : 'font-cinzel'}`}>
                  {fest[lang]}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className={`text-center py-4 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 italic text-white/60 text-sm ${lang === 'hi' ? 'font-devanagari' : ''}`}>
            {labels.noFestival}
          </div>
        )}
      </div>

      {/* Bottom Section: Panchang Grid */}
      <div className="relative z-10 w-full max-w-lg mb-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <PanchangDetailItem label={labels.tithi} value={data.tithi[lang]} isDevanagari={lang === 'hi'} />
          <PanchangDetailItem label={labels.vara} value={data.vara[lang]} isDevanagari={lang === 'hi'} />
          <PanchangDetailItem label={labels.nakshatra} value={data.nakshatra[lang]} isDevanagari={lang === 'hi'} />
          <PanchangDetailItem label={labels.yoga} value={data.yoga[lang]} isDevanagari={lang === 'hi'} />
          <PanchangDetailItem label={labels.maas} value={`${data.maas[lang]}${data.adhikMaas ? '*' : ''}`} isDevanagari={lang === 'hi'} />
          <PanchangDetailItem label={labels.paksha} value={data.paksha[lang]} isDevanagari={lang === 'hi'} />
        </div>

        {/* Quote */}
        <div className="px-6 py-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-center min-h-[90px] flex flex-col items-center justify-center">
          <p className={`text-[10px] uppercase tracking-widest text-orange-400 font-bold mb-2 opacity-80 ${lang === 'hi' ? 'font-devanagari' : ''}`}>
            {labels.wisdom}
          </p>
          <p className="text-sm md:text-base font-devanagari italic leading-relaxed text-orange-50/90 px-2 drop-shadow-sm">
            "{data.spiritualQuote[lang]}"
          </p>
        </div>

        {/* Refresh Action */}
        <button 
          onClick={onRefresh}
          disabled={loading}
          className="w-full py-4 text-white/50 hover:text-orange-400 transition-all flex flex-col items-center justify-center space-y-1"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              <span className={`text-[10px] tracking-[0.2em] uppercase ${lang === 'hi' ? 'font-devanagari' : 'font-cinzel'}`}>
                {labels.refresh}
              </span>
            </>
          )}
        </button>
      </div>

      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/30 rounded-full" />
    </div>
  );
};

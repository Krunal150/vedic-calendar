
import React, { useState, useEffect, useCallback } from 'react';
import { LockScreen } from './components/LockScreen';
import { PanchangData } from './types';
import { fetchDailyPanchang } from './services/panchangService';

const App: React.FC = () => {
  const [panchang, setPanchang] = useState<PanchangData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Attempt to get geolocation for better accuracy
      let locationString = "Varanasi, India";
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            // Geolocation could be used here to refine query, but for now we rely on city
          },
          (err) => console.log("Geolocation error", err)
        );
      }

      const data = await fetchDailyPanchang(today, locationString);
      setPanchang(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch spiritual data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !panchang) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <div className="text-center px-8">
          <p className="text-orange-400 font-cinzel text-xl animate-pulse">Consulting the Stars...</p>
          <p className="text-white/50 text-sm mt-2">Calculating Tithi, Nakshatra, and Yoga based on Suryodaya.</p>
        </div>
      </div>
    );
  }

  if (error && !panchang) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center p-8 space-y-4">
        <p className="text-red-400 text-center">{error}</p>
        <button 
          onClick={loadData}
          className="px-6 py-2 bg-orange-600 rounded-lg text-white font-cinzel"
        >
          Retry
        </button>
      </div>
    );
  }

  return panchang ? (
    <LockScreen 
      data={panchang} 
      onRefresh={loadData} 
      loading={loading}
    />
  ) : null;
};

export default App;


export interface TranslatedText {
  en: string;
  hi: string;
}

export interface PanchangData {
  tithi: TranslatedText;
  vara: TranslatedText;
  nakshatra: TranslatedText;
  yoga: TranslatedText;
  karana: TranslatedText;
  paksha: TranslatedText;
  maas: TranslatedText;
  ritu: TranslatedText;
  adhikMaas: boolean;
  shakaSamvat: string;
  vikramSamvat: string;
  festivals: TranslatedText[];
  spiritualQuote: TranslatedText;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

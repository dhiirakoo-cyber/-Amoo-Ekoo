import { create } from 'zustand';

export type Language = 'en' | 'om';

interface UiState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useUiStore = create<UiState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
}));

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CardData } from '../data/cards';

export interface HistoryItem {
  id: string;
  date: string;
  question: string;
  spreadType: string;
  cards: { card: CardData; isReversed: boolean }[];
  summary: string;
}

interface AppContextData {
  favorites: string[];
  toggleFavorite: (cardId: string) => void;
  isFavorite: (cardId: string) => boolean;
  history: HistoryItem[];
  addHistory: (item: HistoryItem) => void;
  deleteHistory: (id: string) => void;
  dailyCard: { card: CardData, date: string } | null;
  setDailyCard: (card: CardData, date: string) => void;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('oraculo_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('oraculo_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [dailyCard, setDailyCardState] = useState<{ card: CardData, date: string } | null>(() => {
    const saved = localStorage.getItem('oraculo_daily');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('oraculo_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('oraculo_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (dailyCard) {
      localStorage.setItem('oraculo_daily', JSON.stringify(dailyCard));
    }
  }, [dailyCard]);

  const toggleFavorite = (cardId: string) => {
    setFavorites(prev => 
      prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]
    );
  };

  const isFavorite = (cardId: string) => favorites.includes(cardId);

  const addHistory = (item: HistoryItem) => {
    setHistory(prev => [item, ...prev]);
  };

  const deleteHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const setDailyCard = (card: CardData, date: string) => {
    setDailyCardState({ card, date });
  };

  return (
    <AppContext.Provider value={{
      favorites, toggleFavorite, isFavorite,
      history, addHistory, deleteHistory,
      dailyCard, setDailyCard
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

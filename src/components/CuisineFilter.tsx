import React from 'react';
import { useApp } from '../context/AppContext';

const CUISINES = [
  { id: 'All', label: 'All Cuisines', emoji: '🍽️' },
  { id: 'Burgers', label: 'Burgers', emoji: '🍔' },
  { id: 'Japanese', label: 'Ramen & Japanese', emoji: '🍜' },
  { id: 'Boba', label: 'Milk Tea & Boba', emoji: '🧋' },
  { id: 'Chicken', label: 'Crispy Chicken', emoji: '🍗' },
  { id: 'Italian', label: 'Pizza & Pasta', emoji: '🍕' },
  { id: 'Vietnamese', label: 'Pho & Banh Mi', emoji: '🥢' },
  { id: 'Healthy', label: 'Healthy & Bowls', emoji: '🥗' },
];

export const CuisineFilter: React.FC = () => {
  const { selectedCuisine, setSelectedCuisine, theme } = useApp();

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] text-white shadow-xs' : 'bg-[#00B14F] text-white shadow-xs';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
        {CUISINES.map(item => {
          const isSelected = selectedCuisine === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedCuisine(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                isSelected
                  ? `${primaryBg} border-transparent`
                  : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

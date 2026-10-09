import React, { useState } from 'react';
import { Restaurant, MenuItem } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  Clock,
  Bike,
  Plus,
  Tag,
  Check,
  ChevronRight,
} from 'lucide-react';

export const RestaurantDetailModal: React.FC = () => {
  const {
    selectedRestaurant,
    setSelectedRestaurant,
    setSelectedMenuItem,
    theme,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!selectedRestaurant) return null;

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  // Group menu items by category
  const categories = ['All', ...Array.from(new Set(selectedRestaurant.menuItems.map(m => m.category)))];

  const filteredItems = activeCategory === 'All'
    ? selectedRestaurant.menuItems
    : selectedRestaurant.menuItems.filter(m => m.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Sticky Close Button */}
        <button
          onClick={() => setSelectedRestaurant(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-md backdrop-blur-xs transition-colors"
          aria-label="Close restaurant details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Header Banner */}
          <div className="relative h-48 sm:h-64 w-full bg-slate-900 overflow-hidden">
            <img
              src={selectedRestaurant.image}
              alt={selectedRestaurant.name}
              className="w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {selectedRestaurant.promoBadge && (
                  <span className="bg-amber-400 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {selectedRestaurant.promoBadge}
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs font-bold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{selectedRestaurant.rating.toFixed(1)}</span>
                  <span className="text-slate-300">({selectedRestaurant.reviewCount.toLocaleString()})</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{selectedRestaurant.name}</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{selectedRestaurant.cuisine}</p>

              {/* Delivery stats strip */}
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-2 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedRestaurant.deliveryTimeMin}-{selectedRestaurant.deliveryTimeMax} mins</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5" />
                  <span>₱{selectedRestaurant.deliveryFee} delivery</span>
                </span>
                <span>·</span>
                <span>{selectedRestaurant.distanceKm} km away</span>
              </div>
            </div>
          </div>

          {/* Menu Category Tabs */}
          <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? `${primaryBg} text-white shadow-xs`
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="p-5 sm:p-6">
            <h2 className="text-base font-bold text-slate-900 mb-4">
              {activeCategory === 'All' ? 'Full Menu & Specialties' : activeCategory}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMenuItem({ item, restaurant: selectedRestaurant })}
                  className="group cursor-pointer bg-white rounded-2xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-md transition-all flex justify-between gap-4"
                >
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                          {item.name}
                        </h3>
                        {item.isPopular && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between">
                      <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                        ₱{item.price.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMenuItem({ item, restaurant: selectedRestaurant });
                        }}
                        className={`p-1.5 rounded-lg text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors ${primaryBg}`}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {item.image && (
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

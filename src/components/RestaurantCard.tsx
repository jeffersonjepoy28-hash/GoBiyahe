import React from 'react';
import { Restaurant } from '../types';
import { Star, Clock, Bike, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  const { setSelectedRestaurant, theme } = useApp();

  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  return (
    <div
      onClick={() => setSelectedRestaurant(restaurant)}
      className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      {/* Image Container with Fallback */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e: any) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Promo tag */}
        {restaurant.promoBadge && (
          <div className="absolute top-3 left-3 bg-slate-900/90 text-white backdrop-blur-xs text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
            <Tag className="w-3 h-3 text-amber-400" />
            <span>{restaurant.promoBadge}</span>
          </div>
        )}

        {/* Delivery Time Badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span className="tabular-nums">{restaurant.deliveryTimeMin}-{restaurant.deliveryTimeMax} min</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-xs font-bold text-slate-900 bg-amber-50 px-1.5 py-0.5 rounded">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="tabular-nums">{restaurant.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="text-xs text-slate-500 mt-1 line-clamp-1">
            {restaurant.cuisine}
          </div>
        </div>

        {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Bike className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">₱{restaurant.deliveryFee}</span>
            <span className="text-slate-400">delivery</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>{restaurant.distanceKm} km</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-slate-600">{restaurant.priceTier}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

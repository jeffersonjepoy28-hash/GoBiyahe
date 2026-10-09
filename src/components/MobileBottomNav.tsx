import React from 'react';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  Car,
  Bike,
  Clock,
  ShoppingBag,
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    serviceTab,
    setServiceTab,
    cartTotalCount,
    setCartDrawerOpen,
    setOrderHistoryOpen,
    orders,
    activeRide,
    theme,
  } = useApp();

  const activeFoodOrder = orders.find(o => o.status !== 'Delivered');
  const activeColor = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200">
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-2">
        {/* Food */}
        <button
          onClick={() => setServiceTab('food')}
          className={`flex flex-col items-center justify-center min-h-[44px] ${
            serviceTab === 'food' ? activeColor : 'text-slate-500'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">Food</span>
        </button>

        {/* Rides */}
        <button
          onClick={() => setServiceTab('rides')}
          className={`relative flex flex-col items-center justify-center min-h-[44px] ${
            serviceTab === 'rides' ? activeColor : 'text-slate-500'
          }`}
        >
          <Car className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">Rides</span>
          {activeRide && (
            <span className="absolute top-1.5 right-4 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>

        {/* Rider Hub */}
        <button
          onClick={() => setServiceTab('rider_hub')}
          className={`flex flex-col items-center justify-center min-h-[44px] ${
            serviceTab === 'rider_hub' ? activeColor : 'text-slate-500'
          }`}
        >
          <Bike className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">Rider Hub</span>
        </button>

        {/* Activity / Orders */}
        <button
          onClick={() => setOrderHistoryOpen(true)}
          className="relative flex flex-col items-center justify-center min-h-[44px] text-slate-500"
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">Activity</span>
          {activeFoodOrder && (
            <span className="absolute top-1.5 right-4 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </button>

        {/* Cart */}
        <button
          onClick={() => setCartDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center min-h-[44px] text-slate-500"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">Basket</span>
          {cartTotalCount > 0 && (
            <span
              className={`absolute top-1 right-3 min-w-[18px] h-4.5 px-1 rounded-full text-[10px] font-bold text-white flex items-center justify-center ${
                theme === 'panda' ? 'bg-[#D70F64]' : 'bg-[#00B14F]'
              }`}
            >
              {cartTotalCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

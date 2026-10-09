import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Tag, Sparkles, Clock, ShieldCheck, ArrowRight, Bike } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

export const FoodHero: React.FC<{ onApplyRider: () => void }> = ({ onApplyRider }) => {
  const { theme, searchQuery, setSearchQuery, setServiceTab } = useApp();

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6 shadow-xl">
      {/* Background Hero Image with Dark Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Fresh delicious food delivery feast"
          className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl p-6 sm:p-10 lg:p-12 space-y-6">
        {/* Subtle pill-free promo kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-300">
          <span className={primaryText}>GoBiyahe Super-App</span>
          <span aria-hidden="true">·</span>
          <span>Fast 20-30m Delivery</span>
          <span aria-hidden="true">·</span>
          <span>Motorcycle & Car Booking</span>
        </div>

        {/* Headline with text-wrap: balance */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
          Craving great food or need a ride? <br className="hidden sm:inline" />
          <span className={primaryText}>GoBiyahe</span> gets it to you fast.
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl">
          Order from your favorite top-rated local kitchens, or book instant motorcycle and car rides with upfront fair fares.
        </p>

        {/* Live Search Input */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search burgers, ramen, milk tea, chicken, pizza..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white text-slate-900 rounded-2xl text-sm font-medium placeholder-slate-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Highlights Strip */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-amber-400" />
            <span>Use code <strong>BIYAHE25</strong> for 25% off</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Live GPS rider tracker</span>
          </div>
          <button
            onClick={onApplyRider}
            className="flex items-center gap-1.5 text-xs font-bold text-yellow-300 hover:text-yellow-200 transition-colors underline underline-offset-4"
          >
            <Bike className="w-4 h-4" />
            <span>Earn ₱1,800/day · Apply as Rider Partner</span>
          </button>
        </div>
      </div>
    </div>
  );
};

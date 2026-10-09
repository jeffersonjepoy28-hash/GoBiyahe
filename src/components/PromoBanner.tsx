import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Tag, Clock, Bike, Car, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { EVERYDAY_PROMOS } from '../data/mockData';
import { PromoVoucher } from '../types';

export const PromoBanner: React.FC<{ onApplyPromo?: (promo: PromoVoucher) => void }> = ({ onApplyPromo }) => {
  const { theme, setServiceTab } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // 3-day countdown simulation (2d 23h 48m)
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 23, minutes: 48, seconds: 35 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';
  const primaryBg = theme === 'panda' ? 'bg-[#D70F64]' : 'bg-[#00B14F]';

  const handleUsePromo = (promo: PromoVoucher) => {
    setCopiedCode(promo.code);
    if (onApplyPromo) onApplyPromo(promo);
    if (promo.applicableFor === 'rides') {
      setServiceTab('rides');
    } else {
      setServiceTab('food');
    }
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-amber-200/60">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-500 text-white rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Everyday Special Promos & Vouchers</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-500 text-white rounded-full uppercase tracking-wider">
                  Limited Offer
                </span>
              </h2>
              <p className="text-xs text-slate-600">
                Automatic daily discounts on food deliveries and motorcycle & car rides
              </p>
            </div>
          </div>

          {/* 3-Day Countdown Timer */}
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200 shrink-0">
            <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="text-slate-500 font-sans text-[11px]">Expires in:</span>
            <span className="text-rose-600 tabular-nums">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          </div>
        </div>

        {/* 3 Promos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {EVERYDAY_PROMOS.map(promo => {
            const isCopied = copiedCode === promo.code;
            return (
              <div
                key={promo.code}
                className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-extrabold text-slate-900">{promo.title}</span>
                    <span className="font-mono text-[11px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {promo.code}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {promo.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    {promo.applicableFor === 'rides' ? (
                      <>
                        <Bike className="w-3 h-3 text-emerald-600" />
                        <span>Motorcycle & Car</span>
                      </>
                    ) : (
                      <>
                        <Tag className="w-3 h-3 text-pink-600" />
                        <span>Food Delivery</span>
                      </>
                    )}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleUsePromo(promo)}
                    className="text-xs font-bold text-slate-800 hover:text-black flex items-center gap-1 transition-colors group"
                  >
                    <span>{isCopied ? 'Code Copied!' : 'Apply Now'}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

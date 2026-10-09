import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Crown,
  Percent,
  CheckCircle2,
  Sparkles,
  Bike,
  UtensilsCrossed,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const VipSubscriptionModal: React.FC = () => {
  const {
    vipModalOpen,
    setVipModalOpen,
    isVipSubscriber,
    subscribeToVip,
    cancelVip,
    theme,
  } = useApp();

  if (!vipModalOpen) return null;

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header with Luxury Gradient */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 sm:p-8">
          <button
            onClick={() => setVipModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-white/20 rounded-xl backdrop-blur-xs">
              <Crown className="w-5 h-5 text-yellow-200" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
              GoBiyahe VIP Club
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Save 30% on Every Delivery & Ride
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 mt-1 max-w-md">
            Unlock unlimited 30% discounts on all food deliveries and motorcycle & car bookings across Cabanatuan City.
          </p>
        </div>

        {/* Benefits List */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="p-2 bg-pink-100 text-[#D70F64] rounded-xl shrink-0 mt-0.5">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">30% OFF Every Food Delivery Fee</div>
                <div className="text-[11px] text-slate-500">
                  Save ₱15 - ₱25 on every restaurant meal delivery, 7 days a week.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl shrink-0 mt-0.5">
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">30% OFF Every Motorcycle & Car Fare</div>
                <div className="text-[11px] text-slate-500">
                  Instant 30% reduction on GoBiyahe Moto, Sedan Car, and SUV XL trips.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-xl shrink-0 mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Priority Dispatch During Rain</div>
                <div className="text-[11px] text-slate-500">
                  VIP members get prioritized rider matching even during rainy weather rush hours.
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-950">GoBiyahe VIP Pass</div>
              <div className="text-[11px] text-amber-800">Billed monthly · Cancel anytime</div>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-slate-900 tabular-nums">₱149</span>
              <span className="text-xs text-slate-500 font-semibold"> / month</span>
            </div>
          </div>

          {/* Action CTA */}
          {isVipSubscriber ? (
            <div className="space-y-2 pt-2">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You are currently an active VIP Member! 30% savings applied.</span>
              </div>
              <button
                type="button"
                onClick={cancelVip}
                className="w-full py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                Cancel Subscription
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={subscribeToVip}
              className={`w-full py-3.5 px-4 rounded-2xl text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 ${primaryBg}`}
            >
              <Crown className="w-4 h-4" />
              <span>Subscribe Now for ₱149/mo (Save 30% Everyday)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

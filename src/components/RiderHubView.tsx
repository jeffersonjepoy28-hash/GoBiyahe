import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Bike,
  Car,
  Navigation,
  ArrowUpRight,
  ShieldCheck,
  Power,
  RefreshCw,
  MapPin,
} from 'lucide-react';

export const RiderHubView: React.FC = () => {
  const {
    theme,
    riderOnline,
    setRiderOnline,
    riderEarningsList,
    riderTotalEarned,
    riderTodayEarned,
    cashoutRiderFunds,
    simulateRiderAcceptOrder,
  } = useApp();

  const [cashoutModalOpen, setCashoutModalOpen] = useState(false);
  const [cashoutDone, setCashoutDone] = useState(false);

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  const totalTips = riderEarningsList.reduce((acc, it) => acc + it.tip, 0);
  const totalBasePay = riderEarningsList.reduce((acc, it) => acc + it.baseDeliveryPay, 0);

  const handleCashout = () => {
    cashoutRiderFunds();
    setCashoutDone(true);
    setTimeout(() => {
      setCashoutDone(false);
      setCashoutModalOpen(false);
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Status Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md ${
              theme === 'panda' ? 'bg-[#D70F64]' : 'bg-[#00B14F]'
            }`}
          >
            🛵
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">Rider Partner Income Hub</h1>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                Partner #GB-4920
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>Operating Location: Cabanatuan City, Nueva Ecija</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live earnings tracker, mileage breakdown, tips & instant cash-out in Cabanatuan City
            </p>
          </div>
        </div>

        {/* Online / Offline switch & dispatch simulator */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={simulateRiderAcceptOrder}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
            title="Simulate completing another delivery to earn income"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>+ Simulate Delivery</span>
          </button>

          <button
            type="button"
            onClick={() => setRiderOnline(!riderOnline)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              riderOnline
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{riderOnline ? 'Online (Receiving Trips)' : 'Offline'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Total Income */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Today's Total Income</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black tabular-nums tracking-tight">
            ₱{riderTodayEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% of tips kept · Payout ready</span>
          </div>

          <button
            type="button"
            onClick={() => setCashoutModalOpen(true)}
            disabled={riderTodayEarned <= 0}
            className="mt-4 w-full py-2 px-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
          >
            <span>Cash Out Funds</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Trips Completed */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Deliveries / Trips</span>
            <Navigation className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 tabular-nums tracking-tight">
            {riderEarningsList.length}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Avg. ₱{(riderEarningsList.length ? riderTodayEarned / riderEarningsList.length : 0).toFixed(0)} per trip
          </div>
        </div>

        {/* Total Tips Received */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Customer Tips</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 tabular-nums tracking-tight">
            ₱{totalTips.toFixed(2)}
          </div>
          <div className="text-xs text-amber-600 mt-2 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>0% platform fee on tips</span>
          </div>
        </div>

        {/* Base Mileage / Delivery Pay */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Base Delivery Pay</span>
            <Zap className="w-4 h-4 text-[#D70F64]" />
          </div>
          <div className="text-3xl font-black text-slate-900 tabular-nums tracking-tight">
            ₱{totalBasePay.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Guaranteed minimum fare
          </div>
        </div>
      </div>

      {/* Quest Bonus & Incentives Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-100">
            <Zap className="w-4 h-4 text-yellow-200" />
            <span>Active Quest · Peak Hour Bonus</span>
          </div>
          <h2 className="text-lg font-black mt-1">Complete 5 Deliveries Today ➔ Get +₱150 Bonus</h2>
          <p className="text-xs text-amber-100 mt-0.5">
            Progress: {Math.min(5, riderEarningsList.length)} of 5 completed ({Math.round((Math.min(5, riderEarningsList.length) / 5) * 100)}%)
          </p>
        </div>

        <div className="w-full md:w-48 bg-black/20 rounded-full h-3 overflow-hidden p-0.5">
          <div
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (riderEarningsList.length / 5) * 100)}%` }}
          />
        </div>
      </div>

      {/* Earnings Breakdown Table / Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Today's Income Ledger</h2>
            <p className="text-xs text-slate-500">Itemized deliveries, distance rates, and customer tips</p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500">
            {riderEarningsList.length} transactions
          </span>
        </div>

        {riderEarningsList.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No deliveries completed yet today. Go online or tap "+ Simulate Delivery" above to start earning!
          </div>
        ) : (
          <div className="divide-y divide-slate-100 overflow-x-auto">
            {riderEarningsList.map(entry => (
              <div key={entry.id} className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    {entry.type === 'food_delivery' ? (
                      <Bike className="w-5 h-5 text-[#D70F64]" />
                    ) : (
                      <Car className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-snug">
                      {entry.title}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{entry.timestamp}</span>
                      <span>·</span>
                      <span>{entry.distanceKm} km</span>
                      <span>·</span>
                      <span className="font-mono text-slate-400">{entry.orderOrRideId}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-emerald-600 tabular-nums">
                    +₱{entry.totalEarned.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500 tabular-nums">
                    Base: ₱{entry.baseDeliveryPay.toFixed(0)} {entry.tip > 0 && `+ Tip: ₱${entry.tip.toFixed(0)}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cashout Modal */}
      {cashoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 overflow-hidden">
            <h3 className="text-base font-bold text-slate-900 mb-1">Instant Payout Cash-Out</h3>
            <p className="text-xs text-slate-500 mb-4">
              Transfer your earned delivery income to your linked mobile wallet or bank.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4 text-center">
              <div className="text-xs text-slate-500">Available to Withdraw</div>
              <div className="text-2xl font-black text-slate-900 tabular-nums mt-0.5">
                ₱{riderTodayEarned.toFixed(2)}
              </div>
            </div>

            <div className="space-y-2 mb-4 text-xs font-semibold text-slate-700">
              <label className="flex items-center gap-2 p-3 rounded-xl border border-emerald-500 bg-emerald-50/50">
                <input type="radio" name="payout" defaultChecked className="accent-emerald-600" />
                <span>GCash (0917-***-0192) · Instant (₱0 fee)</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50">
                <input type="radio" name="payout" className="accent-emerald-600" />
                <span>Maya Wallet · Instant (₱0 fee)</span>
              </label>
            </div>

            {cashoutDone ? (
              <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>₱{riderTodayEarned.toFixed(2)} transferred to GCash!</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCashoutModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCashout}
                  className={`flex-1 py-2.5 text-white text-xs font-bold rounded-xl shadow-xs ${primaryBg}`}
                >
                  Confirm Payout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

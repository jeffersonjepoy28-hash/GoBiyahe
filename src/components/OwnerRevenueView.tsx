import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  DollarSign,
  TrendingUp,
  Percent,
  Layers,
  ArrowUpRight,
  PieChart,
  ShieldCheck,
  Calculator,
  Sliders,
} from 'lucide-react';
import {
  APP_OWNER_FEE_FOOD,
  APP_OWNER_FEE_DELIVERY,
  RESTAURANT_COMMISSION_RATE,
  RIDE_PLATFORM_COMMISSION_RATE,
} from '../data/mockData';

export const OwnerRevenueView: React.FC = () => {
  const {
    theme,
    ownerTransactions,
    totalOwnerNetProfit,
    totalFoodPlatformFees,
    totalDeliveryCuts,
    totalRestaurantCommissions,
    totalRideCommissions,
  } = useApp();

  // Interactive Profitability Calculator
  const [dailyOrderVolume, setDailyOrderVolume] = useState(250);
  const [averageBasketSize, setAverageBasketSize] = useState(380);

  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';
  const primaryBg = theme === 'panda' ? 'bg-[#D70F64]' : 'bg-[#00B14F]';

  // Calculator unit economics per order:
  // - ₱10 food platform fee
  // - ₱5 delivery dispatch commission
  // - 15% restaurant commission on averageBasketSize
  const projectedPerOrderOwnerProfit =
    APP_OWNER_FEE_FOOD + APP_OWNER_FEE_DELIVERY + averageBasketSize * RESTAURANT_COMMISSION_RATE;
  const projectedDailyProfit = dailyOrderVolume * projectedPerOrderOwnerProfit;
  const projectedMonthlyProfit = projectedDailyProfit * 30;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">App Owner Financial Hub</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
              Profitable Unit Economics
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time platform commission revenue: ₱10 food fee + ₱5 delivery fee + 15% restaurant commission
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-500 font-medium">Accumulated Owner Net Profit</div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            ₱{totalOwnerNetProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>₱10 Food Platform Fees</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black tabular-nums tracking-tight">
            ₱{totalFoodPlatformFees.toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            ₱10 charged on every food booking
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>₱5 Delivery Cuts</span>
            <Layers className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 tabular-nums tracking-tight">
            ₱{totalDeliveryCuts.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            ₱5 dispatch cut from delivery fee
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>15% Restaurant Commission</span>
            <Percent className="w-4 h-4 text-[#D70F64]" />
          </div>
          <div className="text-3xl font-black text-slate-900 tabular-nums tracking-tight">
            ₱{totalRestaurantCommissions.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Marketplace merchant revenue
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>18% Ride Commission</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 tabular-nums tracking-tight">
            ₱{totalRideCommissions.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            PandaBike & PandaCar tech fee
          </div>
        </div>
      </div>

      {/* Business Model Breakdown Card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-slate-700" />
          <span>How Every Booking Makes Riders & App Owner Profitable</span>
        </h2>
        <p className="text-xs text-slate-600 mb-4">
          A sustainable win-win economy where customers get great food and fast transport, riders take home great earnings, and the platform generates automated profit on every transaction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Customer Pays */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-xs font-bold text-slate-900 mb-2">1. Customer Bill</div>
            <ul className="text-xs space-y-1.5 text-slate-600">
              <li>• Food Items Subtotal (e.g. ₱350)</li>
              <li>• Delivery Fee: ₱49</li>
              <li>• App Platform Fee: ₱10</li>
              <li>• Customer Tip: ₱20 (100% to rider)</li>
            </ul>
          </div>

          {/* Rider Receives */}
          <div className="bg-white rounded-xl border border-emerald-200 bg-emerald-50/20 p-4">
            <div className="text-xs font-bold text-emerald-900 mb-2 flex items-center justify-between">
              <span>2. Rider Partner Earnings</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">High Pay</span>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-600">
              <li>• Guaranteed Base Pay: <strong>₱44</strong> (₱49 - ₱5)</li>
              <li>• Customer Tip: <strong>₱20</strong> (100% kept)</li>
              <li>• Peak Quest Incentive: +₱30/trip</li>
              <li className="pt-1 font-bold text-emerald-700">• Rider Net Pay: ₱64 - ₱94 / trip</li>
            </ul>
          </div>

          {/* Owner Receives */}
          <div className="bg-white rounded-xl border border-pink-200 bg-pink-50/20 p-4">
            <div className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
              <span>3. App Owner Net Profit</span>
              <span className="text-[10px] font-bold bg-pink-100 text-[#D70F64] px-1.5 py-0.5 rounded">Owner Revenue</span>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-600">
              <li>• App Platform Fee on food: <strong>₱10</strong></li>
              <li>• Dispatch commission cut: <strong>₱5</strong></li>
              <li>• 15% Merchant commission: <strong>₱52.50</strong></li>
              <li className="pt-1 font-bold text-slate-900">• Total Owner Profit: <strong>₱67.50 / order</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Profitability Simulator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <span>Interactive Platform Profitability Simulator</span>
            </h2>
            <p className="text-xs text-slate-500">
              Adjust order volume to calculate your projected daily and monthly owner profit.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Daily Orders & Rides Volume:</span>
                <span className="font-mono text-indigo-600">{dailyOrderVolume} bookings / day</span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="50"
                value={dailyOrderVolume}
                onChange={e => setDailyOrderVolume(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>50 (Startup)</span>
                <span>500 (City Town)</span>
                <span>2,500 (Metro Scale)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Average Food Basket Size:</span>
                <span className="font-mono text-indigo-600">₱{averageBasketSize} per order</span>
              </div>
              <input
                type="range"
                min="180"
                max="850"
                step="20"
                value={averageBasketSize}
                onChange={e => setAverageBasketSize(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>₱180 (Solo Meal)</span>
                <span>₱380 (Standard)</span>
                <span>₱850 (Family Pack)</span>
              </div>
            </div>
          </div>

          {/* Projections Display */}
          <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col justify-center space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Owner Profit Per Booking:</span>
              <span className="text-emerald-400 font-bold tabular-nums">
                ₱{projectedPerOrderOwnerProfit.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-slate-800 pt-2 flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-400">Projected Daily Net Profit:</div>
                <div className="text-xl font-black text-white tabular-nums">
                  ₱{projectedDailyProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400">Projected Monthly Profit:</div>
                <div className="text-2xl font-black text-emerald-400 tabular-nums">
                  ₱{projectedMonthlyProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Transaction Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Platform Transaction Audit Log</h2>
            <p className="text-xs text-slate-500">Live itemized commission collected per order</p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500">
            {ownerTransactions.length} recorded
          </span>
        </div>

        <div className="divide-y divide-slate-100 overflow-x-auto">
          {ownerTransactions.map(tx => (
            <div key={tx.id} className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div>
                <div className="text-xs font-bold text-slate-900">{tx.description}</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                  <span>{tx.timestamp}</span>
                  <span>·</span>
                  <span className="font-mono text-slate-400">{tx.orderOrRideId}</span>
                  <span>·</span>
                  <span>Gross: ₱{tx.grossAmount.toFixed(0)}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-black text-emerald-600 tabular-nums">
                  +₱{tx.ownerCommission.totalOwnerEarned.toFixed(2)} Owner Profit
                </div>
                <div className="text-[10px] text-slate-500 tabular-nums">
                  Rider Share: ₱{tx.riderShare.toFixed(0)} · Restaurant: ₱{tx.restaurantShare.toFixed(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

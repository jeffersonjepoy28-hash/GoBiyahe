import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Clock,
  UtensilsCrossed,
  Bike,
  Car,
  ChevronRight,
  ShoppingBag,
  Navigation,
} from 'lucide-react';

export const OrderHistoryModal: React.FC = () => {
  const {
    orderHistoryOpen,
    setOrderHistoryOpen,
    orders,
    viewOrderTracker,
    activeRide,
    theme,
  } = useApp();

  if (!orderHistoryOpen) return null;

  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${primaryText}`} />
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Activity & Orders</h2>
              <p className="text-xs text-slate-500">History of food deliveries and rides</p>
            </div>
          </div>
          <button
            onClick={() => setOrderHistoryOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {/* Active ride if present */}
          {activeRide && (
            <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-emerald-600" />
                  <span>Active Ride ({activeRide.vehicle.name})</span>
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {activeRide.status}
                </span>
              </div>
              <div className="text-xs text-slate-700">
                {activeRide.pickupLocation.split(',')[0]} ➔ {activeRide.dropoffLocation.split(',')[0]}
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-900 pt-1">
                <span>Fare: ₱{activeRide.fare.toFixed(2)}</span>
                <span className="text-[11px] text-slate-500">Booked {activeRide.bookedAt}</span>
              </div>
            </div>
          )}

          {orders.length === 0 && !activeRide ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              <ShoppingBag className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              No orders yet. Start exploring restaurants or book a ride!
            </div>
          ) : (
            orders.map(order => (
              <div
                key={order.id}
                onClick={() => {
                  setOrderHistoryOpen(false);
                  viewOrderTracker(order.id);
                }}
                className="group cursor-pointer p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <UtensilsCrossed className="w-5 h-5 text-[#D70F64]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                      {order.restaurantName}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {order.items.length} items · {order.createdAt} · {order.status}
                    </div>
                    <div className="text-[11px] font-bold text-slate-900 mt-1 tabular-nums">
                      ₱{order.total.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    order.status === 'Delivered'
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {order.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

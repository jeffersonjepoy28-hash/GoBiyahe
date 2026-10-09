import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  Clock,
  Bike,
  MapPin,
  Phone,
  MessageSquare,
  CloudRain,
  ShieldAlert,
  Send,
  AlertTriangle,
  Receipt,
  ChevronDown,
} from 'lucide-react';

const STATUS_STEPS = [
  { key: 'Order Placed', label: 'Order Placed', desc: 'Sent to restaurant kitchen' },
  { key: 'Preparing', label: 'Preparing', desc: 'Chef is cooking fresh meal' },
  { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'Rider is on the way' },
  { key: 'Delivered', label: 'Delivered', desc: 'Safely arrived at your door' },
] as const;

export const LiveOrderTrackerModal: React.FC = () => {
  const {
    activeOrder,
    orderTrackerOpen,
    setOrderTrackerOpen,
    sendRiderMessage,
    isRaining,
    toggleRainWeather,
    theme,
  } = useApp();

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [receiptOpen, setReceiptOpen] = useState(false);

  if (!orderTrackerOpen || !activeOrder) return null;

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64]' : 'bg-[#00B14F]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.key === activeOrder.status);

  // If raining, calculate extra delay time
  const rainDelayMinutes = isRaining ? 12 : 0;
  const displayMinutesLeft = Math.max(0, activeOrder.estimatedMinutesLeft + (activeOrder.status !== 'Delivered' ? rainDelayMinutes : 0));

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendRiderMessage(activeOrder.id, chatInput);
    setChatInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Live Delivery Tracker</h2>
              <span className="font-mono text-xs font-bold text-slate-500">
                {activeOrder.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              From <strong>{activeOrder.restaurantName}</strong> ➔ {activeOrder.deliveryAddress.split(',')[0]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Weather Toggle */}
            <button
              type="button"
              onClick={toggleRainWeather}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                isRaining
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}
              title="Click to toggle rain weather condition"
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>{isRaining ? '🌧️ Heavy Rain Active' : '☀️ Clear Weather'}</span>
            </button>

            <button
              onClick={() => setOrderTrackerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Tracker Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* RAIN DELAY WEATHER ADVISORY */}
          {isRaining && activeOrder.status !== 'Delivered' && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-xl shrink-0 mt-0.5">
                  <CloudRain className="w-5 h-5 animate-bounce" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-blue-800">
                      Weather Delay Advisory · Heavy Rain
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-200 text-blue-900 rounded">
                      +10-15m Delay
                    </span>
                  </div>
                  <p className="text-xs font-medium text-blue-800 leading-relaxed">
                    Heavy rainfall in your area is slowing down road traffic. Your rider <strong>{activeOrder.rider.name}</strong> is driving cautiously with thermal rain gear to keep your food hot, dry, and safe.
                  </p>
                  <p className="text-[11px] text-blue-700 italic">
                    "Salamat sa pasensya boss! Safe driving po dahil maulan sa kalsada 🌧️🛵"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Live Route Map with Scooter Animation */}
          <div className="relative h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 flex flex-col justify-between">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
            </div>

            {/* Rain droplets overlay animation */}
            {isRaining && (
              <div className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-b from-blue-900/20 to-blue-950/40">
                <div className="w-full h-full flex justify-around text-blue-200 text-xs font-mono select-none">
                  <span className="animate-pulse">/ / / /</span>
                  <span className="animate-pulse">/ / / /</span>
                  <span className="animate-pulse">/ / / /</span>
                  <span className="animate-pulse">/ / / /</span>
                </div>
              </div>
            )}

            {/* Simulated Animated Road Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 50 180 Q 150 120, 250 140 T 450 100 T 600 70"
                fill="none"
                stroke="#D70F64"
                strokeWidth="4"
                strokeDasharray="6 6"
                className="animate-pulse"
              />
            </svg>

            {/* Top Info Strip */}
            <div className="relative z-10 flex items-center justify-between text-xs text-white">
              <div className="bg-slate-950/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{activeOrder.restaurantName}</span>
              </div>

              <div className="bg-slate-950/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Destination (Your Address)</span>
              </div>
            </div>

            {/* Moving Scooter in Center */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="p-3 bg-white text-slate-900 rounded-full shadow-2xl border-2 border-pink-500 animate-bounce flex items-center gap-2 px-3.5">
                <Bike className="w-5 h-5 text-[#D70F64]" />
                <span className="text-xs font-black">
                  {activeOrder.status === 'Delivered' ? 'Arrived!' : 'Carlos · Scooter In Transit'}
                </span>
              </div>
            </div>

            {/* Bottom Map Status */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-300">
              <span className="bg-slate-950/80 px-2 py-1 rounded">
                Plate: {activeOrder.rider.plateNumber}
              </span>
              <span className="bg-slate-950/80 px-2 py-1 rounded font-bold text-emerald-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{activeOrder.status === 'Delivered' ? 'Order Completed' : `ETA: ~${displayMinutesLeft} mins`}</span>
              </span>
            </div>
          </div>

          {/* 4 Explicit Steps Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Order Tracking Status
              </span>
              <span className="text-xs font-black text-slate-900 tabular-nums">
                {activeOrder.status} ({activeOrder.progressPercent}%)
              </span>
            </div>

            {/* Horizontal Step Indicator */}
            <div className="grid grid-cols-4 gap-2">
              {STATUS_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={step.key} className="space-y-1.5 text-center">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isPassed
                          ? 'bg-[#D70F64]'
                          : 'bg-slate-200'
                      }`}
                    />
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">
                      {step.label}
                    </div>
                    <div className="text-[10px] text-slate-400 hidden sm:block">
                      {step.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rider Profile Card & Contact Affordance */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl shrink-0">
                🛵
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>{activeOrder.rider.name}</span>
                  <span className="text-xs text-amber-600 font-semibold">
                    ★ {activeOrder.rider.rating}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {activeOrder.rider.vehicle} · <strong>{activeOrder.rider.plateNumber}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Calling rider Carlos Mendoza at ${activeOrder.rider.phone}...`)}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Rider</span>
              </button>

              <button
                type="button"
                onClick={() => setChatOpen(!chatOpen)}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>{chatOpen ? 'Hide Chat' : 'Chat with Rider'}</span>
              </button>
            </div>
          </div>

          {/* Rider Chat Box */}
          {chatOpen && (
            <div className="p-4 bg-slate-100/80 rounded-2xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Direct Chat with Rider
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto p-1">
                {activeOrder.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-slate-900 text-white rounded-br-none'
                          : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-2xs'
                      }`}
                    >
                      <div className="text-[10px] opacity-70 mb-0.5">
                        {msg.sender === 'user' ? 'You' : activeOrder.rider.name} · {msg.timestamp}
                      </div>
                      <div>{msg.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Type a message (e.g. Please leave at front door)..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-slate-800"
                >
                  <Send className="w-3 h-3" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* Receipt Accordion */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setReceiptOpen(!receiptOpen)}
              className="w-full p-3.5 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-slate-500" />
                <span>Order Receipt & Fee Breakdown</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-900">₱{activeOrder.total.toFixed(2)}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${receiptOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {receiptOpen && (
              <div className="p-4 space-y-2 text-xs text-slate-600 bg-white">
                <div className="space-y-1 border-b border-slate-100 pb-2">
                  {activeOrder.items.map(it => (
                    <div key={it.id} className="flex justify-between">
                      <span>{it.quantity}x {it.menuItem.name}</span>
                      <span className="tabular-nums">₱{it.itemTotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <span>Food Subtotal:</span>
                  <span className="tabular-nums">₱{activeOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span className="tabular-nums">₱{activeOrder.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>App Platform Fee:</span>
                  <span className="tabular-nums">₱10.00</span>
                </div>
                {activeOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount:</span>
                    <span className="tabular-nums">-₱{activeOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                {activeOrder.tip > 0 && (
                  <div className="flex justify-between">
                    <span>Rider Tip:</span>
                    <span className="tabular-nums">₱{activeOrder.tip.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-1.5 flex justify-between font-bold text-slate-900">
                  <span>Total Paid ({activeOrder.paymentMethod}):</span>
                  <span className="tabular-nums">₱{activeOrder.total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Close */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Status updates automatically in real-time
          </span>
          <button
            type="button"
            onClick={() => setOrderTrackerOpen(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};

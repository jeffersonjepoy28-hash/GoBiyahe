import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Smartphone,
  Building2,
  Crown,
  Tag,
} from 'lucide-react';
import { APP_OWNER_FEE_FOOD } from '../data/mockData';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    checkoutModalOpen,
    setCheckoutModalOpen,
    deliveryAddress,
    setDeliveryAddress,
    placeOrder,
    user,
    openAuthModal,
    theme,
    isVipSubscriber,
    setLocationModalOpen,
    handleLinkAccount,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'cash' | 'gcash' | 'bank' | 'card'>('wallet');
  const [contactless, setContactless] = useState(true);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Quick linking state inside checkout if no account linked
  const [quickLinkNumber, setQuickLinkNumber] = useState('');
  const [showQuickLink, setShowQuickLink] = useState(false);

  if (!checkoutModalOpen || cart.length === 0) return null;

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  // Fee calculation:
  // Standard delivery fee: ₱49
  const rawDeliveryFee = 49;
  // Everyday Free Delivery promo saves ₱49
  const promoDiscount = 49;
  const deliveryFee = 0; // Everyday free delivery applied!
  const foodPlatformFee = APP_OWNER_FEE_FOOD; // ₱10 platform fee
  const riderTip = 20;

  // VIP extra discount (if delivery fee wasn't already waived by promo, or VIP extra credit)
  const vipDiscount = isVipSubscriber ? 15 : 0;
  const grandTotal = Math.max(0, cartSubtotal + deliveryFee + foodPlatformFee + riderTip - vipDiscount);

  // Get user's linked accounts
  const linkedGcash = user?.linkedAccounts?.find(a => a.type === 'gcash');
  const linkedBank = user?.linkedAccounts?.find(a => a.type === 'bank');

  const handleConfirmOrder = () => {
    setSubmitting(true);
    let selectedPayLabel = 'GoBiyahe Wallet';
    if (paymentMethod === 'cash') selectedPayLabel = 'Cash on Delivery (COD)';
    else if (paymentMethod === 'gcash') {
      selectedPayLabel = linkedGcash ? `GCash (${linkedGcash.accountNumberMasked})` : 'GCash Direct';
    } else if (paymentMethod === 'bank') {
      selectedPayLabel = linkedBank ? `${linkedBank.providerName} (${linkedBank.accountNumberMasked})` : 'Bank Transfer';
    } else if (paymentMethod === 'card') {
      selectedPayLabel = 'Credit / Debit Card';
    }

    setTimeout(() => {
      placeOrder({
        deliveryAddress,
        paymentMethod: selectedPayLabel,
        tip: riderTip,
        discount: promoDiscount + vipDiscount,
        promoCode: 'FREEDELIVERY',
      });
      setSubmitting(false);
    }, 600);
  };

  const handleQuickLinkGCash = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickLinkNumber.trim() || !user) return;
    handleLinkAccount('gcash', 'GCash', quickLinkNumber.trim(), user.name);
    setShowQuickLink(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Checkout & Order Confirmation</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              From <strong>{cart[0].restaurantName}</strong> · Cabanatuan Hub
            </p>
          </div>
          <button
            onClick={() => setCheckoutModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* VIP Banner if subscriber */}
          {isVipSubscriber && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-600" />
                <div>
                  <span className="font-bold text-amber-950">VIP Member Perks Active:</span>
                  <span className="text-amber-800 ml-1">30% discount applied to your order!</span>
                </div>
              </div>
              <span className="font-extrabold text-amber-900">-₱15.00</span>
            </div>
          )}

          {/* Delivery Address */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Delivery Destination
              </span>
              <button
                type="button"
                onClick={() => setLocationModalOpen(true)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                Change Barangay / Hub
              </button>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
              <MapPin className={`w-5 h-5 mt-0.5 shrink-0 ${primaryText}`} />
              <div className="flex-1">
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  className="w-full text-xs font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-300 pb-1 focus:outline-none focus:border-slate-800"
                  placeholder="Enter exact address, unit or landmark in Cabanatuan"
                />
                <div className="text-[11px] text-slate-500 mt-1">
                  Cabanatuan City, Nueva Ecija
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Instructions */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={contactless}
                onChange={e => setContactless(e.target.checked)}
                className="accent-slate-900"
              />
              <span>Contactless delivery (leave at door / lobby concierge)</span>
            </label>

            <input
              type="text"
              placeholder="Driver notes (e.g. Near Brgy Hall, ring bell)"
              value={deliveryNote}
              onChange={e => setDeliveryNote(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Payment Method
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* 1. Wallet */}
              <label
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                  paymentMethod === 'wallet'
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <Wallet className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">GoBiyahe Wallet</div>
                    <div className="text-[11px] text-slate-500">
                      Balance: ₱{user ? user.walletBalance.toFixed(2) : '50.00'}
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="pay"
                  checked={paymentMethod === 'wallet'}
                  onChange={() => setPaymentMethod('wallet')}
                  className="accent-slate-900 mt-0.5"
                />
              </label>

              {/* 2. Cash */}
              <label
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                  paymentMethod === 'cash'
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <Banknote className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Cash on Delivery</div>
                    <div className="text-[11px] text-slate-500">Pay rider directly in cash</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="pay"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="accent-slate-900 mt-0.5"
                />
              </label>

              {/* 3. Linked GCash */}
              <label
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                  paymentMethod === 'gcash'
                    ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    G
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <span>GCash</span>
                      {linkedGcash && (
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-1 rounded font-bold">
                          Linked
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {linkedGcash ? linkedGcash.accountNumberMasked : 'Click to link GCash'}
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="pay"
                  checked={paymentMethod === 'gcash'}
                  onChange={() => {
                    setPaymentMethod('gcash');
                    if (!linkedGcash) setShowQuickLink(true);
                  }}
                  className="accent-blue-600 mt-0.5"
                />
              </label>

              {/* 4. Linked Bank Account */}
              <label
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                  paymentMethod === 'bank'
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <span>{linkedBank ? linkedBank.providerName : 'Bank Account'}</span>
                      {linkedBank && (
                        <span className="text-[10px] bg-slate-200 text-slate-800 px-1 rounded font-bold">
                          Linked
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {linkedBank ? linkedBank.accountNumberMasked : 'BDO, BPI, Landbank'}
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="pay"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="accent-slate-900 mt-0.5"
                />
              </label>
            </div>

            {/* Quick GCash linking if selected and not linked */}
            {paymentMethod === 'gcash' && !linkedGcash && showQuickLink && (
              <form onSubmit={handleQuickLinkGCash} className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2">
                <input
                  type="text"
                  required
                  placeholder="Enter GCash Mobile (e.g. 0917-882-1094)"
                  value={quickLinkNumber}
                  onChange={e => setQuickLinkNumber(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-blue-300 rounded-lg focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shrink-0"
                >
                  Link & Save
                </button>
              </form>
            )}
          </div>

          {/* Pricing Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Food Items ({cart.length} items):</span>
              <span className="font-semibold text-slate-900 tabular-nums">₱{cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Delivery Fee:</span>
              <span className="line-through text-slate-400 tabular-nums">₱{rawDeliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-bold">
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Everyday Free Delivery Promo (3-Day Voucher):</span>
              </span>
              <span>-₱{promoDiscount.toFixed(2)} (₱0 Delivery!)</span>
            </div>
            {isVipSubscriber && (
              <div className="flex justify-between text-amber-700 font-bold">
                <span className="flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  <span>VIP Member 30% Savings:</span>
                </span>
                <span>-₱{vipDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>App Platform Fee:</span>
              <span className="font-semibold text-slate-900 tabular-nums">₱{foodPlatformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Rider Tip (100% to rider):</span>
              <span className="font-semibold text-slate-900 tabular-nums">₱{riderTip.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
              <span>Total Payable:</span>
              <span className="tabular-nums">₱{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Confirmation CTA */}
        <div className="p-5 border-t border-slate-100 bg-white">
          <button
            type="button"
            disabled={submitting}
            onClick={handleConfirmOrder}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-colors flex items-center justify-between ${primaryBg} disabled:opacity-50`}
          >
            <span>{submitting ? 'Placing Order...' : 'Confirm & Place Order'}</span>
            <span className="tabular-nums flex items-center gap-1">
              <span>₱{grandTotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

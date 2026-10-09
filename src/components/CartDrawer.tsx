import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Check,
  Utensils,
  Bike,
} from 'lucide-react';
import { APP_OWNER_FEE_FOOD } from '../data/mockData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartTotalCount,
    setCheckoutModalOpen,
    theme,
    isVipSubscriber,
  } = useApp();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; freeDelivery: boolean } | null>({
    code: 'FREEDELIVERY',
    discount: 0,
    freeDelivery: true, // Default everyday promo free delivery!
  });
  const [selectedTip, setSelectedTip] = useState<number>(20); // ₱20 default tip for hard-working rider
  const [needCutlery, setNeedCutlery] = useState(true);

  if (!cartDrawerOpen) return null;

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  // Base delivery fee
  const rawDeliveryFee = 49;
  const deliveryFee = appliedPromo?.freeDelivery ? 0 : rawDeliveryFee;
  const foodPlatformFee = APP_OWNER_FEE_FOOD; // ₱10 platform service fee
  const vipDiscount = isVipSubscriber ? 15 : 0;
  const discountAmount = (appliedPromo?.discount || 0) + vipDiscount;
  const finalTotal = Math.max(0, cartSubtotal + deliveryFee + foodPlatformFee + selectedTip - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCodeInput.trim().toUpperCase();
    if (clean === 'FREEDELIVERY' || clean === 'FREEDEL') {
      setAppliedPromo({ code: clean, discount: 0, freeDelivery: true });
    } else if (clean === 'BIYAHE25' || clean === 'PANDA25') {
      const disc = Math.round(cartSubtotal * 0.25);
      setAppliedPromo({ code: clean, discount: disc, freeDelivery: false });
    } else {
      alert('Invalid promo code. Try "FREEDELIVERY" or "BIYAHE25"!');
    }
    setPromoCodeInput('');
  };

  const handleProceedToCheckout = () => {
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className={`w-5 h-5 ${primaryText}`} />
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Food Basket</h2>
              {cart.length > 0 && (
                <p className="text-xs text-slate-500">{cart[0].restaurantName}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => setCartDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Your basket is empty</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Discover delicious meals from top restaurants and add them to your cart!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-2xl flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        {item.menuItem.name}
                      </div>
                      {item.selectedOptions.length > 0 && (
                        <div className="text-[11px] text-slate-500 mt-0.5 space-y-0.5">
                          {item.selectedOptions.map((opt, idx) => (
                            <div key={idx}>
                              • {opt.choiceName}
                            </div>
                          ))}
                        </div>
                      )}
                      {item.specialInstructions && (
                        <div className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                          Note: "{item.specialInstructions}"
                        </div>
                      )}
                    </div>

                    <span className="text-xs font-extrabold text-slate-900 tabular-nums shrink-0">
                      ₱{item.itemTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>

                    <div className="flex items-center gap-2 bg-white border border-slate-200 p-0.5 rounded-lg">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-900 w-4 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cutlery Toggle */}
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white text-xs cursor-pointer">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Utensils className="w-4 h-4 text-slate-400" />
                  <span>Include eco utensils & napkins</span>
                </div>
                <input
                  type="checkbox"
                  checked={needCutlery}
                  onChange={e => setNeedCutlery(e.target.checked)}
                  className="accent-slate-900"
                />
              </label>

              {/* Promo Code Input */}
              <div className="pt-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code (e.g. FREEDELIVERY)"
                    value={promoCodeInput}
                    onChange={e => setPromoCodeInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {appliedPromo && (
                  <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedPromo.code}: {appliedPromo.freeDelivery ? 'Free Delivery Applied!' : `-₱${appliedPromo.discount}`}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAppliedPromo(null)}
                      className="text-xs text-emerald-600 hover:text-emerald-900 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Rider Tip Selector */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Bike className="w-3.5 h-3.5 text-slate-400" />
                    <span>Tip Your Delivery Rider</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">100% goes to rider</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[0, 20, 30, 50].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedTip(amt)}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        selectedTip === amt
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {amt === 0 ? 'No tip' : `₱${amt}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Order Summary & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Food Subtotal:</span>
                <span className="font-semibold text-slate-900 tabular-nums">₱{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Delivery Fee:</span>
                <span className={`tabular-nums ${appliedPromo?.freeDelivery ? 'text-emerald-600 font-bold line-through' : 'font-semibold text-slate-900'}`}>
                  ₱{rawDeliveryFee.toFixed(2)}
                </span>
              </div>
              {appliedPromo?.freeDelivery && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Everyday Free Delivery Promo:</span>
                  <span>-₱{rawDeliveryFee.toFixed(2)}</span>
                </div>
              )}
              {isVipSubscriber && (
                <div className="flex justify-between text-amber-700 font-bold">
                  <span>VIP Member 30% Delivery Savings:</span>
                  <span>-₱15.00</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>App Platform Fee:</span>
                <span className="font-semibold text-slate-900 tabular-nums">₱{foodPlatformFee.toFixed(2)}</span>
              </div>
              {selectedTip > 0 && (
                <div className="flex justify-between">
                  <span>Rider Tip:</span>
                  <span className="font-semibold text-slate-900 tabular-nums">₱{selectedTip.toFixed(2)}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Discount:</span>
                  <span>-₱{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
                <span>Total Amount:</span>
                <span className="tabular-nums">₱{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-colors flex items-center justify-between ${primaryBg}`}
            >
              <span>Proceed to Checkout</span>
              <span className="tabular-nums flex items-center gap-1">
                <span>₱{finalTotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

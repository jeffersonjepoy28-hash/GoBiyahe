import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Minus, Check } from 'lucide-react';
import { CartItem, CartItemOptionSelected } from '../types';

export const MenuItemCustomizerModal: React.FC = () => {
  const {
    selectedMenuItem,
    setSelectedMenuItem,
    addToCart,
    theme,
  } = useApp();

  if (!selectedMenuItem) return null;

  const { item, restaurant } = selectedMenuItem;
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Selected options state: Record<optionId, choiceId[]>
  const [selectedRadio, setSelectedRadio] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    item.options?.forEach(opt => {
      if (opt.type === 'radio' && opt.choices.length > 0) {
        initial[opt.id] = opt.choices[0].id; // Default first choice
      }
    });
    return initial;
  });

  const [selectedChecks, setSelectedChecks] = useState<Record<string, string[]>>({});

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  // Calculate unit price with options
  let unitExtra = 0;
  const formattedSelections: CartItemOptionSelected[] = [];

  item.options?.forEach(opt => {
    if (opt.type === 'radio') {
      const choiceId = selectedRadio[opt.id];
      const found = opt.choices.find(c => c.id === choiceId);
      if (found) {
        unitExtra += found.extraPrice;
        formattedSelections.push({
          optionName: opt.name,
          choiceName: found.name,
          extraPrice: found.extraPrice,
        });
      }
    } else if (opt.type === 'checkbox') {
      const chosenIds = selectedChecks[opt.id] || [];
      chosenIds.forEach(cId => {
        const found = opt.choices.find(c => c.id === cId);
        if (found) {
          unitExtra += found.extraPrice;
          formattedSelections.push({
            optionName: opt.name,
            choiceName: found.name,
            extraPrice: found.extraPrice,
          });
        }
      });
    }
  });

  const singleItemTotal = item.price + unitExtra;
  const totalCalculated = singleItemTotal * quantity;

  const handleToggleCheck = (optionId: string, choiceId: string) => {
    setSelectedChecks(prev => {
      const current = prev[optionId] || [];
      if (current.includes(choiceId)) {
        return { ...prev, [optionId]: current.filter(id => id !== choiceId) };
      } else {
        return { ...prev, [optionId]: [...current, choiceId] };
      }
    });
  };

  const handleConfirmAddToCart = () => {
    const cartEntry: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      menuItem: item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      quantity,
      selectedOptions: formattedSelections,
      specialInstructions: specialInstructions.trim() || undefined,
      itemTotal: totalCalculated,
    };
    addToCart(cartEntry);
    setSelectedMenuItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">{item.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{restaurant.name}</p>
          </div>
          <button
            onClick={() => setSelectedMenuItem(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {item.image && (
            <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div>
            <div className="text-sm font-extrabold text-slate-900 tabular-nums">
              Base Price: ₱{item.price.toFixed(2)}
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Options Customizer */}
          {item.options?.map(opt => (
            <div key={opt.id} className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  {opt.name}
                </span>
                {opt.required && (
                  <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                    Required
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                {opt.choices.map(choice => {
                  const isRadio = opt.type === 'radio';
                  const isChecked = isRadio
                    ? selectedRadio[opt.id] === choice.id
                    : (selectedChecks[opt.id] || []).includes(choice.id);

                  return (
                    <label
                      key={choice.id}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type={isRadio ? 'radio' : 'checkbox'}
                          name={opt.id}
                          checked={isChecked}
                          onChange={() => {
                            if (isRadio) {
                              setSelectedRadio(prev => ({ ...prev, [opt.id]: choice.id }));
                            } else {
                              handleToggleCheck(opt.id, choice.id);
                            }
                          }}
                          className="accent-slate-900"
                        />
                        <span className="font-medium text-slate-800">{choice.name}</span>
                      </div>
                      {choice.extraPrice > 0 && (
                        <span className="text-slate-500 font-semibold tabular-nums">
                          +₱{choice.extraPrice.toFixed(2)}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Special Instructions Input */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5">
              Special Instructions
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Extra napkins, less ice, allergy notes..."
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Footer: Quantity Stepper & Add to Cart */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-xs font-bold text-slate-900 tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleConfirmAddToCart}
            className={`flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-between ${primaryBg}`}
          >
            <span>Add to Cart</span>
            <span className="tabular-nums">₱{totalCalculated.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

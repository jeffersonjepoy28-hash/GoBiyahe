import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Store,
  ShoppingBag,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Tag,
} from 'lucide-react';
import { BURGER_IMAGE, RAMEN_IMAGE } from '../data/mockData';
import { MenuItem } from '../types';

export const MerchantApplyModal: React.FC = () => {
  const {
    merchantModalOpen,
    setMerchantModalOpen,
    addMerchantStore,
    setSelectedRestaurant,
    theme,
  } = useApp();

  const [step, setStep] = useState<'details' | 'items' | 'success'>('details');
  const [storeType, setStoreType] = useState<'restaurant' | 'grocery'>('restaurant');
  const [storeName, setStoreName] = useState('');
  const [cuisine, setCuisine] = useState('Filipino · Home Cooked Specials');
  const [address, setAddress] = useState('Legazpi Village, Makati City');
  const [prepTime, setPrepTime] = useState(25);
  const [deliveryFee, setDeliveryFee] = useState(45);

  // New items to post
  const [items, setItems] = useState<Array<{ name: string; description: string; price: number; category: string }>>([
    {
      name: 'Special House Best-Seller',
      description: 'Signature specialty prepared fresh daily with secret family recipe.',
      price: 240,
      category: 'Mains',
    },
    {
      name: 'Refreshing Fruit Cooler',
      description: 'Iced local fruit cooler with fresh honey and mint.',
      price: 95,
      category: 'Drinks',
    },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number>(180);
  const [newItemCat, setNewItemCat] = useState('Mains');

  if (!merchantModalOpen) return null;

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setItems(prev => [
      ...prev,
      {
        name: newItemName.trim(),
        description: newItemDesc.trim() || 'Delicious store specialty.',
        price: Number(newItemPrice) || 150,
        category: newItemCat,
      },
    ]);
    setNewItemName('');
    setNewItemDesc('');
  };

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handlePublishStore = () => {
    if (!storeName.trim()) {
      alert('Please enter your store name.');
      return;
    }

    const created = addMerchantStore({
      name: storeName.trim(),
      cuisine: `${storeType === 'restaurant' ? 'Restaurant' : 'Grocery & Mart'} · ${cuisine}`,
      rating: 5.0,
      reviewCount: 1,
      deliveryTimeMin: Math.max(15, prepTime - 5),
      deliveryTimeMax: prepTime + 10,
      deliveryFee,
      priceTier: '$$',
      distanceKm: 1.6,
      promoBadge: 'Newly Opened Partner',
      featured: true,
      image: storeType === 'restaurant' ? BURGER_IMAGE : RAMEN_IMAGE,
      menuItems: items.map((it, idx) => ({
        id: `item-${Date.now()}-${idx}`,
        name: it.name,
        description: it.description,
        price: it.price,
        category: it.category,
        isPopular: idx === 0,
      })),
    });

    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Partner with GoBiyahe · Merchant Portal
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                Instant Listing
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Restaurants & Groceries can post their shop and items live to customers in minutes
            </p>
          </div>
          <button
            onClick={() => setMerchantModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        {step === 'details' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            {/* Store Type Switcher */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Business Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStoreType('restaurant')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    storeType === 'restaurant'
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="p-2 bg-pink-100 text-[#D70F64] rounded-xl">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Restaurant / Kitchen</div>
                    <div className="text-[11px] text-slate-500">Cooked meals, fast food & desserts</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setStoreType('grocery')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    storeType === 'grocery'
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Grocery / Supermarket</div>
                    <div className="text-[11px] text-slate-500">Fresh produce, snacks, pantry items</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Store / Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aling Nena's Kitchen or Metro Fresh Mart"
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cuisine / Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Filipino Homestyle / Fresh Supermarket"
                  value={cuisine}
                  onChange={e => setCuisine(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Store Physical Location</label>
                <input
                  type="text"
                  required
                  placeholder="Street, Barangay, City"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Prep Time (mins)</label>
                <input
                  type="number"
                  min={10}
                  max={60}
                  value={prepTime}
                  onChange={e => setPrepTime(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs text-slate-600">
              <span>Platform Merchant Commission:</span>
              <span className="font-bold text-slate-900">15% on orders (keep 85% revenue)</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (!storeName.trim()) {
                  alert('Please enter your store name.');
                  return;
                }
                setStep('items');
              }}
              className={`w-full py-3 px-4 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 ${primaryBg}`}
            >
              <span>Next: Add Menu / Shop Items</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Post Items */}
        {step === 'items' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Post Items for {storeName}</h3>
                <p className="text-xs text-slate-500">Add dishes or grocery products to your live shop</p>
              </div>
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Back
              </button>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddItem} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                + Add New Item
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Item Name (e.g. Pork Sisig with Egg)"
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Price (₱)"
                    value={newItemPrice}
                    onChange={e => setNewItemPrice(Number(e.target.value))}
                    className="w-24 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none font-mono"
                  />
                  <select
                    value={newItemCat}
                    onChange={e => setNewItemCat(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none"
                  >
                    <option value="Mains">Mains</option>
                    <option value="Sides">Sides</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Produce">Fresh Produce</option>
                    <option value="Pantry">Pantry & Snacks</option>
                  </select>
                </div>
              </div>
              <input
                type="text"
                placeholder="Brief description / ingredients"
                value={newItemDesc}
                onChange={e => setNewItemDesc(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item to List</span>
              </button>
            </form>

            {/* Current Items List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Items to Publish ({items.length})
              </div>
              {items.map((it, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{it.name}</div>
                    <div className="text-[11px] text-slate-500">{it.description} · <span className="font-semibold text-slate-700">{it.category}</span></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-900">₱{it.price}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handlePublishStore}
              className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 ${primaryBg}`}
            >
              <span>Publish Store & Go Live!</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {storeName} is Now Live on GoBiyahe!
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Your shop and items have been published to the restaurant & grocery listings. Customers can now browse your menu, customize orders, and request fast delivery!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-sm mx-auto text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Store Name:</span>
                <span className="font-bold text-slate-900">{storeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Published Items:</span>
                <span className="font-bold text-slate-900">{items.length} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Commission Rate:</span>
                <span className="font-bold text-emerald-600">15% platform fee</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMerchantModalOpen(false);
                setStep('details');
              }}
              className={`w-full max-w-sm mx-auto py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-colors ${primaryBg}`}
            >
              Browse in App
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

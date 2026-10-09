import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  MapPin,
  Car,
  UtensilsCrossed,
  Bike,
  Crown,
  Store,
  ShieldCheck,
  CloudRain,
  BarChart3,
  Clock,
  Menu,
  X,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { SafetyToolkitModal } from './SafetyToolkitModal';

export const Navbar: React.FC = () => {
  const {
    theme,
    setTheme,
    serviceTab,
    setServiceTab,
    user,
    openAuthModal,
    setUserProfileOpen,
    deliveryAddress,
    currentOperatingCity,
    setLocationModalOpen,
    cartTotalCount,
    setCartDrawerOpen,
    setOrderHistoryOpen,
    orders,
    activeRide,
    isRaining,
    toggleRainWeather,
    isVipSubscriber,
    setVipModalOpen,
    setMerchantModalOpen,
  } = useApp();

  const [safetyOpen, setSafetyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeFoodOrder = orders.find(o => o.status !== 'Delivered');
  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 md:gap-6 h-16">
            {/* Zone 1: Brand Wordmark */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setServiceTab('food')}
                className="group flex items-center gap-2 text-left focus:outline-none"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm transition-transform group-hover:scale-105 ${
                    theme === 'panda' ? 'bg-[#D70F64]' : 'bg-[#00B14F]'
                  }`}
                >
                  G
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-slate-900 whitespace-nowrap block leading-none">
                    Go<span className={primaryText}>Biyahe</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">
                    Food · Rides · Mart
                  </span>
                </div>
              </button>

              {/* Delivery address & operating hub indicator */}
              <button
                type="button"
                onClick={() => setLocationModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 pl-3 border-l border-slate-200 text-xs text-left group hover:opacity-80 transition-opacity"
                title="Operating City: Cabanatuan City"
              >
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 group-hover:animate-bounce" />
                <div className="max-w-[180px] lg:max-w-[220px] truncate">
                  <div className="font-extrabold text-[11px] text-slate-900 truncate flex items-center gap-1">
                    <span>{currentOperatingCity}</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">Operating City</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {deliveryAddress.split(',')[0]}
                  </div>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links / Service Switcher */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => setServiceTab('food')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  serviceTab === 'food'
                    ? `${primaryBg} text-white shadow-xs`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Food Delivery</span>
              </button>

              <button
                onClick={() => setServiceTab('rides')}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  serviceTab === 'rides'
                    ? `${primaryBg} text-white shadow-xs`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Rides (Moto & Car)</span>
                {activeRide && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>

              <button
                onClick={() => setServiceTab('rider_hub')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  serviceTab === 'rider_hub'
                    ? `${primaryBg} text-white shadow-xs`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Rider Hub (Income)</span>
              </button>

              <button
                onClick={() => setServiceTab('owner_hub')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  serviceTab === 'owner_hub'
                    ? `${primaryBg} text-white shadow-xs`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Owner Revenue</span>
              </button>

              {/* VIP Club Pass */}
              <button
                onClick={() => setVipModalOpen(true)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  isVipSubscriber
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                }`}
                title="Save 30% on every delivery and ride fee"
              >
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span>{isVipSubscriber ? 'VIP Active' : 'VIP Pass (30% Off)'}</span>
              </button>
            </nav>

            {/* Zone 3: Actions & Controls */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Rain Delay Toggle */}
              <button
                type="button"
                onClick={toggleRainWeather}
                className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                  isRaining
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                title="Toggle rain weather delay simulation"
              >
                <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden md:inline">{isRaining ? 'Rain Delay' : 'Clear'}</span>
              </button>

              {/* Merchant Apply / Post Shop */}
              <button
                type="button"
                onClick={() => setMerchantModalOpen(true)}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                title="List your restaurant or grocery store"
              >
                <Store className="w-3.5 h-3.5 text-slate-600" />
                <span>Post Shop</span>
              </button>

              {/* PWA Download Button */}
              <PWAInstallButton />

              {/* Safety Shield Button */}
              <button
                type="button"
                onClick={() => setSafetyOpen(true)}
                className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                title="GoBiyahe Safety Shield & Verification"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </button>

              {/* Theme Switcher */}
              <div className="hidden sm:flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
                <button
                  onClick={() => setTheme('panda')}
                  className={`px-1.5 py-1 text-[11px] font-bold rounded transition-all ${
                    theme === 'panda'
                      ? 'bg-white text-[#D70F64] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Panda Mode"
                >
                  Panda
                </button>
                <button
                  onClick={() => setTheme('grab')}
                  className={`px-1.5 py-1 text-[11px] font-bold rounded transition-all ${
                    theme === 'grab'
                      ? 'bg-white text-[#00B14F] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Grab Mode"
                >
                  Grab
                </button>
              </div>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartTotalCount > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full text-[11px] font-bold text-white flex items-center justify-center shadow-xs ${
                      theme === 'panda' ? 'bg-[#D70F64]' : 'bg-[#00B14F]'
                    }`}
                  >
                    {cartTotalCount}
                  </span>
                )}
              </button>

              {/* User Profile or Log In */}
              {user ? (
                <button
                  onClick={() => setUserProfileOpen(true)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs ${
                      theme === 'panda' ? 'bg-[#D70F64]' : 'bg-[#00B14F]'
                    }`}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left text-xs font-bold text-slate-900 truncate max-w-[80px]">
                    {user.name.split(' ')[0]}
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className={`px-3 py-1.5 text-xs font-bold text-white rounded-lg shadow-xs ${primaryBg}`}
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Operating City & Location strip */}
        <div className="md:hidden px-4 py-1.5 bg-slate-100 border-t border-slate-200/80 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setLocationModalOpen(true)}
            className="flex items-center gap-1.5 text-slate-800 text-left font-semibold truncate hover:opacity-80"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded uppercase">
              Operating City
            </span>
            <span className="text-xs font-bold text-slate-900 truncate">{currentOperatingCity}</span>
            <span className="text-[11px] text-slate-500 truncate">· {deliveryAddress.split(',')[0]}</span>
          </button>
          <button
            type="button"
            onClick={() => setLocationModalOpen(true)}
            className="text-[10px] font-bold text-emerald-700 underline shrink-0 ml-1.5"
          >
            Change
          </button>
        </div>
      </header>

      {/* Safety Toolkit Modal */}
      <SafetyToolkitModal isOpen={safetyOpen} onClose={() => setSafetyOpen(false)} />
    </>
  );
};

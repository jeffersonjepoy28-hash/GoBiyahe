import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { FoodHero } from './components/FoodHero';
import { PromoBanner } from './components/PromoBanner';
import { CuisineFilter } from './components/CuisineFilter';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { MenuItemCustomizerModal } from './components/MenuItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LiveOrderTrackerModal } from './components/LiveOrderTrackerModal';
import { RideBookingView } from './components/RideBookingView';
import { RiderHubView } from './components/RiderHubView';
import { OwnerRevenueView } from './components/OwnerRevenueView';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { RiderApplyModal } from './components/RiderApplyModal';
import { MerchantApplyModal } from './components/MerchantApplyModal';
import { VipSubscriptionModal } from './components/VipSubscriptionModal';
import { LocationPickerModal } from './components/LocationPickerModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import {
  UtensilsCrossed,
  Car,
  Bike,
  Store,
  ShieldCheck,
  Search,
  Plus,
  Crown,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    serviceTab,
    setServiceTab,
    restaurantsList,
    searchQuery,
    selectedCuisine,
    isRaining,
    isVipSubscriber,
    setVipModalOpen,
    setMerchantModalOpen,
  } = useApp();

  const [riderApplyModalOpen, setRiderApplyModalOpen] = useState(false);

  // Filter restaurants by cuisine and search query
  const filteredRestaurants = restaurantsList.filter(rest => {
    const matchesCuisine =
      selectedCuisine === 'All' ||
      rest.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase()) ||
      rest.name.toLowerCase().includes(selectedCuisine.toLowerCase());

    const matchesSearch =
      !searchQuery.trim() ||
      rest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.menuItems.some(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCuisine && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-12 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Rain Alert Banner (Dismissible or Persistent when raining) */}
        {isRaining && (
          <div className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
            <span>🌧️ Monsoon Rain Advisory: Delivery times adjusted for safety (+10-15m). Riders equipped with thermal rain gear.</span>
          </div>
        )}

        {/* VIP Member Top Bar */}
        {isVipSubscriber && (
          <div className="bg-amber-500 text-slate-950 text-xs font-bold py-1.5 px-4 text-center flex items-center justify-center gap-1.5">
            <Crown className="w-3.5 h-3.5 fill-slate-950" />
            <span>GoBiyahe VIP Member Active · 30% savings applied on all deliveries & rides!</span>
          </div>
        )}

        {/* Tab 1: Food Delivery */}
        {serviceTab === 'food' && (
          <main>
            {/* Hero Banner */}
            <FoodHero onApplyRider={() => setRiderApplyModalOpen(true)} />

            {/* Everyday Promos Banner */}
            <PromoBanner />

            {/* Cuisine Filter */}
            <CuisineFilter />

            {/* Restaurant Listings Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Restaurants & Food Shops</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono">
                      {filteredRestaurants.length}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fast delivery · Real-time order tracking · Freshly prepared
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMerchantModalOpen(true)}
                    className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Store className="w-3.5 h-3.5 text-slate-600" />
                    <span>Restaurant / Grocery Partner Sign Up</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRiderApplyModalOpen(true)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Bike className="w-3.5 h-3.5" />
                    <span>Deliver with Us</span>
                  </button>
                </div>
              </div>

              {/* Grid of Restaurant Cards */}
              {filteredRestaurants.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">No restaurants match your search</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try another keyword, or browse all cuisines to see delicious burgers, ramen, boba, and pizza!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredRestaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              )}
            </section>
          </main>
        )}

        {/* Tab 2: Motorcycle & Car Rides */}
        {serviceTab === 'rides' && (
          <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Car className="w-6 h-6 text-emerald-600" />
                    <span>GoBiyahe Rides · Motorcycle & Car</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Motorcycle (₱23/km) · Sedan Car (₱212/3.3mi) · SUV XL (+30% higher)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setRiderApplyModalOpen(true)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Apply as Driver / Rider</span>
                </button>
              </div>
            </div>
            <RideBookingView />
          </main>
        )}

        {/* Tab 3: Rider Partner Hub (Income Tracker) */}
        {serviceTab === 'rider_hub' && (
          <main>
            <RiderHubView />
          </main>
        )}

        {/* Tab 4: App Owner Financials (Revenue & Commission Hub) */}
        {serviceTab === 'owner_hub' && (
          <main>
            <OwnerRevenueView />
          </main>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <span className="w-6 h-6 rounded-lg bg-[#D70F64] text-white flex items-center justify-center text-xs">G</span>
            <span>GoBiyahe Super-App</span>
            <span className="text-slate-400 font-normal">· Food Delivery & Rides Mobility</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <button onClick={() => setServiceTab('rider_hub')} className="hover:text-slate-900">
              Rider Hub
            </button>
            <button onClick={() => setServiceTab('owner_hub')} className="hover:text-slate-900">
              Owner Revenue
            </button>
            <button onClick={() => setMerchantModalOpen(true)} className="hover:text-slate-900">
              Merchant Partner
            </button>
            <button onClick={() => setRiderApplyModalOpen(true)} className="hover:text-slate-900">
              Deliver with Us
            </button>
          </div>

          <div className="text-slate-400">
            © 2026 GoBiyahe Inc. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modals & Slide-overs */}
      <RestaurantDetailModal />
      <MenuItemCustomizerModal />
      <CartDrawer />
      <CheckoutModal />
      <LiveOrderTrackerModal />
      <AuthModal />
      <UserProfileModal />
      <OrderHistoryModal />
      <RiderApplyModal
        isOpen={riderApplyModalOpen}
        onClose={() => setRiderApplyModalOpen(false)}
      />
      <MerchantApplyModal />
      <VipSubscriptionModal />
      <LocationPickerModal />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Car,
  Bike,
  MapPin,
  Navigation,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Tag,
  ArrowRight,
  Phone,
  MessageSquare,
  AlertCircle,
  Sparkles,
  CloudRain,
  Crown,
  Wallet,
  Banknote,
  Building2,
  Smartphone,
} from 'lucide-react';
import { RIDE_OPTIONS, POPULAR_LOCATIONS } from '../data/mockData';
import { RideOption } from '../types';

export const RideBookingView: React.FC = () => {
  const {
    theme,
    activeRide,
    bookRide,
    cancelRide,
    deliveryAddress,
    isRaining,
    toggleRainWeather,
    isVipSubscriber,
    setVipModalOpen,
    user,
    setUserProfileOpen,
  } = useApp();

  const [pickup, setPickup] = useState(deliveryAddress || 'SM City Cabanatuan, Maharlika Highway, Cabanatuan City');
  const [dropoff, setDropoff] = useState('Wesleyan University-Philippines, Cabanatuan City');
  const [selectedVehicleId, setSelectedVehicleId] = useState<'motorcycle' | 'car' | 'car_xl'>('motorcycle');
  const [promoApplied, setPromoApplied] = useState(true); // Everyday 10% promo applied by default!
  const [paymentChoice, setPaymentChoice] = useState<'wallet' | 'cash' | 'gcash' | 'bank'>('wallet');

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  // Distance estimation based on destination
  const matchedDest = POPULAR_LOCATIONS.find(loc => dropoff.toLowerCase().includes(loc.name.toLowerCase().split(' ')[0]));
  const distanceKm = matchedDest ? matchedDest.distanceKm : 3.8; // default distance in Cabanatuan City
  const distanceMiles = distanceKm / 1.60934;

  // Exact Pricing Formulas requested:
  // 1. Motorcycle: ₱23 per km
  const motoRawFare = Math.max(35, Math.round(distanceKm * 23));
  // 2. Car: ₱212 per 3.3 miles
  const carRawFare = Math.max(80, Math.round((distanceMiles / 3.3) * 212));
  // 3. XL Car: 30% higher than standard car rate
  const carXLRawFare = Math.round(carRawFare * 1.30);

  const getRawFare = (optionId: string) => {
    return optionId === 'motorcycle' ? motoRawFare : optionId === 'car' ? carRawFare : carXLRawFare;
  };

  const calculateFare = (optionId: string) => {
    const raw = getRawFare(optionId);
    if (isVipSubscriber) {
      // 30% discount on riding fee for VIP members!
      return Math.round(raw * 0.70);
    }
    if (promoApplied) {
      // Everyday 10% discount promo
      return Math.round(raw * 0.90);
    }
    return raw;
  };

  const linkedGcash = user?.linkedAccounts?.find(a => a.type === 'gcash');
  const linkedBank = user?.linkedAccounts?.find(a => a.type === 'bank');

  const handleBookSelectedRide = () => {
    const selectedOption = RIDE_OPTIONS.find(r => r.id === selectedVehicleId) || RIDE_OPTIONS[0];
    const fare = calculateFare(selectedVehicleId);
    bookRide(selectedOption, pickup, dropoff, distanceKm, fare);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Rain Delay Banner if Raining */}
      {isRaining && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start sm:items-center justify-between gap-3 text-blue-900 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-xl shrink-0">
              <CloudRain className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-2">
                <span>Rain Delay Advisory · Cabanatuan City</span>
                <span className="text-[10px] bg-blue-200 text-blue-900 px-1.5 py-0.2 rounded font-bold">
                  +5-8 Mins ETA
                </span>
              </div>
              <p className="text-xs text-blue-800 mt-0.5">
                Wet roads and sudden downpours are affecting traffic. Motorcycle & car drivers are driving with extra caution for passenger safety. Free sanitized rain gear provided!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleRainWeather}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 whitespace-nowrap px-2.5 py-1 bg-white rounded-lg border border-blue-300 shrink-0"
          >
            Toggle Weather
          </button>
        </div>
      )}

      {/* Active Trip Tracker if booked */}
      {activeRide ? (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">
                  {activeRide.status === 'Completed' ? 'Trip Completed!' : 'Live Ride In Progress'}
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {activeRide.status}
                </span>
                {isRaining && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 flex items-center gap-1">
                    <CloudRain className="w-3 h-3" />
                    <span>Rain Caution</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Booking ID: {activeRide.id} · Cabanatuan City Route
              </p>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">Trip Fare:</div>
              <div className="text-2xl font-black text-slate-900 tabular-nums">
                ₱{activeRide.fare.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Interactive Simulated Route Map */}
          <div className="relative h-64 sm:h-72 bg-slate-900 rounded-2xl overflow-hidden p-4 flex flex-col justify-between">
            {/* Map grid lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div
                className="w-full h-full"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              />
            </div>

            {/* Simulated Animated Route SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 60 220 C 140 180, 260 120, 360 80 S 520 70, 680 90"
                fill="none"
                stroke="#00B14F"
                strokeWidth="5"
                strokeDasharray="8 8"
                className="animate-pulse"
              />
            </svg>

            {/* Pins on map */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-slate-950/80 backdrop-blur-xs text-white p-2.5 rounded-xl border border-slate-700 text-xs max-w-xs shadow-lg">
                <div className="font-bold text-emerald-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Pickup: {activeRide.pickupLocation.split(',')[0]}</span>
                </div>
              </div>

              <div className="bg-slate-950/80 backdrop-blur-xs text-white p-2.5 rounded-xl border border-slate-700 text-xs max-w-xs shadow-lg text-right">
                <div className="font-bold text-amber-400 flex items-center gap-1 justify-end">
                  <span>Drop-off: {activeRide.dropoffLocation.split(',')[0]}</span>
                  <Navigation className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Animated Vehicle Icon on Map */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="p-3 bg-white text-slate-900 rounded-full shadow-2xl border-2 border-emerald-500 animate-bounce flex items-center gap-2 px-4">
                {activeRide.vehicle.category === 'Motorcycle' ? (
                  <Bike className="w-5 h-5 text-[#D70F64]" />
                ) : (
                  <Car className="w-5 h-5 text-emerald-600" />
                )}
                <span className="text-xs font-black">
                  {activeRide.driver.carModel} · {activeRide.driver.plateNumber}
                </span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-slate-300">
              <span className="bg-slate-950/80 px-2 py-1 rounded">
                Distance: {activeRide.distanceKm} km ({distanceMiles.toFixed(1)} miles)
              </span>
              <span className="bg-slate-950/80 px-2 py-1 rounded font-bold text-emerald-400">
                {activeRide.status === 'Completed'
                  ? 'Trip Completed'
                  : `Arriving in ~${activeRide.etaMinutes + (isRaining ? 5 : 0)} mins ${isRaining ? '(rain delay included)' : ''}`}
              </span>
            </div>
          </div>

          {/* Driver Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-2xl shrink-0">
                {activeRide.driver.photo}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>{activeRide.driver.name}</span>
                  <span className="text-xs text-amber-600 font-semibold flex items-center gap-0.5">
                    ★ {activeRide.driver.rating} ({activeRide.driver.trips} trips)
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                    Verified Driver
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {activeRide.driver.carModel} · Plate: <strong>{activeRide.driver.plateNumber}</strong>
                  {isRaining && ' · 🌧️ Driver equipped with Raincoat & Helmet Shield'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Calling driver ${activeRide.driver.name}...`)}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Driver</span>
              </button>
              <button
                type="button"
                onClick={() => alert(`Chatting with driver ${activeRide.driver.name}...`)}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Chat</span>
              </button>
              {activeRide.status === 'Completed' ? (
                <button
                  type="button"
                  onClick={cancelRide}
                  className={`px-4 py-2 text-white text-xs font-bold rounded-xl shadow-xs ${primaryBg}`}
                >
                  Book Another Ride
                </button>
              ) : (
                <button
                  type="button"
                  onClick={cancelRide}
                  className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cancel Ride
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Ride Booking Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Route & Location input */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Book Motorcycle or Car Ride</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Cabanatuan City & Nueva Ecija Hub · Verified Riders & Upfront Pricing
              </p>
            </div>

            {/* Pickup & Destination Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-emerald-600" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={e => setPickup(e.target.value)}
                    placeholder="Enter pickup address in Cabanatuan"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Drop-off Destination
                </label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-2.5 w-4 h-4 text-amber-600" />
                  <input
                    type="text"
                    value={dropoff}
                    onChange={e => setDropoff(e.target.value)}
                    placeholder="Where to in Cabanatuan?"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Quick Popular Cabanatuan Hubs */}
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Popular Cabanatuan Landmarks
              </div>
              <div className="space-y-1.5">
                {POPULAR_LOCATIONS.slice(0, 5).map(loc => (
                  <button
                    key={loc.name}
                    type="button"
                    onClick={() => setDropoff(loc.name)}
                    className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{loc.name}</div>
                      <div className="text-[11px] text-slate-500">{loc.address}</div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-600">
                      {loc.distanceKm} km ({(loc.distanceKm / 1.60934).toFixed(1)} mi)
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Promos & Discounts Banner */}
            {isVipSubscriber ? (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-bold text-amber-950">GoBiyahe VIP Member: 30% OFF Applied</div>
                    <div className="text-[10px] text-amber-800">You save 30% on every ride fee!</div>
                  </div>
                </div>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded-full uppercase">
                  30% OFF
                </span>
              </div>
            ) : (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-rose-600" />
                  <div>
                    <div className="font-bold text-rose-900">10% Everyday Ride Promo</div>
                    <div className="text-[10px] text-rose-700">Code: BIYAHE10 · 3-Day Expiry</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPromoApplied(!promoApplied)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                    promoApplied ? 'bg-rose-600 text-white' : 'bg-white border border-rose-300 text-rose-800'
                  }`}
                >
                  {promoApplied ? '10% Applied' : 'Apply'}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Vehicle Selection & Pricing Details */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Select Vehicle Option</h3>
                  <p className="text-xs text-slate-500">
                    Est. Trip Distance: <strong>{distanceKm} km</strong> ({distanceMiles.toFixed(1)} miles)
                  </p>
                </div>
                <div className="text-right text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Drivers</span>
                </div>
              </div>

              {/* Vehicle Options List */}
              <div className="space-y-3">
                {/* 1. Motorcycle: ₱23 / km */}
                <div
                  onClick={() => setSelectedVehicleId('motorcycle')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    selectedVehicleId === 'motorcycle'
                      ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-pink-100 text-[#D70F64] flex items-center justify-center shrink-0">
                      <Bike className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">GoBiyahe Moto (Motorcycle)</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                          Fastest
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Rate: <strong>₱23 per km</strong> · 1 Passenger · Free sanitized helmet
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        ETA: {2 + (isRaining ? 4 : 0)} mins {isRaining ? '(rain caution)' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-lg font-black text-slate-900 tabular-nums">
                      ₱{calculateFare('motorcycle')}
                    </div>
                    {(isVipSubscriber || promoApplied) && (
                      <div className="text-[10px] text-emerald-600 line-through">
                        ₱{motoRawFare}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Sedan Car: ₱212 per 3.3 miles */}
                <div
                  onClick={() => setSelectedVehicleId('car')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    selectedVehicleId === 'car'
                      ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">GoBiyahe Car (Sedan 4-Seater)</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">
                          Cool AC
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Rate: <strong>₱212 per 3.3 miles</strong> (₱64.24/mi) · Up to 4 pax
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        ETA: {4 + (isRaining ? 4 : 0)} mins {isRaining ? '(rain delay)' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-lg font-black text-slate-900 tabular-nums">
                      ₱{calculateFare('car')}
                    </div>
                    {(isVipSubscriber || promoApplied) && (
                      <div className="text-[10px] text-emerald-600 line-through">
                        ₱{carRawFare}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. XL Car: 30% higher than standard car rate */}
                <div
                  onClick={() => setSelectedVehicleId('car_xl')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    selectedVehicleId === 'car_xl'
                      ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">GoBiyahe Car XL (6-Seater SUV)</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded">
                          Spacious
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Rate: <strong>+30% higher than standard sedan</strong> · 6 pax + luggage
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        ETA: {6 + (isRaining ? 5 : 0)} mins {isRaining ? '(rain delay)' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-lg font-black text-slate-900 tabular-nums">
                      ₱{calculateFare('car_xl')}
                    </div>
                    {(isVipSubscriber || promoApplied) && (
                      <div className="text-[10px] text-emerald-600 line-through">
                        ₱{carXLRawFare}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Payment Method
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentChoice('wallet')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex flex-col justify-between ${
                      paymentChoice === 'wallet'
                        ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <Wallet className="w-3.5 h-3.5" />
                      <span>Wallet</span>
                    </div>
                    <div className="text-[10px] font-normal text-slate-500 mt-1">
                      ₱{user ? user.walletBalance.toFixed(0) : '250'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentChoice('cash')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex flex-col justify-between ${
                      paymentChoice === 'cash'
                        ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-amber-600">
                      <Banknote className="w-3.5 h-3.5" />
                      <span>Cash</span>
                    </div>
                    <div className="text-[10px] font-normal text-slate-500 mt-1">Pay driver</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentChoice('gcash');
                      if (!linkedGcash) setUserProfileOpen(true);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex flex-col justify-between ${
                      paymentChoice === 'gcash'
                        ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600 text-blue-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>GCash</span>
                    </div>
                    <div className="text-[10px] font-normal text-slate-500 mt-1 font-mono">
                      {linkedGcash ? linkedGcash.accountNumberMasked.slice(0, 8) : 'Link GCash'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentChoice('bank');
                      if (!linkedBank) setUserProfileOpen(true);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex flex-col justify-between ${
                      paymentChoice === 'bank'
                        ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Bank</span>
                    </div>
                    <div className="text-[10px] font-normal text-slate-500 mt-1 font-mono">
                      {linkedBank ? linkedBank.providerName.split(' ')[0] : 'Link Bank'}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Book Button */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  {isVipSubscriber ? '⭐ VIP 30% discount applied' : promoApplied ? '🎉 10% promo applied' : 'Standard fare'}
                </span>
                <span className="text-emerald-600 font-bold">18% Tech Fee Included</span>
              </div>

              <button
                type="button"
                onClick={handleBookSelectedRide}
                className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-colors flex items-center justify-between ${primaryBg}`}
              >
                <span>
                  Book Now (
                  {selectedVehicleId === 'motorcycle'
                    ? 'Moto ₱23/km'
                    : selectedVehicleId === 'car'
                    ? 'Car ₱212/3.3mi'
                    : 'Car XL +30%'}
                  )
                </span>
                <span className="tabular-nums flex items-center gap-1 font-black text-base">
                  <span>₱{calculateFare(selectedVehicleId)}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

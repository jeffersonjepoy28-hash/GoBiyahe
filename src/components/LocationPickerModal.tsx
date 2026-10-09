import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Navigation,
  Compass,
  CheckCircle2,
  Building2,
  Search,
  Sparkles,
  MapPinned,
} from 'lucide-react';
import { POPULAR_LOCATIONS } from '../data/mockData';

const CABANATUAN_BARANGAYS = [
  'Brgy. Hermogenes C. Concepcion (SM City)',
  'Brgy. Sumacab Este (NEUST & Lakewood)',
  'Brgy. Mabini Homesite (Wesleyan Univ)',
  'Brgy. Sangitan East (Public Market)',
  'Brgy. Kapitan Pepe Subdivision',
  'Brgy. Aduas Norte & Sur',
  'Brgy. San Josef Sur & Norte',
  'Brgy. Zulueta Commercial District',
  'Brgy. H. Romero / Bitig',
  'Brgy. Magsaysay Sur & Norte',
];

export const LocationPickerModal: React.FC = () => {
  const {
    locationModalOpen,
    setLocationModalOpen,
    deliveryAddress,
    setDeliveryAddress,
    currentOperatingCity,
    setCurrentOperatingCity,
    detectGPSLocation,
    theme,
  } = useApp();

  const [detecting, setDetecting] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [customInput, setCustomInput] = useState('');

  if (!locationModalOpen) return null;

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  const handleDetect = async () => {
    setDetecting(true);
    try {
      await detectGPSLocation();
    } finally {
      setDetecting(false);
      setLocationModalOpen(false);
    }
  };

  const handleSelectLocation = (locName: string, fullAddress: string) => {
    setDeliveryAddress(fullAddress);
    setCurrentOperatingCity('Cabanatuan City');
    setLocationModalOpen(false);
  };

  const filteredBarangays = CABANATUAN_BARANGAYS.filter(b =>
    b.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <MapPinned className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">Select Operating Location</h2>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  Operating City
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Operating City: <strong className="text-emerald-700">Cabanatuan City</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => setLocationModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Active Operating City Badge & Quick Confirmation */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="text-xs font-bold text-emerald-950">Operating City: Cabanatuan City</div>
                <div className="text-[11px] text-emerald-800">Dispatch hub active across all barangays & commercial malls</div>
              </div>
            </div>
            <span className="text-[10px] font-extrabold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full uppercase">
              Active Hub
            </span>
          </div>

          {/* GPS Detection Button */}
          <button
            type="button"
            onClick={handleDetect}
            disabled={detecting}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs sm:text-sm flex items-center justify-between shadow-md hover:from-emerald-700 hover:to-teal-700 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Navigation className={`w-5 h-5 ${detecting ? 'animate-spin' : 'animate-pulse'}`} />
              <div className="text-left">
                <div>{detecting ? 'Acquiring GPS Satellite Signal...' : 'Use My Current Location (GPS)'}</div>
                <div className="text-[11px] text-emerald-100 font-normal">
                  Pinpoint your exact location in Cabanatuan City
                </div>
              </div>
            </div>
            <span className="text-xs font-black bg-white/20 px-2 py-1 rounded-lg">
              Auto-Detect
            </span>
          </button>

          {/* Custom Search / Address Input */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Cabanatuan barangay, subdivision or mall..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Popular Cabanatuan Hubs */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Popular Cabanatuan City Landmarks</span>
              <span className="text-[10px] text-slate-500 font-normal">Fastest 15-20m dispatch</span>
            </div>

            <div className="space-y-1.5">
              {POPULAR_LOCATIONS.map(loc => {
                const isSelected = deliveryAddress.includes(loc.name);
                return (
                  <button
                    key={loc.name}
                    type="button"
                    onClick={() => handleSelectLocation(loc.name, loc.address)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? primaryText : 'text-slate-400'}`} />
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span>{loc.name}</span>
                          {isSelected && (
                            <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded">
                              Selected
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{loc.address}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 shrink-0 mt-0.5">
                      {loc.distanceKm} km
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cabanatuan Barangays Quick Selector */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Barangay / Subdivision
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredBarangays.map(bgy => (
                <button
                  key={bgy}
                  type="button"
                  onClick={() => handleSelectLocation(bgy, `${bgy}, Cabanatuan City, Nueva Ecija`)}
                  className="text-left p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 transition-colors flex items-center justify-between"
                >
                  <span className="truncate">{bgy}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bike,
  Car,
  ShieldCheck,
  CheckCircle2,
  Upload,
  ArrowRight,
  Sparkles,
  FileText,
  DollarSign,
} from 'lucide-react';

export const RiderApplyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { theme, setServiceTab } = useApp();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [vehicleType, setVehicleType] = useState<'motorcycle' | 'car'>('motorcycle');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Cabanatuan City, Nueva Ecija');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [orCrUploaded, setOrCrUploaded] = useState(false);

  if (!isOpen) return null;

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleStartDriving = () => {
    onClose();
    setStep('form');
    setServiceTab('rider_hub');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Drive & Deliver with GoBiyahe</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                Cabanatuan City Hub
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Earn ₱1,500 – ₱2,800/day in Cabanatuan City · Keep 100% of customer tips · Instant daily payout
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
            {/* Vehicle Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Your Vehicle
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setVehicleType('motorcycle')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    vehicleType === 'motorcycle'
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="p-2 bg-pink-100 text-[#D70F64] rounded-lg">
                    <Bike className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Motorcycle Rider</div>
                    <div className="text-[11px] text-slate-500">Food delivery & GoBiyahe Moto taxi</div>
                    <div className="text-[11px] font-bold text-emerald-600 mt-1">Est. ₱1,600/day</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicleType('car')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    vehicleType === 'car'
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Car / Sedan Driver</div>
                    <div className="text-[11px] text-slate-500">GoBiyahe Car 4-seater & XL trips</div>
                    <div className="text-[11px] font-bold text-emerald-600 mt-1">Est. ₱2,800/day</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Applicant Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Juan Carlos Dela Cruz"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+63 917 123 4567"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Operating Location</label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none font-medium"
                >
                  <option value="Cabanatuan City, Nueva Ecija">Cabanatuan City, Nueva Ecija</option>
                  <option value="Cabanatuan City (All Districts & Barangays)">Cabanatuan City (All Districts & Barangays)</option>
                  <option value="Cabanatuan City - Commercial District">Cabanatuan City - Commercial District (SM City, NE Pacific, Megacenter)</option>
                  <option value="Cabanatuan City - University Hub">Cabanatuan City - University Hub (Wesleyan, NEUST Sumacab)</option>
                  <option value="Cabanatuan City - Residential Estates">Cabanatuan City - Residential Estates (Lakewood, Kapitan Pepe, Mabini)</option>
                  <option value="Cabanatuan City & Greater Nueva Ecija">Cabanatuan City & Greater Nueva Ecija</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Plate Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NAA 4821 or 123-ABC"
                  value={plateNumber}
                  onChange={e => setPlateNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Document Verification simulator */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Required Documents Verification
              </label>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Valid Professional Driver's License</div>
                      <div className="text-[10px] text-slate-500">Government issued, non-expired</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLicenseUploaded(!licenseUploaded)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                      licenseUploaded
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {licenseUploaded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Simulate Upload</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Vehicle OR/CR (Registration)</div>
                      <div className="text-[10px] text-slate-500">Official Receipt & Certificate of Registration</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOrCrUploaded(!orCrUploaded)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                      orCrUploaded
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {orCrUploaded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Simulate Upload</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Perks Summary */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold">Partner Rider Guarantee:</span> You keep 100% of customer tips, earn guaranteed base delivery pay (₱45+), and enjoy accident insurance coverage while active.
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 ${primaryBg}`}
            >
              <span>Submit Rider Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Application Approved & Activated!
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Congratulations, {fullName || 'Partner'}! Your {vehicleType === 'motorcycle' ? 'Motorcycle' : 'Car'} account is verified. You can now go online, accept deliveries/rides, and track your daily income in the Rider Hub.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-sm mx-auto text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Partner ID:</span>
                <span className="font-mono font-bold text-slate-900">GB-RIDER-8821</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle Type:</span>
                <span className="font-bold text-slate-900 capitalize">{vehicleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Operating Location:</span>
                <span className="font-bold text-emerald-700">{city}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartDriving}
              className={`w-full max-w-sm mx-auto py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 ${primaryBg}`}
            >
              <span>Go to Rider Partner Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

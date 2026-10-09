import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Share2,
  PhoneCall,
  Lock,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';

export const SafetyToolkitModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleShareTrip = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 overflow-hidden space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              GoBiyahe Safety Shield
            </h3>
            <p className="text-xs text-slate-500">
              Mutual safety protection for passengers, customers & riders
            </p>
          </div>
        </div>

        {/* Verified User Status */}
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <span>Verified Customer & Passenger</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-[11px] text-emerald-800">
                {user ? user.name : 'Active User'} · Mobile OTP & Identity Verified
              </div>
            </div>
          </div>
          <span className="text-[10px] font-black bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Safe
          </span>
        </div>

        {/* Safety Tools */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleShareTrip}
            className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-left transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Share2 className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">Share Live Trip with Family</div>
                <div className="text-[11px] text-slate-500">Share real-time GPS location tracking link</div>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600">
              {copiedLink ? 'Link Copied!' : 'Share'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => alert('Emergency Assistance: Connecting to Cabanatuan City CDRRMO (044-940-0911) / PNP Cabanatuan (044-463-0288) / 911...')}
            className="w-full p-3.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-2xl text-left transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <div>
                <div className="text-xs font-bold text-rose-950">Emergency SOS / Police Hotline</div>
                <div className="text-[11px] text-rose-700">Immediate priority dispatch & assistance</div>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-600">911</span>
          </button>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 flex items-start gap-2">
          <Lock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <span>
            Every rider and driver undergoes strict police clearance checks, vehicle inspections, and face verification before every shift.
          </span>
        </div>
      </div>
    </div>
  );
};

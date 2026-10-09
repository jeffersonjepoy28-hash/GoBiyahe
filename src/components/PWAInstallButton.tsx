import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, Apple, X, CheckCircle2, Share } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const { theme } = useApp();

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  // If already installed, don't clutter the UI
  if (isInstalled) return null;

  return (
    <>
      <button
        onClick={() => {
          if (isInstallable) {
            install();
          } else {
            setShowModal(true);
          }
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors whitespace-nowrap shadow-2xs"
        title="Download App for Android or iPhone"
      >
        <Download className="w-3.5 h-3.5 text-slate-600" />
        <span>Install App</span>
      </button>

      {/* Download / Install Guidance Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 overflow-hidden">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md ${
                  theme === 'panda' ? 'bg-[#D70F64]' : 'bg-[#00B14F]'
                }`}
              >
                P
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Download PandaGo
                </h3>
                <p className="text-xs text-slate-500">
                  Install on Android or iOS for fast 1-tap food delivery & rides
                </p>
              </div>
            </div>

            {/* Android instructions */}
            <div className="mb-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Android (Google Chrome / Samsung Internet)</span>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Tap the three dots menu (⋮) at top right of your browser, then tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
              </p>
              {isInstallable && (
                <button
                  onClick={() => {
                    install();
                    setShowModal(false);
                  }}
                  className={`w-full py-2 px-3 rounded-lg text-white font-bold text-xs transition-colors shadow-sm ${primaryBg}`}
                >
                  Install Now (Android)
                </button>
              )}
            </div>

            {/* iOS Safari instructions */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-4">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1.5">
                <Apple className="w-4 h-4 text-slate-900" />
                <span>Apple iOS (iPhone & iPad Safari)</span>
              </div>
              <ol className="text-xs text-slate-600 space-y-1.5 list-decimal pl-4">
                <li>
                  Tap the <Share className="w-3.5 h-3.5 inline mx-0.5 text-blue-600" /> <strong>Share</strong> button at the bottom of Safari.
                </li>
                <li>
                  Scroll down the share sheet and tap <strong>"Add to Home Screen"</strong>.
                </li>
                <li>
                  Tap <strong>Add</strong> in the top right corner. The PandaGo icon will appear on your home screen!
                </li>
              </ol>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
            >
              Got it, close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

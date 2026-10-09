import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  User as UserIcon,
  Mail,
  Phone,
  Wallet,
  MapPin,
  Clock,
  LogOut,
  Plus,
  Check,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Trash2,
  Smartphone,
  Crown,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { updateUserWallet } from '../services/authService';

export const UserProfileModal: React.FC = () => {
  const {
    theme,
    user,
    userProfileOpen,
    setUserProfileOpen,
    handleLogout,
    deliveryAddress,
    setDeliveryAddress,
    setOrderHistoryOpen,
    handleLinkAccount,
    handleUnlinkAccount,
    isVipSubscriber,
    setVipModalOpen,
    currentOperatingCity,
    setLocationModalOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'linked_accounts' | 'safety'>('profile');
  const [topUpSuccess, setTopUpSuccess] = useState(false);

  // Link account form state
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  const [accountType, setAccountType] = useState<'gcash' | 'bank' | 'maya'>('gcash');
  const [bankProvider, setBankProvider] = useState('BDO Unibank');
  const [accountNumber, setAccountNumber] = useState('');
  const [holderName, setHolderName] = useState(user?.name || '');
  const [linkSuccess, setLinkSuccess] = useState(false);

  // Customer verification state
  const [idVerified, setIdVerified] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(true);

  if (!userProfileOpen || !user) return null;

  const primaryBg = theme === 'panda' ? 'bg-[#D70F64] hover:bg-[#c20d5a]' : 'bg-[#00B14F] hover:bg-[#009b45]';
  const primaryText = theme === 'panda' ? 'text-[#D70F64]' : 'text-[#00B14F]';

  const handleAddFunds = (amount: number) => {
    updateUserWallet(user.id, amount);
    setTopUpSuccess(true);
    setTimeout(() => setTopUpSuccess(false), 2000);
  };

  const handleSaveLinkedAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber.trim()) {
      alert('Please enter your account or mobile number.');
      return;
    }
    const providerName =
      accountType === 'gcash'
        ? 'GCash'
        : accountType === 'maya'
        ? 'Maya'
        : bankProvider;

    handleLinkAccount(accountType, providerName, accountNumber.trim(), holderName.trim() || user.name);
    setAccountNumber('');
    setShowAddAccountForm(false);
    setLinkSuccess(true);
    setTimeout(() => setLinkSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xs ${
                theme === 'panda' ? 'bg-[#D70F64]' : 'bg-[#00B14F]'
              }`}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 leading-tight">{user.name}</h2>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-xs text-slate-500">{user.email} · {user.phone || '+63 917 555 0192'}</p>
            </div>
          </div>
          <button
            onClick={() => setUserProfileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 p-1 bg-slate-100 m-5 mb-0 rounded-xl text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 rounded-lg transition-all ${
              activeTab === 'profile' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Wallet & Profile
          </button>
          <button
            onClick={() => setActiveTab('linked_accounts')}
            className={`py-2 rounded-lg transition-all ${
              activeTab === 'linked_accounts' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            GCash & Banks
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`py-2 rounded-lg transition-all ${
              activeTab === 'safety' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Safety & ID Check
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* TAB 1: Profile & Wallet */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* VIP Membership Banner */}
              <div
                onClick={() => setVipModalOpen(true)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isVipSubscriber
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isVipSubscriber ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>{isVipSubscriber ? 'GoBiyahe VIP Member' : 'GoBiyahe VIP Club Pass'}</span>
                      {isVipSubscriber && (
                        <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-1.5 py-0.2 rounded">
                          30% SAVINGS
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {isVipSubscriber
                        ? '30% discount applied to all food delivery and riding fees'
                        : 'Save 30% on every food delivery fee and riding fee (₱149/mo)'}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>

              {/* Wallet Balance Card in Philippine Pesos (₱) */}
              <div className="p-4 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Wallet className="w-4 h-4 text-emerald-400" />
                    <span>GoBiyahe Wallet Balance</span>
                  </div>
                  <div className="text-3xl font-black tabular-nums tracking-tight">
                    ₱{user.walletBalance.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleAddFunds(100)}
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    +₱100
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddFunds(200)}
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    +₱200
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddFunds(500)}
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    +₱500
                  </button>
                </div>
              </div>

              {topUpSuccess && (
                <div className="p-2.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2 border border-emerald-200">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Wallet topped up successfully!</span>
                </div>
              )}

              {/* Operating Location */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Operating Hub & Destination
                  </span>
                  <button
                    type="button"
                    onClick={() => setLocationModalOpen(true)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    Change Hub
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{currentOperatingCity}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 pl-6 truncate">
                  {deliveryAddress}
                </div>
              </div>

              {/* Saved Delivery Addresses */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Saved Cabanatuan Addresses
                </h3>
                <div className="space-y-2">
                  {user.savedAddresses.map(addr => {
                    const isSelected = deliveryAddress === addr.address;
                    return (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => setDeliveryAddress(addr.address)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between ${
                          isSelected ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? primaryText : 'text-slate-400'}`} />
                          <div>
                            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                              <span>{addr.label}</span>
                              {isSelected && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-slate-200 rounded text-slate-700">
                                  Selected
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-600 mt-0.5">{addr.address}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Linked GCash & Bank Accounts */}
          {activeTab === 'linked_accounts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Linked Payment Methods
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Direct 1-tap checkout for motorcycle/car rides and food orders
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddAccountForm(!showAddAccountForm)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 ${
                    showAddAccountForm ? 'bg-slate-200 text-slate-800' : `${primaryBg} text-white`
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddAccountForm ? 'Close' : 'Link New'}</span>
                </button>
              </div>

              {linkSuccess && (
                <div className="p-2.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Payment account linked successfully and verified!</span>
                </div>
              )}

              {/* Link Account Form */}
              {showAddAccountForm && (
                <form
                  onSubmit={handleSaveLinkedAccount}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 animate-in fade-in duration-200"
                >
                  <div className="text-xs font-bold text-slate-900">Link GCash or Bank Account</div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setAccountType('gcash')}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                        accountType === 'gcash'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                      <span>GCash</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAccountType('bank')}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                        accountType === 'bank'
                          ? 'border-slate-900 bg-slate-100 text-slate-900 ring-1 ring-slate-900'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <Building2 className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                      <span>Bank</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAccountType('maya')}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                        accountType === 'maya'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                      <span>Maya</span>
                    </button>
                  </div>

                  {accountType === 'bank' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Select Philippine Bank
                      </label>
                      <select
                        value={bankProvider}
                        onChange={e => setBankProvider(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none font-medium"
                      >
                        <option value="BDO Unibank">BDO Unibank</option>
                        <option value="Bank of the Philippine Islands (BPI)">BPI (Bank of the Philippine Islands)</option>
                        <option value="Land Bank of the Philippines">Landbank</option>
                        <option value="UnionBank of the Philippines">UnionBank</option>
                        <option value="Metrobank">Metrobank</option>
                        <option value="RCBC">RCBC</option>
                        <option value="Security Bank">Security Bank</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {accountType === 'gcash' || accountType === 'maya' ? 'Registered Mobile Number' : 'Bank Account Number'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={accountType === 'gcash' ? 'e.g. 0917-882-1094' : 'e.g. 1092-4910-4821'}
                      value={accountNumber}
                      onChange={e => setAccountNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Chen"
                      value={holderName}
                      onChange={e => setHolderName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2.5 rounded-xl text-white font-bold text-xs shadow-xs ${primaryBg}`}
                  >
                    Authorize & Link Account
                  </button>
                </form>
              )}

              {/* Linked Accounts List */}
              <div className="space-y-2.5">
                {(user.linkedAccounts && user.linkedAccounts.length > 0) ? (
                  user.linkedAccounts.map(acc => (
                    <div
                      key={acc.id}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                            acc.type === 'gcash'
                              ? 'bg-blue-600 text-white'
                              : acc.type === 'maya'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 text-white'
                          }`}
                        >
                          {acc.type === 'gcash' ? 'G' : acc.type === 'maya' ? 'M' : '🏦'}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                            <span>{acc.providerName}</span>
                            <span className="font-mono text-slate-600">{acc.accountNumberMasked}</span>
                            {acc.isDefault && (
                              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-bold">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {acc.accountHolderName} · {acc.linkedAt}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleUnlinkAccount(acc.id)}
                        className="text-slate-400 hover:text-rose-600 p-2 transition-colors"
                        title="Unlink account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6">
                    <Smartphone className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800">No linked accounts yet</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Link your GCash, Maya, or bank account for seamless 1-tap booking.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Customer Safety & ID Verification */}
          {activeTab === 'safety' && (
            <div className="space-y-3.5">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-1.5 bg-emerald-600 text-white rounded-lg">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-emerald-950">Mutual Rider & Passenger Safety</h3>
                    <p className="text-[11px] text-emerald-800">
                      All customers and riders must be registered & verified before booking.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mt-3 pt-3 border-t border-emerald-200 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Phone OTP Authentication</span>
                    </div>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-black uppercase">
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Government / Student ID Verification</span>
                    </div>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-black uppercase">
                      Approved
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Facial Liveness Selfie Match</span>
                    </div>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-black uppercase">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span>Why Customer Verification Matters</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  To protect delivery riders and motorcycle taxi drivers against fake bookings, harassment, and unsafe zones, GoBiyahe requires registered customer verification. Riders see that you are a verified passenger before accepting your trip.
                </p>
              </div>
            </div>
          )}

          {/* Quick Activity Button & Logout */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setUserProfileOpen(false);
                setOrderHistoryOpen(true);
              }}
              className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>Order & Ride History</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

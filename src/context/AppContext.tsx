import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BrandTheme,
  ServiceTab,
  User,
  Restaurant,
  MenuItem,
  CartItem,
  Order,
  OrderStatus,
  ActiveRide,
  RideOption,
  RiderEarningEntry,
  PlatformTransaction,
} from '../types';
import {
  RESTAURANTS_DATA,
  SAVED_ADDRESSES,
  APP_OWNER_FEE_FOOD,
  APP_OWNER_FEE_DELIVERY,
  RESTAURANT_COMMISSION_RATE,
  RIDE_PLATFORM_COMMISSION_RATE,
  INITIAL_RIDER_EARNINGS,
  INITIAL_OWNER_TRANSACTIONS,
} from '../data/mockData';
import {
  getCurrentUser,
  initializeAuthStore,
  loginUser,
  logoutUser,
  registerUser,
  updateUserWallet,
  addLinkedAccount,
  removeLinkedAccount,
} from '../services/authService';

interface AppContextType {
  theme: BrandTheme;
  setTheme: (theme: BrandTheme) => void;
  serviceTab: ServiceTab;
  setServiceTab: (tab: ServiceTab) => void;
  
  // Auth & User
  user: User | null;
  authModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  handleLogin: (email: string, pass: string) => Promise<void>;
  handleRegister: (name: string, email: string, pass: string, phone?: string) => Promise<void>;
  handleLogout: () => void;
  userProfileOpen: boolean;
  setUserProfileOpen: (open: boolean) => void;

  // Location / Address
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  currentOperatingCity: string;
  setCurrentOperatingCity: (city: string) => void;
  locationModalOpen: boolean;
  setLocationModalOpen: (open: boolean) => void;
  detectGPSLocation: () => Promise<string>;

  // Linked GCash & Bank Accounts
  linkedAccountsModalOpen: boolean;
  setLinkedAccountsModalOpen: (open: boolean) => void;
  handleLinkAccount: (type: 'gcash' | 'bank' | 'maya', providerName: string, accountNumber: string, holderName: string) => void;
  handleUnlinkAccount: (accId: string) => void;

  // Search & Filtering
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCuisine: string;
  setSelectedCuisine: (c: string) => void;

  // Restaurant details & item modal
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (rest: Restaurant | null) => void;
  selectedMenuItem: { item: MenuItem; restaurant: Restaurant } | null;
  setSelectedMenuItem: (data: { item: MenuItem; restaurant: Restaurant } | null) => void;

  // Cart
  cart: CartItem[];
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCount: number;

  // Checkout & Orders
  checkoutModalOpen: boolean;
  setCheckoutModalOpen: (open: boolean) => void;
  orders: Order[];
  activeOrder: Order | null;
  orderTrackerOpen: boolean;
  setOrderTrackerOpen: (open: boolean) => void;
  placeOrder: (orderData: {
    deliveryAddress: string;
    paymentMethod: string;
    tip: number;
    discount: number;
    promoCode?: string;
  }) => Order;
  sendRiderMessage: (orderId: string, text: string) => void;
  viewOrderTracker: (orderId: string) => void;
  orderHistoryOpen: boolean;
  setOrderHistoryOpen: (open: boolean) => void;

  // Rides
  activeRide: ActiveRide | null;
  bookRide: (option: RideOption, pickup: string, dropoff: string, distanceKm: number, fare: number) => void;
  cancelRide: () => void;

  // Weather / Rain Delay Feature
  isRaining: boolean;
  setIsRaining: (raining: boolean) => void;
  toggleRainWeather: () => void;

  // VIP Members Subscription (30% off delivery fee & rides)
  isVipSubscriber: boolean;
  subscribeToVip: () => void;
  cancelVip: () => void;
  vipModalOpen: boolean;
  setVipModalOpen: (open: boolean) => void;

  // Merchant / Restaurant & Grocery Partner Onboarding
  merchantModalOpen: boolean;
  setMerchantModalOpen: (open: boolean) => void;
  restaurantsList: Restaurant[];
  addMerchantStore: (store: Omit<Restaurant, 'id'>) => Restaurant;
  addStoreMenuItem: (storeId: string, item: Omit<MenuItem, 'id'>) => void;

  // Rider Profitability & Income
  riderOnline: boolean;
  setRiderOnline: (online: boolean) => void;
  riderEarningsList: RiderEarningEntry[];
  riderTotalEarned: number;
  riderTodayEarned: number;
  cashoutRiderFunds: () => void;
  simulateRiderAcceptOrder: () => void;

  // App Owner Profitability & Commission
  ownerTransactions: PlatformTransaction[];
  totalOwnerNetProfit: number;
  totalFoodPlatformFees: number;
  totalDeliveryCuts: number;
  totalRestaurantCommissions: number;
  totalRideCommissions: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<BrandTheme>('panda');
  const [serviceTab, setServiceTab] = useState<ServiceTab>('food');
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [userProfileOpen, setUserProfileOpen] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState(
    'SM City Cabanatuan, Maharlika Highway, Cabanatuan City'
  );
  const [currentOperatingCity, setCurrentOperatingCity] = useState('Cabanatuan City');
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [linkedAccountsModalOpen, setLinkedAccountsModalOpen] = useState(false);

  const detectGPSLocation = async (): Promise<string> => {
    return new Promise((resolve) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            // High accuracy position mapped to local Cabanatuan City landmark
            const detected = `Current GPS Location (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}) · Cabanatuan City`;
            setDeliveryAddress(detected);
            setCurrentOperatingCity('Cabanatuan City');
            resolve(detected);
          },
          () => {
            // Fallback default
            const fallback = 'SM City Cabanatuan, Maharlika Highway, Cabanatuan City';
            setDeliveryAddress(fallback);
            setCurrentOperatingCity('Cabanatuan City');
            resolve(fallback);
          },
          { timeout: 5000 }
        );
      } else {
        const fallback = 'SM City Cabanatuan, Maharlika Highway, Cabanatuan City';
        setDeliveryAddress(fallback);
        resolve(fallback);
      }
    });
  };

  const handleLinkAccount = (
    type: 'gcash' | 'bank' | 'maya',
    providerName: string,
    accountNumber: string,
    holderName: string
  ) => {
    if (!user) return;
    const updated = addLinkedAccount(user.id, { type, providerName, accountNumber, holderName });
    if (updated) setUser(updated);
  };

  const handleUnlinkAccount = (accId: string) => {
    if (!user) return;
    const updated = removeLinkedAccount(user.id, accId);
    if (updated) setUser(updated);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<{ item: MenuItem; restaurant: Restaurant } | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [orderTrackerOpen, setOrderTrackerOpen] = useState(false);
  const [orderHistoryOpen, setOrderHistoryOpen] = useState(false);

  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);

  // Rain Weather Feature
  const [isRaining, setIsRaining] = useState<boolean>(true); // Default to rainy to showcase the feature immediately!

  // VIP Subscription Feature (30% off food delivery & rides)
  const [isVipSubscriber, setIsVipSubscriber] = useState<boolean>(false);
  const [vipModalOpen, setVipModalOpen] = useState<boolean>(false);

  // Dynamic Restaurants & Groceries List
  const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>(RESTAURANTS_DATA);
  const [merchantModalOpen, setMerchantModalOpen] = useState<boolean>(false);

  // Rider & Owner Financial State
  const [riderOnline, setRiderOnline] = useState(true);
  const [riderEarningsList, setRiderEarningsList] = useState<RiderEarningEntry[]>(INITIAL_RIDER_EARNINGS);
  const [ownerTransactions, setOwnerTransactions] = useState<PlatformTransaction[]>(INITIAL_OWNER_TRANSACTIONS);

  // Initialize auth
  useEffect(() => {
    initializeAuthStore().then(() => {
      const u = getCurrentUser();
      if (u) setUser(u);
    });
  }, []);

  // Sync theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Simulated live progression for active orders
  useEffect(() => {
    if (orders.length === 0) return;
    const interval = setInterval(() => {
      setOrders(prevOrders =>
        prevOrders.map(order => {
          if (order.status === 'Delivered') return order;
          const nextPercent = Math.min(100, order.progressPercent + 3);
          let nextStatus: OrderStatus = order.status;
          let minutesLeft = Math.max(1, Math.round((100 - nextPercent) / 4));

          if (nextPercent >= 100) {
            nextStatus = 'Delivered';
            minutesLeft = 0;
          } else if (nextPercent >= 65) {
            nextStatus = 'Out for Delivery';
          } else if (nextPercent >= 25) {
            nextStatus = 'Preparing';
          } else {
            nextStatus = 'Order Placed';
          }

          return {
            ...order,
            progressPercent: nextPercent,
            status: nextStatus,
            estimatedMinutesLeft: minutesLeft,
          };
        })
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [orders.length]);

  // Simulated progression for active ride
  useEffect(() => {
    if (!activeRide || activeRide.status === 'Completed') return;
    const rideInterval = setInterval(() => {
      setActiveRide(prev => {
        if (!prev || prev.status === 'Completed') return prev;
        if (prev.status === 'Searching Driver') {
          return { ...prev, status: 'Driver On The Way', etaMinutes: 3 };
        } else if (prev.status === 'Driver On The Way') {
          return { ...prev, status: 'Arrived at Pickup', etaMinutes: 0 };
        } else if (prev.status === 'Arrived at Pickup') {
          return { ...prev, status: 'On Trip', etaMinutes: 10 };
        } else if (prev.status === 'On Trip') {
          // Completed ride - record earnings for rider and owner
          const ownerTechCut = Math.round(prev.fare * RIDE_PLATFORM_COMMISSION_RATE);
          const riderFareCut = prev.fare - ownerTechCut;

          setRiderEarningsList(rList => [
            {
              id: `earn-${Date.now()}`,
              orderOrRideId: prev.id,
              type: prev.vehicle.category === 'Motorcycle' ? 'motorcycle_ride' : 'car_ride',
              title: `${prev.vehicle.name}: ${prev.pickupLocation.split(',')[0]} ➔ ${prev.dropoffLocation.split(',')[0]}`,
              baseDeliveryPay: riderFareCut,
              tip: 0,
              totalEarned: riderFareCut,
              timestamp: 'Just now',
              distanceKm: prev.distanceKm,
            },
            ...rList,
          ]);

          setOwnerTransactions(txList => [
            {
              id: `tx-${Date.now()}`,
              orderOrRideId: prev.id,
              serviceType: 'ride',
              description: `${prev.vehicle.name} (${prev.distanceKm} km)`,
              grossAmount: prev.fare,
              restaurantShare: 0,
              riderShare: riderFareCut,
              ownerCommission: {
                foodPlatformFee: 0,
                deliveryCut: 0,
                totalOwnerEarned: ownerTechCut,
              },
              timestamp: 'Just now',
            },
            ...txList,
          ]);

          return { ...prev, status: 'Completed', etaMinutes: 0 };
        }
        return prev;
      });
    }, 7000);
    return () => clearInterval(rideInterval);
  }, [activeRide?.status]);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleLogin = async (email: string, pass: string) => {
    const loggedUser = await loginUser(email, pass);
    setUser(loggedUser);
    setAuthModalOpen(false);
  };

  const handleRegister = async (name: string, email: string, pass: string, phone?: string) => {
    const registeredUser = await registerUser(name, email, pass, phone);
    setUser(registeredUser);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setUserProfileOpen(false);
  };

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      if (prev.length > 0 && prev[0].restaurantId !== newItem.restaurantId) {
        return [newItem];
      }
      return [...prev, newItem];
    });
    setCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.id === cartItemId) {
          const singleUnit = item.itemTotal / item.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotal: singleUnit * newQty,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((acc, it) => acc + it.itemTotal, 0);
  const cartTotalCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  // Profitability calculations when placing an order
  const placeOrder = (orderData: {
    deliveryAddress: string;
    paymentMethod: string;
    tip: number;
    discount: number;
    promoCode?: string;
  }) => {
    if (cart.length === 0) throw new Error('Cart is empty');
    const restName = cart[0].restaurantName;
    const subtotal = cartSubtotal;
    const deliveryFee = 49; // ₱49 standard delivery fee
    const foodAppPlatformFee = APP_OWNER_FEE_FOOD; // ₱10 platform fee charged on food
    const grossTotal = Math.max(0, subtotal + deliveryFee + foodAppPlatformFee + orderData.tip - orderData.discount);

    // Business Profit Splits:
    // 1. Restaurant payout: 85% of food subtotal
    const restaurantCut = subtotal * (1 - RESTAURANT_COMMISSION_RATE);
    // 2. App Owner earnings:
    // - ₱10 platform fee on food
    // - ₱5 delivery dispatch commission
    // - 15% marketplace commission on food subtotal
    const ownerFoodCommission = subtotal * RESTAURANT_COMMISSION_RATE;
    const ownerTotalEarned = APP_OWNER_FEE_FOOD + APP_OWNER_FEE_DELIVERY + ownerFoodCommission;
    // 3. Rider earnings:
    // - Delivery fee minus ₱5 app cut (₱44)
    // - 100% of customer tip
    const riderDeliveryBase = deliveryFee - APP_OWNER_FEE_DELIVERY; // ₱44
    const riderTotalEarned = riderDeliveryBase + orderData.tip;

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      restaurantName: restName,
      items: [...cart],
      subtotal,
      deliveryFee,
      tip: orderData.tip,
      discount: orderData.discount,
      total: grossTotal,
      deliveryAddress: orderData.deliveryAddress,
      paymentMethod: orderData.paymentMethod,
      status: 'Order Placed',
      progressPercent: 15,
      estimatedMinutesLeft: 25,
      rider: {
        name: 'Carlos Mendoza',
        phone: '+63 917 882 1094',
        vehicle: 'Yamaha Aerox 155 (Scooter)',
        plateNumber: 'NCR 4920-PH',
        rating: 4.95,
      },
      messages: [
        {
          id: 'msg-1',
          sender: 'rider',
          text: `Hi ${user?.name || 'Customer'}! I received your order from ${restName}. Heading over to pick it up now! 🛵`,
          timestamp: 'Just now',
        },
      ],
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);

    // Record Rider Earnings entry
    setRiderEarningsList(rList => [
      {
        id: `earn-${Date.now()}`,
        orderOrRideId: newOrder.id,
        type: 'food_delivery',
        title: `${restName} ➔ ${orderData.deliveryAddress.split(',')[0]}`,
        baseDeliveryPay: riderDeliveryBase,
        tip: orderData.tip,
        totalEarned: riderTotalEarned,
        timestamp: 'Just now',
        distanceKm: 2.3,
      },
      ...rList,
    ]);

    // Record Owner Transaction entry
    setOwnerTransactions(txList => [
      {
        id: `tx-${Date.now()}`,
        orderOrRideId: newOrder.id,
        serviceType: 'food',
        description: `Food Order: ${restName} (₱${subtotal} Food + ₱${deliveryFee} Delivery)`,
        grossAmount: grossTotal,
        restaurantShare: restaurantCut,
        riderShare: riderTotalEarned,
        ownerCommission: {
          foodPlatformFee: APP_OWNER_FEE_FOOD,
          deliveryCut: APP_OWNER_FEE_DELIVERY,
          totalOwnerEarned: Math.round(ownerTotalEarned * 100) / 100,
        },
        timestamp: 'Just now',
      },
      ...txList,
    ]);

    clearCart();
    setCheckoutModalOpen(false);
    setCartDrawerOpen(false);
    setOrderTrackerOpen(true);

    if (user && (orderData.paymentMethod.includes('Wallet') || orderData.paymentMethod.includes('Pay'))) {
      updateUserWallet(user.id, -grossTotal);
    }

    return newOrder;
  };

  const sendRiderMessage = (orderId: string, text: string) => {
    if (!text.trim()) return;
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      text: text.trim(),
      timestamp: 'Just now',
    };

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            messages: [...ord.messages, userMsg],
          };
        }
        return ord;
      })
    );

    setTimeout(() => {
      const riderReplies = [
        'Got it! Taking extra care of your food package.',
        'Almost there, arriving in 3 minutes!',
        'Understood boss! See you at the lobby shortly.',
      ];
      const randomReply = riderReplies[Math.floor(Math.random() * riderReplies.length)];
      setOrders(prev =>
        prev.map(ord => {
          if (ord.id === orderId) {
            return {
              ...ord,
              messages: [
                ...ord.messages,
                {
                  id: `msg-reply-${Date.now()}`,
                  sender: 'rider' as const,
                  text: randomReply,
                  timestamp: 'Just now',
                },
              ],
            };
          }
          return ord;
        })
      );
    }, 1200);
  };

  const viewOrderTracker = (orderId: string) => {
    setActiveOrderId(orderId);
    setOrderTrackerOpen(true);
  };

  const activeOrder = orders.find(o => o.id === activeOrderId) || orders[0] || null;

  const bookRide = (
    option: RideOption,
    pickup: string,
    dropoff: string,
    distanceKm: number,
    fare: number
  ) => {
    const drivers = [
      { name: 'Rico Dela Cruz', photo: '👨‍✈️', carModel: option.category === 'Motorcycle' ? 'Honda Click 150i' : 'Toyota Vios 1.5G (Silver)', plateNumber: 'NAA 7732', rating: 4.95, trips: 1420 },
      { name: 'Antonio Santos', photo: '👨‍✈️', carModel: option.category === 'Motorcycle' ? 'Yamaha NMAX 155' : 'Honda City 1.5 RS', plateNumber: 'NDK 9214', rating: 4.88, trips: 890 },
    ];
    const pickedDriver = drivers[Math.floor(Math.random() * drivers.length)];

    const newRide: ActiveRide = {
      id: `RIDE-${Math.floor(100000 + Math.random() * 900000)}`,
      vehicle: option,
      pickupLocation: pickup,
      dropoffLocation: dropoff,
      distanceKm,
      fare,
      status: 'Searching Driver',
      driver: pickedDriver,
      etaMinutes: option.etaMinutes,
      bookedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setActiveRide(newRide);
  };

  const cancelRide = () => {
    setActiveRide(null);
  };

  // Rider Hub Actions
  const cashoutRiderFunds = () => {
    setRiderEarningsList([]);
  };

  const simulateRiderAcceptOrder = () => {
    const bonusEarn = 65;
    const newEntry: RiderEarningEntry = {
      id: `earn-${Date.now()}`,
      orderOrRideId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'food_delivery',
      title: 'Boba Garden ➔ SM City Cabanatuan',
      baseDeliveryPay: 45,
      tip: 20,
      totalEarned: bonusEarn,
      timestamp: 'Just now',
      distanceKm: 1.8,
    };
    setRiderEarningsList(prev => [newEntry, ...prev]);

    // Also credit owner
    setOwnerTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        orderOrRideId: newEntry.orderOrRideId,
        serviceType: 'food',
        description: 'Boba Garden Food Order (₱280)',
        grossAmount: 345,
        restaurantShare: 238,
        riderShare: bonusEarn,
        ownerCommission: {
          foodPlatformFee: 10,
          deliveryCut: 5,
          totalOwnerEarned: 57,
        },
        timestamp: 'Just now',
      },
      ...prev,
    ]);
  };

  const riderTotalEarned = riderEarningsList.reduce((acc, it) => acc + it.totalEarned, 0);
  const riderTodayEarned = riderEarningsList.reduce((acc, it) => acc + it.totalEarned, 0);

  // App Owner Financial KPI calculations
  const totalOwnerNetProfit = ownerTransactions.reduce((acc, it) => acc + it.ownerCommission.totalOwnerEarned, 0);
  const totalFoodPlatformFees = ownerTransactions.filter(t => t.serviceType === 'food').reduce((acc, it) => acc + it.ownerCommission.foodPlatformFee, 0);
  const totalDeliveryCuts = ownerTransactions.filter(t => t.serviceType === 'food').reduce((acc, it) => acc + it.ownerCommission.deliveryCut, 0);
  const totalRestaurantCommissions = ownerTransactions.filter(t => t.serviceType === 'food').reduce((acc, it) => acc + (it.ownerCommission.totalOwnerEarned - it.ownerCommission.foodPlatformFee - it.ownerCommission.deliveryCut), 0);
  const totalRideCommissions = ownerTransactions.filter(t => t.serviceType === 'ride').reduce((acc, it) => acc + it.ownerCommission.totalOwnerEarned, 0);

  const addMerchantStore = (storeData: Omit<Restaurant, 'id'>): Restaurant => {
    const newStore: Restaurant = {
      ...storeData,
      id: `rest-${Date.now()}`,
    };
    setRestaurantsList(prev => [newStore, ...prev]);
    return newStore;
  };

  const addStoreMenuItem = (storeId: string, itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `item-${Date.now()}`,
    };
    setRestaurantsList(prev =>
      prev.map(st => {
        if (st.id === storeId) {
          return {
            ...st,
            menuItems: [newItem, ...st.menuItems],
          };
        }
        return st;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        serviceTab,
        setServiceTab,
        user,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        handleLogin,
        handleRegister,
        handleLogout,
        userProfileOpen,
        setUserProfileOpen,
        deliveryAddress,
        setDeliveryAddress,
        currentOperatingCity,
        setCurrentOperatingCity,
        locationModalOpen,
        setLocationModalOpen,
        detectGPSLocation,
        linkedAccountsModalOpen,
        setLinkedAccountsModalOpen,
        handleLinkAccount,
        handleUnlinkAccount,
        searchQuery,
        setSearchQuery,
        selectedCuisine,
        setSelectedCuisine,
        selectedRestaurant,
        setSelectedRestaurant,
        selectedMenuItem,
        setSelectedMenuItem,
        cart,
        cartDrawerOpen,
        setCartDrawerOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotalCount,
        checkoutModalOpen,
        setCheckoutModalOpen,
        orders,
        activeOrder,
        orderTrackerOpen,
        setOrderTrackerOpen,
        placeOrder,
        sendRiderMessage,
        viewOrderTracker,
        orderHistoryOpen,
        setOrderHistoryOpen,
        activeRide,
        bookRide,
        cancelRide,
        isRaining,
        setIsRaining,
        toggleRainWeather: () => setIsRaining(r => !r),
        isVipSubscriber,
        subscribeToVip: () => {
          setIsVipSubscriber(true);
          setVipModalOpen(false);
        },
        cancelVip: () => setIsVipSubscriber(false),
        vipModalOpen,
        setVipModalOpen,
        merchantModalOpen,
        setMerchantModalOpen,
        restaurantsList,
        addMerchantStore,
        addStoreMenuItem,
        riderOnline,
        setRiderOnline,
        riderEarningsList,
        riderTotalEarned,
        riderTodayEarned,
        cashoutRiderFunds,
        simulateRiderAcceptOrder,
        ownerTransactions,
        totalOwnerNetProfit,
        totalFoodPlatformFees,
        totalDeliveryCuts,
        totalRestaurantCommissions,
        totalRideCommissions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

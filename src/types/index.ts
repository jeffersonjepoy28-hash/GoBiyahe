export type BrandTheme = 'panda' | 'grab';

export type ServiceTab = 'food' | 'rides' | 'rider_hub' | 'owner_hub';

export type AppViewMode = 'customer' | 'rider' | 'owner';

export interface PromoVoucher {
  code: string;
  title: string;
  description: string;
  discountType: 'free_delivery' | 'percentage_ride' | 'percentage_food';
  discountValue: number; // e.g. 10 for 10%
  applicableFor: 'food' | 'rides' | 'all';
  expiresInDays: number;
  expiresAt: string; // ISO string 3 days from now
}

export interface RiderEarningEntry {
  id: string;
  orderOrRideId: string;
  type: 'food_delivery' | 'motorcycle_ride' | 'car_ride';
  title: string;
  baseDeliveryPay: number;
  tip: number;
  totalEarned: number;
  timestamp: string;
  distanceKm: number;
}

export interface PlatformTransaction {
  id: string;
  orderOrRideId: string;
  serviceType: 'food' | 'ride';
  description: string;
  grossAmount: number;
  restaurantShare: number;
  riderShare: number;
  ownerCommission: {
    foodPlatformFee: number; // e.g. 10 pesos
    deliveryCut: number;    // e.g. 5 pesos
    totalOwnerEarned: number;
  };
  timestamp: string;
}

export interface LinkedAccount {
  id: string;
  type: 'gcash' | 'bank' | 'maya';
  providerName: string; // 'GCash', 'BDO Unibank', 'BPI', 'Landbank', 'UnionBank', 'Maya'
  accountNumberMasked: string; // '0917-***-0192' or '****-****-8821'
  accountHolderName: string;
  isDefault: boolean;
  linkedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  isVerified?: boolean;
  verifiedPhone?: boolean;
  verifiedId?: boolean;
  isVipSubscriber?: boolean;
  subscriptionExpiresAt?: string;
  walletBalance: number;
  linkedAccounts?: LinkedAccount[];
  savedAddresses: Array<{
    id: string;
    label: string;
    address: string;
    isDefault?: boolean;
  }>;
  createdAt: string;
}

export interface MenuItemOptionChoice {
  id: string;
  name: string;
  extraPrice: number;
}

export interface MenuItemOption {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  required: boolean;
  choices: MenuItemOptionChoice[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isPopular?: boolean;
  options?: MenuItemOption[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  deliveryFee: number;
  priceTier: '$' | '$$' | '$$$';
  distanceKm: number;
  promoBadge?: string;
  featured?: boolean;
  image: string;
  coverImage?: string;
  menuItems: MenuItem[];
}

export interface CartItemOptionSelected {
  optionName: string;
  choiceName: string;
  extraPrice: number;
}

export interface CartItem {
  id: string; // unique cart entry id
  menuItem: MenuItem;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
  selectedOptions: CartItemOptionSelected[];
  specialInstructions?: string;
  itemTotal: number;
}

export type OrderStatus = 'Order Placed' | 'Preparing' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  createdAt: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tip: number;
  discount: number;
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
  status: OrderStatus;
  progressPercent: number;
  estimatedMinutesLeft: number;
  rider: {
    name: string;
    phone: string;
    vehicle: string;
    plateNumber: string;
    rating: number;
  };
  messages: Array<{
    id: string;
    sender: 'user' | 'rider';
    text: string;
    timestamp: string;
  }>;
}

export type RideVehicleType = 'motorcycle' | 'car' | 'car_xl';

export interface RideOption {
  id: RideVehicleType;
  name: string;
  tagline: string;
  category: 'Motorcycle' | 'Sedan Car' | '6-Seater SUV';
  seats: number;
  baseFare: number;
  perKmRate: number;
  etaMinutes: number;
  image: string;
  perks: string[];
}

export type RideStatus = 'Searching Driver' | 'Driver On The Way' | 'Arrived at Pickup' | 'On Trip' | 'Completed';

export interface ActiveRide {
  id: string;
  vehicle: RideOption;
  pickupLocation: string;
  dropoffLocation: string;
  distanceKm: number;
  fare: number;
  status: RideStatus;
  driver: {
    name: string;
    photo: string;
    carModel: string;
    plateNumber: string;
    rating: number;
    trips: number;
  };
  etaMinutes: number;
  bookedAt: string;
}

import { Restaurant, RideOption, RiderEarningEntry, PlatformTransaction, PromoVoucher } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_food_delivery_1791509887252.jpg';
export const BURGER_IMAGE = '/src/assets/images/artisan_smash_burger_1791509900741.jpg';
export const RAMEN_IMAGE = '/src/assets/images/asian_ramen_bowl_1791509932527.jpg';
export const BOBA_IMAGE = '/src/assets/images/boba_milk_tea_1791509945165.jpg';
export const MOTORCYCLE_IMAGE = '/src/assets/images/ride_motorcycle_taxi_1791510000451.jpg';
export const CAR_IMAGE = '/src/assets/images/ride_urban_car_1791510013549.jpg';

// Financial Commission Constants
export const APP_OWNER_FEE_FOOD = 10;      // ₱10 flat app service fee on food orders
export const APP_OWNER_FEE_DELIVERY = 5;   // ₱5 app dispatch fee from delivery fee
export const RESTAURANT_COMMISSION_RATE = 0.15; // 15% platform commission on food subtotal
export const RIDE_PLATFORM_COMMISSION_RATE = 0.18; // 18% platform commission on rides (rider keeps 82%)

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Smash Lab Artisan Burgers',
    cuisine: 'American · Gourmet Burgers & Fries',
    rating: 4.8,
    reviewCount: 2340,
    deliveryTimeMin: 20,
    deliveryTimeMax: 30,
    deliveryFee: 49,
    priceTier: '$$',
    distanceKm: 1.8,
    promoBadge: '25% OFF with code PANDA25',
    featured: true,
    image: BURGER_IMAGE,
    menuItems: [
      {
        id: 'burger-1',
        name: 'The Double Truffle Smash',
        description: 'Two crispy edged Angus beef patties, aged white cheddar, caramelized shallots, black truffle garlic aioli on toasted brioche.',
        price: 285,
        category: 'Mains',
        image: BURGER_IMAGE,
        isPopular: true,
        options: [
          {
            id: 'patty-size',
            name: 'Choose Size',
            type: 'radio',
            required: true,
            choices: [
              { id: 'size-reg', name: 'Double Patty (Standard)', extraPrice: 0 },
              { id: 'size-triple', name: 'Triple Patty (+100g Beef)', extraPrice: 85 },
            ],
          },
          {
            id: 'burger-addons',
            name: 'Add Extra Goodies',
            type: 'checkbox',
            required: false,
            choices: [
              { id: 'addon-bacon', name: 'Crispy Applewood Bacon', extraPrice: 45 },
              { id: 'addon-egg', name: 'Sunny Side Farm Egg', extraPrice: 30 },
              { id: 'addon-cheese', name: 'Extra Melted Cheddar', extraPrice: 25 },
            ],
          },
        ],
      },
      {
        id: 'burger-2',
        name: 'Classic Smash Deluxe',
        description: 'Single Angus smash patty, American cheese, Roma tomatoes, shredded lettuce, house secret sauce, and sweet dill pickles.',
        price: 210,
        category: 'Mains',
        isPopular: true,
        options: [
          {
            id: 'spice-level',
            name: 'Spice Level',
            type: 'radio',
            required: true,
            choices: [
              { id: 'mild', name: 'Mild (Original)', extraPrice: 0 },
              { id: 'spicy', name: 'Spicy Jalapeño Crunch', extraPrice: 15 },
            ],
          },
        ],
      },
      {
        id: 'burger-3',
        name: 'Rosemary Garlic Skin-on Fries',
        description: 'Golden double-fried Idaho potatoes tossed in fresh minced rosemary, sea salt, and roasted garlic oil.',
        price: 110,
        category: 'Sides',
        isPopular: true,
      },
      {
        id: 'burger-4',
        name: 'Truffle Parmesan Fries',
        description: 'Hand-cut fries smothered in white truffle oil, grated aged Pecorino Romano, and cracked black pepper.',
        price: 145,
        category: 'Sides',
      },
      {
        id: 'burger-5',
        name: 'Salted Caramel Milkshake',
        description: 'Slow-churned Madagascar vanilla bean gelato blended with Maldon smoked salted caramel sauce.',
        price: 150,
        category: 'Desserts',
        isPopular: true,
      },
      {
        id: 'burger-6',
        name: 'Crispy Craft Onion Rings',
        description: 'Thick cut sweet Spanish onions in golden batter with smoky chipotle dip.',
        price: 125,
        category: 'Sides',
      },
    ],
  },
  {
    id: 'rest-2',
    name: 'Tokyo Ramen Jin & Gyoza',
    cuisine: 'Japanese · Tonkotsu Ramen & Bowls',
    rating: 4.9,
    reviewCount: 3810,
    deliveryTimeMin: 25,
    deliveryTimeMax: 35,
    deliveryFee: 49,
    priceTier: '$$',
    distanceKm: 2.4,
    promoBadge: 'Free Delivery on ₱499+',
    featured: true,
    image: RAMEN_IMAGE,
    menuItems: [
      {
        id: 'ramen-1',
        name: 'Special Hakata Tonkotsu Ramen',
        description: 'Rich 16-hour simmered pork bone broth, thin straight noodles, tender chashu pork belly, ajitsuke tamago egg, and nori.',
        price: 360,
        category: 'Mains',
        image: RAMEN_IMAGE,
        isPopular: true,
        options: [
          {
            id: 'noodle-firmness',
            name: 'Noodle Firmness',
            type: 'radio',
            required: true,
            choices: [
              { id: 'firm', name: 'Firm (Kata - Recommended)', extraPrice: 0 },
              { id: 'medium', name: 'Medium (Futsuu)', extraPrice: 0 },
              { id: 'soft', name: 'Soft (Yawa)', extraPrice: 0 },
            ],
          },
          {
            id: 'extra-toppings',
            name: 'Extra Ramen Toppings',
            type: 'checkbox',
            required: false,
            choices: [
              { id: 'extra-chashu', name: 'Extra Chashu Pork (2 slices)', extraPrice: 75 },
              { id: 'extra-egg', name: 'Additional Ramen Egg', extraPrice: 40 },
              { id: 'extra-bamboo', name: 'Seasoned Menma (Bamboo)', extraPrice: 30 },
            ],
          },
        ],
      },
      {
        id: 'ramen-2',
        name: 'Spicy Black Garlic Miso Ramen',
        description: 'Roasted red miso paste, black charred garlic oil (mayu), ground spicy Berkshire pork, and sweet corn.',
        price: 385,
        category: 'Mains',
        isPopular: true,
      },
      {
        id: 'ramen-3',
        name: 'Crispy Pan-Seared Pork Gyoza (6 pcs)',
        description: 'Handcrafted dumplings filled with minced pork, scallions, and ginger with citrus ponzu dip.',
        price: 165,
        category: 'Sides',
        isPopular: true,
      },
      {
        id: 'ramen-4',
        name: 'Chicken Karaage with Japanese Mayo',
        description: 'Boneless ginger-soy marinated fried chicken pieces with lemon wedge and Kewpie mayo.',
        price: 195,
        category: 'Sides',
      },
      {
        id: 'ramen-5',
        name: 'Iced Matcha Green Tea Latte',
        description: 'Pure Uji ceremonial grade matcha whisked with oat milk and lightly sweetened.',
        price: 135,
        category: 'Drinks',
      },
    ],
  },
  {
    id: 'rest-3',
    name: 'Boba Garden & Fresh Teas',
    cuisine: 'Taiwanese · Boba Milk Tea & Fruit Teas',
    rating: 4.7,
    reviewCount: 1980,
    deliveryTimeMin: 15,
    deliveryTimeMax: 25,
    deliveryFee: 39,
    priceTier: '$',
    distanceKm: 1.1,
    promoBadge: 'Buy 1 Get 1 on Milk Tea',
    featured: true,
    image: BOBA_IMAGE,
    menuItems: [
      {
        id: 'boba-1',
        name: 'Tiger Brown Sugar Boba Fresh Milk',
        description: 'Warm slow-cooked brown sugar tapioca pearls, cold creamy fresh milk, and caramelized cream mousse cap.',
        price: 145,
        category: 'Popular',
        image: BOBA_IMAGE,
        isPopular: true,
        options: [
          {
            id: 'sweetness',
            name: 'Sweetness Level',
            type: 'radio',
            required: true,
            choices: [
              { id: 'sweet-100', name: '100% Regular Sweetness', extraPrice: 0 },
              { id: 'sweet-70', name: '70% Less Sweet (Popular)', extraPrice: 0 },
              { id: 'sweet-50', name: '50% Half Sweet', extraPrice: 0 },
              { id: 'sweet-30', name: '30% Micro Sweet', extraPrice: 0 },
            ],
          },
          {
            id: 'ice',
            name: 'Ice Level',
            type: 'radio',
            required: true,
            choices: [
              { id: 'ice-reg', name: 'Regular Ice', extraPrice: 0 },
              { id: 'ice-less', name: 'Less Ice', extraPrice: 0 },
              { id: 'ice-none', name: 'No Ice', extraPrice: 15 },
            ],
          },
          {
            id: 'toppings',
            name: 'Add Extra Toppings',
            type: 'checkbox',
            required: false,
            choices: [
              { id: 'topping-pudding', name: 'Egg Custard Pudding', extraPrice: 25 },
              { id: 'topping-jelly', name: 'Grass Jelly', extraPrice: 20 },
              { id: 'topping-cheesefoam', name: 'Sea Salt Cheese Foam', extraPrice: 35 },
            ],
          },
        ],
      },
      {
        id: 'boba-2',
        name: 'Mango Passionfruit Sparkling Tea',
        description: 'Fresh Taiwanese green tea infused with crushed ripe mango chunks, passionfruit pulp, and chia seeds.',
        price: 135,
        category: 'Drinks',
        isPopular: true,
      },
      {
        id: 'boba-3',
        name: 'Taro Milk Tea with Coconut Jelly',
        description: 'Creamy purple yam tea brewed with roasted oolong notes and soft coconut nata jelly.',
        price: 130,
        category: 'Drinks',
      },
      {
        id: 'boba-4',
        name: 'Golden Egg Tart Trio (3 pcs)',
        description: 'Flaky Portuguese puff pastry crust with caramelized custard filling baked fresh hourly.',
        price: 120,
        category: 'Desserts',
        isPopular: true,
      },
    ],
  },
  {
    id: 'rest-4',
    name: 'Golden Crispy Hot Chicken',
    cuisine: 'Fast Food · Fried Chicken & Tenders',
    rating: 4.6,
    reviewCount: 1650,
    deliveryTimeMin: 18,
    deliveryTimeMax: 28,
    deliveryFee: 49,
    priceTier: '$',
    distanceKm: 2.1,
    promoBadge: 'Free Drink with Combo',
    featured: false,
    image: HERO_IMAGE,
    menuItems: [
      {
        id: 'chk-1',
        name: 'Nashville Hot 4-Piece Tenders Combo',
        description: 'Buttermilk-brined jumbo white meat tenders tossed in cayenne hot honey rub with waffle fries and comeback dip.',
        price: 275,
        category: 'Mains',
        isPopular: true,
        options: [
          {
            id: 'heat-choice',
            name: 'Heat Level',
            type: 'radio',
            required: true,
            choices: [
              { id: 'heat-country', name: 'Country Mild (No Spice)', extraPrice: 0 },
              { id: 'heat-medium', name: 'Medium Kick', extraPrice: 0 },
              { id: 'heat-hot', name: 'Nashville Hot (Fiery)', extraPrice: 0 },
              { id: 'heat-reaper', name: 'Carolina Reaper Extreme', extraPrice: 20 },
            ],
          },
        ],
      },
      {
        id: 'chk-2',
        name: '8-Piece Crispy Golden Wings',
        description: 'Crispy bone-in wings tossed in choice of garlic parmesan or smoky honey barbecue glaze.',
        price: 320,
        category: 'Mains',
      },
      {
        id: 'chk-3',
        name: 'Warm Honey Butter Biscuits (2 pcs)',
        description: 'Flaky layered Southern biscuits brushed with clover honey and melted creamery butter.',
        price: 85,
        category: 'Sides',
      },
    ],
  },
  {
    id: 'rest-5',
    name: 'Bella Napoli Woodfired Pizza',
    cuisine: 'Italian · Artisanal Neapolitan Pizza',
    rating: 4.9,
    reviewCount: 2890,
    deliveryTimeMin: 25,
    deliveryTimeMax: 38,
    deliveryFee: 55,
    priceTier: '$$$',
    distanceKm: 3.2,
    promoBadge: 'Chef Selection',
    featured: true,
    image: HERO_IMAGE,
    menuItems: [
      {
        id: 'piz-1',
        name: 'Margherita DOC Extra',
        description: 'San Marzano tomatoes, imported Campania buffalo mozzarella, fresh sweet basil leaves, and extra virgin olive oil.',
        price: 420,
        category: 'Mains',
        isPopular: true,
      },
      {
        id: 'piz-2',
        name: 'Diavola Spicy Salami',
        description: 'Crushed plum tomato sauce, fior di latte mozzarella, hot Calabrian spianata salami, and chili honey drizzle.',
        price: 480,
        category: 'Mains',
        isPopular: true,
      },
      {
        id: 'piz-4',
        name: 'Classic Venetian Tiramisu',
        description: 'Espresso-soaked ladyfingers, velvety mascarpone cream, and Dutch processed cocoa powder.',
        price: 180,
        category: 'Desserts',
        isPopular: true,
      },
    ],
  },
  {
    id: 'rest-6',
    name: 'Saigon Street Fresh Rolls & Pho',
    cuisine: 'Vietnamese · Pho & Banh Mi',
    rating: 4.8,
    reviewCount: 1420,
    deliveryTimeMin: 20,
    deliveryTimeMax: 32,
    deliveryFee: 45,
    priceTier: '$$',
    distanceKm: 1.9,
    promoBadge: '₱0 Delivery Promo',
    featured: false,
    image: RAMEN_IMAGE,
    menuItems: [
      {
        id: 'vie-1',
        name: 'Hanoi Beef Pho Deluxe',
        description: 'Slow-boiled star anise beef marrow broth, rice noodles, thin sliced ribeye, brisket, and fresh herb basket.',
        price: 330,
        category: 'Mains',
        isPopular: true,
      },
      {
        id: 'vie-2',
        name: 'Lemongrass Pork Banh Mi',
        description: 'Crusty French baguette, grilled lemongrass pork, pate, pickled daikon & carrots, fresh cilantro, and chili.',
        price: 195,
        category: 'Mains',
        isPopular: true,
      },
      {
        id: 'vie-4',
        name: 'Vietnamese Iced Coffee (Ca Phe Sua Da)',
        description: 'Dark roasted Robusta drip coffee stirred with sweet condensed milk over crushed ice.',
        price: 110,
        category: 'Drinks',
        isPopular: true,
      },
    ],
  },
  {
    id: 'rest-7',
    name: 'Wok Master Dim Sum & Noodles',
    cuisine: 'Cantonese · Dim Sum & Claypot',
    rating: 4.7,
    reviewCount: 2100,
    deliveryTimeMin: 22,
    deliveryTimeMax: 35,
    deliveryFee: 49,
    priceTier: '$$',
    distanceKm: 2.7,
    promoBadge: 'Top Rated Asian',
    featured: false,
    image: HERO_IMAGE,
    menuItems: [
      {
        id: 'wok-1',
        name: 'Steamed Crystal Shrimp Dumplings (Har Gow 4 pcs)',
        description: 'Plump wild sea shrimp encased in translucent wheat starch wrappers with bamboo shoots.',
        price: 175,
        category: 'Popular',
        isPopular: true,
      },
      {
        id: 'wok-2',
        name: 'Pork & Shrimp Siu Mai (4 pcs)',
        description: 'Open-topped steamed dumplings filled with Kurobuta pork, tiger shrimp, and orange tobiko.',
        price: 165,
        category: 'Popular',
        isPopular: true,
      },
      {
        id: 'wok-3',
        name: 'Wok-Hei Beef Chow Fun',
        description: 'Wide flat rice noodles flash-seared with marinated beef flank, bean sprouts, and dark soy essence.',
        price: 310,
        category: 'Mains',
      },
    ],
  },
  {
    id: 'rest-8',
    name: 'Verde Bowls & Organic Smoothies',
    cuisine: 'Healthy · Salads, Grain Bowls & Juices',
    rating: 4.9,
    reviewCount: 1150,
    deliveryTimeMin: 15,
    deliveryTimeMax: 25,
    deliveryFee: 45,
    priceTier: '$$',
    distanceKm: 1.5,
    promoBadge: 'Health & Wellness Choice',
    featured: false,
    image: BURGER_IMAGE,
    menuItems: [
      {
        id: 'hlth-1',
        name: 'Wild Salmon Quinoa Warm Bowl',
        description: 'Pan-seared Norwegian salmon, tricolor quinoa, roasted butternut squash, avocado, baby spinach, and lemon tahini dressing.',
        price: 360,
        category: 'Mains',
        isPopular: true,
      },
      {
        id: 'hlth-2',
        name: 'Amazon Acai Power Bowl',
        description: 'Organic blended acai puree topped with crunchy hemp seed granola, banana slices, fresh strawberries, and almond butter.',
        price: 260,
        category: 'Popular',
        isPopular: true,
      },
    ],
  },
];

export const RIDE_OPTIONS: RideOption[] = [
  {
    id: 'motorcycle',
    name: 'GoBiyahe Moto (Motorcycle Taxi)',
    tagline: 'Fastest in traffic · ₱23 per km · 1 Passenger',
    category: 'Motorcycle',
    seats: 1,
    baseFare: 0,
    perKmRate: 23, // ₱23 per km
    etaMinutes: 2,
    image: MOTORCYCLE_IMAGE,
    perks: ['₱23 / km standard rate', 'Free sanitized hair cap & helmet', 'Accident insurance included'],
  },
  {
    id: 'car',
    name: 'GoBiyahe Car (Sedan 4-Seater)',
    tagline: 'Cool AC ride · ₱212 per 3.3 miles · Up to 4 pax',
    category: 'Sedan Car',
    seats: 4,
    baseFare: 0,
    perKmRate: 39.92, // ₱212 per 3.3 miles (5.31 km) = ₱39.92/km
    etaMinutes: 4,
    image: CAR_IMAGE,
    perks: ['₱212 per 3.3 miles (₱64.24/mi)', 'Cold air-conditioned interior', 'Up to 4 passengers with luggage'],
  },
  {
    id: 'car_xl',
    name: 'GoBiyahe Car XL (6-Seater SUV)',
    tagline: 'Spacious SUV · +30% higher fare · Up to 6 pax',
    category: '6-Seater SUV',
    seats: 6,
    baseFare: 0,
    perKmRate: 51.90, // 30% higher than standard car rate = 39.92 * 1.30 = ₱51.90/km
    etaMinutes: 6,
    image: CAR_IMAGE,
    perks: ['30% higher than standard sedan', 'Large boot for airport luggage', 'Spacious 6-passenger cabin'],
  },
];

export const POPULAR_LOCATIONS = [
  { name: 'SM City Cabanatuan', address: 'Maharlika Highway, Brgy. Hermogenes Concepcion, Cabanatuan City', distanceKm: 2.1 },
  { name: 'Robinsons Townville Cabanatuan', address: 'Maharlika Highway, Cabanatuan City', distanceKm: 3.4 },
  { name: 'NE Pacific Mall Cabanatuan', address: 'KM 111 Maharlika Highway, Cabanatuan City', distanceKm: 1.8 },
  { name: 'Megacenter Mall Cabanatuan', address: 'Melencio St, Brgy. San Roque, Cabanatuan City', distanceKm: 2.9 },
  { name: 'Wesleyan University-Philippines', address: 'Mabini Extension, Cabanatuan City', distanceKm: 3.8 },
  { name: 'NEUST Sumacab Main Campus', address: 'Sumacab Este, Cabanatuan City', distanceKm: 4.2 },
  { name: 'Lakewood City Golf & Estates', address: 'Sumacab, Cabanatuan City', distanceKm: 5.1 },
  { name: 'Sangitan Public Market & Terminal', address: 'Brgy. Sangitan East, Cabanatuan City', distanceKm: 2.5 },
  { name: 'Kapitan Pepe Commercial Center', address: 'Kapitan Pepe, Cabanatuan City', distanceKm: 1.9 },
  { name: 'Cabanatuan City Hall & Plaza Lucero', address: 'Plaza Lucero, Cabanatuan City', distanceKm: 3.1 },
];

export const SAVED_ADDRESSES = [
  { id: 'addr-1', label: 'Home', address: 'Blk 12 Lot 4, Lakewood City, Brgy. Sumacab, Cabanatuan City', isDefault: true },
  { id: 'addr-2', label: 'Work', address: 'Near SM City Cabanatuan, Maharlika Highway, Cabanatuan City', isDefault: false },
  { id: 'addr-3', label: 'University', address: 'Wesleyan University, Mabini Extension, Cabanatuan City', isDefault: false },
];


// Seed initial rider earnings history
export const INITIAL_RIDER_EARNINGS: RiderEarningEntry[] = [
  {
    id: 'earn-1',
    orderOrRideId: 'ORD-849102',
    type: 'food_delivery',
    title: 'Smash Lab Artisan Burgers ➔ SM City Cabanatuan',
    baseDeliveryPay: 55,
    tip: 30,
    totalEarned: 85,
    timestamp: '1:15 PM Today',
    distanceKm: 2.2,
  },
  {
    id: 'earn-2',
    orderOrRideId: 'RIDE-391823',
    type: 'motorcycle_ride',
    title: 'GoBiyahe Moto: NEUST Sumacab ➔ Megacenter Mall',
    baseDeliveryPay: 98,
    tip: 20,
    totalEarned: 118,
    timestamp: '11:40 AM Today',
    distanceKm: 4.8,
  },
  {
    id: 'earn-3',
    orderOrRideId: 'ORD-720491',
    type: 'food_delivery',
    title: 'Tokyo Ramen Jin ➔ Wesleyan University',
    baseDeliveryPay: 50,
    tip: 40,
    totalEarned: 90,
    timestamp: '10:20 AM Today',
    distanceKm: 2.5,
  },
];

// Seed initial platform owner transactions & revenue
export const INITIAL_OWNER_TRANSACTIONS: PlatformTransaction[] = [
  {
    id: 'tx-1',
    orderOrRideId: 'ORD-849102',
    serviceType: 'food',
    description: 'Food Order: Smash Lab Burgers (Subtotal: ₱570)',
    grossAmount: 649,
    restaurantShare: 484.50, // 85% of food
    riderShare: 85,         // Delivery fee + tip
    ownerCommission: {
      foodPlatformFee: 10,   // ₱10 food platform fee
      deliveryCut: 5,        // ₱5 delivery dispatch cut
      totalOwnerEarned: 100.50, // 10 + 5 + 15% of 570 (85.50) = ₱100.50!
    },
    timestamp: '1:15 PM Today',
  },
  {
    id: 'tx-2',
    orderOrRideId: 'RIDE-391823',
    serviceType: 'ride',
    description: 'GoBiyahe Moto Ride (Fare: ₱122)',
    grossAmount: 142,
    restaurantShare: 0,
    riderShare: 118,
    ownerCommission: {
      foodPlatformFee: 0,
      deliveryCut: 0,
      totalOwnerEarned: 24, // 18% ride platform fee
    },
    timestamp: '11:40 AM Today',
  },
];

// Active Everyday Promos (3-day expiring vouchers)
export const EVERYDAY_PROMOS: PromoVoucher[] = [
  {
    code: 'FREEDELIVERY',
    title: 'Everyday Free Delivery Promo',
    description: '₱0 delivery fee on any restaurant order in Cabanatuan City (Expires in 3 days)',
    discountType: 'free_delivery',
    discountValue: 49,
    applicableFor: 'food',
    expiresInDays: 3,
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    code: 'BIYAHE10',
    title: '10% OFF Rides (Motorcycle & Car)',
    description: '10% discount on all GoBiyahe Moto & Car bookings in Cabanatuan City (Expires in 3 days)',
    discountType: 'percentage_ride',
    discountValue: 10,
    applicableFor: 'rides',
    expiresInDays: 3,
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    code: 'BIYAHE25',
    title: '25% OFF Welcome Food Feast',
    description: 'Enjoy 25% off food dishes with minimum ₱350 cart',
    discountType: 'percentage_food',
    discountValue: 25,
    applicableFor: 'food',
    expiresInDays: 3,
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];


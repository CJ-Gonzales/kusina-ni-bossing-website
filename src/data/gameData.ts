export interface GalleryItem {
  id: string;
  title: string;
  category: 'Gameplay' | 'Kitchen' | 'Environment' | 'Upgrades';
  image: string;
  caption: string;
  highlight: string;
  specs: {
    resolution: string;
    stage: string;
    focus: string;
  };
}

export interface DishItem {
  id: string;
  name: string;
  tagalogName: string;
  category: 'ulam' | 'sabaw' | 'sizzling' | 'dessert';
  price: number;
  cookTime: string;
  flavor: string;
  ingredients: string[];
  description: string;
  bossingTip: string;
}

export interface CharacterItem {
  id: string;
  name: string;
  role: string;
  catchphrase: string;
  favoriteDish: string;
  patience: 'Low' | 'Medium' | 'High';
  quirk: string;
  orderHabit: string;
}

export interface UpgradeTier {
  level: number;
  name: string;
  cost: string;
  description: string;
  perks: string[];
  unlockedItem: string;
}

export const GAME_URL = 'https://kusina-ni-bossing-2d-karinderya-simulator.ai.studio';

export const GAME_CREDITS = {
  developer: 'CJ Gonzales',
  developerRole: 'Lone Developer & Game Creator',
  developerDescription: 'Indie solo developer who programmed the mechanics, timpla recipes, customer AI, and sukli mental math simulation from scratch.',
  qaTester: 'GR Almoniña',
  qaRole: 'Official Game Tester & QA',
  qaDescription: 'Lead playtester and QA engineer who balanced rush hour timings, stress-tested cash register change logic, and tuned customer patience meters.',
  projectUrl: GAME_URL
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'hero-manila-pasay',
    title: 'Pasay Karinderya Street View',
    category: 'Environment',
    image: '/src/assets/images/hero_karinderya_game_1793625604624.jpg',
    caption: 'Live in-game view of Bossing\'s roadside stall as the Manila-Pasay jeepney rolls past under warm incandescent lights.',
    highlight: 'Real-time in-game day/night ambient lighting and Manila street life simulation.',
    specs: {
      resolution: 'Native In-Game Canvas',
      stage: 'Evening Rush Phase',
      focus: 'Street Life & World Ambience'
    }
  },
  {
    id: 'turo-turo-rush',
    title: 'The Turo-Turo Service Counter',
    category: 'Gameplay',
    image: '/src/assets/images/gameplay_turo_turo_counter_1793625605899.jpg',
    caption: 'In-game rush hour HUD: Maria points at Kare-Kare while the steam rises from the giant stainless Kanin rice cooker.',
    highlight: 'Core order assembly interface, customer speech bubbles, and bayad cash box.',
    specs: {
      resolution: '1440 × 1080 2D Engine',
      stage: 'Day 14 - 12:30 PM Peak',
      focus: 'Customer Queue & Ladle Controls'
    }
  },
  {
    id: 'kitchen-cooking',
    title: 'Kitchen Sauté & Flame Station',
    category: 'Kitchen',
    image: '/src/assets/images/kitchen_cooking_minigame_1793625607461.jpg',
    caption: 'In-game cooking minigame: blue LPG flames, sizzling pork sisig on seasoned cast iron, and prep cutting board.',
    highlight: 'Interactive heat management and real-time cooking ingredient timpla minigame.',
    specs: {
      resolution: 'Interactive Engine View',
      stage: 'Kitchen Prep Minigame',
      focus: 'Gas Flame & Seasoning Timpla'
    }
  },
  {
    id: 'monobloc-upgrade',
    title: 'Fiesta Dining Hall & Videoke',
    category: 'Upgrades',
    image: '/src/assets/images/karinderya_monobloc_upgrade_1793625606488.jpg',
    caption: 'In-game Stage 3 expansion: iconic red and green monobloc chairs, fluttering electric stand fan, and retro videoke.',
    highlight: 'Visual store progression showing customer seating capacity and ambience bonuses.',
    specs: {
      resolution: 'In-Game Scene Render',
      stage: 'Upgraded Eatery Stage 3',
      focus: 'Decor Tree & Suki Dwell Buffs'
    }
  }
];

export const DISHES_DATA: DishItem[] = [
  {
    id: 'adobo',
    name: 'Classic Pork & Chicken Adobo',
    tagalogName: 'Adobong Baboy at Manok',
    category: 'ulam',
    price: 70,
    cookTime: '3.5s simmer',
    flavor: 'Savory, Tangy, Garlic Peppercorn',
    ingredients: ['Pork belly', 'Chicken cuts', 'Cane vinegar', 'Soy sauce', 'Whole peppercorns', 'Toasted garlic'],
    description: 'The undisputed national comfort dish. Braised low and slow until the vinegar mellows into a rich, savory glaze that coats every spoonful of rice.',
    bossingTip: 'Never stir right after pouring vinegar—let it boil uncovered first for that clean, mellow acidity!'
  },
  {
    id: 'sinigang',
    name: 'Tamarind Pork Soup',
    tagalogName: 'Sinigang na Baboy sa Sampalok',
    category: 'sabaw',
    price: 80,
    cookTime: '4.2s boil',
    flavor: 'Tangy Sour, Savory, Herbaceous',
    ingredients: ['Pork ribs', 'Fresh tamarind', 'Kangkong (water spinach)', 'Radish', 'Taro (gabi)', 'Siling haba'],
    description: 'Hot steaming sour soup guaranteed to refresh weary jeepney drivers and students. Made with real crushed sampalok and siling haba for gentle warmth.',
    bossingTip: 'Add mashed gabi (taro) into the broth so the sabaw turns rich and thick.'
  },
  {
    id: 'sisig',
    name: 'Sizzling Crispy Pork Sisig',
    tagalogName: 'Sizzling Sisig na may Itlog',
    category: 'sizzling',
    price: 85,
    cookTime: '2.8s sizzle',
    flavor: 'Smoky, Crispy, Citrusy Chili',
    ingredients: ['Chopped pork mask', 'Chicken liver', 'Red onions', 'Calamansi', 'Thai chili', 'Fresh raw egg'],
    description: 'Served smoking hot on a seasoned cast-iron skillet. The crunchy bits of pork crackle as you break the golden egg yolk and squeeze tart calamansi over the top.',
    bossingTip: 'Sauté the onions last second so they stay crisp and sweet against the rich pork!'
  },
  {
    id: 'kare-kare',
    name: 'Peanut Stew with Bagoong',
    tagalogName: 'Kare-Kareng Baka at Tuwalya',
    category: 'ulam',
    price: 90,
    cookTime: '5.0s slow braise',
    flavor: 'Earthy Peanut, Rich Annatto, Savory Bagoong',
    ingredients: ['Beef shank', 'Tripe', 'Ground roasted peanuts', 'Annatto oil', 'String beans', 'Eggplant', 'Pechay'],
    description: 'A velvety peanut sauce colored with bright red achuete seeds, loaded with tender beef and crisp native greens. Served with spicy bagoong alamang.',
    bossingTip: 'Freshly roasted and ground peanuts beat commercial peanut butter every single time!'
  },
  {
    id: 'lumpia',
    name: 'Crispy Pork Spring Rolls',
    tagalogName: 'Lumpiang Shanghai Espesyal',
    category: 'ulam',
    price: 50,
    cookTime: '2.0s flash fry',
    flavor: 'Golden Crispy, Savory Pork Garlic',
    ingredients: ['Minced pork', 'Carrots', 'Water chestnuts', 'Garlic', 'Egg wrapper', 'Sweet chili dip'],
    description: 'Finger-food royalty that sells out within seconds at every lunch rush. Crispy golden wrappers packed with seasoned pork and paired with sweet chili sauce.',
    bossingTip: 'Roll tight and freeze 10 minutes before deep-frying so the wrapper stays crunchy for hours.'
  },
  {
    id: 'halo-halo',
    name: 'Ultimate Fiesta Halo-Halo',
    tagalogName: 'Halo-Halo Espesyal sa Baso',
    category: 'dessert',
    price: 55,
    cookTime: '1.5s assemble',
    flavor: 'Sweet, Creamy, Icy Refreshment',
    ingredients: ['Fine shaved ice', 'Evaporated milk', 'Sweet red beans', 'Nata de coco', 'Ube halaya', 'Leche flan slice'],
    description: 'The cure for the scorching Manila summer. Layers of sweetened fruits and jellies buried under micro-shaved ice, drenched in rich milk and crowned with leche flan.',
    bossingTip: 'Pack the shaved ice dense and pour milk generously all the way to the bottom!'
  }
];

export const SUKI_CHARACTERS: CharacterItem[] = [
  {
    id: 'erning',
    name: 'Mang Erning',
    role: 'Pasay-Divisoria Jeepney Driver',
    catchphrase: '"Bossing, dagdagan mo ng sabaw ah! Mahaba pa biyahe ko sa traffic."',
    favoriteDish: 'Classic Pork & Chicken Adobo',
    patience: 'High',
    quirk: 'Always asks for extra hot sabaw. Never leaves without wiping the table clean.',
    orderHabit: 'Double Kanin + Adobo combo. Pays in exact ₱5 and ₱10 coins from his fare pouch.'
  },
  {
    id: 'francis',
    name: 'Sir Francis',
    role: 'Night-Shift BPO Team Lead',
    catchphrase: '"Need that sisig sizzle stat. Meeting starts in 15 minutes."',
    favoriteDish: 'Sizzling Crispy Pork Sisig',
    patience: 'Low',
    quirk: 'Always wearing his headset. Tips very generously if served in under 10 seconds.',
    orderHabit: 'Orders sizzling sisig with extra egg and cold iced tea. Always pays with a crisp ₱500 bill.'
  },
  {
    id: 'joyce-tin',
    name: 'Joyce & Tin',
    role: 'University Pre-Med Crammers',
    catchphrase: '"Kuya, unli-rice po tsaka paki-buhos ng sarsa sa kanin!"',
    favoriteDish: 'Crispy Pork Spring Rolls',
    patience: 'Medium',
    quirk: 'Counts their shared budget meticulously. Loves asking for extra free sarsa sauce.',
    orderHabit: 'One order of Lumpia Shanghai + 3 cups of rice to share. Friendly and polite.'
  },
  {
    id: 'aling-baby',
    name: 'Aling Baby',
    role: 'Neighborhood Marites & Suki',
    catchphrase: '"Bossing, ano balita sa kanto? Uy, bawas 5 pesos naman dito o!"',
    favoriteDish: 'Tamarind Pork Soup',
    patience: 'Medium',
    quirk: 'Brings all the latest barangay news. Negotiates for discounts but brings new customers daily.',
    orderHabit: 'Sinigang na Baboy with extra kangkong. Always stays to chat for 20 minutes.'
  },
  {
    id: 'bossing',
    name: 'Chef Bossing',
    role: 'Owner, Head Chef & Mentor',
    catchphrase: '"Lutong bahay na may pagmamahal. Yan ang lihim ng tunay na karinderya!"',
    favoriteDish: 'Peanut Stew with Bagoong',
    patience: 'High',
    quirk: 'The smiling heart of the kitchen. Gives cooking wisdom and rewards players who balance flavor.',
    orderHabit: 'Guides the player on stock levels, burner management, and customer satisfaction.'
  }
];

export const UPGRADE_TIERS: UpgradeTier[] = [
  {
    level: 1,
    name: 'Sidewalk Kariton (Starting Out)',
    cost: 'Day 1 Start',
    description: 'A modest wooden pushcart parked near the jeepney stop with two wooden stools and a single kerosene stove.',
    perks: ['2 food slots', 'Basic adobo and sinigang recipes', 'Up to 3 simultaneous customers'],
    unlockedItem: 'Stainless Caldero Pot #1'
  },
  {
    level: 2,
    name: 'Bubong na Yero (Tin Roof Eatery)',
    cost: '₱3,500 Earned',
    description: 'Corrugated iron roof providing shade from the tropical rain, glass turo-turo counter, and bright red monobloc chairs.',
    perks: ['4 food display trays', 'Giant electric rice cooker', 'Rain protection bonus (+30% customer dwell)'],
    unlockedItem: '4x Iconic Red Monobloc Chairs'
  },
  {
    level: 3,
    name: 'Bossing\'s Diner & Videoke Corner',
    cost: '₱12,000 Earned',
    description: 'Air-conditioned dining space with fluttering electric stand fans, fiesta banderitas, and a glowing retro Videoke jukebox.',
    perks: ['6 food slots with heat lamps', 'Videoke music boost (+50% tips)', 'Unli-rice station for faster service'],
    unlockedItem: 'Vintage Arcade Videoke Jukebox'
  },
  {
    level: 4,
    name: 'Barangay Fiesta Landmark',
    cost: '₱30,000 Earned',
    description: 'The most famous karinderya in the district. VIP catering service, private party reservations, and legendary status.',
    perks: ['All 18 heirloom Filipino recipes unlocked', 'Automated prep apprentice', 'Barangay fiesta catering contracts'],
    unlockedItem: 'Fiesta Gold Platter & Neon Signboard'
  }
];

export interface SukiReview {
  id: string;
  characterId: string;
  author: string;
  role: string;
  rating: number;
  time: string;
  orderedDish: string;
  comment: string;
  sukiBadge: string;
  hilariousHighlight: string;
}

export const SUKI_REVIEWS: SukiReview[] = [
  {
    id: 'rev-erning',
    characterId: 'erning',
    author: 'Mang Erning',
    role: 'Pasay-Divisoria Jeepney Driver',
    rating: 5,
    time: 'Lunch Rush · 1:15 PM',
    orderedDish: 'Classic Pork & Chicken Adobo + Extra Sabaw',
    comment: 'Yung libreng sabaw dito may sahog pang kangkong at taba! Nung na-flat gulong ko sa Pasay Rotonda kaninang tanghali, yung Adobo ni Bossing ang nagbigay sakin ng lakas mag-palit ng interior. 5 stars, babalik ako bukas pagka-garahe!',
    sukiBadge: 'VIP Jeepney Regular (5+ Years)',
    hilariousHighlight: 'Libreng sabaw has actual meat chunks in it'
  },
  {
    id: 'rev-francis',
    characterId: 'francis',
    author: 'Sir Francis',
    role: 'Night-Shift BPO Team Lead',
    rating: 5,
    time: 'Graveyard Shift · 2:40 AM',
    orderedDish: 'Sizzling Crispy Pork Sisig + Mountain Dew',
    comment: 'When production servers crashed at 2:00 AM, Bossing\'s sizzling sisig revived our entire engineering sprint. The raw egg cracked directly on the smoking cast iron is sheer culinary poetry. Docked 0.1 imaginary star because the electric stand fan blew my receipt into table 3, but 10/10 for the chili kick.',
    sukiBadge: 'Graveyard Shift Suki',
    hilariousHighlight: 'Prevented a catastrophic company outage'
  },
  {
    id: 'rev-joyce-tin',
    characterId: 'joyce-tin',
    author: 'Joyce & Tin',
    role: 'University Pre-Med Crammers',
    rating: 5,
    time: 'Student Merienda · 4:20 PM',
    orderedDish: 'Crispy Pork Spring Rolls + 3x Kanin',
    comment: 'Nakapasa kami sa Anatomy prelims dahil sa unli-rice at libreng buhos ng sarsa! Pwede bang mag-aral dito hanggang 10 PM? Mabait pa si Ate cashier, hindi nagagalit kahit tatlong cups of rice bawat isang serving ng Shanghai.',
    sukiBadge: 'Honor Student Budget Planners',
    hilariousHighlight: '3 cups of rice per spring roll survival ratio'
  },
  {
    id: 'rev-aling-baby',
    characterId: 'aling-baby',
    author: 'Aling Baby',
    role: 'Neighborhood Marites & Suki',
    rating: 5,
    time: 'Morning Gossip Hour · 10:30 AM',
    orderedDish: 'Sinigang na Baboy sa Sampalok',
    comment: 'Mas mainit pa yung asim ng sinigang kaysa sa pinakabagong tsismis kay Kapitan! 10 years na akong kumakain dito. Alam na alam ni Bossing na kapag matabang ang sabaw, ipapatawag ko siya agad. Best karinderya sa buong Pasay, pero Bossing bawas 5 pesos naman next time!',
    sukiBadge: 'Official Barangay Marites',
    hilariousHighlight: 'Hotter than neighborhood barangay gossip'
  },
  {
    id: 'rev-kapitan',
    characterId: 'kapitan-jun',
    author: 'Kapitan Jun',
    role: 'Barangay 142 Chairman',
    rating: 5,
    time: 'Barangay Council Meeting · 7:00 PM',
    orderedDish: 'Peanut Stew Kare-Kare with Spicy Bagoong',
    comment: 'Dito ang opisyal na tambayan ng mga tanod pagkatapos ng midnight patrol. Kapag may bisita kaming Mayor mula sa City Hall, kare-kare ni Bossing ang pinapakain namin para approve agad ang barangay resolution. Bossing, yung catering sa fiesta next week ha!',
    sukiBadge: 'Barangay VIP Dignitary',
    hilariousHighlight: 'Approved the city hall barangay resolution'
  },
  {
    id: 'rev-jayson',
    characterId: 'kuya-jayson',
    author: 'Kuya Jayson',
    role: 'Delivery Express Rider',
    rating: 5,
    time: 'Afternoon Refuel · 3:15 PM',
    orderedDish: 'Menudo Supreme + Cold Sago\'t Gulaman',
    comment: 'Bilis mag-balot ni Bossing! Hindi lumalamig o tumatapon ang sabaw kahit dumaan ako sa 15 humps sa lubak-lubak na kalsada papuntang Taft. Plus laging may libreng malamig na tubig sa pitsel para sa mga pawisang rider.',
    sukiBadge: 'Zero-Spill Road Warrior',
    hilariousHighlight: 'Zero soup spillage over 15 street humps'
  }
];

export interface AchievementBadge {
  id: string;
  title: string;
  tagline: string;
  category: 'cooking' | 'speed' | 'life' | 'milestone';
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Mythic';
  description: string;
  progress: number;
  maxProgress: number;
  unit: string;
  isUnlocked: boolean;
  reward: string;
  rewardPerk: string;
  iconKey: 'adobo' | 'speed' | 'rice' | 'gossip' | 'soup' | 'videoke' | 'pautang' | 'typhoon' | 'fiesta';
}

export const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'ach-adobo-100',
    title: '100th Adobo Served',
    tagline: 'The Heirloom Caldero Master',
    category: 'cooking',
    tier: 'Gold',
    description: 'Ladle 100 steaming portions of Bossing\'s slow-simmered pork and chicken adobo without letting the vinegar reduce to char.',
    progress: 100,
    maxProgress: 100,
    unit: 'plates',
    isUnlocked: true,
    reward: 'Golden Stainless Ladle Skin',
    rewardPerk: '+8% Suki Tip Probability across all tables',
    iconKey: 'adobo'
  },
  {
    id: 'ach-fastest-sukli',
    title: 'Fastest Sukli Calculation',
    tagline: 'Lightning Mental Math',
    category: 'speed',
    tier: 'Gold',
    description: 'Dispense the exact change in under 1.5 seconds during a rush hour with zero wrong coins handed over.',
    progress: 100,
    maxProgress: 100,
    unit: 'seconds record',
    isUnlocked: true,
    reward: 'Brass Coin Dispenser Holster',
    rewardPerk: 'Auto-sorts ₱10 and ₱20 coins in the bayad box',
    iconKey: 'speed'
  },
  {
    id: 'ach-unli-rice',
    title: 'Unli-Rice Champion',
    tagline: 'Mountain of Steaming Kanin',
    category: 'speed',
    tier: 'Silver',
    description: 'Scoop 50 consecutive extra-large rice mounds during the 12:30 PM peak rush to satisfy hungry university crammers.',
    progress: 50,
    maxProgress: 50,
    unit: 'cups scooped',
    isUnlocked: true,
    reward: 'Giant 50-Cup Commercial Rice Cooker',
    rewardPerk: 'Rice cooker refill speed increased by 30%',
    iconKey: 'rice'
  },
  {
    id: 'ach-marites-whisperer',
    title: 'Marites Whisperer',
    tagline: 'Barangay Intel Master',
    category: 'life',
    tier: 'Silver',
    description: 'Listen to Aling Baby\'s 3-minute nonstop neighborhood gossip monologue without letting the soup overboil.',
    progress: 1,
    maxProgress: 1,
    unit: 'conversations',
    isUnlocked: true,
    reward: 'Barangay Rumor Mill Ledger',
    rewardPerk: 'Reveals upcoming weather events 1 day in advance',
    iconKey: 'gossip'
  },
  {
    id: 'ach-zero-spill',
    title: 'Zero-Spill Sabaw Master',
    tagline: 'Rock-Steady Waiter Balance',
    category: 'cooking',
    tier: 'Bronze',
    description: 'Serve 30 scalding bowls of sinigang broth across crowded, uneven wooden tables without spilling a single drop.',
    progress: 24,
    maxProgress: 30,
    unit: 'bowls',
    isUnlocked: false,
    reward: 'Non-Slip Gripped Serving Tray',
    rewardPerk: 'Reduces customer patience decay when carrying hot soup',
    iconKey: 'soup'
  },
  {
    id: 'ach-videoke-king',
    title: 'Videoke 100 Score',
    tagline: 'My Way Perfection',
    category: 'life',
    tier: 'Mythic',
    description: 'Hit a perfect 100 score on Frank Sinatra\'s "My Way" on the coin-op videoke machine during a packed Saturday night.',
    progress: 98,
    maxProgress: 100,
    unit: 'points',
    isUnlocked: false,
    reward: 'Dual Echo Golden Microphone',
    rewardPerk: '+50% Customer dwell time and dessert orders',
    iconKey: 'videoke'
  },
  {
    id: 'ach-pautang-survivor',
    title: 'The Pautang Survivor',
    tagline: 'Zero Bad Debts on Payday',
    category: 'milestone',
    tier: 'Gold',
    description: 'Collect 100% of outstanding credit debts from regular suki on the 15th and 30th payday without losing a friendship.',
    progress: 100,
    maxProgress: 100,
    unit: 'settlements',
    isUnlocked: true,
    reward: 'Leather-Bound Red Credit Notebook',
    rewardPerk: 'Earns 5% bonus interest as friendly treats and fruits',
    iconKey: 'pautang'
  },
  {
    id: 'ach-typhoon-hustle',
    title: 'Typhoon Signal #2 Hustle',
    tagline: 'Rain or Shine Resilience',
    category: 'milestone',
    tier: 'Silver',
    description: 'Keep the karinderya running at maximum turnover while heavy monsoon rain lashes against the corrugated tin roof.',
    progress: 18,
    maxProgress: 20,
    unit: 'rain orders',
    isUnlocked: false,
    reward: 'Heavy-Duty Blue Tarpaulin Awnings',
    rewardPerk: 'Hot soup sales boost by +40% during tropical rains',
    iconKey: 'typhoon'
  },
  {
    id: 'ach-fiesta-caterer',
    title: 'Barangay Fiesta Grand Banquet',
    tagline: 'The Ultimate Neighborhood Feast',
    category: 'milestone',
    tier: 'Mythic',
    description: 'Successfully cater Kapitan Jun’s 500-guest Barrio Fiesta feast with 4 roast pigs, 10 calderos of adobo, and infinite unli-rice.',
    progress: 350,
    maxProgress: 500,
    unit: 'guests served',
    isUnlocked: false,
    reward: 'Barangay Hall Hall-of-Fame Plaque',
    rewardPerk: 'Permanently crowns Kusina ni Bossing as a National Landmark',
    iconKey: 'fiesta'
  }
];

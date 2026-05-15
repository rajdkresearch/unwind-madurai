import { Restaurant, MenuItem } from '@/types';

// ── Curated Unsplash food images ──────────────────────────────────────────────
const I = {
  si_breakfast:   'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80&auto=format&fit=crop',
  dosa:           'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80&auto=format&fit=crop',
  pongal:         'https://images.unsplash.com/photo-1603312891082-92543d3ebce0?w=400&q=80&auto=format&fit=crop',
  vada:           'https://images.unsplash.com/photo-1630408670369-b5a55a3e2742?w=400&q=80&auto=format&fit=crop',
  thali:          'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80&auto=format&fit=crop',
  biryani:        'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80&auto=format&fit=crop',
  chicken_curry:  'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80&auto=format&fit=crop',
  curry:          'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80&auto=format&fit=crop',
  mutton:         'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80&auto=format&fit=crop',
  fish:           'https://images.unsplash.com/photo-1562802378-173f87f08c15?w=400&q=80&auto=format&fit=crop',
  prawns:         'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80&auto=format&fit=crop',
  paneer:         'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80&auto=format&fit=crop',
  parotta:        'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80&auto=format&fit=crop',
  shawarma:       'https://images.unsplash.com/photo-1529006557810-274836901ac2?w=400&q=80&auto=format&fit=crop',
  butter_chicken: 'https://images.unsplash.com/photo-1548364538-b77d4b86a62a?w=400&q=80&auto=format&fit=crop',
  tandoori:       'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80&auto=format&fit=crop',
  fried_chicken:  'https://images.unsplash.com/photo-1606728035253-490b4f2b0882?w=400&q=80&auto=format&fit=crop',
  fried_rice:     'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80&auto=format&fit=crop',
  egg_curry:      'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400&q=80&auto=format&fit=crop',
  soup:           'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80&auto=format&fit=crop',
  dessert:        'https://images.unsplash.com/photo-1551024709-8983e7f9d048?w=400&q=80&auto=format&fit=crop',
  coffee:         'https://images.unsplash.com/photo-1497515114865-522d775cebb7?w=400&q=80&auto=format&fit=crop',
  idiyappam:      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80&auto=format&fit=crop',
  kothu_parotta:  'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80&auto=format&fit=crop',
};

export const restaurants: Restaurant[] = [
  {
    id: 'murugan-idli',
    name: 'Murugan Idli Shop',
    cuisine_type: 'South Indian',
    image: '/restaurants/murugan.jpg',
    rating: 4.8,
    prep_time: '25–35 min',
    is_veg: true,
    popular_tag: 'Madurai Legend',
    location: 'K.K. Nagar, Madurai',
  },
  {
    id: 'junior-kuppanna',
    name: 'Hotel Junior Kuppanna',
    cuisine_type: 'Chettinad',
    image: '/restaurants/kuppanna.jpg',
    rating: 4.7,
    prep_time: '30–45 min',
    is_veg: false,
    popular_tag: 'Chettinad Authentic',
    location: 'Bypass Road, Madurai',
  },
  {
    id: 'amma-mess',
    name: 'Amma Mess',
    cuisine_type: 'Traditional Tamil',
    image: '/restaurants/amma.jpg',
    rating: 4.6,
    prep_time: '20–30 min',
    is_veg: false,
    popular_tag: 'Home Style',
    location: 'Town Hall Road, Madurai',
  },
  {
    id: 'ariya-bhavan',
    name: 'Hotel Ariya Bhavan',
    cuisine_type: 'Pure Vegetarian',
    image: '/restaurants/ariya.jpg',
    rating: 4.5,
    prep_time: '20–30 min',
    is_veg: true,
    popular_tag: 'Pure Veg',
    location: 'West Masi Street, Madurai',
  },
  {
    id: 'pandian-biriyani',
    name: 'Pandian Biriyani House',
    cuisine_type: 'Biriyani & Kebabs',
    image: '/restaurants/pandian.jpg',
    rating: 4.6,
    prep_time: '35–50 min',
    is_veg: false,
    popular_tag: 'Madurai Biriyani',
    location: 'Periyar Bus Stand, Madurai',
  },
  {
    id: 'kumar-mess',
    name: 'Kumar Mess',
    cuisine_type: 'Traditional Tamil',
    image: '/restaurants/kumar.jpg',
    rating: 4.5,
    prep_time: '20–30 min',
    is_veg: false,
    popular_tag: 'Local Favourite',
    location: 'Villapuram, Madurai',
  },
  {
    id: 'chandran-mess',
    name: 'Chandran Mess',
    cuisine_type: 'Traditional Tamil',
    image: '/restaurants/chandran.jpg',
    rating: 4.4,
    prep_time: '20–35 min',
    is_veg: false,
    popular_tag: 'Home Cooking',
    location: 'Ellis Nagar, Madurai',
  },
  {
    id: 'konar-mess',
    name: 'Konar Mess',
    cuisine_type: 'Traditional Tamil',
    image: '/restaurants/konar.jpg',
    rating: 4.7,
    prep_time: '25–40 min',
    is_veg: false,
    popular_tag: 'Madurai Classic',
    location: 'Nehru Nagar, Madurai',
  },
  {
    id: 'narayana-hotel',
    name: 'Narayana Hotel',
    cuisine_type: 'South Indian',
    image: '/restaurants/narayana.jpg',
    rating: 4.6,
    prep_time: '20–30 min',
    is_veg: true,
    popular_tag: 'Breakfast Spot',
    location: 'Anna Nagar, Madurai',
  },
  {
    id: 'modern-restaurant',
    name: 'Modern Restaurant',
    cuisine_type: 'Multi-Cuisine',
    image: '/restaurants/modern.jpg',
    rating: 4.3,
    prep_time: '25–40 min',
    is_veg: false,
    popular_tag: 'Family Favourite',
    location: 'Simmedu Kadai, Madurai',
  },
  {
    id: 'temple-city',
    name: 'Temple City Restaurant',
    cuisine_type: 'Chettinad',
    image: '/restaurants/temple-city.jpg',
    rating: 4.5,
    prep_time: '30–45 min',
    is_veg: false,
    popular_tag: 'Heritage Flavours',
    location: 'West Perumal Maistry St, Madurai',
  },
];

export const menuItems: MenuItem[] = [
  // Murugan Idli Shop
  { id: 'mi-1', restaurant_id: 'murugan-idli', name: 'Idli (4 pcs)', description: 'Soft, fluffy idlis served with sambar and 3 chutneys', price: 60, category: 'Breakfast', image: I.si_breakfast, is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'mi-2', restaurant_id: 'murugan-idli', name: 'Masala Dosa', description: 'Crispy dosa with spiced potato filling, sambar & chutney', price: 90, category: 'Breakfast', image: I.dosa, is_veg: true, is_bestseller: true, spice_level: 'medium' },
  { id: 'mi-3', restaurant_id: 'murugan-idli', name: 'Mini Tiffin Box', description: '2 idli, 1 vada, sambar, coconut chutney — classic combo', price: 120, category: 'Combos', image: I.si_breakfast, is_veg: true, spice_level: 'mild' },
  { id: 'mi-4', restaurant_id: 'murugan-idli', name: 'Pongal', description: 'Creamy rice and lentil pongal with ghee, pepper & cashews', price: 80, category: 'Breakfast', image: I.pongal, is_veg: true, spice_level: 'mild' },
  { id: 'mi-5', restaurant_id: 'murugan-idli', name: 'Medu Vada (2 pcs)', description: 'Crispy lentil donuts with sambar and chutney', price: 70, category: 'Snacks', image: I.vada, is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'mi-6', restaurant_id: 'murugan-idli', name: 'Rava Dosa', description: 'Thin, lacy semolina dosa with onions and chillies', price: 100, category: 'Breakfast', image: I.dosa, is_veg: true, spice_level: 'medium' },

  // Junior Kuppanna
  { id: 'jk-1', restaurant_id: 'junior-kuppanna', name: 'Chettinad Chicken Curry', description: 'Aromatic chicken in authentic Chettinad masala with kalpasi & marathi mokku', price: 280, category: 'Main Course', image: I.chicken_curry, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'jk-2', restaurant_id: 'junior-kuppanna', name: 'Mutton Chukka', description: 'Dry-style mutton with Chettinad spice blend, curry leaves & coconut', price: 350, category: 'Main Course', image: I.mutton, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'jk-3', restaurant_id: 'junior-kuppanna', name: 'Chettinad Meals', description: 'Full Chettinad thali: rice, rasam, sambar, kootu, 2 curries, curd', price: 220, category: 'Meals', image: I.thali, is_veg: false, spice_level: 'medium' },
  { id: 'jk-4', restaurant_id: 'junior-kuppanna', name: 'Pepper Chicken Fry', description: 'Succulent chicken pieces stir-fried with black pepper and spices', price: 300, category: 'Starters', image: I.fried_chicken, is_veg: false, spice_level: 'hot' },
  { id: 'jk-5', restaurant_id: 'junior-kuppanna', name: 'Kola Urundai Kuzhambu', description: 'Minced meat balls in a rich Chettinad gravy — house specialty', price: 320, category: 'Main Course', image: I.curry, is_veg: false, is_bestseller: true, spice_level: 'hot' },

  // Amma Mess
  { id: 'am-1', restaurant_id: 'amma-mess', name: 'Amma Special Meals', description: 'Rice, sambar, rasam, keerai, 2 veg curries, fish curry, pappad, curd', price: 180, category: 'Meals', image: I.thali, is_veg: false, is_bestseller: true, spice_level: 'medium' },
  { id: 'am-2', restaurant_id: 'amma-mess', name: 'Fish Kuzhambu', description: 'Fresh fish simmered in tamarind-based Madurai-style gravy', price: 200, category: 'Main Course', image: I.fish, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'am-3', restaurant_id: 'amma-mess', name: 'Mutton Kuzhambu', description: 'Slow-cooked mutton in home-style masala with drumstick', price: 280, category: 'Main Course', image: I.mutton, is_veg: false, spice_level: 'hot' },
  { id: 'am-4', restaurant_id: 'amma-mess', name: 'Prawn Masala', description: 'Juicy prawns in a thick, spiced masala gravy', price: 320, category: 'Main Course', image: I.prawns, is_veg: false, spice_level: 'hot' },

  // Ariya Bhavan
  { id: 'ab-1', restaurant_id: 'ariya-bhavan', name: 'Veg Thali', description: 'Full vegetarian thali: rice, 3 sabzis, dal, roti, raita, dessert', price: 160, category: 'Meals', image: I.thali, is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'ab-2', restaurant_id: 'ariya-bhavan', name: 'Parotta & Kurma', description: '3 layers of flaky parotta with vegetable kurma', price: 100, category: 'Main Course', image: I.parotta, is_veg: true, is_bestseller: true, spice_level: 'medium' },
  { id: 'ab-3', restaurant_id: 'ariya-bhavan', name: 'Gobi 65', description: 'Crispy cauliflower in a tangy, spiced batter', price: 120, category: 'Starters', image: I.fried_chicken, is_veg: true, spice_level: 'medium' },
  { id: 'ab-4', restaurant_id: 'ariya-bhavan', name: 'Paneer Butter Masala', description: 'Creamy tomato gravy with soft paneer cubes and butter', price: 180, category: 'Main Course', image: I.paneer, is_veg: true, spice_level: 'mild' },

  // Pandian Biriyani
  { id: 'pb-1', restaurant_id: 'pandian-biriyani', name: 'Madurai Chicken Biriyani', description: 'Fragrant Seeraga samba rice with succulent chicken — Madurai style', price: 220, category: 'Biriyani', image: I.biryani, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'pb-2', restaurant_id: 'pandian-biriyani', name: 'Mutton Biriyani', description: 'Bone-in mutton pieces layered in aromatic basmati, slow-dum cooked', price: 300, category: 'Biriyani', image: I.biryani, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'pb-3', restaurant_id: 'pandian-biriyani', name: 'Veg Biriyani', description: 'Mixed vegetables and paneer in fragrant seeraga samba rice', price: 160, category: 'Biriyani', image: I.biryani, is_veg: true, spice_level: 'medium' },
  { id: 'pb-4', restaurant_id: 'pandian-biriyani', name: 'Chicken Shawarma', description: 'Middle-Eastern style wrap with juicy chicken and garlic sauce', price: 130, category: 'Rolls & Wraps', image: I.shawarma, is_veg: false, spice_level: 'medium' },
  { id: 'pb-5', restaurant_id: 'pandian-biriyani', name: 'Egg Biriyani', description: 'Perfectly boiled eggs layered with aromatic seeraga samba rice', price: 160, category: 'Biriyani', image: I.biryani, is_veg: false, spice_level: 'medium' },
  { id: 'pb-6', restaurant_id: 'pandian-biriyani', name: 'Biriyani Combo (2 pax)', description: 'Chicken biriyani x2 + raita + shorba + 2 boiled eggs', price: 400, category: 'Combos', image: I.biryani, is_veg: false, is_bestseller: true, spice_level: 'hot' },

  // Kumar Mess
  { id: 'km-1', restaurant_id: 'kumar-mess', name: 'Kumar Special Meals', description: 'Rice, sambar, rasam, kootu, poriyal, mutton curry, appalam & curd', price: 160, category: 'Meals', image: I.thali, is_veg: false, is_bestseller: true, spice_level: 'medium' },
  { id: 'km-2', restaurant_id: 'kumar-mess', name: 'Mutton Kuzhambu', description: 'Slow-cooked mutton in bold Madurai-style gravy with tomato and coconut', price: 260, category: 'Main Course', image: I.mutton, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'km-3', restaurant_id: 'kumar-mess', name: 'Chicken Curry', description: 'Country chicken simmered in ginger-garlic and freshly ground spice paste', price: 220, category: 'Main Course', image: I.chicken_curry, is_veg: false, spice_level: 'hot' },
  { id: 'km-4', restaurant_id: 'kumar-mess', name: 'Fish Fry (2 pcs)', description: 'Fresh river fish marinated in red chilli and turmeric, shallow fried crispy', price: 180, category: 'Starters', image: I.fish, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'km-5', restaurant_id: 'kumar-mess', name: 'Egg Curry', description: 'Hard-boiled eggs dunked in a tangy onion-tomato masala', price: 120, category: 'Main Course', image: I.egg_curry, is_veg: false, spice_level: 'medium' },
  { id: 'km-6', restaurant_id: 'kumar-mess', name: 'Parotta (3 pcs)', description: 'Flaky layered parotta — best paired with any curry', price: 60, category: 'Breads', image: I.parotta, is_veg: true, spice_level: 'mild' },
  { id: 'km-7', restaurant_id: 'kumar-mess', name: 'Mutton Chops', description: 'Tender mutton chops marinated and slow-cooked in masala — weekend special', price: 300, category: 'Main Course', image: I.mutton, is_veg: false, spice_level: 'hot' },

  // Chandran Mess
  { id: 'cm-1', restaurant_id: 'chandran-mess', name: 'Chandran Meals', description: 'Unlimited rice, sambar, rasam, 3 side dishes, mutton curry, buttermilk', price: 170, category: 'Meals', image: I.thali, is_veg: false, is_bestseller: true, spice_level: 'medium' },
  { id: 'cm-2', restaurant_id: 'chandran-mess', name: 'Mutton Sukka', description: 'Dry-roasted mutton with fennel, curry leaves and cracked black pepper', price: 280, category: 'Main Course', image: I.mutton, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'cm-3', restaurant_id: 'chandran-mess', name: 'Chicken Sukka', description: 'Bone-in chicken dry-fried with Madurai-style spice rub', price: 240, category: 'Main Course', image: I.fried_chicken, is_veg: false, spice_level: 'hot' },
  { id: 'cm-4', restaurant_id: 'chandran-mess', name: 'Prawns Pepper Fry', description: 'Juicy prawns tossed with crushed pepper, garlic and curry leaves', price: 300, category: 'Starters', image: I.prawns, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'cm-5', restaurant_id: 'chandran-mess', name: 'Keerai Masiyal', description: 'Mashed spinach cooked with garlic and cumin — comfort side dish', price: 80, category: 'Sides', image: I.curry, is_veg: true, spice_level: 'mild' },
  { id: 'cm-6', restaurant_id: 'chandran-mess', name: 'Idiyappam with Egg Curry', description: '6 soft string hoppers served with flavourful country egg curry', price: 130, category: 'Breakfast', image: I.idiyappam, is_veg: false, spice_level: 'medium' },
  { id: 'cm-7', restaurant_id: 'chandran-mess', name: 'Crab Masala', description: 'Fresh crab cooked in a bold tamarind and chilli masala — seasonal', price: 380, category: 'Main Course', image: I.prawns, is_veg: false, spice_level: 'hot' },

  // Konar Mess
  { id: 'knr-1', restaurant_id: 'konar-mess', name: 'Konar Special Mutton Meals', description: 'Rice, sambar, rasam, kootu, poriyal, mutton varuval, mutton kuzhambu & curd', price: 220, category: 'Meals', image: I.thali, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'knr-2', restaurant_id: 'konar-mess', name: 'Brain Masala', description: 'Tender goat brain cooked with whole spices and green chillies — delicacy', price: 280, category: 'Main Course', image: I.curry, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'knr-3', restaurant_id: 'konar-mess', name: 'Mutton Varuval', description: 'Crispy dry-fried mutton pieces with shallots and stone-ground masala', price: 320, category: 'Main Course', image: I.mutton, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'knr-4', restaurant_id: 'konar-mess', name: 'Liver Fry', description: 'Goat liver stir-fried with onion, chilli and garam masala', price: 200, category: 'Starters', image: I.fried_chicken, is_veg: false, spice_level: 'hot' },
  { id: 'knr-5', restaurant_id: 'konar-mess', name: 'Bone Soup', description: 'Nourishing mutton bone broth with ginger, garlic and herbs', price: 120, category: 'Soups', image: I.soup, is_veg: false, spice_level: 'medium' },
  { id: 'knr-6', restaurant_id: 'konar-mess', name: 'Chicken Kuzhambu', description: 'Country chicken in a rich Konar-style tamarind gravy', price: 240, category: 'Main Course', image: I.chicken_curry, is_veg: false, spice_level: 'hot' },
  { id: 'knr-7', restaurant_id: 'konar-mess', name: 'Mutton Kothu Parotta', description: 'Shredded parotta mixed with mutton, egg and masala on a griddle', price: 200, category: 'Rice & Parotta', image: I.kothu_parotta, is_veg: false, is_bestseller: true, spice_level: 'hot' },

  // Narayana Hotel
  { id: 'nh-1', restaurant_id: 'narayana-hotel', name: 'Idli (4 pcs) + Sambar', description: 'Fluffy steamed idlis with piping hot sambar and three chutneys', price: 60, category: 'Breakfast', image: I.si_breakfast, is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'nh-2', restaurant_id: 'narayana-hotel', name: 'Ghee Pongal', description: 'Creamy rice-moong dal pongal topped with generous ghee, pepper and cashews', price: 90, category: 'Breakfast', image: I.pongal, is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'nh-3', restaurant_id: 'narayana-hotel', name: 'Plain Dosa', description: 'Golden, crispy thin dosa with sambar and coconut chutney', price: 50, category: 'Breakfast', image: I.dosa, is_veg: true, spice_level: 'mild' },
  { id: 'nh-4', restaurant_id: 'narayana-hotel', name: 'Onion Rava Dosa', description: 'Lacy semolina dosa with onion, cumin and green chilli', price: 90, category: 'Breakfast', image: I.dosa, is_veg: true, spice_level: 'medium' },
  { id: 'nh-5', restaurant_id: 'narayana-hotel', name: 'Full Meals (Veg)', description: 'Unlimited rice, sambar, rasam, avial, kootu, poriyal, pickle, papad & payasam', price: 150, category: 'Meals', image: I.thali, is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'nh-6', restaurant_id: 'narayana-hotel', name: 'Parotta + Salna', description: '3 flaky parottas with vegetable salna — a Madurai breakfast staple', price: 80, category: 'Breakfast', image: I.parotta, is_veg: true, spice_level: 'medium' },
  { id: 'nh-7', restaurant_id: 'narayana-hotel', name: 'Filter Coffee', description: 'Traditional South Indian filter coffee — strong decoction with frothy milk', price: 30, category: 'Beverages', image: I.coffee, is_veg: true, spice_level: 'mild' },
  { id: 'nh-8', restaurant_id: 'narayana-hotel', name: 'Sweet Pongal', description: 'Jaggery rice pongal with cardamom, ghee and dry fruits — festive style', price: 70, category: 'Sweets', image: I.dessert, is_veg: true, spice_level: 'mild' },

  // Modern Restaurant
  { id: 'mr-1', restaurant_id: 'modern-restaurant', name: 'Chicken Biriyani', description: 'Madurai-style chicken biriyani with seeraga samba rice, raita and shorba', price: 200, category: 'Biriyani', image: I.biryani, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'mr-2', restaurant_id: 'modern-restaurant', name: 'Tandoori Chicken (half)', description: 'Oven-roasted marinated chicken with mint chutney and onion rings', price: 280, category: 'Starters', image: I.tandoori, is_veg: false, is_bestseller: true, spice_level: 'medium' },
  { id: 'mr-3', restaurant_id: 'modern-restaurant', name: 'Chicken 65', description: 'Spiced deep-fried chicken bites with curry leaves and green chillies', price: 200, category: 'Starters', image: I.fried_chicken, is_veg: false, spice_level: 'hot' },
  { id: 'mr-4', restaurant_id: 'modern-restaurant', name: 'Veg Fried Rice + Gobi Manchurian', description: 'Wok-tossed fried rice paired with crispy Gobi Manchurian', price: 180, category: 'Combos', image: I.fried_rice, is_veg: true, spice_level: 'medium' },
  { id: 'mr-5', restaurant_id: 'modern-restaurant', name: 'Butter Chicken', description: 'Tender chicken in a silky tomato-cream gravy — mildly spiced', price: 260, category: 'Main Course', image: I.butter_chicken, is_veg: false, is_bestseller: true, spice_level: 'mild' },
  { id: 'mr-6', restaurant_id: 'modern-restaurant', name: 'Prawn Biriyani', description: 'Aromatic basmati rice layered with masala prawns — coastal touch', price: 280, category: 'Biriyani', image: I.biryani, is_veg: false, spice_level: 'hot' },
  { id: 'mr-7', restaurant_id: 'modern-restaurant', name: 'Paneer Tikka', description: 'Char-grilled paneer cubes with capsicum and onion in tandoori spices', price: 220, category: 'Starters', image: I.paneer, is_veg: true, spice_level: 'medium' },
  { id: 'mr-8', restaurant_id: 'modern-restaurant', name: 'Family Meals Combo', description: 'Rice, 2 curries, raita, roti (3 pcs), dessert — serves 2', price: 350, category: 'Combos', image: I.thali, is_veg: false, is_bestseller: true, spice_level: 'medium' },

  // Temple City Restaurant
  { id: 'tc-1', restaurant_id: 'temple-city', name: 'Temple City Grand Thali', description: 'Royal spread: rice, 4 curries, dhal, rasam, papad, pickle, kheer — unlimited', price: 250, category: 'Meals', image: I.thali, is_veg: false, is_bestseller: true, spice_level: 'medium' },
  { id: 'tc-2', restaurant_id: 'temple-city', name: 'Chettinad Mutton Kuzhambu', description: 'Aromatic mutton in kalpasi-star anise Chettinad masala — heritage recipe', price: 320, category: 'Main Course', image: I.mutton, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'tc-3', restaurant_id: 'temple-city', name: 'Nandu Rasam (Crab Soup)', description: 'Thin, fragrant crab rasam with pepper and cumin — house speciality', price: 180, category: 'Soups', image: I.soup, is_veg: false, spice_level: 'hot' },
  { id: 'tc-4', restaurant_id: 'temple-city', name: 'Kozhi Chettinad (Chicken)', description: 'Whole spice–marinated chicken in thick Chettinad coconut gravy', price: 290, category: 'Main Course', image: I.chicken_curry, is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'tc-5', restaurant_id: 'temple-city', name: 'Kavuni Arisi Kheer', description: 'Traditional black rice pudding with coconut milk and jaggery', price: 100, category: 'Desserts', image: I.dessert, is_veg: true, spice_level: 'mild' },
  { id: 'tc-6', restaurant_id: 'temple-city', name: 'Idiyappam + Chicken Stew', description: '6 rice noodle hoppers with mild coconut-based chicken stew', price: 160, category: 'Breakfast', image: I.idiyappam, is_veg: false, spice_level: 'mild' },
  { id: 'tc-7', restaurant_id: 'temple-city', name: 'Egg Dosa (Muttai Dosa)', description: 'Crispy dosa topped with scrambled egg and onion masala', price: 90, category: 'Breakfast', image: I.dosa, is_veg: false, spice_level: 'medium' },
  { id: 'tc-8', restaurant_id: 'temple-city', name: 'Prawn Pepper Masala', description: 'Tiger prawns stir-fried in a bold pepper-coconut dry masala', price: 360, category: 'Main Course', image: I.prawns, is_veg: false, spice_level: 'hot' },
];

export function getMenuByRestaurant(restaurantId: string): MenuItem[] {
  return menuItems.filter(item => item.restaurant_id === restaurantId);
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find(r => r.id === id);
}

import { Restaurant, MenuItem } from '@/types';

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
  { id: 'mi-1', restaurant_id: 'murugan-idli', name: 'Idli (4 pcs)', description: 'Soft, fluffy idlis served with sambar and 3 chutneys', price: 60, category: 'Breakfast', image: '/menu/idli.jpg', is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'mi-2', restaurant_id: 'murugan-idli', name: 'Masala Dosa', description: 'Crispy dosa with spiced potato filling, sambar & chutney', price: 90, category: 'Breakfast', image: '/menu/masala-dosa.jpg', is_veg: true, is_bestseller: true, spice_level: 'medium' },
  { id: 'mi-3', restaurant_id: 'murugan-idli', name: 'Mini Tiffin Box', description: '2 idli, 1 vada, sambar, coconut chutney — classic combo', price: 120, category: 'Combos', image: '/menu/tiffin.jpg', is_veg: true, spice_level: 'mild' },
  { id: 'mi-4', restaurant_id: 'murugan-idli', name: 'Pongal', description: 'Creamy rice and lentil pongal with ghee, pepper & cashews', price: 80, category: 'Breakfast', image: '/menu/pongal.jpg', is_veg: true, spice_level: 'mild' },
  { id: 'mi-5', restaurant_id: 'murugan-idli', name: 'Medu Vada (2 pcs)', description: 'Crispy lentil donuts with sambar and chutney', price: 70, category: 'Snacks', image: '/menu/vada.jpg', is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'mi-6', restaurant_id: 'murugan-idli', name: 'Rava Dosa', description: 'Thin, lacy semolina dosa with onions and chillies', price: 100, category: 'Breakfast', image: '/menu/rava-dosa.jpg', is_veg: true, spice_level: 'medium' },

  // Junior Kuppanna
  { id: 'jk-1', restaurant_id: 'junior-kuppanna', name: 'Chettinad Chicken Curry', description: 'Aromatic chicken in authentic Chettinad masala with kalpasi & marathi mokku', price: 280, category: 'Main Course', image: '/menu/chettinad-chicken.jpg', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'jk-2', restaurant_id: 'junior-kuppanna', name: 'Mutton Chukka', description: 'Dry-style mutton with Chettinad spice blend, curry leaves & coconut', price: 350, category: 'Main Course', image: '/menu/mutton-chukka.jpg', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'jk-3', restaurant_id: 'junior-kuppanna', name: 'Chettinad Meals', description: 'Full Chettinad thali: rice, rasam, sambar, kootu, 2 curries, curd', price: 220, category: 'Meals', image: '/menu/chettinad-meals.jpg', is_veg: false, spice_level: 'medium' },
  { id: 'jk-4', restaurant_id: 'junior-kuppanna', name: 'Pepper Chicken Fry', description: 'Succulent chicken pieces stir-fried with black pepper and spices', price: 300, category: 'Starters', image: '/menu/pepper-chicken.jpg', is_veg: false, spice_level: 'hot' },
  { id: 'jk-5', restaurant_id: 'junior-kuppanna', name: 'Kola Urundai Kuzhambu', description: 'Minced meat balls in a rich Chettinad gravy — house specialty', price: 320, category: 'Main Course', image: '/menu/kola-urundai.jpg', is_veg: false, is_bestseller: true, spice_level: 'hot' },

  // Amma Mess
  { id: 'am-1', restaurant_id: 'amma-mess', name: 'Amma Special Meals', description: 'Rice, sambar, rasam, keerai, 2 veg curries, fish curry, pappad, curd', price: 180, category: 'Meals', image: '/menu/amma-meals.jpg', is_veg: false, is_bestseller: true, spice_level: 'medium' },
  { id: 'am-2', restaurant_id: 'amma-mess', name: 'Fish Kuzhambu', description: 'Fresh fish simmered in tamarind-based Madurai-style gravy', price: 200, category: 'Main Course', image: '/menu/fish-curry.jpg', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'am-3', restaurant_id: 'amma-mess', name: 'Mutton Kuzhambu', description: 'Slow-cooked mutton in home-style masala with drumstick', price: 280, category: 'Main Course', image: '/menu/mutton-kuzhambu.jpg', is_veg: false, spice_level: 'hot' },
  { id: 'am-4', restaurant_id: 'amma-mess', name: 'Prawn Masala', description: 'Juicy prawns in a thick, spiced masala gravy', price: 320, category: 'Main Course', image: '/menu/prawn-masala.jpg', is_veg: false, spice_level: 'hot' },

  // Ariya Bhavan
  { id: 'ab-1', restaurant_id: 'ariya-bhavan', name: 'Veg Thali', description: 'Full vegetarian thali: rice, 3 sabzis, dal, roti, raita, dessert', price: 160, category: 'Meals', image: '/menu/veg-thali.jpg', is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'ab-2', restaurant_id: 'ariya-bhavan', name: 'Parotta & Kurma', description: '3 layers of flaky parotta with vegetable kurma', price: 100, category: 'Main Course', image: '/menu/parotta-kurma.jpg', is_veg: true, is_bestseller: true, spice_level: 'medium' },
  { id: 'ab-3', restaurant_id: 'ariya-bhavan', name: 'Gobi 65', description: 'Crispy cauliflower in a tangy, spiced batter', price: 120, category: 'Starters', image: '/menu/gobi65.jpg', is_veg: true, spice_level: 'medium' },
  { id: 'ab-4', restaurant_id: 'ariya-bhavan', name: 'Paneer Butter Masala', description: 'Creamy tomato gravy with soft paneer cubes and butter', price: 180, category: 'Main Course', image: '/menu/paneer-butter.jpg', is_veg: true, spice_level: 'mild' },

  // Pandian Biriyani
  { id: 'pb-1', restaurant_id: 'pandian-biriyani', name: 'Madurai Chicken Biriyani', description: 'Fragrant Seeraga samba rice with succulent chicken — Madurai style', price: 220, category: 'Biriyani', image: '/menu/chicken-biriyani.jpg', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'pb-2', restaurant_id: 'pandian-biriyani', name: 'Mutton Biriyani', description: 'Bone-in mutton pieces layered in aromatic basmati, slow-dum cooked', price: 300, category: 'Biriyani', image: '/menu/mutton-biriyani.jpg', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'pb-3', restaurant_id: 'pandian-biriyani', name: 'Veg Biriyani', description: 'Mixed vegetables and paneer in fragrant seeraga samba rice', price: 160, category: 'Biriyani', image: '/menu/veg-biriyani.jpg', is_veg: true, spice_level: 'medium' },
  { id: 'pb-4', restaurant_id: 'pandian-biriyani', name: 'Chicken Shawarma', description: 'Middle-Eastern style wrap with juicy chicken and garlic sauce', price: 130, category: 'Rolls & Wraps', image: '/menu/shawarma.jpg', is_veg: false, spice_level: 'medium' },
  { id: 'pb-5', restaurant_id: 'pandian-biriyani', name: 'Egg Biriyani', description: 'Perfectly boiled eggs layered with aromatic seeraga samba rice', price: 160, category: 'Biriyani', image: '/menu/egg-biriyani.jpg', is_veg: false, spice_level: 'medium' },
  { id: 'pb-6', restaurant_id: 'pandian-biriyani', name: 'Biriyani Combo (2 pax)', description: 'Chicken biriyani x2 + raita + shorba + 2 boiled eggs', price: 400, category: 'Combos', image: '/menu/biriyani-combo.jpg', is_veg: false, is_bestseller: true, spice_level: 'hot' },

  // Kumar Mess
  { id: 'km-1', restaurant_id: 'kumar-mess', name: 'Kumar Special Meals', description: 'Rice, sambar, rasam, kootu, poriyal, mutton curry, appalam & curd', price: 160, category: 'Meals', is_veg: false, is_bestseller: true, spice_level: 'medium' },
  { id: 'km-2', restaurant_id: 'kumar-mess', name: 'Mutton Kuzhambu', description: 'Slow-cooked mutton in bold Madurai-style gravy with tomato and coconut', price: 260, category: 'Main Course', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'km-3', restaurant_id: 'kumar-mess', name: 'Chicken Curry', description: 'Country chicken simmered in ginger-garlic and freshly ground spice paste', price: 220, category: 'Main Course', is_veg: false, spice_level: 'hot' },
  { id: 'km-4', restaurant_id: 'kumar-mess', name: 'Fish Fry (2 pcs)', description: 'Fresh river fish marinated in red chilli and turmeric, shallow fried crispy', price: 180, category: 'Starters', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'km-5', restaurant_id: 'kumar-mess', name: 'Egg Curry', description: 'Hard-boiled eggs dunked in a tangy onion-tomato masala', price: 120, category: 'Main Course', is_veg: false, spice_level: 'medium' },
  { id: 'km-6', restaurant_id: 'kumar-mess', name: 'Parotta (3 pcs)', description: 'Flaky layered parotta — best paired with any curry', price: 60, category: 'Breads', is_veg: true, spice_level: 'mild' },
  { id: 'km-7', restaurant_id: 'kumar-mess', name: 'Mutton Chops', description: 'Tender mutton chops marinated and slow-cooked in masala — weekend special', price: 300, category: 'Main Course', is_veg: false, spice_level: 'hot' },

  // Chandran Mess
  { id: 'cm-1', restaurant_id: 'chandran-mess', name: 'Chandran Meals', description: 'Unlimited rice, sambar, rasam, 3 side dishes, mutton curry, buttermilk', price: 170, category: 'Meals', is_veg: false, is_bestseller: true, spice_level: 'medium' },
  { id: 'cm-2', restaurant_id: 'chandran-mess', name: 'Mutton Sukka', description: 'Dry-roasted mutton with fennel, curry leaves and cracked black pepper', price: 280, category: 'Main Course', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'cm-3', restaurant_id: 'chandran-mess', name: 'Chicken Sukka', description: 'Bone-in chicken dry-fried with Madurai-style spice rub', price: 240, category: 'Main Course', is_veg: false, spice_level: 'hot' },
  { id: 'cm-4', restaurant_id: 'chandran-mess', name: 'Prawns Pepper Fry', description: 'Juicy prawns tossed with crushed pepper, garlic and curry leaves', price: 300, category: 'Starters', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'cm-5', restaurant_id: 'chandran-mess', name: 'Keerai Masiyal', description: 'Mashed spinach cooked with garlic and cumin — comfort side dish', price: 80, category: 'Sides', is_veg: true, spice_level: 'mild' },
  { id: 'cm-6', restaurant_id: 'chandran-mess', name: 'Idiyappam with Egg Curry', description: '6 soft string hoppers served with flavourful country egg curry', price: 130, category: 'Breakfast', is_veg: false, spice_level: 'medium' },
  { id: 'cm-7', restaurant_id: 'chandran-mess', name: 'Crab Masala', description: 'Fresh crab cooked in a bold tamarind and chilli masala — seasonal', price: 380, category: 'Main Course', is_veg: false, spice_level: 'hot' },

  // Konar Mess
  { id: 'knr-1', restaurant_id: 'konar-mess', name: 'Konar Special Mutton Meals', description: 'Rice, sambar, rasam, kootu, poriyal, mutton varuval, mutton kuzhambu & curd', price: 220, category: 'Meals', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'knr-2', restaurant_id: 'konar-mess', name: 'Brain Masala', description: 'Tender goat brain cooked with whole spices and green chillies — delicacy', price: 280, category: 'Main Course', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'knr-3', restaurant_id: 'konar-mess', name: 'Mutton Varuval', description: 'Crispy dry-fried mutton pieces with shallots and stone-ground masala', price: 320, category: 'Main Course', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'knr-4', restaurant_id: 'konar-mess', name: 'Liver Fry', description: 'Goat liver stir-fried with onion, chilli and garam masala', price: 200, category: 'Starters', is_veg: false, spice_level: 'hot' },
  { id: 'knr-5', restaurant_id: 'konar-mess', name: 'Bone Soup', description: 'Nourishing mutton bone broth with ginger, garlic and herbs', price: 120, category: 'Soups', is_veg: false, spice_level: 'medium' },
  { id: 'knr-6', restaurant_id: 'konar-mess', name: 'Chicken Kuzhambu', description: 'Country chicken in a rich Konar-style tamarind gravy', price: 240, category: 'Main Course', is_veg: false, spice_level: 'hot' },
  { id: 'knr-7', restaurant_id: 'konar-mess', name: 'Mutton Kothu Parotta', description: 'Shredded parotta mixed with mutton, egg and masala on a griddle', price: 200, category: 'Rice & Parotta', is_veg: false, is_bestseller: true, spice_level: 'hot' },

  // Narayana Hotel
  { id: 'nh-1', restaurant_id: 'narayana-hotel', name: 'Idli (4 pcs) + Sambar', description: 'Fluffy steamed idlis with piping hot sambar and three chutneys', price: 60, category: 'Breakfast', is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'nh-2', restaurant_id: 'narayana-hotel', name: 'Ghee Pongal', description: 'Creamy rice-moong dal pongal topped with generous ghee, pepper and cashews', price: 90, category: 'Breakfast', is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'nh-3', restaurant_id: 'narayana-hotel', name: 'Plain Dosa', description: 'Golden, crispy thin dosa with sambar and coconut chutney', price: 50, category: 'Breakfast', is_veg: true, spice_level: 'mild' },
  { id: 'nh-4', restaurant_id: 'narayana-hotel', name: 'Onion Rava Dosa', description: 'Lacy semolina dosa with onion, cumin and green chilli', price: 90, category: 'Breakfast', is_veg: true, spice_level: 'medium' },
  { id: 'nh-5', restaurant_id: 'narayana-hotel', name: 'Full Meals (Veg)', description: 'Unlimited rice, sambar, rasam, avial, kootu, poriyal, pickle, papad & payasam', price: 150, category: 'Meals', is_veg: true, is_bestseller: true, spice_level: 'mild' },
  { id: 'nh-6', restaurant_id: 'narayana-hotel', name: 'Parotta + Salna', description: '3 flaky parottas with vegetable salna — a Madurai breakfast staple', price: 80, category: 'Breakfast', is_veg: true, spice_level: 'medium' },
  { id: 'nh-7', restaurant_id: 'narayana-hotel', name: 'Filter Coffee', description: 'Traditional South Indian filter coffee — strong decoction with frothy milk', price: 30, category: 'Beverages', is_veg: true, spice_level: 'mild' },
  { id: 'nh-8', restaurant_id: 'narayana-hotel', name: 'Sweet Pongal', description: 'Jaggery rice pongal with cardamom, ghee and dry fruits — festive style', price: 70, category: 'Sweets', is_veg: true, spice_level: 'mild' },

  // Modern Restaurant
  { id: 'mr-1', restaurant_id: 'modern-restaurant', name: 'Chicken Biriyani', description: 'Madurai-style chicken biriyani with seeraga samba rice, raita and shorba', price: 200, category: 'Biriyani', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'mr-2', restaurant_id: 'modern-restaurant', name: 'Tandoori Chicken (half)', description: 'Oven-roasted marinated chicken with mint chutney and onion rings', price: 280, category: 'Starters', is_veg: false, is_bestseller: true, spice_level: 'medium' },
  { id: 'mr-3', restaurant_id: 'modern-restaurant', name: 'Chicken 65', description: 'Spiced deep-fried chicken bites with curry leaves and green chillies', price: 200, category: 'Starters', is_veg: false, spice_level: 'hot' },
  { id: 'mr-4', restaurant_id: 'modern-restaurant', name: 'Veg Fried Rice + Gobi Manchurian', description: 'Wok-tossed fried rice paired with crispy Gobi Manchurian', price: 180, category: 'Combos', is_veg: true, spice_level: 'medium' },
  { id: 'mr-5', restaurant_id: 'modern-restaurant', name: 'Butter Chicken', description: 'Tender chicken in a silky tomato-cream gravy — mildly spiced', price: 260, category: 'Main Course', is_veg: false, is_bestseller: true, spice_level: 'mild' },
  { id: 'mr-6', restaurant_id: 'modern-restaurant', name: 'Prawn Biriyani', description: 'Aromatic basmati rice layered with masala prawns — coastal touch', price: 280, category: 'Biriyani', is_veg: false, spice_level: 'hot' },
  { id: 'mr-7', restaurant_id: 'modern-restaurant', name: 'Paneer Tikka', description: 'Char-grilled paneer cubes with capsicum and onion in tandoori spices', price: 220, category: 'Starters', is_veg: true, spice_level: 'medium' },
  { id: 'mr-8', restaurant_id: 'modern-restaurant', name: 'Family Meals Combo', description: 'Rice, 2 curries, raita, roti (3 pcs), dessert — serves 2', price: 350, category: 'Combos', is_veg: false, is_bestseller: true, spice_level: 'medium' },

  // Temple City Restaurant
  { id: 'tc-1', restaurant_id: 'temple-city', name: 'Temple City Grand Thali', description: 'Royal spread: rice, 4 curries, dhal, rasam, papad, pickle, kheer — unlimited', price: 250, category: 'Meals', is_veg: false, is_bestseller: true, spice_level: 'medium' },
  { id: 'tc-2', restaurant_id: 'temple-city', name: 'Chettinad Mutton Kuzhambu', description: 'Aromatic mutton in kalpasi-star anise Chettinad masala — heritage recipe', price: 320, category: 'Main Course', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'tc-3', restaurant_id: 'temple-city', name: 'Nandu Rasam (Crab Soup)', description: 'Thin, fragrant crab rasam with pepper and cumin — house speciality', price: 180, category: 'Soups', is_veg: false, spice_level: 'hot' },
  { id: 'tc-4', restaurant_id: 'temple-city', name: 'Kozhi Chettinad (Chicken)', description: 'Whole spice–marinated chicken in thick Chettinad coconut gravy', price: 290, category: 'Main Course', is_veg: false, is_bestseller: true, spice_level: 'hot' },
  { id: 'tc-5', restaurant_id: 'temple-city', name: 'Kavuni Arisi Kheer', description: 'Traditional black rice pudding with coconut milk and jaggery', price: 100, category: 'Desserts', is_veg: true, spice_level: 'mild' },
  { id: 'tc-6', restaurant_id: 'temple-city', name: 'Idiyappam + Chicken Stew', description: '6 rice noodle hoppers with mild coconut-based chicken stew', price: 160, category: 'Breakfast', is_veg: false, spice_level: 'mild' },
  { id: 'tc-7', restaurant_id: 'temple-city', name: 'Egg Dosa (Muttai Dosa)', description: 'Crispy dosa topped with scrambled egg and onion masala', price: 90, category: 'Breakfast', is_veg: false, spice_level: 'medium' },
  { id: 'tc-8', restaurant_id: 'temple-city', name: 'Prawn Pepper Masala', description: 'Tiger prawns stir-fried in a bold pepper-coconut dry masala', price: 360, category: 'Main Course', is_veg: false, spice_level: 'hot' },
];

export function getMenuByRestaurant(restaurantId: string): MenuItem[] {
  return menuItems.filter(item => item.restaurant_id === restaurantId);
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find(r => r.id === id);
}

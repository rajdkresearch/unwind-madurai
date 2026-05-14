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
];

export function getMenuByRestaurant(restaurantId: string): MenuItem[] {
  return menuItems.filter(item => item.restaurant_id === restaurantId);
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find(r => r.id === id);
}

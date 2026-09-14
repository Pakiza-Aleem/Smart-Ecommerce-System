// seed/seedProducts.js - wipes existing products and inserts the ZENTRO catalog
// RUN WITH: npm run seed   (from the server/ folder, after .env is set up)
//
// Note on images: these are neutral placehold.co placeholders (product name on a
// solid background), not real photography, since no real per-product photos are
// available to this script. They render as clean, unrelated-content-free product
// tiles. Swap in real photography URLs later if you have licensed images.

require('dotenv').config();
const connectDB = require('../config/db');
const Product = require('../models/Product');

// --- helpers -------------------------------------------------------------

function placeholderImage(name, bg, fg = 'FFFFFF') {
  const text = encodeURIComponent(name);
  return `https://placehold.co/500x400/${bg}/${fg}?text=${text}&font=roboto`;
}

const REVIEWERS = [
  'Ahmed R.', 'Sara K.', 'Bilal M.', 'Ayesha N.', 'Hamza T.', 'Fatima Z.',
  'Usman A.', 'Zainab I.', 'Omar F.', 'Mahnoor S.', 'Ali H.', 'Sana Q.',
];

let reviewerCursor = 0;
function nextReviewer() {
  const name = REVIEWERS[reviewerCursor % REVIEWERS.length];
  reviewerCursor += 1;
  return name;
}

// build 2-4 varied reviews and derive rating/numReviews from them
function withReviews(product, comments) {
  const reviews = comments.map(([rating, comment]) => ({
    name: nextReviewer(),
    rating,
    comment,
  }));
  const numReviews = reviews.length;
  const rating = Number((reviews.reduce((s, r) => s + r.rating, 0) / numReviews).toFixed(1));
  return { ...product, reviews, numReviews, rating };
}

// category -> background hex, drawn from the ZENTRO palette + neutral shades
const CATEGORY_COLOR = {
  Smartphones: '064E3B',
  Laptops: '022C22',
  Tablets: '0F766E',
  Smartwatches: '134E4A',
  Audio: '1F2937',
  Monitors: '111827',
  Gaming: 'F97316',
  Cameras: '374151',
  'Smart Home': '065F46',
  Networking: '1E3A2F',
  Storage: '3F3F46',
  Accessories: '4B5563',
};

function img(name, category) {
  return placeholderImage(name, CATEGORY_COLOR[category] || '064E3B');
}

// --- catalog ---------------------------------------------------------------

const raw = [
  // ---------------- Smartphones ----------------
  { name: 'Wave Pixel 12', category: 'Smartphones', brand: 'Wave', price: 64999, stock: 24,
    description: 'A mid-range smartphone with a versatile triple camera and all-day battery life.',
    tags: ['phone', 'camera', 'mid-range'],
    specifications: { display: '6.5" AMOLED', ram: '8GB', storage: '128GB', camera: '50MP triple', battery: '5000mAh' } },
  { name: 'Wave Pixel Pro', category: 'Smartphones', brand: 'Wave', price: 134999, stock: 14,
    description: 'Flagship smartphone with a 108MP camera system and fast charging.',
    tags: ['phone', 'flagship', 'camera'],
    specifications: { display: '6.7" AMOLED 120Hz', ram: '12GB', storage: '256GB', camera: '108MP quad', battery: '5000mAh, 67W charging' } },
  { name: 'OrbitPhone SE', category: 'Smartphones', brand: 'Orbit', price: 39999, stock: 30,
    description: 'An affordable smartphone that covers the essentials without compromise.',
    tags: ['phone', 'budget', 'entry-level'],
    specifications: { display: '6.1" LCD', ram: '6GB', storage: '128GB', camera: '48MP dual', battery: '4500mAh' } },

  // ---------------- Laptops ----------------
  { name: 'NovaBook Pro 15', category: 'Laptops', brand: 'Nova', price: 179999, stock: 12,
    description: 'A 15-inch laptop built for programming, design, and everyday productivity.',
    tags: ['laptop', 'programming', 'productivity'],
    specifications: { display: '15.6" FHD', ram: '16GB', storage: '512GB SSD', processor: 'Core i5, 12th Gen', battery: '8 hours' } },
  { name: 'NovaBook Air 13', category: 'Laptops', brand: 'Nova', price: 109999, stock: 20,
    description: 'A light, thin laptop for browsing, office work, and travel.',
    tags: ['laptop', 'ultrabook', 'lightweight'],
    specifications: { display: '13.3" FHD', ram: '8GB', storage: '256GB SSD', processor: 'Core i3, 11th Gen', battery: '10 hours', weight: '1.2kg' } },
  { name: 'GamerX Beast 16', category: 'Laptops', brand: 'GamerX', price: 289999, stock: 6,
    description: 'A high-performance gaming laptop with a dedicated GPU and a 165Hz display.',
    tags: ['laptop', 'gaming', 'performance'],
    specifications: { display: '16" QHD 165Hz', ram: '32GB', storage: '1TB SSD', processor: 'Core i7, 13th Gen', gpu: 'RTX 4060 8GB' } },
  { name: 'NovaBook Ultra 14', category: 'Laptops', brand: 'Nova', price: 219999, stock: 9,
    description: 'A premium 14-inch laptop with an OLED display for creative work.',
    tags: ['laptop', 'creative', 'premium'],
    specifications: { display: '14" OLED 2.8K', ram: '16GB', storage: '1TB SSD', processor: 'Core i7, 13th Gen', battery: '9 hours' } },

  // ---------------- Tablets ----------------
  { name: 'SlateTab 10', category: 'Tablets', brand: 'Slate', price: 54999, stock: 22,
    description: 'A 10-inch tablet for streaming, browsing, and note-taking.',
    tags: ['tablet', 'entertainment', 'note-taking'],
    specifications: { display: '10.4" LCD', ram: '6GB', storage: '128GB', battery: '7000mAh', stylus: 'Optional' } },
  { name: 'SlateTab Mini', category: 'Tablets', brand: 'Slate', price: 44999, stock: 18,
    description: 'A compact 8-inch tablet that fits easily in a bag or one hand.',
    tags: ['tablet', 'compact', 'portable'],
    specifications: { display: '8.3" LCD', ram: '4GB', storage: '64GB', battery: '5000mAh' } },
  { name: 'SlateTab Pro 12', category: 'Tablets', brand: 'Slate', price: 119999, stock: 10,
    description: 'A large, high-resolution tablet built for creative work with stylus support.',
    tags: ['tablet', 'pro', 'stylus'],
    specifications: { display: '12.9" Mini-LED', ram: '8GB', storage: '256GB', battery: '9000mAh', stylus: 'Included' } },

  // ---------------- Smartwatches ----------------
  { name: 'PulseWatch 2', category: 'Smartwatches', brand: 'Pulse', price: 24999, stock: 35,
    description: 'A smartwatch with heart-rate tracking, sleep tracking, and a week-long battery.',
    tags: ['smartwatch', 'fitness', 'health'],
    specifications: { display: '1.4" AMOLED', battery: '7 days', waterResistance: '5 ATM', sensors: 'Heart rate, SpO2' } },
  { name: 'PulseWatch SE', category: 'Smartwatches', brand: 'Pulse', price: 15999, stock: 40,
    description: 'An affordable smartwatch covering notifications, steps, and heart rate.',
    tags: ['smartwatch', 'budget', 'fitness'],
    specifications: { display: '1.3" LCD', battery: '10 days', waterResistance: 'IP68', sensors: 'Heart rate' } },
  { name: 'PulseWatch Active', category: 'Smartwatches', brand: 'Pulse', price: 34999, stock: 20,
    description: 'A rugged smartwatch built for runners, with GPS and multi-sport tracking.',
    tags: ['smartwatch', 'sports', 'gps'],
    specifications: { display: '1.4" AMOLED', battery: '5 days (GPS on)', waterResistance: '10 ATM', gps: 'Built-in' } },

  // ---------------- Audio ----------------
  { name: 'SoundBuds Lite', category: 'Audio', brand: 'Sonic', price: 4999, stock: 60,
    description: 'Affordable true wireless earbuds with a compact charging case.',
    tags: ['earbuds', 'wireless', 'budget'],
    specifications: { battery: '24 hours with case', bluetooth: '5.2', waterResistance: 'IPX4' } },
  { name: 'SoundBuds Pro ANC', category: 'Audio', brand: 'Sonic', price: 14999, stock: 28,
    description: 'Wireless earbuds with active noise cancellation and a transparency mode.',
    tags: ['earbuds', 'anc', 'wireless'],
    specifications: { battery: '30 hours with case', bluetooth: '5.3', anc: 'Yes', waterResistance: 'IPX5' } },
  { name: 'BassBox Speaker 20W', category: 'Audio', brand: 'BassBox', price: 8999, stock: 25,
    description: 'A portable Bluetooth speaker with deep bass and a rugged, waterproof shell.',
    tags: ['speaker', 'portable', 'bluetooth'],
    specifications: { power: '20W', battery: '12 hours', waterResistance: 'IPX7', bluetooth: '5.0' } },

  // ---------------- Monitors ----------------
  { name: 'ViewFrame 24 FHD', category: 'Monitors', brand: 'ViewFrame', price: 22999, stock: 30,
    description: 'A 24-inch monitor for office work and everyday computing.',
    tags: ['monitor', 'office', 'fhd'],
    specifications: { size: '24"', resolution: '1920x1080', refreshRate: '75Hz', panel: 'IPS' } },
  { name: 'ViewFrame 27 Curved', category: 'Monitors', brand: 'ViewFrame', price: 44999, stock: 15,
    description: 'A curved 27-inch monitor for an immersive gaming and viewing experience.',
    tags: ['monitor', 'curved', 'gaming'],
    specifications: { size: '27"', resolution: '2560x1440', refreshRate: '144Hz', panel: 'VA curved' } },
  { name: 'ViewFrame 4K32', category: 'Monitors', brand: 'ViewFrame', price: 79999, stock: 8,
    description: 'A 32-inch 4K monitor built for design, editing, and detail-heavy work.',
    tags: ['monitor', '4k', 'design'],
    specifications: { size: '32"', resolution: '3840x2160', refreshRate: '60Hz', panel: 'IPS' } },

  // ---------------- Gaming ----------------
  { name: 'GamerX Console X', category: 'Gaming', brand: 'GamerX', price: 149999, stock: 10,
    description: 'A home gaming console with 4K output and a large game library.',
    tags: ['console', 'gaming', '4k'],
    specifications: { storage: '1TB SSD', outputResolution: '4K @ 60fps', controllers: '1 included' } },
  { name: 'GamerX Pro Controller', category: 'Gaming', brand: 'GamerX', price: 12999, stock: 40,
    description: 'A wireless controller with programmable back buttons and low input latency.',
    tags: ['controller', 'gaming', 'wireless'],
    specifications: { connectivity: 'Bluetooth + USB-C', battery: '20 hours', programmableButtons: '2' } },
  { name: 'GamerX Headset 7.1', category: 'Gaming', brand: 'GamerX', price: 9999, stock: 32,
    description: 'A gaming headset with 7.1 surround sound and a detachable microphone.',
    tags: ['headset', 'gaming', 'audio'],
    specifications: { sound: '7.1 surround', microphone: 'Detachable', connectivity: '3.5mm / USB' } },

  // ---------------- Cameras ----------------
  { name: 'LensCraft Mirrorless M5', category: 'Cameras', brand: 'LensCraft', price: 189999, stock: 7,
    description: 'A mirrorless camera with a 24MP sensor, suited to hobbyists and enthusiasts.',
    tags: ['camera', 'mirrorless', 'photography'],
    specifications: { sensor: '24MP APS-C', video: '4K @ 30fps', lensMount: 'LC-Mount', stabilization: 'In-body' } },
  { name: 'LensCraft Action Cam', category: 'Cameras', brand: 'LensCraft', price: 34999, stock: 20,
    description: 'A rugged, waterproof action camera for sports and travel.',
    tags: ['camera', 'action', 'waterproof'],
    specifications: { video: '4K @ 60fps', waterResistance: '10m without case', stabilization: 'Electronic' } },
  { name: 'LensCraft Instant C1', category: 'Cameras', brand: 'LensCraft', price: 17999, stock: 25,
    description: 'An instant-print camera for quick, shareable physical photos.',
    tags: ['camera', 'instant-print', 'fun'],
    specifications: { printFormat: 'Credit-card size', flash: 'Built-in', battery: '400 shots per charge' } },

  // ---------------- Smart Home ----------------
  { name: 'HomeSense Hub', category: 'Smart Home', brand: 'HomeSense', price: 12999, stock: 25,
    description: 'A central hub that connects and automates your smart home devices.',
    tags: ['smart home', 'hub', 'automation'],
    specifications: { connectivity: 'Wi-Fi, Zigbee, Bluetooth', voiceAssistant: 'Compatible', appControl: 'Yes' } },
  { name: 'HomeSense Security Cam', category: 'Smart Home', brand: 'HomeSense', price: 8999, stock: 30,
    description: 'A 1080p indoor security camera with motion alerts and night vision.',
    tags: ['smart home', 'camera', 'security'],
    specifications: { resolution: '1080p', nightVision: 'Yes', storage: 'Cloud + microSD' } },
  { name: 'HomeSense Smart Bulb 3-Pack', category: 'Smart Home', brand: 'HomeSense', price: 5999, stock: 40,
    description: 'A set of three color-changing smart bulbs, controllable by app or voice.',
    tags: ['smart home', 'lighting', 'bulbs'],
    specifications: { brightness: '800 lumens', colors: '16 million', control: 'App + voice' } },

  // ---------------- Networking ----------------
  { name: 'NetLink Router AX3000', category: 'Networking', brand: 'NetLink', price: 17999, stock: 22,
    description: 'A dual-band Wi-Fi 6 router for fast, reliable home internet.',
    tags: ['router', 'wifi 6', 'networking'],
    specifications: { standard: 'Wi-Fi 6 (AX3000)', bands: 'Dual-band', ports: '4x Gigabit LAN' } },
  { name: 'NetLink Mesh 3-Pack', category: 'Networking', brand: 'NetLink', price: 32999, stock: 14,
    description: 'A 3-piece mesh Wi-Fi system for whole-home coverage without dead zones.',
    tags: ['mesh', 'wifi', 'networking'],
    specifications: { coverage: 'Up to 6000 sq ft', standard: 'Wi-Fi 6', units: '3' } },
  { name: 'NetLink Travel Modem', category: 'Networking', brand: 'NetLink', price: 8999, stock: 18,
    description: 'A pocket-sized 4G modem/hotspot for internet access on the go.',
    tags: ['modem', 'hotspot', '4g'],
    specifications: { connectivity: '4G LTE', battery: '10 hours', devicesSupported: 'Up to 10' } },

  // ---------------- Storage ----------------
  { name: 'DriveVault SSD 1TB', category: 'Storage', brand: 'DriveVault', price: 14999, stock: 35,
    description: 'A fast internal SATA SSD for upgrading a laptop or desktop.',
    tags: ['ssd', 'storage', 'internal'],
    specifications: { capacity: '1TB', interface: 'SATA III', readSpeed: '560MB/s' } },
  { name: 'DriveVault Portable HDD 2TB', category: 'Storage', brand: 'DriveVault', price: 10999, stock: 28,
    description: 'A portable external hard drive for backups and extra storage on the move.',
    tags: ['hdd', 'external', 'portable'],
    specifications: { capacity: '2TB', interface: 'USB 3.0', weight: '180g' } },
  { name: 'DriveVault NVMe 2TB', category: 'Storage', brand: 'DriveVault', price: 27999, stock: 16,
    description: 'A high-speed NVMe SSD for gaming rigs and content-creation workstations.',
    tags: ['ssd', 'nvme', 'high-speed'],
    specifications: { capacity: '2TB', interface: 'PCIe 4.0 NVMe', readSpeed: '5000MB/s' } },

  // ---------------- Accessories ----------------
  { name: 'MechType Keyboard', category: 'Accessories', brand: 'MechType', price: 8999, stock: 24,
    description: 'A mechanical keyboard with blue switches and per-key RGB lighting.',
    tags: ['keyboard', 'mechanical', 'gaming'],
    specifications: { switches: 'Blue (clicky)', backlight: 'RGB', connectivity: 'USB-C wired' } },
  { name: 'ErgoMouse 3', category: 'Accessories', brand: 'ErgoTech', price: 3499, stock: 38,
    description: 'An ergonomic wireless mouse designed for long work sessions.',
    tags: ['mouse', 'ergonomic', 'wireless'],
    specifications: { dpi: 'Up to 4000', connectivity: 'Wireless 2.4GHz', battery: '3 months per charge' } },
  { name: 'ChargeHub 65W GaN', category: 'Accessories', brand: 'ChargeHub', price: 5999, stock: 45,
    description: 'A compact 65W GaN charger with three ports for laptops, phones, and tablets.',
    tags: ['charger', 'gan', 'fast charging'],
    specifications: { power: '65W', ports: '2x USB-C, 1x USB-A', technology: 'GaN' } },
];

const products = raw.map((p) =>
  withReviews(
    { ...p, image: img(p.name, p.category) },
    [
      [5, `Really happy with the ${p.name.split(' ')[0]} lineup, works exactly as described.`],
      [4, 'Good value for the price, would recommend to a friend.'],
      [Math.random() > 0.5 ? 5 : 3, 'Delivery was quick and packaging was solid.'],
    ]
  )
);

// --- run ---------------------------------------------------------------

async function run() {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} ZENTRO products across ${new Set(products.map((p) => p.category)).size} categories.`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

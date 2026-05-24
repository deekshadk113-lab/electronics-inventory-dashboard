export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  warrantyExpiry: string;
};

export type Sale = { month: string; revenue: number; units: number };

const categories = ["Laptops", "Smartphones", "Audio", "Wearables", "Cameras", "Accessories"];
const names = [
  "Quantum X1 Laptop", "Nebula Pro Phone", "Pulse Buds 3", "Aurora Watch", "Lumen DSLR Z",
  "Vortex Gaming Rig", "Eclipse Tablet", "Sonic Speaker M", "Halo VR Headset", "Photon Drone 4K",
  "Nova SSD 2TB", "Stellar Charger", "Orbit Smart Hub", "Flux Mechanical KB", "Glide Mouse Pro",
];

const today = new Date();
const futureDate = (days: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const mockProducts: Product[] = names.map((n, i) => ({
  id: i + 1,
  name: n,
  category: categories[i % categories.length],
  price: Math.round(80 + Math.random() * 2400),
  stock: Math.floor(Math.random() * 60),
  sold: Math.floor(20 + Math.random() * 480),
  warrantyExpiry: futureDate(Math.floor(-30 + Math.random() * 400)),
}));

export const mockSales: Sale[] = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
].map((m, i) => ({
  month: m,
  revenue: Math.round(40000 + Math.random() * 90000 + i * 3500),
  units: Math.round(200 + Math.random() * 600),
}));
// ==========================
// ✅ Importing Product Images
// ==========================
import bridal from "../assets/Bridal Jewellery.jpeg";
import choker from "../assets/BRIDAL CHOKER 1.jpeg";
import earring1 from "../assets/EARRING 1.jpeg";
import ring1 from "../assets/RING 1.jpeg";
import pendant1 from "../assets/PENDANT 1.jpeg";
import goldset from "../assets/GOLD JEWELLERY SET 1.jpeg";
import neckpiece from "../assets/NECKPIECE NEW ARRIVAL.jpeg";
import fashion from "../assets/Fashion Jewellery.jpeg";

// ==========================
// ✅ Collection Images
// ==========================
import bangle1 from "../assets/BANGLE 1 COLLECTION.jpeg";
import bangle2 from "../assets/BANGLE 2 COLLECTION.jpeg";
import bangle3 from "../assets/BANGLE 3 COLLECTION.jpeg";
import bracelet1 from "../assets/bracelet_1_collection.jpeg";
import bracelet2 from "../assets/bracelet_2_collection.jpeg";
import bracelet3 from "../assets/bracelet_3_collection.jpeg";
import miniEarring2 from "../assets/mini_earring_2_collection.jpeg";
import bridalChoker1 from "../assets/BRIDAL CHOKER 1 COLLECTION.jpeg";
import bridalChoker2 from "../assets/BRIDAL CHOKER 2 COLLECTION.jpeg";
import bridalChoker3 from "../assets/BRIDAL CHOKER 3 COLLECTION.jpeg";
import bridalChoker4 from "../assets/BRIDAL CHOKER 4 COLLECTION.jpeg";
import bridal1 from "../assets/BRIDAL JEWELLRY 1 COLLECTION.jpeg";
import bridal2 from "../assets/BRIDAL JEWELLRY 2 COLLECTION.jpeg";
import choker1 from "../assets/CHOKER 1 COLLECTION.jpeg";
import choker3 from "../assets/CHOKER 3 COLLECTION.jpeg";
import choker4 from "../assets/CHOKER 4 COLLECTION.jpeg";
import choker5 from "../assets/CHOKER 5 COLLECTION.jpeg";
import choker6 from "../assets/CHOKER 6 COLLECTION.jpeg";
import earring2 from "../assets/EARRING 2 COLLECTION.jpeg";
import earring3 from "../assets/EARRING 3 COLLECTION.jpeg";
import earring4 from "../assets/EARRING 4 COLLECTION.jpeg";
import fashionEarring1 from "../assets/FASHION EARRING 1 COLLECTION.jpeg";
import goldEarring1 from "../assets/GOLD EARRING 1 COLLECTION.jpeg";
import goldSet1 from "../assets/GOLD JEWELLRY SET 1 COLLECTION.jpeg";
import miniEarring1 from "../assets/MINI EARRING 1 COLLECTION.jpeg";
import necklace1 from "../assets/NECKLACE 1 COLLECTION.jpeg";
import necklace2 from "../assets/NECKLACE 2 COLLECTION.jpeg";
import pendant2 from "../assets/PENDANT 2 COLLECTION.jpeg";
import pendant3 from "../assets/PENDANT 3 COLLECTION.jpeg";
import ring2 from "../assets/RING 2 COLLECTION.jpeg";
import ring3 from "../assets/RING 3 COLLECTION.jpeg";
import ring4 from "../assets/RING 4 COLLECTION.jpeg";
import ring5 from "../assets/RING 5 COLLECTION.jpeg";
import silverSet1 from "../assets/SILVER JEWELLRY SET 1 COLLECTION.jpeg";
import silverSet2 from "../assets/SILVER JEWELLRY SET 2 COLLECTION.jpeg";
import silverSet3 from "../assets/SILVER JEWELLRY SET 3 COLLECTION.jpeg";
import silverSet4 from "../assets/SILVER JEWELLRY SET 4 COLLECTION.jpeg";
import stylishBangle1 from "../assets/STYLISH BANGLE 1 COLLECTION.jpeg";
import stylishBangle2 from "../assets/STYLISH BANGLE 2 COLLECTION.jpeg";
import stylishPendant1 from "../assets/STYLISH PENDENT 1 COLLECTION.jpeg";

// ==========================
// ✅ Combined Product Data (added 'type' field for filtering)
// ==========================
export const allProducts = [
  // ===== New Arrivals =====
  { id: 1, name: "Bridal Jewellery Set", image: bridal, price: "₹5,499", offer: "15% OFF", category: "new-arrival", type: "bridal" },
  { id: 2, name: "Choker Necklace", image: choker, price: "₹2,299", offer: "10% OFF", category: "new-arrival", type: "choker" },
  { id: 3, name: "Earring Collection", image: earring1, price: "₹1,099", offer: "New Arrival", category: "new-arrival", type: "earring" },
  { id: 4, name: "Ring Collection", image: ring1, price: "₹999", offer: "Limited Offer", category: "new-arrival", type: "ring" },
  { id: 5, name: "Neckpiece Charm", image: neckpiece, price: "₹2,799", offer: "Buy 1 Get 1", category: "new-arrival", type: "necklace" },
  { id: 6, name: "Gold Jewellery Set", image: goldset, price: "₹3,499", offer: "20% OFF", category: "new-arrival", type: "set" },
  { id: 7, name: "Elegant Pendant", image: pendant1, price: "₹1,599", offer: "10% OFF", category: "new-arrival", type: "pendant" },
  { id: 8, name: "Fashion Jewellery", image: fashion, price: "₹1,899", offer: "Special Offer", category: "new-arrival", type: "fashion" },

  // ===== Collections =====

  { id: 10, name: "Elegant Bangle", image: bangle2, price: "₹2,199", offer: "10% OFF", category: "collection", type: "bangle" },

  { id: 12, name: "Bracelet Charm", image: bracelet1, price: "₹1,499", offer: "20% OFF", category: "collection", type: "bracelet" },
  { id: 13, name: "Graceful Bracelet", image: bracelet2, price: "₹1,599", offer: "Buy 1 Get 1", category: "collection", type: "bracelet" },
  { id: 14, name: "Trendy Bracelet", image: bracelet3, price: "₹1,799", offer: "Limited Offer", category: "collection", type: "bracelet" },
  { id: 9, name: "Bangle Beauty", image: bangle1, price: "₹1,999", offer: "15% OFF", category: "collection", type: "bangle" },
  { id: 15, name: "Bridal Choker", image: bridalChoker1, price: "₹3,999", offer: "New Arrival", category: "collection", type: "choker" },
  { id: 16, name: "Royal Bridal Choker", image: bridalChoker2, price: "₹4,299", offer: "20% OFF", category: "collection", type: "choker" },
  { id: 11, name: "Royal Bangle", image: bangle3, price: "₹1,899", offer: "New Arrival", category: "collection", type: "bangle" },
  { id: 17, name: "Pearl Bridal Choker", image: bridalChoker3, price: "₹4,499", offer: "15% OFF", category: "collection", type: "choker" },
  { id: 18, name: "Crystal Bridal Choker", image: bridalChoker4, price: "₹3,899", offer: "Special Offer", category: "collection", type: "choker" },
  { id: 19, name: "Bridal Jewellery Set", image: bridal1, price: "₹5,999", offer: "25% OFF", category: "collection", type: "bridal" },
  { id: 20, name: "Queen Bridal Set", image: bridal2, price: "₹6,199", offer: "10% OFF", category: "collection", type: "bridal" },
  { id: 21, name: "Classic Choker", image: choker1, price: "₹2,299", offer: "New Arrival", category: "collection", type: "choker" },
  { id: 22, name: "Gold Choker", image: choker3, price: "₹2,499", offer: "20% OFF", category: "collection", type: "choker" },
  { id: 23, name: "Silver Choker", image: choker4, price: "₹2,099", offer: "Limited Offer", category: "collection", type: "choker" },
  { id: 24, name: "Stone Choker", image: choker5, price: "₹2,899", offer: "10% OFF", category: "collection", type: "choker" },
  { id: 25, name: "Ruby Choker", image: choker6, price: "₹2,799", offer: "Buy 1 Get 1", category: "collection", type: "choker" },
  { id: 26, name: "Earring Collection", image: earring2, price: "₹999", offer: "15% OFF", category: "collection", type: "earring" },
  { id: 27, name: "Trendy Earrings", image: earring3, price: "₹1,099", offer: "New Arrival", category: "collection", type: "earring" },
  { id: 28, name: "Elegant Earrings", image: earring4, price: "₹1,299", offer: "10% OFF", category: "collection", type: "earring" },
  { id: 29, name: "Fashion Earrings", image: fashionEarring1, price: "₹1,399", offer: "Special Offer", category: "collection", type: "earring" },
  { id: 30, name: "Gold Earrings", image: goldEarring1, price: "₹1,599", offer: "20% OFF", category: "collection", type: "earring" },
  { id: 31, name: "Gold Jewellery Set", image: goldSet1, price: "₹3,999", offer: "New Arrival", category: "collection", type: "set" },
  { id: 32, name: "Mini Earrings", image: miniEarring1, price: "₹799", offer: "15% OFF", category: "collection", type: "earring" },
  { id: 33, name: "Tiny Earrings", image: miniEarring2, price: "₹899", offer: "10% OFF", category: "collection", type: "earring" },
  { id: 34, name: "Necklace Charm", image: necklace1, price: "₹2,599", offer: "20% OFF", category: "collection", type: "necklace" },
  { id: 35, name: "Elegant Necklace", image: necklace2, price: "₹2,899", offer: "New Arrival", category: "collection", type: "necklace" },
  { id: 36, name: "Grace Pendant", image: pendant2, price: "₹1,499", offer: "10% OFF", category: "collection", type: "pendant" },
  { id: 37, name: "Heart Pendant", image: pendant3, price: "₹1,599", offer: "15% OFF", category: "collection", type: "pendant" },
  { id: 38, name: "Classic Ring", image: ring2, price: "₹999", offer: "10% OFF", category: "collection", type: "ring" },
  { id: 39, name: "Gold Ring", image: ring3, price: "₹1,199", offer: "New Arrival", category: "collection", type: "ring" },
  { id: 40, name: "Silver Ring", image: ring4, price: "₹1,099", offer: "15% OFF", category: "collection", type: "ring" },
  { id: 41, name: "Stylish Ring", image: ring5, price: "₹1,299", offer: "Special Offer", category: "collection", type: "ring" },
  { id: 42, name: "Silver Jewellery Set", image: silverSet1, price: "₹3,499", offer: "10% OFF", category: "collection", type: "set" },
  { id: 43, name: "Royal Silver Set", image: silverSet2, price: "₹3,599", offer: "20% OFF", category: "collection", type: "set" },
  { id: 44, name: "Charming Silver Set", image: silverSet3, price: "₹3,699", offer: "15% OFF", category: "collection", type: "set" },
  { id: 45, name: "Graceful Silver Set", image: silverSet4, price: "₹3,799", offer: "Buy 1 Get 1", category: "collection", type: "set" },
  { id: 46, name: "Stylish Bangle", image: stylishBangle1, price: "₹2,099", offer: "New Arrival", category: "collection", type: "bangle" },
  { id: 47, name: "Trendy Bangle", image: stylishBangle2, price: "₹2,299", offer: "15% OFF", category: "collection", type: "bangle" },
  { id: 48, name: "Stylish Pendant", image: stylishPendant1, price: "₹1,499", offer: "Special Offer", category: "collection", type: "pendant" },
];

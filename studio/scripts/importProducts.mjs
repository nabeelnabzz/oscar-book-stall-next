import { nanoid } from 'nanoid';
import fs from 'fs';

// Helper to generate a slug
const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const categories = [
    { _id: 'cat-pens', title: 'Pens' },
    { _id: 'cat-notebooks', title: 'Notebooks' },
    { _id: 'cat-art', title: 'Art Supplies' },
    { _id: 'cat-office', title: 'Office' },
    { _id: 'cat-books', title: 'Books' }
];

const products = [
  // ... (Full 50 products list from before)
  { title: "Parker Frontier Matte Black Fountain Pen", category: "cat-pens", price: 1200, discountedPrice: 999, description: "Classic design with a stainless steel nib." },
  { title: "Pilot Metropolitan Silver Fountain Pen", category: "cat-pens", price: 1800, discountedPrice: 1550, description: "Elegant and reliable everyday fountain pen." },
  { title: "Lamy Safari Yellow Rollerball", category: "cat-pens", price: 1450, discountedPrice: 1250, description: "Ergonomic grip and vibrant design." },
  { title: "Uni-ball Eye Fine UB-157 Rollerball (Pack of 5)", category: "cat-pens", price: 450, discountedPrice: 399, description: "Smooth ink flow and waterproof ink." },
  { title: "Pentel EnerGel RTX Liquid Gel Pen 0.7mm", category: "cat-pens", price: 180, discountedPrice: 150, description: "Quick-drying and smooth writing experience." },
  { title: "Cross Classic Century Chrome Ballpoint", category: "cat-pens", price: 2500, discountedPrice: 2200, description: "Iconic slim profile and polished chrome finish." },
  { title: "Schneider Slider Memo XB Ballpoint", category: "cat-pens", price: 120, discountedPrice: 95, description: "Extra broad tip for smooth gliding." },
  { title: "Zebra Sarasa Clip 0.5mm Gel Pen", category: "cat-pens", price: 150, discountedPrice: 130, description: "Comfortable grip and retractable tip." },
  { title: "Staedtler Triplus Fineliner (Set of 20)", category: "cat-pens", price: 1200, discountedPrice: 990, description: "Dry-safe ink and ergonomic triangular shape." },
  { title: "Rotring Tikky Ballpoint Pen", category: "cat-pens", price: 250, discountedPrice: 199, description: "Lightweight and reliable for daily use." },

  { title: "Classmate Pulse Single Line A4 300 Pages", category: "cat-notebooks", price: 280, discountedPrice: 240, description: "High-quality paper for students." },
  { title: "Moleskine Classic Notebook Large Ruled Black", category: "cat-notebooks", price: 2200, discountedPrice: 1950, description: "The iconic notebook for thinkers and creators." },
  { title: "Rhodia DotPad No 16 Black", category: "cat-notebooks", price: 650, discountedPrice: 550, description: "Premium 80g extra white paper with dot grid." },
  { title: "Leuchtturm1917 A5 Dotted Navy", category: "cat-notebooks", price: 1850, discountedPrice: 1650, description: "Numbered pages and table of contents." },
  { title: "Quikrite Heritage Notebook Brown", category: "cat-notebooks", price: 900, discountedPrice: 750, description: "Refillable notebook system for journals." },
  { title: "Bilt Matrix Premium Notebook A5", category: "cat-notebooks", price: 350, discountedPrice: 299, description: "Smooth paper with aesthetic cover designs." },
  { title: "Papergrid Spiral Notebook A4 200 Pages", category: "cat-notebooks", price: 180, discountedPrice: 150, description: "Eco-friendly paper and durable spiral." },
  { title: "Luxor Executive Notebook Ruled", category: "cat-notebooks", price: 450, discountedPrice: 380, description: "Hardbound cover for professional look." },
  { title: "Seven Hills Pocket Diary 2024", category: "cat-notebooks", price: 250, discountedPrice: 199, description: "Compact and handy for daily planning." },
  { title: "Doms My 1st Pencil Kit", category: "cat-notebooks", price: 150, discountedPrice: 120, description: "Comprehensive kit for primary students." },

  { title: "Winsor & Newton Cotman Water Colour Set", category: "cat-art", price: 2800, discountedPrice: 2450, description: "Professional grade watercolors for artists." },
  { title: "Faber-Castell Polychromos Artists' Pencils (Set of 12)", category: "cat-art", price: 2200, discountedPrice: 1950, description: "High-quality acid-free pigments." },
  { title: "Camel Artists' Oil Colours (Set of 12)", category: "cat-art", price: 950, discountedPrice: 820, description: "Rich and vibrant colors for oil painting." },
  { title: "Doms Brush Pens (Pack of 12)", category: "cat-art", price: 350, discountedPrice: 299, description: "Super soft tip for calligraphy and coloring." },
  { title: "Staedtler Mars Lumograph Drawing Pencils (12 Degrees)", category: "cat-art", price: 1100, discountedPrice: 950, description: "Break-resistant and premium quality graphite." },
  { title: "Canson Montval Watercolor Paper Pad A4", category: "cat-art", price: 850, discountedPrice: 720, description: "300gsm cold-pressed paper for painting." },
  { title: "Artline Drawing Fineliners (Set of 6)", category: "cat-art", price: 450, discountedPrice: 390, description: "Waterproof and fade-resistant ink." },
  { title: "Sakura Pigma Micron Technical Pens (Set of 6)", category: "cat-art", price: 1200, discountedPrice: 1050, description: "Archival quality ink for precision work." },
  { title: "Pebeo Studio Acrylics (Set of 12)", category: "cat-art", price: 1500, discountedPrice: 1300, description: "Thick consistency and satin finish." },
  { title: "Brustro Artists' Gouache Set (12 Colors)", category: "cat-art", price: 950, discountedPrice: 850, description: "Opaque colors with velvet matte finish." },

  { title: "Casio MS-20UC Desktop Calculator Pink", category: "cat-office", price: 650, discountedPrice: 550, description: "Fashionable and functional calculator." },
  { title: "Kangaroo Heavy Duty Stapler HD-10", category: "cat-office", price: 180, discountedPrice: 150, description: "Reliable stapler for office and home." },
  { title: "Solo Expanding Folder A4 12 Pockets", category: "cat-office", price: 450, discountedPrice: 380, description: "Keep your documents organized and safe." },
  { title: "Oddy Sticky Notes Pastel 3x3 (Set of 4)", category: "cat-office", price: 250, discountedPrice: 199, description: "Perfect for reminders and markers." },
  { title: "Fevistick Glue Stick 15g (Pack of 5)", category: "cat-office", price: 125, discountedPrice: 110, description: "Non-toxic and washable adhesive." },
  { title: "Doms White Board Marker (Pack of 4)", category: "cat-office", price: 100, discountedPrice: 85, description: "Easy to wipe and long-lasting ink." },
  { title: "Maped Office Scissors 17cm", category: "cat-office", price: 150, discountedPrice: 125, description: "Sharp and ergonomic for precision cutting." },
  { title: "Pilot V7 Hi-Tecpoint Cartridge System", category: "cat-office", price: 80, discountedPrice: 70, description: "Refillable technical pen for precise writing." },
  { title: "Desmat Copy Paper A4 75gsm 500 Sheets", category: "cat-office", price: 380, discountedPrice: 340, description: "High whiteness and Jam-free printing." },
  { title: "Natraj 621 Sharpener (Tray of 20)", category: "cat-office", price: 100, discountedPrice: 80, description: "Standard quality sharpeners for school." },

  { title: "The Indian Constitution - P.M. Bakshi", category: "cat-books", price: 450, discountedPrice: 399, description: "Complete guide with latest amendments." },
  { title: "Word Power Made Easy - Norman Lewis", category: "cat-books", price: 250, discountedPrice: 180, description: "Essential book for vocabulary building." },
  { title: "A Brief History of Time - Stephen Hawking", category: "cat-books", price: 550, discountedPrice: 480, description: "Landmark book on cosmology." },
  { title: "Objective Arithmetic - R.S. Aggarwal", category: "cat-books", price: 650, discountedPrice: 550, description: "Best for competitive exam preparation." },
  { title: "General Knowledge 2024 - Manohar Pandey", category: "cat-books", price: 180, discountedPrice: 150, description: "Latest facts and current affairs." },
  { title: "Atomic Habits - James Clear", category: "cat-books", price: 599, discountedPrice: 499, description: "Transform your life with small changes." },
  { title: "The Alchemist - Paulo Coelho", category: "cat-books", price: 350, discountedPrice: 280, description: "Inspiring journey of finding one's destiny." },
  { title: "Oxford Student Atlas for India", category: "cat-books", price: 450, discountedPrice: 390, description: "Detailed maps and geographical info." },
  { title: "NCERT Class 10 Mathematics Textbook", category: "cat-books", price: 160, discountedPrice: 160, description: "Prescribed book by CBSE." },
  { title: "High School English Grammar - Wren & Martin", category: "cat-books", price: 550, discountedPrice: 450, description: "Comprehensive guide to English grammar." },
];

const ndjson = [];

// Add categories with stable IDs if they don't exist
categories.forEach(cat => {
    ndjson.push(JSON.stringify({
        _id: cat._id,
        _type: 'category',
        title: cat.title,
        slug: { _type: 'slug', current: slugify(cat.title) }
    }));
});

// Add products
products.forEach(p => {
    const badges = [];
    if (Math.random() > 0.7) badges.push('New');
    if (Math.random() > 0.7 || p.discountedPrice < p.price) badges.push('Offer');
    if (Math.random() > 0.8) badges.push(Math.random() > 0.5 ? 'Popular' : 'Best Seller');
    
    ndjson.push(JSON.stringify({
        _id: `prod-${nanoid()}`,
        _type: 'product',
        title: p.title,
        slug: { _type: 'slug', current: slugify(p.title) },
        price: p.price,
        discountedPrice: p.discountedPrice,
        description: p.description,
        badges: badges,
        isNew: badges.includes('New'),
        stock: 'in_stock',
        category: {
          _type: 'reference',
          _ref: p.category
        },
        images: []
    }));
});

fs.writeFileSync('products_import.ndjson', ndjson.join('\n'));
console.log('NDJSON file generated: products_import.ndjson');
console.log('To import run: npx sanity dataset import products_import.ndjson production');

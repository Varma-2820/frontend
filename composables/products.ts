export interface Product {
  id: number
  name: string
  sub: string
  price: number
  mrp?: number
  cat: 'silk' | 'cotton' | 'kurti' | 'lehenga' | 'salwar' | 'bridal'
  tags: string[]
  g: [string, string]
  desc: string
  fabric: string
}

export const CAT_LABELS: Record<string, string> = {
  silk: 'Silk Sarees',
  cotton: 'Cotton Sarees',
  kurti: 'Kurtis & Sets',
  lehenga: 'Lehenga Choli',
  salwar: 'Salwar Suits',
  bridal: 'Bridal Wear'
}

export const fmt = (n: number) => '₹' + n.toLocaleString('en-IN')

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Banarasi Silk Saree — Rosewood', sub: 'Pure Katan silk · Antique zari border', price: 12490, cat: 'silk', tags: ['festive'], g: ['#c47060', '#7a2818'], desc: 'Woven on traditional pit looms in Varanasi, this Banarasi saree carries intricate antique-gold zari motifs over a deep rosewood ground. A piece for weddings, pujas and every celebration in between.', fabric: 'Pure Katan silk with real zari. Dry clean only. Store wrapped in muslin.' },
  { id: 2, name: 'Kanjivaram Silk Saree — Peacock', sub: 'Temple border · Contrast pallu', price: 15990, cat: 'silk', tags: ['festive'], g: ['#2a7a6a', '#0a3a4a'], desc: 'A classic Kanjivaram in iridescent peacock tones with a temple border and a richly contrasting pallu, woven by master weavers of Kanchipuram.', fabric: 'Pure mulberry silk, silver-gold zari. Dry clean only.' },
  { id: 3, name: 'Mysore Silk Saree — Marigold', sub: 'Lightweight crepe silk', price: 8990, cat: 'silk', tags: ['new'], g: ['#e0a040', '#a05808'], desc: 'Featherlight Mysore crepe silk in a luminous marigold, finished with a slim zari edge. Drapes beautifully for long festive days.', fabric: '100% crepe silk. Dry clean recommended.' },
  { id: 4, name: 'Tussar Silk Saree — Wine', sub: 'Hand-dyed · Ghicha pallu', price: 7490, mrp: 9990, cat: 'silk', tags: ['sale'], g: ['#8a3048', '#4a1024'], desc: 'Earthy tussar with a hand-dyed wine body and textured ghicha pallu — understated, artisanal elegance for evenings and occasions.', fabric: 'Handloom tussar silk. Gentle dry clean.' },
  { id: 5, name: 'Patola Silk Saree — Indigo', sub: 'Double ikat weave', price: 13990, cat: 'silk', tags: ['new', 'festive'], g: ['#4a5a9a', '#1a2050'], desc: 'A geometric double-ikat patola in midnight indigo, where warp and weft are dyed before weaving — a marvel of precision craft.', fabric: 'Pure silk, natural dyes. Dry clean only.' },
  { id: 6, name: 'Chanderi Cotton Saree — Blush', sub: 'Sheer texture · Gold buttis', price: 3290, cat: 'cotton', tags: ['new'], g: ['#f0c8bc', '#c08878'], desc: 'Sheer, glossy Chanderi in soft blush scattered with tiny gold buttis. Light as air, perfect for daywear and small gatherings.', fabric: 'Chanderi cotton-silk. Gentle hand wash or dry clean.' },
  { id: 7, name: 'Linen Saree — Sage', sub: 'Soft-washed · Silver zari edge', price: 2890, cat: 'cotton', tags: [], g: ['#a8bca0', '#687850'], desc: 'Breathable soft-washed linen in muted sage with a fine silver zari selvedge — quiet luxury for everyday drape.', fabric: '100% linen. Machine wash gentle, cold.' },
  { id: 8, name: 'Tant Cotton Saree — Sunshine', sub: 'Crisp drape · Striped pallu', price: 2190, mrp: 2990, cat: 'cotton', tags: ['sale'], g: ['#f0d070', '#c09020'], desc: 'A crisp Bengali tant in cheerful sunshine yellow with a striped pallu — the workhorse saree, reimagined in colour.', fabric: 'Handloom cotton. Starch wash for best drape.' },
  { id: 9, name: 'Block Print Mul Saree — Terracotta', sub: 'Hand block · Bagru print', price: 2490, cat: 'cotton', tags: ['new'], g: ['#d08860', '#904820'], desc: 'Buttery-soft mul cotton hand block printed in Bagru with natural terracotta dyes. Gets softer with every wash.', fabric: 'Mulmul cotton, vegetable dyes. Wash separately first time.' },
  { id: 10, name: 'Anarkali Kurti Set — Dusty Rose', sub: 'Flared · With dupatta', price: 3490, cat: 'kurti', tags: ['festive'], g: ['#d4a09a', '#a06058'], desc: 'A gracefully flared anarkali in dusty rose with delicate neckline embroidery, paired with a matching chiffon dupatta.', fabric: 'Viscose rayon, chiffon dupatta. Machine wash gentle.' },
  { id: 11, name: 'Straight Cotton Kurti — Ivory', sub: 'Everyday · Side slits', price: 1690, cat: 'kurti', tags: ['new'], g: ['#f0e8d8', '#c8b890'], desc: 'The everyday ivory kurti — clean lines, side slits and a breathable weave that goes from work to weekend.', fabric: '100% cotton. Machine wash cold.' },
  { id: 12, name: 'Chikankari Kurti — Powder Blue', sub: 'Hand embroidered · Lucknowi', price: 2290, cat: 'kurti', tags: [], g: ['#b8cce0', '#7890b0'], desc: 'Authentic Lucknowi chikankari hand embroidered on powder-blue cotton — shadow-work florals that never go out of style.', fabric: 'Cotton with hand embroidery. Gentle hand wash.' },
  { id: 13, name: 'Printed Kurti & Palazzo Set — Jade', sub: 'Floral print · 2-piece', price: 2790, mrp: 3490, cat: 'kurti', tags: ['sale'], g: ['#78a890', '#3a6850'], desc: 'A breezy two-piece set in jade green florals — straight kurti with matching wide-leg palazzos.', fabric: 'Rayon. Machine wash gentle, dry in shade.' },
  { id: 14, name: 'A-line Rayon Kurti — Brick', sub: 'Solid · Pintuck yoke', price: 1490, cat: 'kurti', tags: ['new'], g: ['#c06848', '#803020'], desc: 'A flattering A-line cut in warm brick with a pintucked yoke — minimal, versatile, endlessly pairable.', fabric: 'Premium rayon. Machine wash cold.' },
  { id: 15, name: 'Embroidered Lehenga Choli — Blush Pink', sub: 'Thread work · Net dupatta', price: 18990, cat: 'lehenga', tags: ['festive', 'new'], g: ['#f0c0c8', '#c07888'], desc: 'Romantic blush lehenga with tonal thread embroidery, a fitted choli and a soft net dupatta edged in scallops.', fabric: 'Georgette with cancan lining. Dry clean only.' },
  { id: 16, name: 'Banarasi Lehenga — Deep Maroon', sub: 'Brocade · Can-can lining', price: 24990, cat: 'lehenga', tags: ['festive'], g: ['#8a2030', '#480814'], desc: 'Regal Banarasi brocade lehenga in deep maroon with woven gold motifs — heirloom craft cut for celebration.', fabric: 'Banarasi brocade silk. Dry clean only.' },
  { id: 17, name: 'Mirror-work Lehenga — Sage Green', sub: 'Hand mirror embroidery', price: 16490, mrp: 19990, cat: 'lehenga', tags: ['sale', 'festive'], g: ['#8fa888', '#48683e'], desc: 'Hand-set mirror work scattered across a sage-green skirt that catches light with every turn.', fabric: 'Cotton-silk with glass mirror work. Dry clean only.' },
  { id: 18, name: 'Patiala Salwar Suit — Mustard', sub: 'Phulkari dupatta', price: 3990, cat: 'salwar', tags: ['festive'], g: ['#d8a830', '#9a7008'], desc: 'A spirited mustard Patiala suit crowned with a hand-embroidered phulkari dupatta from Punjab.', fabric: 'Cotton suit, phulkari on chiffon. Hand wash separately.' },
  { id: 19, name: 'Straight Salwar Suit — Mauve', sub: 'Pastel · Embroidered neckline', price: 3490, cat: 'salwar', tags: [], g: ['#c0a0c0', '#806890'], desc: 'A soft mauve straight-cut suit with subtle neckline embroidery — polished enough for the office, pretty enough for after.', fabric: 'Cotton-blend. Machine wash gentle.' },
  { id: 20, name: 'Palazzo Suit Set — Pearl White', sub: 'Georgette · 3-piece', price: 4290, cat: 'salwar', tags: ['new'], g: ['#ece4dc', '#b8a898'], desc: 'A pristine pearl-white three-piece in flowing georgette — kurta, palazzo and dupatta in one graceful set.', fabric: 'Georgette with cotton lining. Dry clean recommended.' },
  { id: 21, name: 'Sharara Suit — Coral', sub: 'Gota patti work', price: 5490, mrp: 6990, cat: 'salwar', tags: ['sale', 'festive'], g: ['#e08868', '#b04830'], desc: 'Festive coral sharara with traditional Jaipuri gota patti shimmer on the yoke and hem.', fabric: 'Cotton-silk with gota work. Dry clean only.' },
  { id: 22, name: 'Bridal Lehenga — Scarlet Gold', sub: 'Heavy zardozi · Double dupatta', price: 49990, cat: 'bridal', tags: ['festive'], g: ['#b01820', '#600008'], desc: 'The showstopper — scarlet bridal lehenga with dense zardozi handwork, paired with two dupattas for head and trail.', fabric: 'Raw silk with zardozi. Professional dry clean only.' },
  { id: 23, name: 'Bridal Kanjivaram Saree — Crimson', sub: 'Pure zari · Grand pallu', price: 32990, cat: 'bridal', tags: [], g: ['#c02838', '#701018'], desc: 'A once-in-a-lifetime Kanjivaram in crimson with pure zari checks and a grand woven pallu for the mandap.', fabric: 'Pure silk, tested zari. Dry clean, store in muslin.' },
  { id: 24, name: 'Reception Gown — Champagne', sub: 'Sequin work · Trail', price: 21990, cat: 'bridal', tags: ['new'], g: ['#e0c8a0', '#a08858'], desc: 'A champagne reception gown with hand-sewn sequin shimmer and a soft sweeping trail.', fabric: 'Net and satin with sequins. Dry clean only.' }
]

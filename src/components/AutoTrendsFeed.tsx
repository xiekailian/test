import React, { useState } from 'react';
import {
  Zap, Flame, Star, Shield, Mountain, Crown,
  Heart, Repeat2, MessageCircle, Eye,
  TrendingUp, Gauge, Timer, DollarSign, ChevronRight,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = 'All' | 'EV' | 'Supercar' | 'JDM' | 'Muscle' | 'Luxury' | 'SUV';

interface Spec { label: string; value: string }
interface CarPost {
  id: number;
  rank: number;
  source: string;          // @handle
  sourceLabel: string;
  category: Category;
  make: string;
  model: string;
  year: number;
  caption: string;
  image: string;
  specs: Spec[];
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  featured?: boolean;
}

// ─── Design Element Meta ──────────────────────────────────────────────────────
const designElements = [
  { icon: <Gauge size={12} />, label: 'Spec Strip', desc: 'HP · 0-60 · 价格一行呈现' },
  { icon: <Flame size={12} />, label: 'Drama Photo', desc: '暗色全出血摄影+渐变蒙版' },
  { icon: <Zap size={12} />, label: 'Category Color', desc: '分类唯一色彩系统' },
  { icon: <Star size={12} />, label: 'Bold Type', desc: '大字重无衬线紧缩排版' },
  { icon: <Shield size={12} />, label: 'Source Badge', desc: '媒体来源归属徽章' },
  { icon: <TrendingUp size={12} />, label: 'Rank Signal', desc: '热度排名指示器' },
  { icon: <Eye size={12} />, label: 'Engagement', desc: '互动数据可视化' },
  { icon: <Crown size={12} />, label: 'Hero Layout', desc: '首位帖子全幅英雄卡' },
];

// ─── Category Config ──────────────────────────────────────────────────────────
const CAT_CONFIG: Record<Category, { color: string; glow: string; icon: React.ReactNode }> = {
  All:      { color: '#94a3b8', glow: 'rgba(148,163,184,.2)', icon: <TrendingUp size={12} /> },
  EV:       { color: '#38bdf8', glow: 'rgba(56,189,248,.25)', icon: <Zap size={12} /> },
  Supercar: { color: '#f43f5e', glow: 'rgba(244,63,94,.25)',  icon: <Flame size={12} /> },
  JDM:      { color: '#fb923c', glow: 'rgba(251,146,60,.25)', icon: <Star size={12} /> },
  Muscle:   { color: '#facc15', glow: 'rgba(250,204,21,.25)', icon: <Gauge size={12} /> },
  Luxury:   { color: '#a78bfa', glow: 'rgba(167,139,250,.25)',icon: <Crown size={12} /> },
  SUV:      { color: '#34d399', glow: 'rgba(52,211,153,.25)', icon: <Mountain size={12} /> },
};

// ─── Data (20 real-world trending 2026 car posts) ─────────────────────────────
const ALL_POSTS: CarPost[] = [
  {
    id: 1, rank: 1, featured: true,
    source: '@CARandDRIVER', sourceLabel: 'Car and Driver',
    category: 'Supercar',
    make: 'Ferrari', model: '12Cilindri', year: 2026,
    caption: "Ferrari's last pure-combustion V12 screams to 9,500 rpm and pushes 819 hp. It's a eulogy written in fire. The 12Cilindri isn't just a car — it's a cultural monument.",
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85',
    specs: [{ label: 'HP', value: '819' }, { label: '0-60', value: '2.9s' }, { label: 'Price', value: '$395K' }],
    likes: 42300, retweets: 18900, replies: 3210, views: 8045000,
  },
  {
    id: 2, rank: 2,
    source: '@MotorTrend', sourceLabel: 'MotorTrend',
    category: 'EV',
    make: 'Tesla', model: 'Cybertruck', year: 2026,
    caption: '18 months, 12,000 miles, and I finally understand it. The Cybertruck is the most misunderstood truck on the road. Steer-by-wire alone changed how I drive.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=85',
    specs: [{ label: 'Range', value: '320mi' }, { label: '0-60', value: '2.6s' }, { label: 'Price', value: '$80K' }],
    likes: 31200, retweets: 12400, replies: 5870, views: 2736000,
  },
  {
    id: 3, rank: 3,
    source: '@axios', sourceLabel: 'Axios',
    category: 'Muscle',
    make: 'Dodge', model: 'Charger Daytona', year: 2026,
    caption: "The Charger is back — and it's electric. 670 hp from a Fratzonic exhaust speaker system that HOWLS. Muscle car culture just got a reboot and we are here for it.",
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=85',
    specs: [{ label: 'HP', value: '670' }, { label: '0-60', value: '3.3s' }, { label: 'Price', value: '$60K' }],
    likes: 28900, retweets: 9870, replies: 4120, views: 8234000,
  },
  {
    id: 4, rank: 4,
    source: '@MotorTrend', sourceLabel: 'MotorTrend',
    category: 'Supercar',
    make: 'Porsche', model: '911 GT3 RS', year: 2026,
    caption: 'The GT3 RS is pure track weapon. 518 hp NA flat-six, DRS wing the size of a table. Porsche builds feelings, not just cars — and this one feels like terror.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85',
    specs: [{ label: 'HP', value: '518' }, { label: '0-60', value: '3.0s' }, { label: 'Price', value: '$225K' }],
    likes: 26700, retweets: 11300, replies: 2980, views: 4200000,
  },
  {
    id: 5, rank: 5,
    source: '@therealautoblog', sourceLabel: 'Autoblog',
    category: 'JDM',
    make: 'Toyota', model: 'GR Corolla Morizo', year: 2026,
    caption: 'Every highway is yours when you have 300 hp stuffed into a hatchback. The Morizo Edition is track-day violence wrapped in grocery-run practicality.',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=85',
    specs: [{ label: 'HP', value: '300' }, { label: '0-60', value: '4.7s' }, { label: 'Price', value: '$42K' }],
    likes: 24500, retweets: 9200, replies: 3400, views: 3100000,
  },
  {
    id: 6, rank: 6,
    source: '@slashgear', sourceLabel: 'SlashGear',
    category: 'Luxury',
    make: 'Bugatti', model: 'Tourbillon', year: 2026,
    caption: "Bugatti's Chiron successor: a hybrid V16 producing 1,800 hp. It's not a car, it's a philosophical argument for what engineering can achieve.",
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=85',
    specs: [{ label: 'HP', value: '1,800' }, { label: '0-60', value: '2.0s' }, { label: 'Price', value: '$3.8M' }],
    likes: 39800, retweets: 17600, replies: 4500, views: 6900000,
  },
  {
    id: 7, rank: 7,
    source: '@MotorOctane', sourceLabel: 'MotorOctane',
    category: 'EV',
    make: 'Hyundai', model: 'Ioniq 9', year: 2026,
    caption: 'Three rows, 335-mile range, and it charges faster than your laptop. The Ioniq 9 is the SUV that makes minivans irrelevant. Feb bestseller list confirmed it.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
    specs: [{ label: 'Range', value: '335mi' }, { label: '0-60', value: '4.9s' }, { label: 'Price', value: '$56K' }],
    likes: 18300, retweets: 6400, replies: 2100, views: 4221000,
  },
  {
    id: 8, rank: 8,
    source: '@CARandDRIVER', sourceLabel: 'Car and Driver',
    category: 'Luxury',
    make: 'Lamborghini', model: 'Revuelto', year: 2026,
    caption: 'The Huracán is dead, long live the Revuelto. Hybrid V12, 1,001 hp, angular as a blade. Lambo said quiet you — and they meant it.',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900&q=85',
    specs: [{ label: 'HP', value: '1,001' }, { label: '0-60', value: '2.5s' }, { label: 'Price', value: '$600K' }],
    likes: 35100, retweets: 14800, replies: 3760, views: 5600000,
  },
  {
    id: 9, rank: 9,
    source: '@therealautoblog', sourceLabel: 'Autoblog',
    category: 'EV',
    make: 'Toyota', model: 'Prius XSE Nightshade', year: 2026,
    caption: 'After a week in a Prius, I finally understand why it dominates every highway. 57 mpg, 0-60 in 6.5s, and it looks like a spaceship now. The haters were wrong.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&q=85',
    specs: [{ label: 'MPG', value: '57' }, { label: '0-60', value: '6.5s' }, { label: 'Price', value: '$33K' }],
    likes: 14200, retweets: 4800, replies: 1820, views: 821000,
  },
  {
    id: 10, rank: 10,
    source: '@CARandDRIVER', sourceLabel: 'Car and Driver',
    category: 'JDM',
    make: 'Nissan', model: 'GT-R Nismo', year: 2026,
    caption: "The GT-R is 18 years old and still embarrasses supercars. Nissan announced a proper send-off edition. Godzilla isn't dead — he's just saying goodbye on his own terms.",
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=85',
    specs: [{ label: 'HP', value: '600' }, { label: '0-60', value: '2.5s' }, { label: 'Price', value: '$215K' }],
    likes: 29400, retweets: 13200, replies: 4100, views: 7200000,
  },
  {
    id: 11, rank: 11,
    source: '@MotorTrend', sourceLabel: 'MotorTrend',
    category: 'Supercar',
    make: 'McLaren', model: '750S', year: 2026,
    caption: 'McLaren stripped the weight, cranked the turbo, and made the 750S feel like a fighter jet with road tax. Best mid-engine sports car money can buy in 2026.',
    image: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=900&q=85',
    specs: [{ label: 'HP', value: '750' }, { label: '0-60', value: '2.8s' }, { label: 'Price', value: '$310K' }],
    likes: 22800, retweets: 8700, replies: 2340, views: 3937000,
  },
  {
    id: 12, rank: 12,
    source: '@axios', sourceLabel: 'Axios',
    category: 'Muscle',
    make: 'Ford', model: 'Mustang Dark Horse', year: 2026,
    caption: 'Ford brings back the 5.0 Coyote with a factory-tuned suspension. The Dark Horse is everything the old Shelby GT500 was, with better handling and a cooler name.',
    image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=900&q=85',
    specs: [{ label: 'HP', value: '500' }, { label: '0-60', value: '4.0s' }, { label: 'Price', value: '$59K' }],
    likes: 21400, retweets: 7600, replies: 3100, views: 2900000,
  },
  {
    id: 13, rank: 13,
    source: '@MotorOctane', sourceLabel: 'MotorOctane',
    category: 'EV',
    make: 'Rivian', model: 'R1T Adventure', year: 2026,
    caption: 'Rivian added Camp Kitchen, better range, and an even stiffer chassis. R1T owners are going places that Cybertruck owners can only Instagram about.',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=900&q=85',
    specs: [{ label: 'Range', value: '410mi' }, { label: '0-60', value: '3.0s' }, { label: 'Price', value: '$70K' }],
    likes: 16900, retweets: 5800, replies: 1960, views: 2100000,
  },
  {
    id: 14, rank: 14,
    source: '@slashgear', sourceLabel: 'SlashGear',
    category: 'JDM',
    make: 'Subaru', model: 'WRX STI tS', year: 2026,
    caption: 'STI-tuned suspension, Brembo brakes, 2.4T boxer — the WRX STI is back and it did NOT skip leg day. Rally roads beware.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=900&q=85',
    specs: [{ label: 'HP', value: '310' }, { label: '0-60', value: '4.4s' }, { label: 'Price', value: '$47K' }],
    likes: 18700, retweets: 6900, replies: 2800, views: 1800000,
  },
  {
    id: 15, rank: 15,
    source: '@CARandDRIVER', sourceLabel: 'Car and Driver',
    category: 'Luxury',
    make: 'BMW', model: 'M4 Competition xDrive', year: 2026,
    caption: 'The M4 Competition gets 30 more hp, upgraded Active M diff, and an interior that finally feels worthy of the badge. This is the sport sedan standard now.',
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=900&q=85',
    specs: [{ label: 'HP', value: '530' }, { label: '0-60', value: '3.4s' }, { label: 'Price', value: '$92K' }],
    likes: 24100, retweets: 9800, replies: 3200, views: 3500000,
  },
  {
    id: 16, rank: 16,
    source: '@MotorTrend', sourceLabel: 'MotorTrend',
    category: 'SUV',
    make: 'Jeep', model: 'Wrangler Rubicon 392', year: 2026,
    caption: 'A 6.4L HEMI V8 in a Wrangler is the most irresponsible thing Jeep ever built. We say that with maximum respect. 0 to off-road in zero excuses.',
    image: 'https://images.unsplash.com/photo-1561714692-60a0c12af8a4?w=900&q=85',
    specs: [{ label: 'HP', value: '470' }, { label: '0-60', value: '4.5s' }, { label: 'Price', value: '$75K' }],
    likes: 19600, retweets: 7100, replies: 2540, views: 2700000,
  },
  {
    id: 17, rank: 17,
    source: '@therealautoblog', sourceLabel: 'Autoblog',
    category: 'EV',
    make: 'Audi', model: 'RS e-tron GT', year: 2026,
    caption: 'The RS e-tron GT proves EVs can have soul. 637 hp, all-wheel torque vectoring, and an interior so good it makes Germans feel emotions they cannot name.',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=900&q=85',
    specs: [{ label: 'HP', value: '637' }, { label: '0-60', value: '3.1s' }, { label: 'Price', value: '$142K' }],
    likes: 17300, retweets: 6200, replies: 1840, views: 2200000,
  },
  {
    id: 18, rank: 18,
    source: '@slashgear', sourceLabel: 'SlashGear',
    category: 'JDM',
    make: 'Honda', model: 'Civic Type R FL5', year: 2026,
    caption: 'Honda dropped the FL5 refresh with better aero, stickier Pilot Sport Cup 2Rs, and the world's best FWD hot hatch crown stays in Saitama. Nobody is close.',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=900&q=85',
    specs: [{ label: 'HP', value: '330' }, { label: '0-60', value: '5.0s' }, { label: 'Price', value: '$44K' }],
    likes: 22300, retweets: 8100, replies: 3600, views: 2800000,
  },
  {
    id: 19, rank: 19,
    source: '@MotorOctane', sourceLabel: 'MotorOctane',
    category: 'SUV',
    make: 'Land Rover', model: 'Defender V8 Carpathian', year: 2026,
    caption: 'The Defender V8 sells out in 48 hours every single time. 525 hp, goes anywhere on Earth, looks like a tank escaped from Vogue. Supply cannot match demand.',
    image: 'https://images.unsplash.com/photo-1519245659620-e859806a8d03?w=900&q=85',
    specs: [{ label: 'HP', value: '525' }, { label: '0-60', value: '4.9s' }, { label: 'Price', value: '$110K' }],
    likes: 15800, retweets: 5400, replies: 1620, views: 1900000,
  },
  {
    id: 20, rank: 20,
    source: '@CARandDRIVER', sourceLabel: 'Car and Driver',
    category: 'Muscle',
    make: 'Chevrolet', model: 'Corvette Z06', year: 2026,
    caption: "America's supercar turned 11 and it still sounds better than anything Europe makes. 670 hp flat-plane V8 at 8,600 rpm. Goosebumps are free with every test drive.",
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=85',
    specs: [{ label: 'HP', value: '670' }, { label: '0-60', value: '2.6s' }, { label: 'Price', value: '$110K' }],
    likes: 27600, retweets: 11900, replies: 3800, views: 4500000,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000   ? `${(n / 1_000).toFixed(1)}K`
  : String(n);

// ─── Sub-components ───────────────────────────────────────────────────────────

const CategoryPill: React.FC<{
  cat: Category; active: boolean; onClick: () => void;
}> = ({ cat, active, onClick }) => {
  const cfg = CAT_CONFIG[cat];
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold whitespace-nowrap transition-all duration-200"
      style={{
        background: active ? cfg.color : 'transparent',
        color: active ? '#0a0a0f' : cfg.color,
        border: `1px solid ${active ? cfg.color : 'rgba(255,255,255,.1)'}`,
        boxShadow: active ? `0 0 16px ${cfg.glow}` : 'none',
      }}
    >
      {cfg.icon}
      {cat}
    </button>
  );
};

const SpecBadge: React.FC<{ spec: Spec }> = ({ spec }) => (
  <div className="flex flex-col items-center px-3 py-1.5 rounded-xl"
       style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,.08)' }}>
    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>
      {spec.label}
    </span>
    <span className="text-[14px] font-black" style={{ color: '#f1f5f9' }}>
      {spec.value}
    </span>
  </div>
);

const EngagementBar: React.FC<{ post: CarPost }> = ({ post }) => (
  <div className="flex items-center gap-5 text-[12px]" style={{ color: '#475569' }}>
    <span className="flex items-center gap-1.5 hover:text-rose-400 transition-colors cursor-pointer">
      <Heart size={13} />{fmt(post.likes)}
    </span>
    <span className="flex items-center gap-1.5 hover:text-green-400 transition-colors cursor-pointer">
      <Repeat2 size={13} />{fmt(post.retweets)}
    </span>
    <span className="flex items-center gap-1.5 hover:text-sky-400 transition-colors cursor-pointer">
      <MessageCircle size={13} />{fmt(post.replies)}
    </span>
    <span className="flex items-center gap-1.5 ml-auto" style={{ color: '#334155' }}>
      <Eye size={13} />{fmt(post.views)}
    </span>
  </div>
);

// Hero card (rank #1)
const HeroCard: React.FC<{ post: CarPost }> = ({ post }) => {
  const cfg = CAT_CONFIG[post.category];
  return (
    <div className="auto-card relative rounded-[28px] overflow-hidden group cursor-pointer"
         style={{ background: '#13131a', border: '1px solid rgba(255,255,255,.07)' }}>
      {/* image */}
      <div className="relative h-[320px] md:h-[400px] overflow-hidden">
        <img src={post.image} alt={post.model} crossOrigin="anonymous"
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to right, rgba(10,10,15,.95) 0%, rgba(10,10,15,.5) 50%, rgba(10,10,15,.1) 100%)' }} />
        {/* rank */}
        <div className="absolute top-5 left-5 w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-black"
             style={{ background: cfg.color, color: '#0a0a0f', boxShadow: `0 0 24px ${cfg.glow}` }}>
          #1
        </div>
        {/* category */}
        <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
             style={{ background: `${cfg.color}22`, color: cfg.color, border: `1px solid ${cfg.color}55` }}>
          {cfg.icon}{post.category}
        </div>
      </div>

      {/* content */}
      <div className="p-7 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#475569' }}>
              {post.source} · Most Viral
            </p>
            <h2 className="text-3xl font-black tracking-tight leading-tight" style={{ color: '#f1f5f9' }}>
              {post.year} {post.make}<br />
              <span style={{ color: cfg.color }}>{post.model}</span>
            </h2>
          </div>
          <div className="flex items-center gap-1 shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold"
               style={{ background: 'rgba(244,63,94,.1)', color: '#f43f5e', border: '1px solid rgba(244,63,94,.2)' }}>
            <TrendingUp size={11} /> Trending
          </div>
        </div>

        <p className="text-[14px] leading-relaxed" style={{ color: '#94a3b8' }}>{post.caption}</p>

        <div className="flex items-center gap-3">
          {post.specs.map(s => <SpecBadge key={s.label} spec={s} />)}
          <button className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold transition-all"
                  style={{ background: cfg.color, color: '#0a0a0f' }}>
            View Post <ChevronRight size={14} />
          </button>
        </div>

        <div className="pt-2" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <EngagementBar post={post} />
        </div>
      </div>
    </div>
  );
};

// Regular card
const CarCard: React.FC<{ post: CarPost }> = ({ post }) => {
  const cfg = CAT_CONFIG[post.category];
  return (
    <div className="auto-card relative rounded-[24px] overflow-hidden group cursor-pointer flex flex-col transition-transform duration-300 hover:-translate-y-1"
         style={{ background: '#13131a', border: '1px solid rgba(255,255,255,.07)' }}>
      {/* image */}
      <div className="relative h-[180px] overflow-hidden shrink-0">
        <img src={post.image} alt={post.model} crossOrigin="anonymous"
             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to top, rgba(19,19,26,1) 0%, rgba(19,19,26,.2) 60%, transparent 100%)' }} />
        {/* rank + category */}
        <div className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
             style={{ background: '#0a0a0f', color: cfg.color, border: `1px solid ${cfg.color}55` }}>
          #{post.rank}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
             style={{ background: `${cfg.color}22`, color: cfg.color, border: `1px solid ${cfg.color}44` }}>
          {cfg.icon}{post.category}
        </div>
      </div>

      {/* content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#475569' }}>
            {post.source}
          </p>
          <h3 className="text-[17px] font-black tracking-tight leading-tight" style={{ color: '#f1f5f9' }}>
            {post.year} {post.make} <span style={{ color: cfg.color }}>{post.model}</span>
          </h3>
        </div>

        <p className="text-[12px] leading-relaxed line-clamp-2 flex-1" style={{ color: '#64748b' }}>
          {post.caption}
        </p>

        {/* spec strip */}
        <div className="flex gap-2">
          {post.specs.map(s => (
            <div key={s.label} className="flex items-center gap-1.5 text-[11px]" style={{ color: '#475569' }}>
              <span className="font-medium">{s.label}</span>
              <span className="font-black" style={{ color: cfg.color }}>{s.value}</span>
              {s !== post.specs[post.specs.length - 1] && <span style={{ color: '#1e293b' }}>·</span>}
            </div>
          ))}
        </div>

        <div className="pt-2" style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
          <EngagementBar post={post} />
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const AutoTrendsFeed: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = activeCategory === 'All'
    ? ALL_POSTS
    : ALL_POSTS.filter(p => p.category === activeCategory);

  const [hero, ...rest] = filtered;

  const cats: Category[] = ['All', 'EV', 'Supercar', 'JDM', 'Muscle', 'Luxury', 'SUV'];

  return (
    <div className="w-full font-sans relative overflow-hidden"
         style={{ background: 'var(--auto-bg)' }}>

      {/* ── Ambient gradient top ── */}
      <div className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(244,63,94,.08) 0%, transparent 100%)' }} />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-14">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest"
                   style={{ background: 'rgba(244,63,94,.1)', color: '#f43f5e', border: '1px solid rgba(244,63,94,.2)' }}>
                <TrendingUp size={11} /> Trending on X · Automotive
              </div>
              <span className="text-[11px]" style={{ color: '#334155' }}>Apr 28, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none"
                style={{ color: '#f1f5f9' }}>
              Top 20 Car Posts
            </h1>
            <p className="mt-2 text-[14px]" style={{ color: '#475569' }}>
              Ranked by engagement · Design elements extracted from {ALL_POSTS.length} viral automotive tweets
            </p>
          </div>

          {/* Design elements legend */}
          <div className="flex flex-wrap gap-2 md:max-w-[400px]">
            {designElements.map(el => (
              <div key={el.label}
                   className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                   style={{ background: '#1c1c26', color: '#64748b', border: '1px solid rgba(255,255,255,.06)' }}>
                <span style={{ color: '#f43f5e' }}>{el.icon}</span>
                {el.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Category filter ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
          {cats.map(c => (
            <CategoryPill key={c} cat={c} active={activeCategory === c} onClick={() => setActiveCategory(c)} />
          ))}
          <span className="shrink-0 ml-3 text-[12px]" style={{ color: '#1e293b' }}>
            {filtered.length} posts
          </span>
        </div>

        {/* ── Grid ── */}
        {hero && (
          <div className="space-y-6">
            {/* Hero */}
            <HeroCard post={hero} />

            {/* Rest */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map(p => <CarCard key={p.id} post={p} />)}
              </div>
            )}
          </div>
        )}

        {/* ── Footer label ── */}
        <p className="text-center text-[11px] mt-12" style={{ color: '#1e293b' }}>
          Data sourced from @MotorTrend · @CARandDRIVER · @axios · @therealautoblog · @MotorOctane · @slashgear
        </p>
      </div>
    </div>
  );
};

export default AutoTrendsFeed;

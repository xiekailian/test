import React, { useState } from 'react';
import {
  Heart, Repeat2, MessageCircle, Eye, ArrowUpRight,
  TrendingUp, Flame, BarChart3, Trophy,
  ChevronDown, ChevronUp, AlertTriangle, Clock,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type PostType = 'passion' | 'controversy' | 'achievement';

interface DesignDNA {
  type: PostType;
  typeLabel: string;
  typeDesc: string;
  icon: React.ReactNode;
  primaryColor: string;
  bgFrom: string;
  bgTo: string;
  textAccent: string;
}

// ─── Design Archetypes (abstracted from real posts) ───────────────────────────
const DNA: Record<PostType, DesignDNA> = {
  passion: {
    type: 'passion',
    typeLabel: '情感型',
    typeDesc: '戏剧化影像 · 抒情文字 · 奢华氛围',
    icon: <Flame size={12} />,
    primaryColor: '#dc2626',       // deep red
    bgFrom: '#0a0204',
    bgTo: '#1a0608',
    textAccent: '#fca5a5',
  },
  controversy: {
    type: 'controversy',
    typeLabel: '争议型',
    typeDesc: '冲击数字 · 对比结构 · 辩论触发器',
    icon: <AlertTriangle size={12} />,
    primaryColor: '#d97706',       // amber warning
    bgFrom: '#0a0800',
    bgTo: '#1a1200',
    textAccent: '#fcd34d',
  },
  achievement: {
    type: 'achievement',
    typeLabel: '成就型',
    typeDesc: '精准参数 · 破纪录徽章 · 技术语汇',
    icon: <Trophy size={12} />,
    primaryColor: '#16a34a',       // racing green
    bgFrom: '#000a04',
    bgTo: '#001808',
    textAccent: '#86efac',
  },
};

// ─── Design Element Annotations ───────────────────────────────────────────────
const DESIGN_ELEMENTS = {
  passion: [
    { label: '全出血电影摄影', desc: '占满整个视窗的暗色戏剧化图像' },
    { label: '渐变蒙版', desc: '从深黑到透明的横向渐变，确保文字可读' },
    { label: '抒情文案', desc: '用比喻和情感联结代替规格参数' },
    { label: '奢华字重', desc: '超大超细字重交替，制造视觉张力' },
    { label: '品牌色彩', desc: '法拉利红作为单一强调色' },
  ],
  controversy: [
    { label: '震撼数字放大', desc: '将核心数据放大至不可忽视的尺寸' },
    { label: '前后对比布局', desc: '购买价 vs 出售价的视觉对照' },
    { label: '警告视觉语言', desc: '琥珀色警告色系，触发警惕情绪' },
    { label: '辩论指示器', desc: '高评论数展示 = 争议程度信号' },
    { label: '数据进度条', desc: '贬值幅度可视化为进度条' },
  ],
  achievement: [
    { label: '精准技术参数', desc: '秒数精确到小数点，型号精确到版本' },
    { label: '破纪录徽章', desc: '悬浮徽章强调记录被打破这一事实' },
    { label: '赛道绿配色', desc: '赛车运动专属绿色，暗示极限性能' },
    { label: '时间轴叙事', desc: '历史记录→新记录的时间线结构' },
    { label: '来源权威标注', desc: '官方计时机构背书增强可信度' },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000 ? `${(n / 1_000).toFixed(0)}K`
  : String(n);

// ─── Post 1: Ferrari 12Cilindri (Passion) ─────────────────────────────────────
const PassionCard: React.FC<{ expanded: boolean; onToggle: () => void }> = ({ expanded, onToggle }) => {
  const dna = DNA.passion;
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[32px]"
         style={{ background: `linear-gradient(135deg, ${dna.bgFrom}, ${dna.bgTo})`, border: '1px solid rgba(220,38,38,.2)' }}>

      {/* Rank ribbon */}
      <div className="absolute top-0 left-0 z-20 px-5 py-3 rounded-br-2xl flex items-center gap-2"
           style={{ background: 'rgba(220,38,38,.15)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(220,38,38,.3)', borderRight: '1px solid rgba(220,38,38,.3)' }}>
        <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">Rank</span>
        <span className="text-[22px] font-black leading-none" style={{ color: dna.primaryColor }}>#1</span>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ml-1"
             style={{ background: `${dna.primaryColor}22`, color: dna.textAccent, border: `1px solid ${dna.primaryColor}44` }}>
          {dna.icon}{dna.typeLabel}
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1400&q=90"
          alt="Ferrari 12Cilindri"
          crossOrigin="anonymous"
          className="w-full h-full object-cover object-center"
        />
        {/* left-to-right gradient for text overlay */}
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to right, rgba(10,2,4,.96) 0%, rgba(10,2,4,.7) 45%, rgba(10,2,4,.1) 100%)' }} />
        {/* bottom fade */}
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to top, rgba(10,2,4,1) 0%, transparent 40%)' }} />

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 p-8 md:p-10 max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: dna.primaryColor }}>
            @CARandDRIVER · 最多转发
          </p>
          <h2 className="text-4xl md:text-5xl font-black leading-[1.05] tracking-tight text-white mb-4">
            最后的<br />
            <span style={{ color: dna.primaryColor }}>纯粹V12</span><br />
            用火焰<span className="font-thin">书写</span>的挽歌
          </h2>
          <p className="text-[14px] leading-relaxed text-white/60 max-w-sm">
            819 hp，红线 9,500 rpm。Ferrari 的 12Cilindri 不是一辆车——它是一座文化纪念碑。
          </p>
        </div>
      </div>

      {/* Spec row */}
      <div className="flex items-center gap-0 border-t border-b mx-0"
           style={{ borderColor: 'rgba(220,38,38,.15)' }}>
        {[
          { label: 'POWER', value: '819 hp' },
          { label: 'ENGINE', value: 'V12 NA' },
          { label: '0–60', value: '2.9s' },
          { label: 'PRICE', value: '$395K' },
        ].map((s, i) => (
          <div key={s.label}
               className="flex-1 text-center py-4"
               style={{ borderRight: i < 3 ? '1px solid rgba(220,38,38,.15)' : 'none' }}>
            <p className="text-[9px] font-bold uppercase tracking-widest mb-1 text-white/30">{s.label}</p>
            <p className="text-[16px] font-black" style={{ color: dna.textAccent }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="p-8 md:p-10">
        <blockquote className="text-[16px] leading-relaxed text-white/80 mb-6 pl-4"
                    style={{ borderLeft: `3px solid ${dna.primaryColor}` }}>
          "Ferrari's last pure-combustion V12 screams to 9,500 rpm and pushes 819 hp. It's a eulogy written in fire. The 12Cilindri isn't just a car — it's a cultural monument."
        </blockquote>

        {/* Design DNA annotation */}
        {expanded && (
          <div className="mb-6 rounded-2xl p-5" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
            <p className="text-[11px] font-black uppercase tracking-widest mb-3 text-white/30">归纳的设计要素</p>
            <div className="space-y-2">
              {DESIGN_ELEMENTS.passion.map(el => (
                <div key={el.label} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: dna.primaryColor }} />
                  <div>
                    <span className="text-[12px] font-bold text-white/70">{el.label}</span>
                    <span className="text-[11px] text-white/30 ml-2">{el.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engagement + source */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 text-[13px] text-white/40">
            <button onClick={() => setLiked(!liked)}
                    className="flex items-center gap-1.5 transition-colors"
                    style={{ color: liked ? '#ef4444' : undefined }}>
              <Heart size={14} className={liked ? 'fill-red-500 text-red-500' : ''} />
              {fmt(42300 + (liked ? 1 : 0))}
            </button>
            <span className="flex items-center gap-1.5 hover:text-green-400 transition-colors cursor-pointer">
              <Repeat2 size={14} />{fmt(18900)}
            </span>
            <span className="flex items-center gap-1.5 hover:text-sky-400 transition-colors cursor-pointer">
              <MessageCircle size={14} />{fmt(3210)}
            </span>
            <span className="flex items-center gap-1.5 ml-2">
              <Eye size={14} />{fmt(8040000)}
            </span>
          </div>
          <button onClick={onToggle}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all"
                  style={{ background: `${dna.primaryColor}15`, color: dna.textAccent, border: `1px solid ${dna.primaryColor}30` }}>
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {expanded ? '收起设计分析' : '展开设计分析'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Post 2: Dodge Charger EV Depreciation (Controversy) ─────────────────────
const ControversyCard: React.FC<{ expanded: boolean; onToggle: () => void }> = ({ expanded, onToggle }) => {
  const dna = DNA.controversy;
  const [liked, setLiked] = useState(false);
  const depreciationPct = 57;

  return (
    <div className="relative overflow-hidden rounded-[32px]"
         style={{ background: `linear-gradient(135deg, ${dna.bgFrom}, ${dna.bgTo})`, border: '1px solid rgba(217,119,6,.2)' }}>

      {/* Rank ribbon */}
      <div className="absolute top-0 left-0 z-20 px-5 py-3 rounded-br-2xl flex items-center gap-2"
           style={{ background: 'rgba(217,119,6,.12)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(217,119,6,.25)', borderRight: '1px solid rgba(217,119,6,.25)' }}>
        <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">Rank</span>
        <span className="text-[22px] font-black leading-none" style={{ color: dna.primaryColor }}>#2</span>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ml-1"
             style={{ background: `${dna.primaryColor}22`, color: dna.textAccent, border: `1px solid ${dna.primaryColor}44` }}>
          {dna.icon}{dna.typeLabel}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left: image */}
        <div className="relative lg:w-2/5 h-[300px] lg:h-auto overflow-hidden shrink-0">
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=85"
            alt="Dodge Charger Daytona"
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0"
               style={{ background: 'linear-gradient(to right, transparent 40%, rgba(10,8,0,.98) 100%)' }} />
          {/* Warning overlay */}
          <div className="absolute inset-0 flex items-end p-6 lg:hidden">
            <div className="text-6xl font-black" style={{ color: dna.primaryColor }}>
              −57%
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="flex-1 p-8 pt-16 flex flex-col gap-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/30">
            @therealautoblog · 最多评论
          </p>

          {/* Shock number — design element: giant stat */}
          <div className="hidden lg:block">
            <div className="flex items-start gap-2 mb-1">
              <AlertTriangle size={18} style={{ color: dna.primaryColor }} className="mt-1 shrink-0" />
              <p className="text-[13px] font-bold text-white/40 uppercase tracking-wide">一年内贬值幅度</p>
            </div>
            <div className="text-[80px] font-black leading-none tracking-tighter" style={{ color: dna.primaryColor }}>
              −57%
            </div>
          </div>

          <h3 className="text-[20px] font-black text-white leading-snug tracking-tight">
            花 <span style={{ color: dna.textAccent }}>$82,000</span> 买的车<br />
            一年后以 <span style={{ color: dna.primaryColor }}>$35,000</span> 卖出
          </h3>

          {/* Before/after comparison — design element */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '购买价格', value: '$82,000', note: '2024年新车', dimmed: false },
              { label: '一年后售价', value: '$35,000', note: '<7,000 英里', dimmed: true },
            ].map(item => (
              <div key={item.label}
                   className="rounded-xl p-4"
                   style={{ background: item.dimmed ? `${dna.primaryColor}10` : 'rgba(255,255,255,.04)', border: `1px solid ${item.dimmed ? dna.primaryColor + '40' : 'rgba(255,255,255,.08)'}` }}>
                <p className="text-[9px] uppercase tracking-widest font-bold mb-1 text-white/30">{item.label}</p>
                <p className="text-[22px] font-black" style={{ color: item.dimmed ? dna.primaryColor : 'white' }}>{item.value}</p>
                <p className="text-[10px] text-white/30 mt-0.5">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Depreciation bar — design element */}
          <div>
            <div className="flex justify-between text-[10px] text-white/30 mb-1.5">
              <span>贬值幅度</span>
              <span className="font-bold" style={{ color: dna.textAccent }}>{depreciationPct}% 已蒸发</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.07)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${depreciationPct}%`, background: `linear-gradient(90deg, ${dna.primaryColor}, #ef4444)` }}
              />
            </div>
          </div>

          {/* Design DNA annotation */}
          {expanded && (
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
              <p className="text-[11px] font-black uppercase tracking-widest mb-3 text-white/30">归纳的设计要素</p>
              <div className="space-y-2">
                {DESIGN_ELEMENTS.controversy.map(el => (
                  <div key={el.label} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: dna.primaryColor }} />
                    <div>
                      <span className="text-[12px] font-bold text-white/70">{el.label}</span>
                      <span className="text-[11px] text-white/30 ml-2">{el.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engagement */}
          <div className="flex items-center justify-between pt-2"
               style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
            <div className="flex items-center gap-5 text-[13px] text-white/40">
              <button onClick={() => setLiked(!liked)}
                      className="flex items-center gap-1.5 transition-colors"
                      style={{ color: liked ? '#ef4444' : undefined }}>
                <Heart size={14} className={liked ? 'fill-red-500 text-red-500' : ''} />
                {fmt(28900 + (liked ? 1 : 0))}
              </button>
              <span className="flex items-center gap-1.5 cursor-pointer hover:text-green-400 transition-colors">
                <Repeat2 size={14} />{fmt(9870)}
              </span>
              <span className="flex items-center gap-1.5 cursor-pointer"
                    style={{ color: dna.textAccent }}>
                <MessageCircle size={14} />{fmt(4120)}
                <span className="text-[10px] ml-1 text-white/30">条争议评论</span>
              </span>
              <span className="flex items-center gap-1.5 ml-1 text-white/20">
                <Eye size={14} />{fmt(8234000)}
              </span>
            </div>
            <button onClick={onToggle}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all"
                    style={{ background: `${dna.primaryColor}15`, color: dna.textAccent, border: `1px solid ${dna.primaryColor}30` }}>
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expanded ? '收起' : '设计分析'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Post 3: Porsche Manthey Nürburgring Record (Achievement) ─────────────────
const AchievementCard: React.FC<{ expanded: boolean; onToggle: () => void }> = ({ expanded, onToggle }) => {
  const dna = DNA.achievement;
  const [liked, setLiked] = useState(false);

  const records = [
    { year: '2022', time: '6:55.090', label: 'GT3 RS' },
    { year: '2023', time: '6:49.328', label: 'GT3 RS Manthey' },
    { year: '2026', time: '6:43.300', label: 'GT3 RS MR II', current: true },
  ];

  return (
    <div className="relative overflow-hidden rounded-[32px]"
         style={{ background: `linear-gradient(135deg, ${dna.bgFrom}, ${dna.bgTo})`, border: '1px solid rgba(22,163,74,.2)' }}>

      {/* Rank ribbon */}
      <div className="absolute top-0 left-0 z-20 px-5 py-3 rounded-br-2xl flex items-center gap-2"
           style={{ background: 'rgba(22,163,74,.12)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(22,163,74,.25)', borderRight: '1px solid rgba(22,163,74,.25)' }}>
        <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">Rank</span>
        <span className="text-[22px] font-black leading-none" style={{ color: dna.primaryColor }}>#3</span>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ml-1"
             style={{ background: `${dna.primaryColor}22`, color: dna.textAccent, border: `1px solid ${dna.primaryColor}44` }}>
          {dna.icon}{dna.typeLabel}
        </div>
      </div>

      {/* Hero image with achievement overlay */}
      <div className="relative h-[340px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=90"
          alt="Porsche 911 GT3 RS"
          crossOrigin="anonymous"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to top, rgba(0,10,4,1) 0%, rgba(0,10,4,.4) 60%, transparent 100%)' }} />

        {/* Floating record badge — design element */}
        <div className="absolute top-16 right-6 p-4 rounded-2xl text-center"
             style={{ background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(12px)', border: `1px solid ${dna.primaryColor}55` }}>
          <p className="text-[9px] font-black uppercase tracking-widest mb-1 text-white/40">🏁 Nürburgring</p>
          <p className="text-[10px] font-bold uppercase tracking-wide mb-0.5" style={{ color: dna.textAccent }}>NEW RECORD</p>
          <p className="text-[28px] font-black leading-none font-mono" style={{ color: 'white' }}>6:43</p>
          <p className="text-[11px] font-mono text-white/50">.300</p>
          <div className="mt-2 px-2 py-0.5 rounded-full text-[9px] font-bold"
               style={{ background: `${dna.primaryColor}33`, color: dna.textAccent }}>
            Production Car
          </div>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 p-8">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2 text-white/30">
            @MotorTrend · 最多收藏
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Manthey Racing 再次<br />
            <span style={{ color: dna.textAccent }}>打破纽北纪录</span>
          </h2>
        </div>
      </div>

      {/* Record timeline — design element */}
      <div className="px-8 py-6" style={{ borderBottom: '1px solid rgba(22,163,74,.12)' }}>
        <p className="text-[10px] font-black uppercase tracking-widest mb-4 text-white/30 flex items-center gap-2">
          <Clock size={10} /> 历史记录时间线
        </p>
        <div className="flex items-end gap-0">
          {records.map((r, i) => (
            <div key={r.year} className="flex-1 relative">
              {/* connector line */}
              {i < records.length - 1 && (
                <div className="absolute top-[22px] left-1/2 right-0 h-px"
                     style={{ background: `${dna.primaryColor}30` }} />
              )}
              <div className="relative flex flex-col items-center gap-2">
                <div className="w-3 h-3 rounded-full z-10"
                     style={{ background: r.current ? dna.primaryColor : 'rgba(255,255,255,.15)', boxShadow: r.current ? `0 0 12px ${dna.primaryColor}` : 'none' }} />
                <p className="text-[9px] text-white/30 font-bold uppercase">{r.year}</p>
                <p className="font-mono text-center leading-none"
                   style={{ fontSize: r.current ? '16px' : '12px', color: r.current ? dna.textAccent : 'rgba(255,255,255,.35)', fontWeight: r.current ? '900' : '400' }}>
                  {r.time}
                </p>
                <p className="text-[9px] text-center text-white/30">{r.label}</p>
                {r.current && (
                  <div className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase"
                       style={{ background: `${dna.primaryColor}33`, color: dna.textAccent }}>
                    NEW
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spec grid */}
      <div className="grid grid-cols-4 divide-x"
           style={{ borderBottom: '1px solid rgba(22,163,74,.12)', divideColor: 'rgba(22,163,74,.12)' }}>
        {[
          { label: 'POWER', value: '518 hp' },
          { label: 'ENGINE', value: '4.0 NA' },
          { label: '0–100', value: '3.0s' },
          { label: 'DOWNFORCE', value: '409 kg' },
        ].map(s => (
          <div key={s.label} className="text-center py-4"
               style={{ borderRight: '1px solid rgba(22,163,74,.12)' }}>
            <p className="text-[9px] font-bold uppercase tracking-widest mb-1 text-white/20">{s.label}</p>
            <p className="text-[15px] font-black" style={{ color: dna.textAccent }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="px-8 pt-6">
        <blockquote className="text-[15px] leading-relaxed text-white/70 pl-4"
                    style={{ borderLeft: `3px solid ${dna.primaryColor}` }}>
          "Manthey Racing and Porsche continue to break records. The GT3 RS is pure track weapon — DRS wing the size of a table, 518 hp NA flat-six, and now the fastest production car ever around the Green Hell."
        </blockquote>
      </div>

      {/* Design DNA */}
      {expanded && (
        <div className="mx-8 my-6 rounded-2xl p-5"
             style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
          <p className="text-[11px] font-black uppercase tracking-widest mb-3 text-white/30">归纳的设计要素</p>
          <div className="space-y-2">
            {DESIGN_ELEMENTS.achievement.map(el => (
              <div key={el.label} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: dna.primaryColor }} />
                <div>
                  <span className="text-[12px] font-bold text-white/70">{el.label}</span>
                  <span className="text-[11px] text-white/30 ml-2">{el.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engagement */}
      <div className="px-8 pb-8 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-5 text-[13px] text-white/40">
          <button onClick={() => setLiked(!liked)}
                  className="flex items-center gap-1.5 transition-colors"
                  style={{ color: liked ? '#ef4444' : undefined }}>
            <Heart size={14} className={liked ? 'fill-red-500 text-red-500' : ''} />
            {fmt(26700 + (liked ? 1 : 0))}
          </button>
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-green-400 transition-colors">
            <Repeat2 size={14} />{fmt(11300)}
          </span>
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-sky-400 transition-colors">
            <MessageCircle size={14} />{fmt(2980)}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={14} />{fmt(4200000)}
          </span>
        </div>
        <button onClick={onToggle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all"
                style={{ background: `${dna.primaryColor}15`, color: dna.textAccent, border: `1px solid ${dna.primaryColor}30` }}>
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? '收起' : '设计分析'}
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const TopThreeCarPosts: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 1: false, 2: false, 3: false });
  const toggle = (id: number) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  return (
    <div className="w-full font-sans relative"
         style={{ background: '#050508' }}>

      {/* ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: 'absolute', top: '10%', left: '-20%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(220,38,38,.04) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-20%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(22,163,74,.04) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-16">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest"
                 style={{ background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.4)', border: '1px solid rgba(255,255,255,.08)' }}>
              <TrendingUp size={11} /> Top 3 on X · Automotive
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-3">
            打破推特的<br />
            <span className="text-white/30">三张汽车帖</span>
          </h1>
          <p className="text-[15px] text-white/30 max-w-xl">
            3种不同的病毒式传播原型 · 点击「设计分析」查看每种类型的设计要素归纳
          </p>

          {/* Archetype legend */}
          <div className="flex flex-wrap gap-3 mt-6">
            {Object.values(DNA).map(d => (
              <div key={d.type}
                   className="flex items-center gap-2 px-3 py-2 rounded-full text-[11px] font-bold"
                   style={{ background: `${d.primaryColor}10`, color: d.textAccent, border: `1px solid ${d.primaryColor}25` }}>
                {d.icon}
                <strong>{d.typeLabel}</strong>
                <span className="text-white/30 hidden sm:inline">— {d.typeDesc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          <PassionCard expanded={expanded[1]} onToggle={() => toggle(1)} />
          <ControversyCard expanded={expanded[2]} onToggle={() => toggle(2)} />
          <AchievementCard expanded={expanded[3]} onToggle={() => toggle(3)} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-12 pt-8"
             style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
          <p className="text-[11px] text-white/15">
            @CARandDRIVER · @therealautoblog · @MotorTrend · May 2026
          </p>
          <a href="#" className="flex items-center gap-1.5 text-[11px] text-white/20 hover:text-white/40 transition-colors">
            View on X <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopThreeCarPosts;

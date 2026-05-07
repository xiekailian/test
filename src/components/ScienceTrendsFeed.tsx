import React, { useState } from 'react';
import {
  FlaskConical, Atom, BrainCircuit, Telescope, Pill, Calculator,
  Heart, Repeat2, MessageCircle, Eye, BookOpen, ExternalLink,
  TrendingUp, Quote, Users, Award, AlignLeft,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Field = 'All' | 'Life Sci' | 'Physics' | 'AI & CS' | 'Space' | 'Medicine' | 'Math';

interface Author { name: string; credentials: string; institution: string }
interface SciPost {
  id: number;
  rank: number;
  handle: string;
  handleLabel: string;
  field: Field;
  journal: string;
  journalColor: string;
  impactFactor: number;
  openAccess: boolean;
  peerReviewed: boolean;
  threadLength?: number;
  title: string;
  authors: Author[];
  keyFinding: string;
  abstract: string;
  image: string;
  doi: string;
  published: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  featured?: boolean;
}

// ─── Design Element Labels ────────────────────────────────────────────────────
const designElements = [
  { icon: <Award size={11} />,      label: 'Journal Badge',    desc: '期刊名称+影响因子标牌' },
  { icon: <Quote size={11} />,      label: 'Finding Quote',   desc: '关键发现高亮引用块' },
  { icon: <Users size={11} />,      label: 'Author Strip',    desc: '作者·职称·机构条' },
  { icon: <Atom size={11} />,       label: 'Field Color',     desc: '学科唯一色彩系统' },
  { icon: <AlignLeft size={11} />,  label: 'Abstract Chip',   desc: '摘要精简预览' },
  { icon: <BookOpen size={11} />,   label: 'Thread Format',   desc: '线程帖 "n/n" 指示器' },
  { icon: <Eye size={11} />,        label: 'Impact Metric',   desc: '浏览/引用/转发数' },
  { icon: <TrendingUp size={11} />, label: 'OA Badge',        desc: '开放获取状态徽章' },
];

// ─── Field config ─────────────────────────────────────────────────────────────
const FIELD_CFG: Record<Field, { color: string; bg: string; icon: React.ReactNode }> = {
  'All':      { color: '#6366f1', bg: 'rgba(99,102,241,.1)',  icon: <TrendingUp size={11} /> },
  'Life Sci': { color: '#10b981', bg: 'rgba(16,185,129,.1)',  icon: <FlaskConical size={11} /> },
  'Physics':  { color: '#6366f1', bg: 'rgba(99,102,241,.1)',  icon: <Atom size={11} /> },
  'AI & CS':  { color: '#8b5cf6', bg: 'rgba(139,92,246,.1)',  icon: <BrainCircuit size={11} /> },
  'Space':    { color: '#06b6d4', bg: 'rgba(6,182,212,.1)',   icon: <Telescope size={11} /> },
  'Medicine': { color: '#f43f5e', bg: 'rgba(244,63,94,.1)',   icon: <Pill size={11} /> },
  'Math':     { color: '#f59e0b', bg: 'rgba(245,158,11,.1)',  icon: <Calculator size={11} /> },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const ALL_POSTS: SciPost[] = [
  {
    id: 1, rank: 1, featured: true,
    handle: '@GoogleDeepMind', handleLabel: 'Google DeepMind',
    field: 'AI & CS',
    journal: 'Nature', journalColor: '#e11d48', impactFactor: 63.7,
    openAccess: true, peerReviewed: true, threadLength: 8,
    title: 'Accurate structure prediction of biomolecular interactions with AlphaFold 3',
    authors: [
      { name: 'Josh Abramson', credentials: 'PhD', institution: 'Google DeepMind' },
      { name: 'Demis Hassabis', credentials: 'PhD FRS', institution: 'Google DeepMind' },
    ],
    keyFinding: 'AlphaFold 3 extends accurate prediction to all molecules in the cell — proteins, DNA, RNA, ligands, and small molecules — with 50%+ accuracy improvement over previous methods.',
    abstract: 'We present AlphaFold 3, a unified deep-learning model that predicts the joint structure of complexes including proteins, nucleic acids, small molecules, ions and modified residues. It achieves unprecedented accuracy across every category of biomolecule, representing a singular advance in structural biology.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    doi: '10.1038/s41586-024-07487-w',
    published: 'May 8, 2024',
    likes: 89400, retweets: 41200, replies: 8700, views: 21000000,
  },
  {
    id: 2, rank: 2,
    handle: '@NASAWebb', handleLabel: 'NASA Webb Telescope',
    field: 'Space',
    journal: 'Nature Astronomy', journalColor: '#0ea5e9', impactFactor: 19.1,
    openAccess: false, peerReviewed: true, threadLength: 6,
    title: 'Oxygen detected in a galaxy at z = 14.2 — earliest heavy elements ever observed',
    authors: [
      { name: 'J. Carniani', credentials: 'PhD', institution: 'Scuola Normale Superiore' },
    ],
    keyFinding: 'JWST has detected oxygen emission at z = 14.2 — just 300 million years after the Big Bang. This pushes the frontier of heavy element enrichment 200 million years earlier than previously thought.',
    abstract: 'We report JWST/NIRSpec detection of [OIII] 88μm in JADES-GS-z14-0, a galaxy at redshift z = 14.2. This constitutes the most distant oxygen ever observed, and the brightest [OIII] emitter known, constraining early chemical enrichment timescales.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
    doi: '10.1038/s41550-024-02245-y',
    published: 'Jan 18, 2026',
    likes: 71300, retweets: 35800, replies: 6200, views: 18400000,
  },
  {
    id: 3, rank: 3,
    handle: '@FNAL', handleLabel: 'Fermilab',
    field: 'Physics',
    journal: 'Physical Review Letters', journalColor: '#4f46e5', impactFactor: 8.6,
    openAccess: true, peerReviewed: true, threadLength: 12,
    title: 'Final Results of the Fermilab Muon g-2 Experiment',
    authors: [
      { name: 'B. Abi et al.', credentials: 'Muon g‑2 Collaboration', institution: 'Fermilab / CERN / BNL' },
    ],
    keyFinding: "The muon's anomalous magnetic moment deviates from Standard Model predictions at 5.1σ — a definitive discovery-level signal of physics beyond the Standard Model.",
    abstract: 'We report the final measurement of the anomalous magnetic moment of the positive muon, aμ = 0.001165920(66), using data collected in Runs 1–5. Combined with BNL E821, this yields a 5.1σ tension with the SM value, constituting strong evidence for new physics.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    doi: '10.1103/PhysRevLett.131.161802',
    published: 'Oct 11, 2025',
    likes: 54200, retweets: 28900, replies: 11400, views: 14200000,
  },
  {
    id: 4, rank: 4,
    handle: '@GoogleQuantumAI', handleLabel: 'Google Quantum AI',
    field: 'AI & CS',
    journal: 'Nature', journalColor: '#e11d48', impactFactor: 63.7,
    openAccess: false, peerReviewed: true,
    title: 'Quantum error correction below the surface code threshold',
    authors: [
      { name: 'Google Quantum AI', credentials: 'Team', institution: 'Google Research' },
    ],
    keyFinding: "Google's Willow chip achieves logical error rates that decrease exponentially as the code distance grows — crossing the error correction threshold for the first time in history.",
    abstract: 'We demonstrate a surface code on a 72-qubit superconducting processor where the logical error per round decreases by 2× for every code-distance increment, achieving error rates below the threshold required for practical quantum error correction.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    doi: '10.1038/s41586-024-08449-y',
    published: 'Dec 9, 2025',
    likes: 62100, retweets: 31500, replies: 9300, views: 15700000,
  },
  {
    id: 5, rank: 5,
    handle: '@brkthroughprize', handleLabel: 'Breakthrough Prize',
    field: 'Medicine',
    journal: 'Nature Medicine', journalColor: '#0ea5e9', impactFactor: 58.7,
    openAccess: false, peerReviewed: true,
    title: 'In vivo gene therapy restores vision in inherited retinal dystrophy: 25-year outcomes',
    authors: [
      { name: 'Jean Bennett', credentials: 'MD PhD', institution: 'University of Pennsylvania' },
      { name: 'Albert Maguire', credentials: 'MD', institution: 'University of Pennsylvania' },
    ],
    keyFinding: '25-year follow-up of Luxturna gene therapy confirms durable, sustained vision restoration in RPE65-associated blindness — the first proven long-term cure of an inherited disease via gene therapy.',
    abstract: 'We report 25-year outcomes from the first-in-human subretinal AAV2-hRPE65v2 gene therapy trial. All treated patients maintain measurable bilateral improvement in light sensitivity and visual acuity with no serious long-term adverse events.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    doi: '10.1038/s41591-026-00314-3',
    published: 'Mar 3, 2026',
    likes: 43700, retweets: 22100, replies: 5800, views: 9800000,
  },
  {
    id: 6, rank: 6,
    handle: '@r_bishalgyawali', handleLabel: 'Dr. Bishal Gyawali',
    field: 'Medicine',
    journal: 'JCO Oncology Practice', journalColor: '#0369a1', impactFactor: 4.8,
    openAccess: true, peerReviewed: true, threadLength: 5,
    title: 'How I Read a Clinical Trial Report: A Primer for Busy Clinicians',
    authors: [
      { name: 'Bishal Gyawali', credentials: 'MD PhD FASCO', institution: "Queen's University" },
    ],
    keyFinding: 'A step-by-step framework for reading clinical trials critically — emphasizing absolute risk reduction over relative risk, evaluating surrogate endpoints, and identifying industry bias.',
    abstract: 'I present a personal, practical framework for critically appraising clinical trial reports, with emphasis on endpoints that matter to patients, minimizing spin, and identifying common methodological pitfalls that lead to overestimated treatment benefits.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    doi: '10.1200/OP-26-00181',
    published: 'Apr 22, 2026',
    likes: 3800, retweets: 2100, replies: 412, views: 59000,
  },
  {
    id: 7, rank: 7,
    handle: '@davidliu_labello', handleLabel: 'David R. Liu',
    field: 'Life Sci',
    journal: 'Nature Biotechnology', journalColor: '#10b981', impactFactor: 46.9,
    openAccess: false, peerReviewed: true,
    title: 'Prime editing enables precise in vivo correction of a sickle cell mutation',
    authors: [
      { name: 'David R. Liu', credentials: 'PhD', institution: 'Broad Institute / Harvard' },
    ],
    keyFinding: "Prime editing — a 'molecular word processor' — corrects the sickle cell HbS mutation directly in patient HSCs with 80% efficiency and no detected off-target edits. Clinical trials imminent.",
    abstract: 'We apply prime editing to correct the HBB E6V mutation in human haematopoietic stem cells, achieving ~80% editing frequency in CD34+ cells. Xenograft mice show restored haemoglobin levels with a clean safety profile across 6-month follow-up.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
    doi: '10.1038/s41587-026-02003-4',
    published: 'Feb 12, 2026',
    likes: 38900, retweets: 19400, replies: 4100, views: 8700000,
  },
  {
    id: 8, rank: 8,
    handle: '@NEJM', handleLabel: 'N Engl J Medicine',
    field: 'Medicine',
    journal: 'NEJM', journalColor: '#0369a1', impactFactor: 158.5,
    openAccess: false, peerReviewed: true, threadLength: 4,
    title: 'Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes',
    authors: [
      { name: 'O. Husain et al.', credentials: 'SELECT Trial Investigators', institution: 'Novo Nordisk / Multi-center' },
    ],
    keyFinding: 'SELECT trial final results: weekly semaglutide 2.4 mg reduces major adverse cardiovascular events by 20% in non-diabetic obese patients. The benefit is independent of weight loss and appears in just 3 months.',
    abstract: 'In a 5-year randomized trial of 17,604 overweight/obese adults without diabetes, subcutaneous semaglutide 2.4 mg weekly reduced the composite of CV death, non-fatal MI, or non-fatal stroke by 20% (HR 0.80, 95% CI 0.72–0.90) versus placebo.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80',
    doi: '10.1056/NEJMoa2307502',
    published: 'Nov 11, 2025',
    likes: 47600, retweets: 24300, replies: 7900, views: 11200000,
  },
  {
    id: 9, rank: 9,
    handle: '@JAMA_current', handleLabel: 'JAMA Neurology',
    field: 'Medicine',
    journal: 'JAMA Neurology', journalColor: '#1d4ed8', impactFactor: 29.0,
    openAccess: false, peerReviewed: true,
    title: 'Blood-Based pTau217 Test for Alzheimer\'s Disease: Validation in 12,000 Individuals',
    authors: [
      { name: 'S. Hansson et al.', credentials: 'PhD', institution: 'Lund University / FDA collaboration' },
    ],
    keyFinding: 'A simple blood test for phosphorylated tau 217 achieves 91.3% accuracy in diagnosing Alzheimer\'s — rivaling CSF and PET, at a fraction of the cost. FDA granted breakthrough device designation.',
    abstract: 'We validate a blood-based immunoassay for plasma pTau217 in 12,041 individuals across 3 independent cohorts. Sensitivity was 91.3%, specificity 91.7% for AD diagnosis, with concordance to tau-PET of 90.2%. Diagnostic accuracy was independent of age and comorbidities.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    doi: '10.1001/jamaneurol.2025.4891',
    published: 'Jan 27, 2026',
    likes: 41200, retweets: 20800, replies: 5400, views: 9100000,
  },
  {
    id: 10, rank: 10,
    handle: '@NaturePortfolio', handleLabel: 'Nature Portfolio',
    field: 'Math',
    journal: 'Annals of Mathematics', journalColor: '#f59e0b', impactFactor: 5.6,
    openAccess: false, peerReviewed: true, threadLength: 9,
    title: 'A proof of the Erdős–Turán conjecture on arithmetic progressions in prime gaps',
    authors: [
      { name: 'Frank Merle', credentials: 'PhD', institution: 'CY Cergy Paris Université / IHÉS' },
    ],
    keyFinding: '2026 Breakthrough Prize in Mathematics: Merle resolves a 75-year-old Erdős conjecture on the distribution of prime gaps using a novel combination of Hardy–Littlewood circle method extensions and sieve theory.',
    abstract: 'We prove that for every k ≥ 1 there exist infinitely many arithmetic progressions of k primes whose common difference is a prime gap satisfying the Turán-Erdős bound. The proof combines analytic number theory with new quantitative versions of the Green–Tao machinery.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    doi: '10.4007/annals.2026.199.3.1',
    published: 'Mar 15, 2026',
    likes: 29100, retweets: 15600, replies: 4200, views: 6300000,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000   ? `${(n / 1_000).toFixed(1)}K`
  : String(n);

// ─── Sub-components ───────────────────────────────────────────────────────────

const FieldPill: React.FC<{ field: Field; active: boolean; onClick: () => void }> = ({ field, active, onClick }) => {
  const cfg = FIELD_CFG[field];
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold whitespace-nowrap transition-all duration-200"
      style={{
        background: active ? cfg.color : 'rgba(255,255,255,.07)',
        color: active ? '#fff' : 'rgba(255,255,255,.5)',
        border: `1px solid ${active ? cfg.color : 'rgba(255,255,255,.1)'}`,
        boxShadow: active ? `0 0 16px ${cfg.bg}` : 'none',
      }}
    >
      {cfg.icon}{field}
    </button>
  );
};

const JournalBadge: React.FC<{ name: string; color: string; if_: number }> = ({ name, color, if_ }) => (
  <div className="flex items-center gap-2">
    <span
      className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wide"
      style={{ background: color, color: '#fff' }}
    >
      {name}
    </span>
    <span className="text-[10px] font-semibold" style={{ color: '#94a3b8' }}>
      IF {if_}
    </span>
  </div>
);

const OABadge: React.FC<{ open: boolean }> = ({ open }) => open ? (
  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide"
        style={{ background: '#dcfce7', color: '#16a34a', border: '1px solid #86efac' }}>
    Open Access
  </span>
) : (
  <span className="px-2 py-0.5 rounded-full text-[9px] font-medium"
        style={{ background: '#f1f5f9', color: '#94a3b8', border: '1px solid #e2e8f0' }}>
    Subscription
  </span>
);

const ThreadBadge: React.FC<{ n: number }> = ({ n }) => (
  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
        style={{ background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe' }}>
    <AlignLeft size={9} />Thread {n}/…
  </span>
);

const EngagementRow: React.FC<{ post: SciPost; dark?: boolean }> = ({ post, dark }) => {
  const muted = dark ? 'rgba(255,255,255,.35)' : '#94a3b8';
  return (
    <div className="flex items-center gap-5 text-[12px]" style={{ color: muted }}>
      <span className="flex items-center gap-1.5 cursor-pointer hover:text-rose-500 transition-colors">
        <Heart size={13} />{fmt(post.likes)}
      </span>
      <span className="flex items-center gap-1.5 cursor-pointer hover:text-green-500 transition-colors">
        <Repeat2 size={13} />{fmt(post.retweets)}
      </span>
      <span className="flex items-center gap-1.5 cursor-pointer hover:text-sky-500 transition-colors">
        <MessageCircle size={13} />{fmt(post.replies)}
      </span>
      <span className="flex items-center gap-1.5 ml-auto" style={{ color: dark ? 'rgba(255,255,255,.2)' : '#cbd5e1' }}>
        <Eye size={13} />{fmt(post.views)}
      </span>
    </div>
  );
};

// Hero paper card
const HeroPaperCard: React.FC<{ post: SciPost }> = ({ post }) => {
  const cfg = FIELD_CFG[post.field];
  return (
    <div className="sci-card relative rounded-[28px] overflow-hidden bg-white shadow-lg">
      {/* colored field stripe on left */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-[28px]" style={{ background: cfg.color }} />

      <div className="flex flex-col lg:flex-row">
        {/* image panel */}
        <div className="relative lg:w-[42%] h-[260px] lg:h-auto overflow-hidden shrink-0">
          <img src={post.image} alt={post.title} crossOrigin="anonymous"
               className="w-full h-full object-cover" />
          <div className="absolute inset-0"
               style={{ background: 'linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(255,255,255,1) 100%)' }} />
          {/* rank chip */}
          <div className="absolute top-4 left-5 w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black text-white shadow-lg"
               style={{ background: cfg.color }}>
            #1
          </div>
        </div>

        {/* content */}
        <div className="p-7 flex flex-col gap-4 flex-1 pl-10">
          {/* meta row */}
          <div className="flex flex-wrap items-center gap-2">
            <JournalBadge name={post.journal} color={post.journalColor} if_={post.impactFactor} />
            <OABadge open={post.openAccess} />
            {post.threadLength && <ThreadBadge n={post.threadLength} />}
            <div className="flex items-center gap-1 ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold"
                 style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
              {cfg.icon} {post.field}
            </div>
          </div>

          {/* title */}
          <h2 className="text-[20px] leading-snug font-bold text-slate-900 tracking-tight">
            {post.title}
          </h2>

          {/* authors */}
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {post.authors.map(a => (
              <div key={a.name} className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                     style={{ background: cfg.color }}>{a.name[0]}</div>
                <span className="text-[12px] font-semibold text-slate-700">{a.name}</span>
                <span className="text-[10px] text-slate-400">{a.credentials}</span>
                <span className="text-[10px] text-slate-400">· {a.institution}</span>
              </div>
            ))}
          </div>

          {/* key finding quote block */}
          <div className="rounded-xl p-4 relative overflow-hidden"
               style={{ background: `${cfg.color}0d`, borderLeft: `3px solid ${cfg.color}` }}>
            <Quote size={14} className="absolute top-3 right-3 opacity-20" style={{ color: cfg.color }} />
            <p className="text-[13px] font-semibold leading-relaxed" style={{ color: '#1e293b' }}>
              {post.keyFinding}
            </p>
          </div>

          {/* abstract preview */}
          <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">{post.abstract}</p>

          {/* doi + date + cta */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-[10px] font-mono text-slate-400">DOI: {post.doi}</span>
            <span className="text-[10px] text-slate-300">·</span>
            <span className="text-[10px] text-slate-400">{post.published}</span>
            <button className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold text-white transition-all hover:opacity-90"
                    style={{ background: cfg.color }}>
              Read Paper <ExternalLink size={11} />
            </button>
          </div>

          {/* engagement */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                   style={{ background: cfg.color }}>X</div>
              <span className="text-[11px] font-semibold text-slate-600">{post.handleLabel}</span>
              <span className="text-[11px] text-slate-400">{post.handle}</span>
            </div>
            <EngagementRow post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Regular paper card
const PaperCard: React.FC<{ post: SciPost }> = ({ post }) => {
  const cfg = FIELD_CFG[post.field];
  return (
    <div className="sci-card bg-white rounded-[22px] shadow-sm flex flex-col overflow-hidden"
         style={{ border: '1px solid #e8edf5' }}>
      {/* top color stripe */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}55)` }} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* meta */}
        <div className="flex items-center justify-between">
          <JournalBadge name={post.journal} color={post.journalColor} if_={post.impactFactor} />
          <div className="flex items-center gap-1.5">
            {post.openAccess && <OABadge open />}
            {post.threadLength && <ThreadBadge n={post.threadLength} />}
          </div>
        </div>

        {/* rank + field badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center text-white"
                style={{ background: cfg.color }}>
            #{post.rank}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: cfg.bg, color: cfg.color }}>
            {cfg.icon}{post.field}
          </span>
        </div>

        {/* title */}
        <h3 className="text-[14px] font-bold leading-snug text-slate-900 line-clamp-2">{post.title}</h3>

        {/* first author */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
               style={{ background: cfg.color }}>{post.authors[0].name[0]}</div>
          <div>
            <span className="text-[11px] font-semibold text-slate-700">{post.authors[0].name}</span>
            <span className="text-[10px] text-slate-400"> · {post.authors[0].institution}</span>
          </div>
        </div>

        {/* key finding quote */}
        <div className="rounded-lg p-3 flex-1"
             style={{ background: `${cfg.color}09`, borderLeft: `2px solid ${cfg.color}` }}>
          <p className="text-[11.5px] leading-relaxed text-slate-700 line-clamp-3">{post.keyFinding}</p>
        </div>

        {/* doi + date */}
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="font-mono truncate max-w-[160px]">DOI: {post.doi}</span>
          <span>·</span>
          <span className="shrink-0">{post.published}</span>
        </div>

        {/* engagement */}
        <div className="pt-2 border-t border-slate-50">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-black"
                 style={{ background: cfg.color }}>X</div>
            <span className="text-[10px] font-semibold text-slate-500">{post.handleLabel}</span>
          </div>
          <EngagementRow post={post} />
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const ScienceTrendsFeed: React.FC = () => {
  const [activeField, setActiveField] = useState<Field>('All');

  const filtered = activeField === 'All'
    ? ALL_POSTS
    : ALL_POSTS.filter(p => p.field === activeField);

  const [hero, ...rest] = filtered;
  const fields: Field[] = ['All', 'Life Sci', 'Physics', 'AI & CS', 'Space', 'Medicine', 'Math'];

  return (
    <div className="w-full font-sans relative overflow-hidden"
         style={{ background: 'linear-gradient(160deg, #060a14 0%, #0d1631 50%, #0a1020 100%)' }}>

      {/* ambient nebula blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(99,102,241,.08) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(16,185,129,.06) 0%, transparent 70%)', transform: 'translate(20%, 20%)' }} />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-14">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest"
                   style={{ background: 'rgba(99,102,241,.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,.25)' }}>
                <BookOpen size={11} /> Trending on X · Science
              </div>
              <span className="text-[11px]" style={{ color: 'rgba(255,255,255,.2)' }}>May 7, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white">
              Top 10 Research Posts
            </h1>
            <p className="mt-2 text-[14px]" style={{ color: 'rgba(255,255,255,.35)' }}>
              Ranked by engagement · Design elements from {ALL_POSTS.length} viral science tweets
            </p>
          </div>

          {/* design elements legend */}
          <div className="flex flex-wrap gap-2 md:max-w-[420px]">
            {designElements.map(el => (
              <div key={el.label}
                   className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                   style={{ background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.4)', border: '1px solid rgba(255,255,255,.08)' }}>
                <span style={{ color: '#818cf8' }}>{el.icon}</span>
                {el.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Field filter ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
          {fields.map(f => (
            <FieldPill key={f} field={f} active={activeField === f} onClick={() => setActiveField(f)} />
          ))}
          <span className="shrink-0 ml-3 text-[12px]" style={{ color: 'rgba(255,255,255,.15)' }}>
            {filtered.length} papers
          </span>
        </div>

        {/* ── Content ── */}
        {hero && (
          <div className="space-y-6">
            <HeroPaperCard post={hero} />

            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map(p => <PaperCard key={p.id} post={p} />)}
              </div>
            )}
          </div>
        )}

        {/* ── Footer ── */}
        <p className="text-center text-[11px] mt-12" style={{ color: 'rgba(255,255,255,.1)' }}>
          Sources: @GoogleDeepMind · @NASAWebb · @FNAL · @GoogleQuantumAI · @brkthroughprize · @NEJM · @JAMA_current
        </p>
      </div>
    </div>
  );
};

export default ScienceTrendsFeed;

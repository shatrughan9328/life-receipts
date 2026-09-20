import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Play
} from 'lucide-react';
import FloatingReceipts from '../components/FloatingReceipts';
import { CATEGORIES } from '../data/receipts';

export default function Landing() {
  const stats = [
    { value: '428', label: 'Moments Captured' },
    { value: '9', label: 'Life Dimensions' },
    { value: '12', label: 'Months Traversed' },
    { value: '1', label: 'Cohesive Story' },
  ];

  const pillars = [
    { step: '01', title: 'Raw Data', desc: 'Fragments of daily life — songs, places, notes, searches, and purchases.' },
    { step: '02', title: 'Patterns', desc: 'Behavioral loops, night owl spikes, and third place sanctuaries.' },
    { step: '03', title: 'Connections', desc: 'Algorithmic relational scoring discovering hidden links between records.' },
    { step: '04', title: 'Chapters', desc: 'Automatic grouping of distinct personal eras and turning points.' },
    { step: '05', title: 'Story', desc: 'Lyrical narratives synthesized from your digital footprints.' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-between">
      {/* Cinematic Ambient Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-pink-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-blue-500/10 blur-[130px] pointer-events-none" />

      {/* Floating Animated Background Receipts */}
      <FloatingReceipts />

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 text-center">
        
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md shadow-lg mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs font-mono tracking-wider uppercase text-slate-300">
            Hackathon Edition • Your Life, In Receipts
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white mb-6 leading-[1.1]">
          Your Life, <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            In Receipts.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-10">
          Hundreds of moments. One story waiting to be discovered.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/overview"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-95 shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Uncover My Story</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/journey"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current text-indigo-400" />
            <span>Play Guided Journey</span>
          </Link>
        </div>

        {/* Live Statistics Counter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#0d101d]/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-indigo-950/40 max-w-4xl mx-auto">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-1">
                {s.value}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Transformation Flow (Raw Data -> Story) */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mb-3">
            Beyond A Chronological Timeline
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            A song at 1:48 AM, a café search, a coffee receipt, a photograph, and a private note. 
            Individually, they were receipts. Together, they formed a turning point.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {pillars.map((p, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.06] hover:border-indigo-500/40 transition-all duration-300 group"
            >
              <span className="text-xs font-mono font-bold text-indigo-400 block mb-2">
                {p.step}
              </span>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9 Categories Visual Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map(c => (
            <div 
              key={c.id}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] py-8 text-center text-xs font-mono text-slate-500">
        <p>LifeLens • Built for Hackathon: "Your Life, In Receipts" • 100% Local Browser Engine</p>
      </footer>
    </div>
  );
}

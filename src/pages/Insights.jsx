import React from 'react';
import { Link } from 'react-router-dom';
import { storyService } from '../services/storyService';
import InsightCard from '../components/InsightCard';
import { 
  Lightbulb, 
  Play, 
  UserCheck 
} from 'lucide-react';

export default function Insights() {
  const patterns = storyService.getPatterns();
  const personality = storyService.getPersonality();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Page Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            Behavioral Synthesis
          </span>
          <span className="text-xs text-slate-400 font-mono">5 Unconscious Patterns Discovered</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          Patterns You Didn't Notice
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
          By cross-referencing timestamps, locations, music cues, and journal entries, our algorithms surfaced recurring behavioral cycles.
        </p>
      </div>

      {/* Patterns Discovery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patterns.map(pattern => (
          <InsightCard key={pattern.id} pattern={pattern} />
        ))}
      </div>

      {/* Section 2: What Your Receipts Say About You */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0f1d] border border-white/[0.1] shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              Digital Personality Profile
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-2">
            What Your Receipts Say About You
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mb-8">
            {personality.summary}
          </p>

          {/* Archetype Hero Pill */}
          <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/40 mb-10">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-500/30">
              ✦
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-indigo-400 tracking-wider block">
                Primary Persona Archetype
              </span>
              <span className="text-lg font-bold text-white">
                {personality.archetype}
              </span>
            </div>
          </div>

          {/* 6 Key Personality Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {personality.metrics.map((m, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-all"
              >
                <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  {m.label}
                </span>
                <span className="text-base font-bold text-white block mb-1">
                  {m.value}
                </span>
                <span className="text-xs text-slate-400">
                  {m.detail}
                </span>
              </div>
            ))}
          </div>

          {/* Climax Statement */}
          <div className="pt-8 border-t border-white/[0.08] text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {personality.closingStatement.headline}
            </h3>
            <p className="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              {personality.closingStatement.subheadline}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              {personality.closingStatement.reflection}
            </p>

            <div className="pt-4">
              <Link
                to="/journey"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-95 shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Replay My Journey</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

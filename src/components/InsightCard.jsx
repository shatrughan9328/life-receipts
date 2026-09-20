import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function InsightCard({ pattern }) {
  return (
    <div className={`relative p-6 sm:p-8 rounded-3xl bg-[#0e1220]/80 backdrop-blur-xl border ${pattern.borderColor} hover:border-white/30 transition-all duration-300 shadow-xl overflow-hidden group`}>
      {/* Background Gradient */}
      <div 
        className={`absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity bg-gradient-to-br ${pattern.color}`}
      />

      {/* Badge */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/[0.05] border border-white/[0.1] ${pattern.textColor}`}>
          {pattern.badge}
        </span>
        <Sparkles className={`w-4 h-4 ${pattern.textColor} opacity-60`} />
      </div>

      {/* Big Stat Hero */}
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          {pattern.stat}
        </span>
        <span className="text-sm font-medium text-slate-300 leading-snug">
          {pattern.substat}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-lg font-bold text-white mb-2">
        {pattern.title}
      </h4>

      {/* Detailed Description */}
      <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
        {pattern.description}
      </p>

      {/* Evidence Pill */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2 text-xs font-mono text-slate-400">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="truncate">{pattern.evidence}</span>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function InsightCard({ pattern }) {
  return (
    <article 
      className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#0e1220]/80 backdrop-blur-xl border ${pattern.borderColor} hover:border-white/30 transition-all duration-300 shadow-xl overflow-hidden group`}
      aria-labelledby={`insight-${pattern.id}-title`}
    >
      {/* Background Gradient */}
      <div 
        className={`absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity bg-gradient-to-br ${pattern.color} pointer-events-none`}
      />

      <div>
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
        <h4 id={`insight-${pattern.id}-title`} className="text-lg font-bold text-white mb-2">
          {pattern.title}
        </h4>

        {/* Detailed Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
          {pattern.description}
        </p>
      </div>

      {/* Evidence Pill & Direct Explorer Link */}
      <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">{pattern.evidence}</span>
        </div>

        {pattern.explorerQuery && (
          <Link
            to={pattern.explorerQuery}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group-hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
          >
            <span>View Related Moments in Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </article>
  );
}

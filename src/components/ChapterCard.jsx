import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Moon, 
  GraduationCap, 
  Plane, 
  Film, 
  ArrowRight
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Moon,
  GraduationCap,
  Plane,
  Film
};

export default function ChapterCard({ chapter }) {
  const ThemeIcon = ICON_MAP[chapter.themeIcon] || Sparkles;

  return (
    <div className={`relative group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#0e1220]/80 backdrop-blur-xl border ${chapter.borderColor} hover:border-white/30 transition-all duration-300 overflow-hidden shadow-xl`}>
      {/* Background Radial Glow */}
      <div 
        className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-br ${chapter.bgGradient}`}
      />

      <div>
        {/* Top Header: Era Pill & Total Count */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div 
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border"
            style={{
              backgroundColor: `${chapter.accentColor}18`,
              borderColor: `${chapter.accentColor}40`,
              color: chapter.accentColor
            }}
          >
            <ThemeIcon className="w-3.5 h-3.5" />
            <span>{chapter.era}</span>
          </div>

          <span className="text-xs font-mono text-slate-400">
            {chapter.totalMoments} moments
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold font-display text-white tracking-tight mb-2 group-hover:text-indigo-200 transition-colors">
          {chapter.title}
        </h3>

        {/* Tagline / Emotional Quote */}
        <p className="text-sm font-serif italic text-indigo-300/90 mb-4">
          {chapter.tagline}
        </p>

        {/* Category Breakdown Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {Object.entries(chapter.stats).map(([cat, count]) => {
            if (count === 0) return null;
            return (
              <span 
                key={cat}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.06] text-slate-300 flex items-center gap-1"
              >
                <span className="capitalize">{cat}:</span>
                <span className="text-white font-semibold">{count}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono">
          {chapter.keyLocations?.[0] || 'Multiple Locations'}
        </span>

        <Link
          to={`/chapters/${chapter.id}`}
          className="flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors hover:translate-x-0.5 duration-200"
        >
          <span>Explore Chapter</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

import React from 'react';
import { getLifeChapters } from '../utils/chapterGenerator';
import ChapterCard from '../components/ChapterCard';
import { BookOpen, Sparkles } from 'lucide-react';

export default function Chapters() {
  const chapters = getLifeChapters();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Epoch Discovery
          </span>
          <span className="text-xs text-slate-400 font-mono">5 Distinct Eras Identified</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          Chapters of Your Digital Life
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
          Individual receipts cluster into meaningful eras of your life. Discover your late-night coding flow, intense focus sprints, and mountain getaways.
        </p>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map(chapter => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </div>

      {/* Bottom Context Banner */}
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center max-w-2xl mx-auto">
        <Sparkles className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
        <p className="text-sm font-serif italic text-slate-300">
          "We do not remember days; we remember moments. A chapter is simply a collection of moments breathing the same air."
        </p>
      </div>

    </div>
  );
}

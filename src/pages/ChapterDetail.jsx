import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getChapterById } from '../utils/chapterGenerator';
import ReceiptCard from '../components/ReceiptCard';
import ReceiptModal from '../components/ReceiptModal';
import { 
  ArrowLeft, 
  Network, 
  Play
} from 'lucide-react';

export default function ChapterDetail() {
  const { id } = useParams();
  const chapter = getChapterById(id);
  const [activeReceiptModal, setActiveReceiptModal] = useState(null);

  if (!chapter) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Chapter Not Found</h2>
        <p className="text-slate-400 mb-6">The requested chapter could not be located in your digital archives.</p>
        <Link to="/chapters" className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-mono">
          ← Return to All Chapters
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back Button */}
      <div>
        <Link
          to="/chapters"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Chapters</span>
        </Link>
      </div>

      {/* Hero Chapter Header */}
      <div className={`relative p-8 sm:p-12 rounded-3xl bg-[#0c0f1d] border ${chapter.borderColor} shadow-2xl overflow-hidden`}>
        {/* Glow ambient */}
        <div 
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20 bg-gradient-to-br ${chapter.bgGradient} pointer-events-none`}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span 
              className="px-3 py-1 rounded-full text-xs font-mono font-medium border"
              style={{
                backgroundColor: `${chapter.accentColor}20`,
                borderColor: `${chapter.accentColor}50`,
                color: chapter.accentColor
              }}
            >
              {chapter.era}
            </span>

            <span className="text-xs font-mono text-slate-400">
              {chapter.totalMoments} Connected Moments
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
            {chapter.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-6">
            {chapter.summary}
          </p>

          {/* Emotional Quote */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-8">
            <p className="text-sm sm:text-base font-serif italic text-indigo-200">
              {chapter.quote}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/connections?focus=${chapter.receipts[0]?.id}`}
              className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Explore Chapter Network Graph</span>
            </Link>

            <Link
              to="/journey"
              className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-all flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-indigo-400 fill-current" />
              <span>Play Guided Walkthrough</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Chapter Receipts Stream */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display text-white">
              Moments That Shaped This Era
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Click any receipt to examine detailed metadata and audio/photo visualizers.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {chapter.receipts.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {chapter.receipts.map(receipt => (
            <ReceiptCard
              key={receipt.id}
              receipt={receipt}
              onClick={(r) => setActiveReceiptModal(r)}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {activeReceiptModal && (
        <ReceiptModal
          receipt={activeReceiptModal}
          onClose={() => setActiveReceiptModal(null)}
          onSelectReceipt={(r) => setActiveReceiptModal(r)}
        />
      )}

    </div>
  );
}

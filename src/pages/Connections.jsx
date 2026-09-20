import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ALL_RECEIPTS, getDemoClusterReceipts } from '../data/receipts';
import ConnectionGraph from '../components/ConnectionGraph';
import StoryReveal from '../components/StoryReveal';
import { Sparkles, Network, Flame } from 'lucide-react';
import { getLifeChapters } from '../utils/chapterGenerator';

export default function Connections() {
  const [searchParams] = useSearchParams();
  const focusParam = searchParams.get('focus');

  const chapters = getLifeChapters();
  const [selectedClusterId, setSelectedClusterId] = useState('the-reset');
  const [threshold, setThreshold] = useState(35);
  const [storyReceipts, setStoryReceipts] = useState(null);

  // Active cluster receipts pool for graph visualization
  const activeChapter = chapters.find(c => c.id === selectedClusterId) || chapters[0];
  const clusterReceipts = activeChapter.receipts;

  // Selected receipt within the cluster (defaults to first moment, e.g. Night Changes for The Reset)
  const initialReceipt = focusParam 
    ? ALL_RECEIPTS.find(r => r.id === focusParam) || clusterReceipts[0]
    : clusterReceipts[0];

  const [selectedReceipt, setSelectedReceipt] = useState(initialReceipt);

  useEffect(() => {
    if (focusParam) {
      const found = ALL_RECEIPTS.find(r => r.id === focusParam);
      if (found) {
        setSelectedReceipt(found);
        // If it belongs to a chapter, switch to that chapter
        const parentChapter = chapters.find(c => c.receipts.some(r => r.id === found.id));
        if (parentChapter) {
          setSelectedClusterId(parentChapter.id);
        }
      }
    }
  }, [focusParam, chapters]);

  const handleClusterSelect = (chapter) => {
    setSelectedClusterId(chapter.id);
    setSelectedReceipt(chapter.receipts[0]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5" />
              Relational Vector Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">Connect the Dots</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Connect the Dots
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
            Select a receipt node to illuminate connected moments. Our local deterministic scoring engine calculates temporal proximity, physical overlap, and shared intent.
          </p>
        </div>

        {/* Demo Story Quick Trigger */}
        <button
          onClick={() => {
            const resetCluster = getDemoClusterReceipts();
            setStoryReceipts(resetCluster);
          }}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Quick Story Demo: "The Reset"</span>
        </button>
      </div>

      {/* Cluster Preset Story Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-2 shrink-0">
          Story Clusters:
        </span>
        {chapters.map(ch => {
          const isSelected = selectedClusterId === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => handleClusterSelect(ch)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap border transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border-white/[0.06]'
              }`}
            >
              {ch.isFlagship && <Flame className="w-3.5 h-3.5 text-amber-400" />}
              <span>{ch.title}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isSelected ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'
              }`}>
                {ch.totalMoments}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Connection Graph Component */}
      <ConnectionGraph
        receipts={clusterReceipts}
        selectedReceipt={selectedReceipt}
        onSelectReceipt={setSelectedReceipt}
        onRevealStory={(relatedReceipts) => setStoryReceipts(relatedReceipts)}
        threshold={threshold}
        onThresholdChange={setThreshold}
      />

      {/* Narrative Synthesis Story Reveal Modal */}
      {storyReceipts && (
        <StoryReveal
          receipts={storyReceipts}
          onClose={() => setStoryReceipts(null)}
        />
      )}

    </div>
  );
}

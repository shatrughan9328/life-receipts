import React, { useState } from 'react';
import MemoryConstellation from '../components/MemoryConstellation';
import ReceiptModal from '../components/ReceiptModal';
import { Stars } from 'lucide-react';

export default function ConstellationPage() {
  const [activeReceiptModal, setActiveReceiptModal] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
            <Stars className="w-3.5 h-3.5" />
            Celestial Galaxy
          </span>
          <span className="text-xs text-slate-400 font-mono">428 Moments</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          Memory Constellation
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Every digital receipt plotted into an interactive celestial starfield. Hover to preview; click to illuminate its constellation of connected memories.
        </p>
      </div>

      <MemoryConstellation 
        onSelectReceipt={(receipt) => setActiveReceiptModal(receipt)}
      />

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

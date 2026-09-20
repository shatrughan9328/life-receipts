import React, { useEffect, useState, useMemo } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  Link2, 
  Camera, 
  Search, 
  FileText,
  ExternalLink,
  Barcode
} from 'lucide-react';
import { getCategoryConfig, ICON_MAP } from '../constants/categories';
import { getConnectionsForReceipt } from '../utils/connectionEngine';
import { receiptService } from '../services/receiptService';
import { Link } from 'react-router-dom';
import ConnectionChain from './ConnectionChain';
import WaveformPlayer from './WaveformPlayer';

export default function ReceiptModal({ receipt, onClose, onSelectReceipt }) {
  const [showChain, setShowChain] = useState(false);

  const connectedMoments = useMemo(() => {
    if (!receipt) return [];
    return getConnectionsForReceipt(receipt, receiptService.getAll(), 35).slice(0, 5);
  }, [receipt]);

  const relatedChainReceipts = useMemo(() => {
    if (!receipt) return [];
    return [receipt, ...connectedMoments.map(c => c.receipt)];
  }, [receipt, connectedMoments]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!receipt) return null;

  const categoryConfig = getCategoryConfig(receipt.type);
  const IconComponent = ICON_MAP[receipt.type] || FileText;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d101c] border border-white/[0.12] shadow-2xl shadow-indigo-950/50 p-5 sm:p-8 focus-visible:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
          style={{ backgroundColor: categoryConfig.color }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          aria-label="Close receipt details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Receipt Type Pill & Timestamp */}
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
            style={{ 
              backgroundColor: `${categoryConfig.color}18`, 
              borderColor: `${categoryConfig.color}40`,
              color: categoryConfig.color 
            }}
          >
            <IconComponent className="w-4 h-4" />
            <span>{categoryConfig.label}</span>
          </div>

          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {receipt.date} at {receipt.timestamp}
          </span>
        </div>

        {/* Main Title */}
        <h2 id="receipt-modal-title" className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mb-2">
          {receipt.title}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
          {receipt.description}
        </p>

        {/* ------------------------------------------------------------- */}
        {/* Category-Specific Visual Previews                             */}
        {/* ------------------------------------------------------------- */}
        
        {/* 1. MUSIC PREVIEW */}
        {receipt.type === 'music' && (
          <WaveformPlayer metadata={receipt.metadata} />
        )}

        {/* 2. PLACE PREVIEW */}
        {receipt.type === 'place' && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{receipt.location || 'Location Pin'}</span>
                </div>
                <p className="text-xs text-slate-400">{receipt.metadata?.address || 'City Center district'}</p>
                {receipt.metadata?.vibe && (
                  <p className="text-xs text-slate-300 mt-2 font-mono">Atmosphere: {receipt.metadata.vibe}</p>
                )}
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-right">
                <span className="block text-[10px] uppercase font-mono text-amber-400">Total Visits</span>
                <span className="text-lg font-bold text-white">{receipt.metadata?.visitCount || 12}</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. PHOTO PREVIEW */}
        {receipt.type === 'photo' && (
          <div className="mb-6 p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20">
            <div className="h-44 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-950/50 to-indigo-950 flex flex-col items-center justify-center p-6 text-center border border-white/[0.05] relative overflow-hidden">
              <Camera className="w-10 h-10 text-blue-400/50 mb-2" />
              <p className="text-xs font-mono text-blue-300 max-w-md italic">"{receipt.metadata?.caption || receipt.title}"</p>
              
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{receipt.metadata?.camera || 'iPhone 15 Pro'}</span>
                <span>{receipt.metadata?.iso ? `ISO ${receipt.metadata.iso}` : '24mm f/1.8'}</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. PURCHASE PREVIEW */}
        {receipt.type === 'purchase' && (
          <div className="mb-6 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 font-mono">
            <div className="flex justify-between items-center pb-2 border-b border-white/[0.08] text-xs text-slate-400">
              <span>MERCHANT: {receipt.location || 'Terminal Store'}</span>
              <span className="text-cyan-400 font-bold">{receipt.metadata?.amount || '$12.50'}</span>
            </div>
            {receipt.metadata?.items && (
              <div className="py-2 space-y-1 text-xs text-slate-300">
                {receipt.metadata.items.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-2 flex justify-between text-[11px] text-slate-500 border-t border-white/[0.08]">
              <span>Payment: {receipt.metadata?.paymentMethod || 'Apple Pay'}</span>
              <span>AUTH APPROVED</span>
            </div>
          </div>
        )}

        {/* 5. SEARCH PREVIEW */}
        {receipt.type === 'search' && (
          <div className="mb-6 p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 mb-2">
              <Search className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono text-slate-200 truncate">{receipt.metadata?.query || receipt.title}</span>
            </div>
            <p className="text-xs text-slate-400">Search Engine: {receipt.metadata?.engine || 'Google Search'}</p>
          </div>
        )}

        {/* 6. NOTE PREVIEW */}
        {receipt.type === 'note' && (
          <div className="mb-6 p-5 rounded-2xl bg-yellow-950/15 border border-yellow-500/25 relative">
            <div className="absolute top-3 right-4 text-[10px] font-mono uppercase text-yellow-400/70">
              Personal Journal
            </div>
            <p className="text-sm font-serif italic text-slate-200 leading-relaxed pl-3 border-l-2 border-yellow-500/50">
              {receipt.metadata?.excerpt || receipt.description}
            </p>
          </div>
        )}

        {/* Keywords & Mood */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {receipt.mood && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
              Mood: {receipt.mood}
            </span>
          )}
          {receipt.keywords?.map((kw, i) => (
            <span key={i} className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/[0.05] text-slate-300 border border-white/[0.08]">
              #{kw}
            </span>
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Connected Moments Engine Section                              */}
        {/* ------------------------------------------------------------- */}
        <div className="pt-6 border-t border-white/[0.1]">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-indigo-400" />
              <span>Connected Moments ({connectedMoments.length})</span>
            </h4>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowChain(!showChain)}
                className="text-xs text-slate-400 hover:text-indigo-300 font-mono underline cursor-pointer"
              >
                {showChain ? 'Hide Chain' : 'View Life Chain'}
              </button>
              <Link
                to={`/connections?focus=${receipt.id}`}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium hover:underline"
              >
                <span>View in Graph</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {showChain ? (
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-4">
              <ConnectionChain 
                receipts={relatedChainReceipts} 
                onSelectReceipt={(r) => onSelectReceipt && onSelectReceipt(r)} 
              />
            </div>
          ) : (
            connectedMoments.length > 0 ? (
              <div className="space-y-2">
                {connectedMoments.map(({ receipt: connReceipt, score, reasons }) => (
                  <div
                    key={connReceipt.id}
                    onClick={() => onSelectReceipt && onSelectReceipt(connReceipt)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (onSelectReceipt) onSelectReceipt(connReceipt);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View connected moment: ${connReceipt.title}`}
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-indigo-500/30 transition-all cursor-pointer flex items-center justify-between gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-white group-hover:text-indigo-300 truncate">
                          {connReceipt.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {connReceipt.timestamp}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {reasons.slice(0, 2).map((r, ri) => (
                          <span key={ri} className="text-[10px] text-slate-400 bg-white/[0.04] px-1.5 py-0.2 rounded">
                            {r.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-xs font-mono font-bold text-indigo-400">
                        {score} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No strongly connected moments found above threshold.</p>
            )
          )}
        </div>

        {/* Barcode & Unique Receipt Identifier */}
        <div className="mt-8 pt-4 border-t border-dashed border-white/[0.1] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>RECEIPT ID: {receipt.id}</span>
          <div className="flex items-center gap-1">
            <Barcode className="w-8 h-4 opacity-50" />
            <span>LIFELENS-SECURE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

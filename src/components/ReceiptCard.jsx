import React from 'react';
import { 
  MapPin, 
  Link2, 
  Clock,
  FileText
} from 'lucide-react';
import { getCategoryConfig, ICON_MAP } from '../constants/categories';

export default function ReceiptCard({ receipt, onClick, connectionCount = 0, isHighlighted = false }) {
  const categoryConfig = getCategoryConfig(receipt.type);
  const IconComponent = ICON_MAP[receipt.type] || FileText;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick(receipt);
    }
  };

  return (
    <article
      onClick={() => onClick && onClick(receipt)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${receipt.type} receipt: ${receipt.title}, recorded at ${receipt.timestamp} on ${receipt.date}`}
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0f1322]/80 backdrop-blur-md border transition-all duration-300 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090e] ${
        isHighlighted 
          ? 'border-indigo-500 shadow-lg shadow-indigo-500/25 ring-1 ring-indigo-500' 
          : 'border-white/[0.08] hover:border-white/20 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1'
      }`}
    >
      {/* Category Accent Top Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: categoryConfig.color }}
      />

      <div>
        {/* Receipt Header: Category Pill & Monospace Timestamp */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
            style={{ 
              backgroundColor: `${categoryConfig.color}15`, 
              borderColor: `${categoryConfig.color}35`,
              color: categoryConfig.color
            }}
          >
            <IconComponent className="w-3.5 h-3.5" />
            <span className="capitalize tracking-wide font-medium">{categoryConfig.label}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{receipt.timestamp}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-indigo-200 transition-colors line-clamp-1 mb-1.5">
          {receipt.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
          {receipt.description}
        </p>
      </div>

      {/* Footer Info: Location & Connection link count */}
      <div>
        {receipt.location && (
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2.5 truncate">
            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate">{receipt.location}</span>
          </div>
        )}

        {/* Bottom divider with receipt slip styling */}
        <div className="pt-3 border-t border-dashed border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>{receipt.date}</span>

          {connectionCount > 0 ? (
            <span className="flex items-center gap-1 text-indigo-400 font-medium group-hover:underline">
              <Link2 className="w-3 h-3" />
              <span>{connectionCount} linked</span>
            </span>
          ) : (
            <span className="text-slate-500">#{receipt.id.split('-').slice(-1)[0]}</span>
          )}
        </div>
      </div>
    </article>
  );
}

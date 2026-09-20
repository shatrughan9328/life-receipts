import React from 'react';
import { 
  Music, 
  Film, 
  MapPin, 
  CreditCard, 
  Camera, 
  MessageCircle, 
  Search, 
  Calendar, 
  FileText,
  Link2,
  Clock
} from 'lucide-react';
import { CATEGORIES } from '../data/receipts';

const ICON_MAP = {
  music: Music,
  movie: Film,
  place: MapPin,
  purchase: CreditCard,
  photo: Camera,
  message: MessageCircle,
  search: Search,
  event: Calendar,
  note: FileText,
};

export default function ReceiptCard({ receipt, onClick, connectionCount = 0, isHighlighted = false }) {
  const categoryConfig = CATEGORIES.find(c => c.id === receipt.type) || CATEGORIES[0];
  const IconComponent = ICON_MAP[receipt.type] || FileText;

  return (
    <div
      onClick={() => onClick && onClick(receipt)}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-[#0f1322]/80 backdrop-blur-md border transition-all duration-300 cursor-pointer overflow-hidden ${
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
        <div className="pt-3 border-t border-dashed border-white/[0.08] flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>{receipt.date}</span>

          {connectionCount > 0 ? (
            <span className="flex items-center gap-1 text-indigo-400 font-medium group-hover:underline">
              <Link2 className="w-3 h-3" />
              <span>{connectionCount} linked</span>
            </span>
          ) : (
            <span className="text-slate-600">#{receipt.id.split('-').slice(-1)[0]}</span>
          )}
        </div>
      </div>
    </div>
  );
}

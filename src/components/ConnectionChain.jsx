import { 
  ArrowDown, 
  Music, 
  Film, 
  MapPin, 
  CreditCard, 
  Camera, 
  MessageCircle, 
  Search, 
  Calendar, 
  FileText,
  Clock,
  Sparkles
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

// Causal transition explanations between sequential steps
const TRANSITION_EXPLANATIONS = {
  'music->search': 'Auditory emotional prompt sparked intellectual curiosity',
  'search->place': 'Digital exploration converted into real-world movement',
  'place->purchase': 'Physical presence anchored by a tangible transaction',
  'purchase->photo': 'Personal moment captured before it passed',
  'photo->note': 'Visual stillness distilled into reflective realization',
  'music->note': 'Late night soundtrack lowered resistance for introspection',
  'event->photo': 'Shared experience documented as a permanent visual anchor',
  'event->place': 'Destination reached for a planned gathering',
  'place->photo': 'Novel physical environment triggered visual curiosity',
  'search->purchase': 'Intent transformed into direct acquisition',
};

export default function ConnectionChain({ receipts = [], onSelectReceipt, _orientation = 'vertical' }) {
  if (!receipts || receipts.length < 2) return null;

  // Sort receipts chronologically
  const sorted = [...receipts].sort((a, b) => {
    const d = a.date.localeCompare(b.date);
    if (d !== 0) return d;
    return a.timestamp.localeCompare(b.timestamp);
  });

  return (
    <div className="w-full space-y-3" role="region" aria-label="Sequential Connection Chain">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Causal Life Chain ({sorted.length} steps)</span>
        </span>
        <span className="text-[11px] font-mono text-slate-400">
          Chronological Flow
        </span>
      </div>

      <div className="space-y-2">
        {sorted.map((receipt, index) => {
          const categoryConfig = CATEGORIES.find(c => c.id === receipt.type) || CATEGORIES[0];
          const IconComponent = ICON_MAP[receipt.type] || FileText;
          const nextReceipt = sorted[index + 1];
          const transitionKey = nextReceipt ? `${receipt.type}->${nextReceipt.type}` : null;
          const explanation = transitionKey ? (TRANSITION_EXPLANATIONS[transitionKey] || 'Consecutive moments in the same life rhythm') : null;

          return (
            <div key={receipt.id} className="relative">
              {/* Receipt Node Item */}
              <div
                onClick={() => onSelectReceipt && onSelectReceipt(receipt)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onSelectReceipt) onSelectReceipt(receipt);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Step ${index + 1}: ${receipt.type} - ${receipt.title} at ${receipt.timestamp}`}
                className="group p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-indigo-500/40 transition-all cursor-pointer flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Step index badge */}
                  <span className="w-5 h-5 rounded-full bg-white/[0.06] text-[10px] font-mono font-bold text-slate-400 flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>

                  {/* Category icon */}
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${categoryConfig.color}18`,
                      borderColor: `${categoryConfig.color}35`,
                      color: categoryConfig.color
                    }}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white group-hover:text-indigo-200 transition-colors truncate">
                      {receipt.title}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                      <span className="capitalize">{categoryConfig.label}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-slate-500" />
                        {receipt.timestamp}
                      </span>
                      {receipt.location && (
                        <>
                          <span>•</span>
                          <span className="truncate max-w-[100px]">{receipt.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0">
                  View →
                </span>
              </div>

              {/* Connecting Step Transition Explanation */}
              {nextReceipt && (
                <div className="py-1 px-4 ml-6 my-0.5 border-l-2 border-dashed border-indigo-500/30 flex items-center gap-2 text-[10px] font-mono text-indigo-300/80">
                  <ArrowDown className="w-2.5 h-2.5 text-indigo-400 shrink-0" />
                  <span className="truncate">{explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { 
  Music, 
  MapPin, 
  Search, 
  Camera, 
  CreditCard, 
  FileText,
  Clock
} from 'lucide-react';

const FLOATING_ITEMS = [
  {
    icon: Music,
    category: 'Music',
    title: 'Played "Night Changes"',
    time: '01:48 AM',
    color: '#10b981',
    className: 'top-12 left-4 sm:left-12 -rotate-3 animate-float',
    delay: '0s'
  },
  {
    icon: Search,
    category: 'Search',
    title: 'Searched "best places to study"',
    time: '02:12 AM',
    color: '#6366f1',
    className: 'top-20 right-4 sm:right-16 rotate-6 animate-float',
    delay: '1.2s'
  },
  {
    icon: MapPin,
    category: 'Place',
    title: 'Visited Blue Tokai Coffee',
    time: '02:45 PM',
    color: '#f59e0b',
    className: 'top-64 left-2 sm:left-24 rotate-2 animate-float',
    delay: '2.4s'
  },
  {
    icon: CreditCard,
    category: 'Purchase',
    title: 'Coffee & Croissant • $7.80',
    time: '03:18 PM',
    color: '#06b6d4',
    className: 'top-72 right-2 sm:right-24 -rotate-6 animate-float',
    delay: '3.6s'
  },
  {
    icon: Camera,
    category: 'Photo',
    title: 'Sunlight over wooden table',
    time: '03:25 PM',
    color: '#3b82f6',
    className: 'bottom-20 left-8 sm:left-36 -rotate-2 animate-float',
    delay: '1.8s'
  },
  {
    icon: FileText,
    category: 'Note',
    title: '"Needed this break."',
    time: '03:42 PM',
    color: '#eab308',
    className: 'bottom-16 right-8 sm:right-32 rotate-3 animate-float',
    delay: '2.8s'
  }
];

export default function FloatingReceipts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {FLOATING_ITEMS.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className={`absolute hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#0d101c]/80 backdrop-blur-md border border-white/[0.08] shadow-2xl transition-all duration-700 select-none ${item.className}`}
            style={{ 
              animationDelay: item.delay,
              boxShadow: `0 10px 30px -10px ${item.color}25`
            }}
          >
            <div 
              className="w-7 h-7 rounded-xl flex items-center justify-center border shrink-0"
              style={{ 
                backgroundColor: `${item.color}15`, 
                borderColor: `${item.color}35`,
                color: item.color 
              }}
            >
              <Icon className="w-3.5 h-3.5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate max-w-[160px]">
                {item.title}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <Clock className="w-2.5 h-2.5 text-slate-500" />
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

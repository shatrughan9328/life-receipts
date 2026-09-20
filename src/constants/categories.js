import { 
  Music, 
  Film, 
  MapPin, 
  CreditCard, 
  Camera, 
  MessageCircle, 
  Search, 
  Calendar, 
  FileText 
} from 'lucide-react';

/**
 * Centralized Category Configuration for LifeLens
 * Single Source of Truth for icons, labels, colors, and styling tokens.
 */
export const CATEGORY_DEFINITIONS = [
  { 
    id: 'music', 
    label: 'Music', 
    icon: Music, 
    color: '#10b981', 
    bg: 'bg-emerald-500/10', 
    border: 'border-emerald-500/30', 
    text: 'text-emerald-400',
    description: 'Tracks, albums, ambient sessions, and auditory primers'
  },
  { 
    id: 'movie', 
    label: 'Movies & TV', 
    icon: Film, 
    color: '#f43f5e', 
    bg: 'bg-rose-500/10', 
    border: 'border-rose-500/30', 
    text: 'text-rose-400',
    description: 'Cinema, streaming sessions, rewatches, and comfort media'
  },
  { 
    id: 'place', 
    label: 'Places', 
    icon: MapPin, 
    color: '#f59e0b', 
    bg: 'bg-amber-500/10', 
    border: 'border-amber-500/30', 
    text: 'text-amber-400',
    description: 'Cafés, sanctuaries, lookouts, libraries, and commutes'
  },
  { 
    id: 'purchase', 
    label: 'Purchases', 
    icon: CreditCard, 
    color: '#06b6d4', 
    bg: 'bg-cyan-500/10', 
    border: 'border-cyan-500/30', 
    text: 'text-cyan-400',
    description: 'Transactions, coffee orders, bookstore visits, and tickets'
  },
  { 
    id: 'photo', 
    label: 'Photos', 
    icon: Camera, 
    color: '#3b82f6', 
    bg: 'bg-blue-500/10', 
    border: 'border-blue-500/30', 
    text: 'text-blue-400',
    description: 'Visual memories, sunlight captures, landscapes, and desk stills'
  },
  { 
    id: 'message', 
    label: 'Messages', 
    icon: MessageCircle, 
    color: '#8b5cf6', 
    bg: 'bg-purple-500/10', 
    border: 'border-purple-500/30', 
    text: 'text-purple-400',
    description: 'Voice notes, syncs with friends, collaboration, and check-ins'
  },
  { 
    id: 'search', 
    label: 'Searches', 
    icon: Search, 
    color: '#6366f1', 
    bg: 'bg-indigo-500/10', 
    border: 'border-indigo-500/30', 
    text: 'text-indigo-400',
    description: 'Late night questions, technical inquiries, and sanctuary hunting'
  },
  { 
    id: 'event', 
    label: 'Events', 
    icon: Calendar, 
    color: '#ec4899', 
    bg: 'bg-pink-500/10', 
    border: 'border-pink-500/30', 
    text: 'text-pink-400',
    description: 'Hackathons, road trips, workshops, and milestones'
  },
  { 
    id: 'note', 
    label: 'Personal Notes', 
    icon: FileText, 
    color: '#eab308', 
    bg: 'bg-yellow-500/10', 
    border: 'border-yellow-500/30', 
    text: 'text-yellow-400',
    description: 'Pocket reflections, realizations, quotes, and journal entries'
  },
];

export const CATEGORY_MAP = CATEGORY_DEFINITIONS.reduce((acc, cat) => {
  acc[cat.id] = cat;
  return acc;
}, {});

export const CATEGORY_COLORS = CATEGORY_DEFINITIONS.reduce((acc, cat) => {
  acc[cat.id] = cat.color;
  return acc;
}, {});

export const ICON_MAP = CATEGORY_DEFINITIONS.reduce((acc, cat) => {
  acc[cat.id] = cat.icon;
  return acc;
}, {});

/**
 * Natural category synergies for deterministic relationship scoring
 */
export const CATEGORY_SYNERGY = {
  music: ['search', 'note', 'photo', 'event'],
  search: ['place', 'music', 'note', 'purchase'],
  place: ['purchase', 'photo', 'note', 'event'],
  purchase: ['place', 'note', 'photo'],
  photo: ['place', 'note', 'event', 'music'],
  note: ['music', 'place', 'photo', 'search'],
  message: ['event', 'place', 'photo', 'music'],
  event: ['photo', 'place', 'music', 'message'],
  movie: ['purchase', 'note', 'music']
};

export function getCategoryConfig(type) {
  return CATEGORY_MAP[type] || CATEGORY_DEFINITIONS[0];
}

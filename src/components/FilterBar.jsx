import { 
  Search, 
  X, 
  ArrowUpDown, 
  Calendar, 
  FileText
} from 'lucide-react';
import { CATEGORY_DEFINITIONS, ICON_MAP } from '../constants/categories';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedMonth,
  onMonthChange,
  sortBy,
  onSortChange,
  totalCount,
  categoryCounts = {}
}) {
  const months = [
    { id: 'all', label: 'All Months' },
    { id: '01', label: 'Jan' },
    { id: '02', label: 'Feb' },
    { id: '03', label: 'Mar' },
    { id: '04', label: 'Apr' },
    { id: '05', label: 'May' },
    { id: '06', label: 'Jun' },
    { id: '07', label: 'Jul' },
    { id: '08', label: 'Aug' },
    { id: '09', label: 'Sep' },
    { id: '10', label: 'Oct' },
    { id: '11', label: 'Nov' },
    { id: '12', label: 'Dec' },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Search Input and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search receipts by title, location, keyword (e.g. coffee, Night Changes, trail)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Month Selector */}
        <div className="relative sm:w-40">
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {months.map(m => (
              <option key={m.id} value={m.id} className="bg-[#0b0d14] text-white">
                {m.label}
              </option>
            ))}
          </select>
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative sm:w-44">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="date-desc" className="bg-[#0b0d14] text-white">Newest First</option>
            <option value="date-asc" className="bg-[#0b0d14] text-white">Oldest First</option>
            <option value="connections" className="bg-[#0b0d14] text-white">Most Connected</option>
            <option value="title" className="bg-[#0b0d14] text-white">Alphabetical</option>
          </select>
          <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Category Pills with Counts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {/* All Pill */}
        <button
          onClick={() => onCategoryChange('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-white text-black font-semibold shadow-md shadow-white/10'
              : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
          }`}
        >
          <span>All Moments</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
            selectedCategory === 'all' ? 'bg-black/15 text-black' : 'bg-white/[0.06] text-slate-400'
          }`}>
            {totalCount}
          </span>
        </button>

        {/* 9 Category Pills */}
        {CATEGORY_DEFINITIONS.map(cat => {
          const IconComponent = ICON_MAP[cat.id] || FileText;
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition-all ${
                isSelected
                  ? 'border-transparent shadow-lg text-white'
                  : 'border-white/[0.06] bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06]'
              }`}
              style={{
                backgroundColor: isSelected ? cat.color : undefined,
                color: isSelected ? '#000000' : undefined,
                fontWeight: isSelected ? '600' : '500'
              }}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                isSelected ? 'bg-black/20 text-black' : 'bg-white/[0.06] text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

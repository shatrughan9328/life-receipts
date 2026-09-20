import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ALL_RECEIPTS } from '../data/receipts';
import ReceiptCard from '../components/ReceiptCard';
import ReceiptModal from '../components/ReceiptModal';
import FilterBar from '../components/FilterBar';
import { getConnectionsForReceipt } from '../utils/connectionEngine';
import { Inbox } from 'lucide-react';

export default function Explorer() {
  const [searchParams] = useSearchParams();
  const searchParamVal = searchParams.get('search') || '';
  const categoryParamVal = searchParams.get('category') || 'all';

  const [prevParams, setPrevParams] = useState({ search: searchParamVal, category: categoryParamVal });
  const [searchQuery, setSearchQuery] = useState(searchParamVal);
  const [selectedCategory, setSelectedCategory] = useState(categoryParamVal);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [activeReceiptModal, setActiveReceiptModal] = useState(null);

  if (prevParams.search !== searchParamVal || prevParams.category !== categoryParamVal) {
    setPrevParams({ search: searchParamVal, category: categoryParamVal });
    setSearchQuery(searchParamVal);
    setSelectedCategory(categoryParamVal);
  }

  // Precompute category counts for FilterBar badges
  const categoryCounts = useMemo(() => {
    const counts = {};
    ALL_RECEIPTS.forEach(r => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter and Sort Receipts
  const filteredReceipts = useMemo(() => {
    return ALL_RECEIPTS.filter(r => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && r.type !== selectedCategory) {
        return false;
      }

      // 2. Month Filter
      if (selectedMonth !== 'all') {
        const monthNum = r.date.split('-')[1];
        if (monthNum !== selectedMonth) return false;
      }

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesDesc = r.description.toLowerCase().includes(q);
        const matchesLoc = r.location?.toLowerCase().includes(q);
        const matchesKw = r.keywords?.some(k => k.toLowerCase().includes(q));
        const matchesArtist = r.metadata?.artist?.toLowerCase().includes(q);
        const matchesExcerpt = r.metadata?.excerpt?.toLowerCase().includes(q);

        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesKw && !matchesArtist && !matchesExcerpt) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date-desc') {
        const d = b.date.localeCompare(a.date);
        if (d !== 0) return d;
        return b.timestamp.localeCompare(a.timestamp);
      }
      if (sortBy === 'date-asc') {
        const d = a.date.localeCompare(b.date);
        if (d !== 0) return d;
        return a.timestamp.localeCompare(b.timestamp);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'connections') {
        const connA = getConnectionsForReceipt(a, ALL_RECEIPTS, 35).length;
        const connB = getConnectionsForReceipt(b, ALL_RECEIPTS, 35).length;
        return connB - connA;
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedMonth, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            Explorer
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Showing {filteredReceipts.length} of {ALL_RECEIPTS.length} moments
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          Explore Your Moments
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
          Browse, filter, and inspect every digital receipt. Click any receipt to reveal its metadata and direct connections.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={ALL_RECEIPTS.length}
        categoryCounts={categoryCounts}
      />

      {/* Grid of Receipts */}
      {filteredReceipts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredReceipts.map(receipt => {
            const connCount = getConnectionsForReceipt(receipt, ALL_RECEIPTS, 35).length;
            return (
              <ReceiptCard
                key={receipt.id}
                receipt={receipt}
                connectionCount={connCount}
                onClick={(r) => setActiveReceiptModal(r)}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-3xl bg-white/[0.02] border border-white/[0.05] p-8">
          <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No receipts match your filters</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Try adjusting your search query, switching categories, or selecting "All Months".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedMonth('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-mono bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

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

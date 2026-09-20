import React, { useState } from 'react';
import ReceiptCard from '../components/ReceiptCard';
import ReceiptModal from '../components/ReceiptModal';
import FilterBar from '../components/FilterBar';
import { useReceiptFilters } from '../hooks/useReceiptFilters';
import { receiptService } from '../services/receiptService';
import { Inbox, LayoutGrid, List } from 'lucide-react';

export default function Explorer() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedMonth,
    setSelectedMonth,
    sortBy,
    setSortBy,
    filteredReceipts,
    totalCount,
    categoryCounts,
    resetFilters
  } = useReceiptFilters();

  const [viewLayout, setViewLayout] = useState('grid'); // 'grid' | 'list'
  const [activeReceiptModal, setActiveReceiptModal] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              Explorer
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Showing {filteredReceipts.length} of {totalCount} moments
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Explore Your Moments
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
            Browse, filter, and inspect every digital receipt. Click any receipt to reveal its metadata and direct connections.
          </p>
        </div>

        {/* Layout Toggle Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]" role="group" aria-label="Layout view mode">
            <button
              onClick={() => setViewLayout('grid')}
              aria-label="Grid view layout"
              aria-pressed={viewLayout === 'grid'}
              className={`p-2 rounded-lg transition-colors ${
                viewLayout === 'grid' 
                  ? 'bg-indigo-600 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewLayout('list')}
              aria-label="List view layout"
              aria-pressed={viewLayout === 'list'}
              className={`p-2 rounded-lg transition-colors ${
                viewLayout === 'list' 
                  ? 'bg-indigo-600 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
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
        totalCount={totalCount}
        categoryCounts={categoryCounts}
      />

      {/* Grid or List of Receipts */}
      {filteredReceipts.length > 0 ? (
        viewLayout === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredReceipts.map(receipt => {
              const connCount = receiptService.getConnections(receipt, 35).length;
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
          <div className="space-y-3">
            {filteredReceipts.map(receipt => {
              const connCount = receiptService.getConnections(receipt, 35).length;
              return (
                <div 
                  key={receipt.id}
                  onClick={() => setActiveReceiptModal(receipt)}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0f1322]/80 hover:bg-[#141a2e] border border-white/[0.08] hover:border-indigo-500/40 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full uppercase bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                      {receipt.type}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 truncate">
                        {receipt.title}
                      </h3>
                      <p className="text-xs text-slate-400 truncate max-w-xl">
                        {receipt.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 shrink-0 self-end sm:self-auto">
                    {receipt.location && (
                      <span className="hidden md:inline truncate max-w-[150px]">{receipt.location}</span>
                    )}
                    <span>{receipt.date} {receipt.timestamp}</span>
                    {connCount > 0 && (
                      <span className="text-indigo-400 font-semibold">{connCount} linked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-3xl bg-white/[0.02] border border-white/[0.05] p-8">
          <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No receipts match your filters</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Try adjusting your search query, switching categories, or selecting "All Months".
          </p>
          <button
            onClick={resetFilters}
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

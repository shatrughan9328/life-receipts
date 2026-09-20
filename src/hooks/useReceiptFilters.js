import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { receiptService } from '../services/receiptService';

/**
 * Custom Hook: useReceiptFilters
 * Encapsulates search debouncing, category/month filtering, sorting, and URL synchronization.
 */
export function useReceiptFilters(initialReceipts) {
  const allReceipts = initialReceipts || receiptService.getAll();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamVal = searchParams.get('search') || '';
  const categoryParamVal = searchParams.get('category') || 'all';

  const [prevParams, setPrevParams] = useState({ search: searchParamVal, category: categoryParamVal });
  const [searchQuery, setSearchQuery] = useState(searchParamVal);
  const [selectedCategory, setSelectedCategory] = useState(categoryParamVal);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  // Sync state during render when URL query params change (official React pattern)
  if (prevParams.search !== searchParamVal || prevParams.category !== categoryParamVal) {
    setPrevParams({ search: searchParamVal, category: categoryParamVal });
    setSearchQuery(searchParamVal);
    setSelectedCategory(categoryParamVal);
  }

  // Precompute category counts
  const categoryCounts = useMemo(() => {
    return receiptService.getCategoryCounts(allReceipts);
  }, [allReceipts]);

  // Compute filtered receipts
  const filteredReceipts = useMemo(() => {
    return receiptService.filterAndSort(allReceipts, {
      searchQuery,
      selectedCategory,
      selectedMonth,
      sortBy
    });
  }, [allReceipts, searchQuery, selectedCategory, selectedMonth, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMonth('all');
    setSortBy('date-desc');
    setSearchParams({});
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedMonth,
    setSelectedMonth,
    sortBy,
    setSortBy,
    categoryCounts,
    filteredReceipts,
    totalCount: allReceipts.length,
    resetFilters
  };
}

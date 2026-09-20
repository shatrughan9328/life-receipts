import { ALL_RECEIPTS } from '../data/receipts';
import { calculateConnectionScore, getConnectionsForReceipt } from '../utils/connectionEngine';

/**
 * Receipt Data Service
 * Provides decoupled, testable methods for querying, filtering, and analyzing receipts.
 */
export const receiptService = {
  /**
   * Retrieves all 428 normalized receipts
   */
  getAll() {
    return ALL_RECEIPTS;
  },

  /**
   * Find a single receipt by ID
   */
  getById(id) {
    if (!id) return null;
    return ALL_RECEIPTS.find(r => r.id === id) || null;
  },

  /**
   * Find receipts belonging to a specific cluster ID
   */
  getByCluster(clusterId) {
    if (!clusterId) return [];
    return ALL_RECEIPTS.filter(r => r.clusterId === clusterId);
  },

  /**
   * Retrieves the flagship demo cluster ("The Reset")
   */
  getDemoCluster() {
    return ALL_RECEIPTS.filter(r => r.clusterId === 'cluster-reset');
  },

  /**
   * Computes category counts across any receipt array
   */
  getCategoryCounts(receipts = ALL_RECEIPTS) {
    const counts = {};
    receipts.forEach(r => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
    return counts;
  },

  /**
   * Get connections for a specific receipt above a given threshold
   */
  getConnections(receipt, threshold = 35) {
    if (!receipt) return [];
    return getConnectionsForReceipt(receipt, ALL_RECEIPTS, threshold);
  },

  /**
   * Calculate connection score and reasons between two receipts
   */
  calculateScore(receiptA, receiptB) {
    return calculateConnectionScore(receiptA, receiptB);
  },

  /**
   * Filters and sorts receipts according to given filter parameters
   */
  filterAndSort(receipts = ALL_RECEIPTS, {
    searchQuery = '',
    selectedCategory = 'all',
    selectedMonth = 'all',
    sortBy = 'date-desc'
  } = {}) {
    return receipts.filter(r => {
      // Category filter
      if (selectedCategory !== 'all' && r.type !== selectedCategory) {
        return false;
      }

      // Month filter
      if (selectedMonth !== 'all') {
        const monthNum = r.date.split('-')[1];
        if (monthNum !== selectedMonth) return false;
      }

      // Text search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
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
  }
};

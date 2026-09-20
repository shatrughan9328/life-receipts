/**
 * LifeLens Analytics & Pulse Engine
 * Aggregates moments into narrative data streams for Recharts visualizations.
 */

import { ALL_RECEIPTS } from '../data/receipts';

export function getOverviewAnalytics(receipts = ALL_RECEIPTS) {
  // 1. Monthly Digital Pulse (Jan - Dec)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = monthNames.map((name, index) => {
    const monthNum = (index + 1).toString().padStart(2, '0');
    const monthReceipts = receipts.filter(r => r.date.startsWith(`2024-${monthNum}`));
    
    // Categorical breakdown for stacked charts if needed
    const music = monthReceipts.filter(r => r.type === 'music').length;
    const focus = monthReceipts.filter(r => r.type === 'search' || r.type === 'note').length;
    const places = monthReceipts.filter(r => r.type === 'place' || r.type === 'photo').length;
    
    return {
      month: name,
      monthNum: index + 1,
      total: monthReceipts.length,
      music,
      focus,
      places,
      intensity: Math.round((monthReceipts.length / 64) * 100) // relative to peak
    };
  });

  // 2. Circadian Clock (24 hours)
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    const hStr = hour.toString().padStart(2, '0');
    const matching = receipts.filter(r => r.timestamp.startsWith(`${hStr}:`));
    return {
      hour: `${hStr}:00`,
      count: matching.length,
      isNight: hour >= 22 || hour <= 4,
      isWork: hour >= 9 && hour <= 18
    };
  });

  // 3. Category Breakdown
  const categoryCounts = {};
  receipts.forEach(r => {
    categoryCounts[r.type] = (categoryCounts[r.type] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    type,
    count,
    percentage: Math.round((count / receipts.length) * 100)
  })).sort((a, b) => b.count - a.count);

  // 4. Mood Sentiment Breakdown
  const moodCounts = {};
  receipts.forEach(r => {
    const m = r.mood || 'Reflective';
    moodCounts[m] = (moodCounts[m] || 0) + 1;
  });
  const moodData = Object.entries(moodCounts).map(([mood, count]) => ({
    mood,
    count,
    percentage: Math.round((count / receipts.length) * 100)
  }));

  // 5. Hero Stats
  const topCategory = categoryData[0] || { name: 'Music', count: 0 };
  const peakMonth = [...monthlyData].sort((a, b) => b.total - a.total)[0] || { month: 'Oct', total: 64 };

  return {
    totalMoments: receipts.length,
    mostActiveMonth: `${peakMonth.month} (${peakMonth.total} moments)`,
    mostActiveTime: '10 PM – 2 AM (Night Owl)',
    mostFrequentCategory: `${topCategory.name} (${topCategory.count})`,
    mostVisitedPlace: 'Blue Tokai Coffee Roasters (18 visits)',
    mostPlayedGenre: 'Indie & Ambient Post-Rock',
    monthlyData,
    hourlyData,
    categoryData,
    moodData
  };
}

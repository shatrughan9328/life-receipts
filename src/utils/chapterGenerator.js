/**
 * LifeLens Chapter Generator
 * Groups digital life receipts into thematic life chapters / eras.
 */

import { ALL_RECEIPTS } from '../data/receipts';

export function getLifeChapters() {
  // 1. The Reset (The turning point)
  const resetReceipts = ALL_RECEIPTS.filter(r => r.clusterId === 'cluster-reset');

  // 2. The Late Night Era (Midnight reflections & nocturnal coding)
  const lateNightReceipts = ALL_RECEIPTS.filter(r => {
    if (r.clusterId === 'cluster-late-night') return true;
    const hour = parseInt(r.timestamp.split(':')[0], 10);
    const month = parseInt(r.date.split('-')[1], 10);
    return (month === 10 || month === 11) && (hour >= 23 || hour <= 3);
  });

  // 3. The Grind Era (High-output focus & café marathons)
  const grindReceipts = ALL_RECEIPTS.filter(r => {
    if (r.clusterId === 'cluster-grind') return true;
    const month = parseInt(r.date.split('-')[1], 10);
    return (month === 4 || month === 5) && (r.keywords.includes('study') || r.keywords.includes('focus') || r.location?.includes('Third Wave'));
  });

  // 4. The Escape (Nature, road trips, and scenic adventures)
  const escapeReceipts = ALL_RECEIPTS.filter(r => {
    if (r.clusterId === 'cluster-escape') return true;
    const month = parseInt(r.date.split('-')[1], 10);
    return (month === 7) && (r.keywords.includes('travel') || r.keywords.includes('nature') || r.type === 'photo');
  });

  // 5. Comfort Zone (Winter slow-down, Ghibli, ramen, and acoustic music)
  const comfortReceipts = ALL_RECEIPTS.filter(r => {
    if (r.clusterId === 'cluster-comfort') return true;
    const month = parseInt(r.date.split('-')[1], 10);
    return (month === 12) && (r.type === 'movie' || r.mood === 'Calm' || r.keywords.includes('cozy'));
  });

  // Compute breakdown helper
  const getStats = (receipts) => {
    const counts = {};
    receipts.forEach(r => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
    return counts;
  };

  return [
    {
      id: 'the-reset',
      title: 'The Reset',
      era: 'March 18, 2024',
      themeIcon: 'Sparkles',
      accentColor: '#10b981', // Emerald
      bgGradient: 'from-emerald-950/40 via-teal-900/20 to-transparent',
      borderColor: 'border-emerald-500/30',
      tagline: 'When a late night question became a deliberate pause.',
      quote: '"Separately, they were receipts. Together, they captured a moment when you decided to slow down."',
      summary: 'A quiet turning point that began with an emotional song after midnight and ended with an afternoon café reflection.',
      stats: getStats(resetReceipts),
      totalMoments: resetReceipts.length,
      receipts: resetReceipts,
      keyLocations: ['Blue Tokai Coffee Roasters', 'Home Studio'],
      isFlagship: true
    },
    {
      id: 'the-late-night-era',
      title: 'The Late Night Era',
      era: 'October – November 2024',
      themeIcon: 'Moon',
      accentColor: '#8b5cf6', // Violet
      bgGradient: 'from-purple-950/40 via-indigo-900/20 to-transparent',
      borderColor: 'border-purple-500/30',
      tagline: 'You seemed most reflective after midnight.',
      quote: '"Everything feels clearer when the world is asleep."',
      summary: '62% of your music activity and deepest architectural searches took place between 11 PM and 3 AM. A period marked by quiet solitude and immense personal focus.',
      stats: getStats(lateNightReceipts),
      totalMoments: lateNightReceipts.length,
      receipts: lateNightReceipts,
      keyLocations: ['Home Studio', 'Nocturnal Desk'],
      isFlagship: false
    },
    {
      id: 'the-grind-era',
      title: 'The Grind Era',
      era: 'April – May 2024',
      themeIcon: 'GraduationCap',
      accentColor: '#6366f1', // Indigo
      bgGradient: 'from-indigo-950/40 via-blue-900/20 to-transparent',
      borderColor: 'border-indigo-500/30',
      tagline: 'Learning became a recurring part of your daily routine.',
      quote: '"Shipped the core algorithms. Benchmarks are down to 12ms."',
      summary: 'A high-intensity spring sprint fueled by pour-overs, distributed systems research, and back-to-back milestone breakthroughs.',
      stats: getStats(grindReceipts),
      totalMoments: grindReceipts.length,
      receipts: grindReceipts,
      keyLocations: ['Third Wave Coffee Roasters', 'City Central Library'],
      isFlagship: false
    },
    {
      id: 'the-escape',
      title: 'The Escape',
      era: 'July 2024',
      themeIcon: 'Plane',
      accentColor: '#f59e0b', // Amber
      bgGradient: 'from-amber-950/40 via-orange-900/20 to-transparent',
      borderColor: 'border-amber-500/30',
      tagline: 'New places created some of your most active days.',
      quote: '"You forget how big the sky is until you leave the city."',
      summary: 'A spontaneous mid-summer road trip through mountain highways, starry campsites, and panoramic lookouts far away from Wi-Fi.',
      stats: getStats(escapeReceipts),
      totalMoments: escapeReceipts.length,
      receipts: escapeReceipts,
      keyLocations: ['Emerald Peak National Park', 'Cedar Whispers Lodge'],
      isFlagship: false
    },
    {
      id: 'comfort-zone',
      title: 'Comfort Zone',
      era: 'December 2024',
      themeIcon: 'Film',
      accentColor: '#f43f5e', // Rose
      bgGradient: 'from-rose-950/40 via-pink-900/20 to-transparent',
      borderColor: 'border-rose-500/30',
      tagline: 'Certain entertainment repeatedly appeared during quieter periods.',
      quote: '"Heavy rain outside, warm ramen, Miyazaki animation."',
      summary: 'The year wound down into comforting rituals: rewatching Studio Ghibli, ordering hot ramen on cold nights, and listening to piano melodies.',
      stats: getStats(comfortReceipts),
      totalMoments: comfortReceipts.length,
      receipts: comfortReceipts,
      keyLocations: ['Living Room Sanctuary'],
      isFlagship: false
    }
  ];
}

export function getChapterById(id) {
  const chapters = getLifeChapters();
  return chapters.find(c => c.id === id);
}

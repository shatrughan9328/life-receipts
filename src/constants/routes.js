/**
 * Centralized Route Definitions for LifeLens
 */
export const ROUTES = {
  HOME: '/',
  OVERVIEW: '/overview',
  EXPLORER: '/explorer',
  CONNECTIONS: '/connections',
  CHAPTERS: '/chapters',
  CHAPTER_DETAIL: '/chapters/:id',
  INSIGHTS: '/insights',
  CONSTELLATION: '/constellation',
  JOURNEY: '/journey',
};

export const NAV_LINKS = [
  { name: 'Overview', path: ROUTES.OVERVIEW, icon: 'Compass' },
  { name: 'Explore', path: ROUTES.EXPLORER, icon: 'Layers' },
  { name: 'Connections', path: ROUTES.CONNECTIONS, icon: 'Network' },
  { name: 'Chapters', path: ROUTES.CHAPTERS, icon: 'BookOpen' },
  { name: 'Insights', path: ROUTES.INSIGHTS, icon: 'Lightbulb' },
  { name: 'Constellation', path: ROUTES.CONSTELLATION, icon: 'Stars' },
];

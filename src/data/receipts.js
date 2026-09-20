/**
 * LifeLens Normalized Receipts Dataset
 * 428 moments across 9 categories over 12 months (2024).
 * Includes curated flagship clusters:
 * - "The Reset" (Flagship hackathon demo cluster)
 * - "The Late Night Era"
 * - "The Grind Era"
 * - "The Escape"
 * - "Comfort Zone"
 */

export const CATEGORIES = [
  { id: 'music', label: 'Music', icon: 'Music', color: '#10b981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  { id: 'movie', label: 'Movies & TV', icon: 'Film', color: '#f43f5e', bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
  { id: 'place', label: 'Places', icon: 'MapPin', color: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  { id: 'purchase', label: 'Purchases', icon: 'CreditCard', color: '#06b6d4', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { id: 'photo', label: 'Photos', icon: 'Camera', color: '#3b82f6', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  { id: 'message', label: 'Messages', icon: 'MessageCircle', color: '#8b5cf6', bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  { id: 'search', label: 'Searches', icon: 'Search', color: '#6366f1', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
  { id: 'event', label: 'Events', icon: 'Calendar', color: '#ec4899', bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400' },
  { id: 'note', label: 'Personal Notes', icon: 'FileText', color: '#eab308', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
];

// Curated Flagship Moments (The Reset, The Late Night Era, The Grind Era, The Escape, Comfort Zone)
const curatedReceipts = [
  // -------------------------------------------------------------
  // CLUSTER: THE RESET (The Flagship Demo Moment: March 18, 2024)
  // -------------------------------------------------------------
  {
    id: 'rcpt-reset-01',
    type: 'music',
    title: 'Night Changes',
    description: 'One Direction • Four (Deluxe)',
    timestamp: '01:48',
    date: '2024-03-18',
    location: 'Home Studio',
    keywords: ['late night', 'melancholic', 'nostalgia', 'acoustic', 'unwind'],
    mood: 'Reflective',
    clusterId: 'cluster-reset',
    metadata: {
      artist: 'One Direction',
      album: 'Four',
      duration: '3:46',
      genre: 'Pop / Acoustic',
      platform: 'Spotify',
      device: 'Headphones',
      lyricsExcerpt: "Going out tonight, changes into something red..."
    }
  },
  {
    id: 'rcpt-reset-02',
    type: 'search',
    title: 'Searched "quiet places near me with good coffee"',
    description: 'Query executed at 2:12 AM after music session',
    timestamp: '02:12',
    date: '2024-03-18',
    location: 'Home Studio',
    keywords: ['coffee', 'café', 'quiet places', 'late night search', 'sanctuary'],
    mood: 'Curious',
    clusterId: 'cluster-reset',
    metadata: {
      query: 'quiet places near me with good coffee and natural light',
      engine: 'Google Search',
      device: 'Mobile Safari',
      clicks: ['Blue Tokai Coffee Roasters', 'Quiet Corner Cafes Map']
    }
  },
  {
    id: 'rcpt-reset-03',
    type: 'place',
    title: 'Visited Blue Tokai Coffee Roasters',
    description: 'Checked in at artisanal roastery on a quiet afternoon',
    timestamp: '14:45',
    date: '2024-03-18',
    location: 'Blue Tokai Coffee Roasters',
    keywords: ['coffee', 'café', 'third place', 'solitude', 'afternoon'],
    mood: 'Calm',
    clusterId: 'cluster-reset',
    metadata: {
      address: '14 Greenwood Avenue, Artisan Quarter',
      durationMinutes: 95,
      visitCount: 18,
      vibe: 'Warm timber, jazz background, sunlight streaming'
    }
  },
  {
    id: 'rcpt-reset-04',
    type: 'purchase',
    title: 'Iced Sea Salt Mocha & Almond Croissant',
    description: 'Artisanal brew order at Blue Tokai counter',
    timestamp: '15:18',
    date: '2024-03-18',
    location: 'Blue Tokai Coffee Roasters',
    keywords: ['coffee', 'purchase', 'treat', 'café'],
    mood: 'Calm',
    clusterId: 'cluster-reset',
    metadata: {
      amount: '$7.80',
      paymentMethod: 'Apple Pay (•••• 9021)',
      items: ['Iced Sea Salt Mocha ($5.20)', 'Warm Almond Croissant ($2.60)'],
      merchantCategory: 'Café & Bakery'
    }
  },
  {
    id: 'rcpt-reset-05',
    type: 'photo',
    title: 'Sunlight over wooden table and sketchbook',
    description: 'Captured warm afternoon shadows dancing across coffee cup',
    timestamp: '15:25',
    date: '2024-03-18',
    location: 'Blue Tokai Coffee Roasters',
    keywords: ['coffee', 'photography', 'golden hour', 'still life', 'peace'],
    mood: 'Serene',
    clusterId: 'cluster-reset',
    metadata: {
      resolution: '4032 x 3024',
      camera: 'iPhone 15 Pro, 24mm f/1.78',
      iso: 64,
      shutter: '1/240s',
      focalLength: '24mm',
      caption: 'Warm timber, slow coffee, time stands still.'
    }
  },
  {
    id: 'rcpt-reset-06',
    type: 'note',
    title: '"Needed this break."',
    description: 'Quick entry in personal pocket journal',
    timestamp: '15:42',
    date: '2024-03-18',
    location: 'Blue Tokai Coffee Roasters',
    keywords: ['reflection', 'burnout', 'break', 'clarity', 'journal'],
    mood: 'Reflective',
    clusterId: 'cluster-reset',
    metadata: {
      notebook: 'Daily Musings',
      wordCount: 42,
      excerpt: "Needed this break. Been running in circles for three weeks straight without catching my breath. The coffee is bitter and perfect. Sometimes stepping away is the only way forward."
    }
  },

  // -------------------------------------------------------------
  // CLUSTER: THE LATE NIGHT ERA (October - November 2024)
  // Deep nocturnal coding, ambient music, late searches, existential notes
  // -------------------------------------------------------------
  {
    id: 'rcpt-ln-01',
    type: 'music',
    title: 'Midnight City',
    description: 'M83 • Hurry Up, We\'re Dreaming',
    timestamp: '00:34',
    date: '2024-10-12',
    location: 'Home Studio',
    keywords: ['late night', 'synthwave', 'focus', 'night owl'],
    mood: 'Energetic',
    clusterId: 'cluster-late-night',
    metadata: { artist: 'M83', genre: 'Synthwave / Dream Pop', duration: '4:03' }
  },
  {
    id: 'rcpt-ln-02',
    type: 'search',
    title: 'Searched "how to optimize canvas 60fps web workers"',
    description: 'Technical deep dive during nocturnal sprint',
    timestamp: '01:15',
    date: '2024-10-12',
    location: 'Home Studio',
    keywords: ['coding', 'javascript', 'performance', 'terminal', 'late night'],
    mood: 'Focused',
    clusterId: 'cluster-late-night',
    metadata: { query: 'canvas offscreen rendering web workers high performance graph', engine: 'DuckDuckGo' }
  },
  {
    id: 'rcpt-ln-03',
    type: 'music',
    title: 'Resonance',
    description: 'HOME • Odyssey',
    timestamp: '01:50',
    date: '2024-10-12',
    location: 'Home Studio',
    keywords: ['chillwave', 'ambient', 'flow state', 'late night'],
    mood: 'Focused',
    clusterId: 'cluster-late-night',
    metadata: { artist: 'HOME', genre: 'Chillwave', duration: '3:32' }
  },
  {
    id: 'rcpt-ln-04',
    type: 'note',
    title: '"Everything feels clearer when the world is asleep"',
    description: 'Thought scribbled at 2:20 AM',
    timestamp: '02:20',
    date: '2024-10-12',
    location: 'Home Studio',
    keywords: ['solitude', 'night owl', 'clarity', 'late night'],
    mood: 'Reflective',
    clusterId: 'cluster-late-night',
    metadata: { excerpt: "Everything feels clearer when the world is asleep. No notifications, no Slack pings, just code and music flowing like water." }
  },
  {
    id: 'rcpt-ln-05',
    type: 'music',
    title: 'Sparks',
    description: 'Coldplay • Parachutes',
    timestamp: '02:45',
    date: '2024-10-12',
    location: 'Home Studio',
    keywords: ['acoustic', 'melancholy', 'soft', 'late night'],
    mood: 'Melancholic',
    clusterId: 'cluster-late-night',
    metadata: { artist: 'Coldplay', genre: 'Acoustic / Alternative', duration: '3:47' }
  },
  {
    id: 'rcpt-ln-06',
    type: 'message',
    title: 'Sent voice note to Alex: "Check this demo when you wake up"',
    description: 'Late night GitHub push milestone shared',
    timestamp: '03:10',
    date: '2024-10-12',
    location: 'Home Studio',
    keywords: ['collaboration', 'friendship', 'milestone', 'late night'],
    mood: 'Energetic',
    clusterId: 'cluster-late-night',
    metadata: { recipient: 'Alex Mercer', duration: '0:48', app: 'Telegram' }
  },

  // -------------------------------------------------------------
  // CLUSTER: THE GRIND ERA (April - May 2024)
  // Deep focus, café study sessions, intense productivity, espresso sprints
  // -------------------------------------------------------------
  {
    id: 'rcpt-grind-01',
    type: 'place',
    title: 'Arrived at Third Wave Coffee',
    description: 'Early morning workstation setup',
    timestamp: '08:45',
    date: '2024-04-22',
    location: 'Third Wave Coffee Roasters',
    keywords: ['study', 'grind', 'focus', 'café', 'work'],
    mood: 'Focused',
    clusterId: 'cluster-grind',
    metadata: { address: '88 Tech Boulevard', seat: 'Corner window table with outlet' }
  },
  {
    id: 'rcpt-grind-02',
    type: 'purchase',
    title: 'Double Espresso & Pour Over',
    description: 'Caffeine fuel for full-day coding marathon',
    timestamp: '08:52',
    date: '2024-04-22',
    location: 'Third Wave Coffee Roasters',
    keywords: ['coffee', 'espresso', 'fuel', 'purchase'],
    mood: 'Energetic',
    clusterId: 'cluster-grind',
    metadata: { amount: '$6.40', bean: 'Ethiopian Yirgacheffe Single Origin' }
  },
  {
    id: 'rcpt-grind-03',
    type: 'search',
    title: 'Searched "system design distributed event-driven graph architecture"',
    description: 'Deep technical documentation and RFC papers',
    timestamp: '10:30',
    date: '2024-04-22',
    location: 'Third Wave Coffee Roasters',
    keywords: ['architecture', 'study', 'system design', 'learning', 'grind'],
    mood: 'Focused',
    clusterId: 'cluster-grind',
    metadata: { engine: 'Google Scholar & GitHub', papersRead: 4 }
  },
  {
    id: 'rcpt-grind-04',
    type: 'music',
    title: 'Cornfield Chase',
    description: 'Hans Zimmer • Interstellar OST',
    timestamp: '11:15',
    date: '2024-04-22',
    location: 'Third Wave Coffee Roasters',
    keywords: ['cinematic', 'hans zimmer', 'flow state', 'study', 'grind'],
    mood: 'Focused',
    clusterId: 'cluster-grind',
    metadata: { artist: 'Hans Zimmer', album: 'Interstellar Soundtrack', duration: '2:06' }
  },
  {
    id: 'rcpt-grind-05',
    type: 'note',
    title: '"Milestone 2 completed 3 days ahead of deadline"',
    description: 'Sprint retrospective entry',
    timestamp: '14:20',
    date: '2024-04-22',
    location: 'Third Wave Coffee Roasters',
    keywords: ['achievement', 'milestone', 'grind', 'focus'],
    mood: 'Energetic',
    clusterId: 'cluster-grind',
    metadata: { excerpt: "Shipped the core algorithms. Benchmarks are down to 12ms. Felt in complete flow for 5 continuous hours." }
  },
  {
    id: 'rcpt-grind-06',
    type: 'event',
    title: 'Team Sprint Demo & Retrospective',
    description: 'Quarterly showcase with engineering leads',
    timestamp: '16:00',
    date: '2024-04-22',
    location: 'Virtual Workspace',
    keywords: ['demo', 'presentation', 'work', 'achievement'],
    mood: 'Energetic',
    clusterId: 'cluster-grind',
    metadata: { attendees: 14, outcome: 'Unanimously approved for production pilot' }
  },

  // -------------------------------------------------------------
  // CLUSTER: THE ESCAPE (July 14-16, 2024 - Mountain & Coastal Trip)
  // -------------------------------------------------------------
  {
    id: 'rcpt-esc-01',
    type: 'event',
    title: 'Weekend Mountain Highway Road Trip',
    description: 'Early morning departure leaving the city behind',
    timestamp: '06:00',
    date: '2024-07-14',
    location: 'Scenic Highway 101',
    keywords: ['travel', 'road trip', 'adventure', 'mountains', 'freedom'],
    mood: 'Energetic',
    clusterId: 'cluster-escape',
    metadata: { route: 'Pacific Ridge Trailhead', distanceKm: 280 }
  },
  {
    id: 'rcpt-esc-02',
    type: 'music',
    title: 'Rivers and Roads',
    description: 'The Head and the Heart • The Head and the Heart',
    timestamp: '07:30',
    date: '2024-07-14',
    location: 'Scenic Highway 101',
    keywords: ['road trip', 'folk', 'acoustic', 'travel'],
    mood: 'Nostalgic',
    clusterId: 'cluster-escape',
    metadata: { artist: 'The Head and the Heart', duration: '4:44' }
  },
  {
    id: 'rcpt-esc-03',
    type: 'place',
    title: 'Emerald Peak Lookout',
    description: 'Summit view above the morning clouds',
    timestamp: '11:20',
    date: '2024-07-14',
    location: 'Emerald Peak National Park',
    keywords: ['mountains', 'nature', 'hiking', 'viewpoint', 'escape'],
    mood: 'Serene',
    clusterId: 'cluster-escape',
    metadata: { elevation: '1,840m', weather: 'Crisp 18°C, clear sky' }
  },
  {
    id: 'rcpt-esc-04',
    type: 'photo',
    title: 'Sea of clouds sweeping through pine valley',
    description: 'Breathtaking panoramic shot from the edge of cliff',
    timestamp: '11:45',
    date: '2024-07-14',
    location: 'Emerald Peak National Park',
    keywords: ['photography', 'nature', 'landscape', 'mountain', 'clouds'],
    mood: 'Serene',
    clusterId: 'cluster-escape',
    metadata: { camera: 'Sony A7 IV, 24-70mm f/2.8 GM', iso: 100, aperture: 'f/8.0' }
  },
  {
    id: 'rcpt-esc-05',
    type: 'purchase',
    title: 'Rustic Cedar Cabin Lodge Check-In',
    description: 'Weekend stay booked at mountain lodge',
    timestamp: '15:30',
    date: '2024-07-14',
    location: 'Cedar Whispers Mountain Lodge',
    keywords: ['cabin', 'travel', 'woodsmoke', 'purchase'],
    mood: 'Calm',
    clusterId: 'cluster-escape',
    metadata: { amount: '$185.00', amenities: ['Wood fireplace', 'Star deck', 'No Wi-Fi'] }
  },
  {
    id: 'rcpt-esc-06',
    type: 'photo',
    title: 'Campfire sparks under milky way',
    description: 'Long exposure capture of starry sky and amber fire',
    timestamp: '22:15',
    date: '2024-07-14',
    location: 'Cedar Whispers Mountain Lodge',
    keywords: ['astrophotography', 'stars', 'campfire', 'escape'],
    mood: 'Reflective',
    clusterId: 'cluster-escape',
    metadata: { exposure: '25s f/2.0 ISO 3200', starsVisible: 'Thousands' }
  },
  {
    id: 'rcpt-esc-07',
    type: 'note',
    title: '"You forget how big the sky is until you leave the city"',
    description: 'Handwritten journal note beside fireplace',
    timestamp: '22:45',
    date: '2024-07-14',
    location: 'Cedar Whispers Mountain Lodge',
    keywords: ['perspective', 'nature', 'quiet', 'escape'],
    mood: 'Reflective',
    clusterId: 'cluster-escape',
    metadata: { excerpt: "You forget how big the sky is until you leave the city. Staring up at the Milky Way, all the deadline anxieties feel so small." }
  },

  // -------------------------------------------------------------
  // CLUSTER: COMFORT ZONE (December 2024 - Winter Recharge)
  // Cozy movies, acoustic playlists, warm ramen, rainy day comfort
  // -------------------------------------------------------------
  {
    id: 'rcpt-cz-01',
    type: 'movie',
    title: 'Spirited Away',
    description: 'Studio Ghibli • Dir. Hayao Miyazaki',
    timestamp: '20:15',
    date: '2024-12-08',
    location: 'Living Room',
    keywords: ['ghibli', 'comfort movie', 'anime', 'rainy day', 'cozy'],
    mood: 'Calm',
    clusterId: 'cluster-comfort',
    metadata: { runtime: '125 min', platform: 'HBO Max', rewatchCount: 5 }
  },
  {
    id: 'rcpt-cz-02',
    type: 'purchase',
    title: 'Tonkotsu Ramen & Gyoza Delivery',
    description: 'Steaming comfort food on a rainy winter night',
    timestamp: '20:45',
    date: '2024-12-08',
    location: 'Living Room',
    keywords: ['food', 'ramen', 'comfort food', 'winter'],
    mood: 'Calm',
    clusterId: 'cluster-comfort',
    metadata: { amount: '$24.50', restaurant: 'Ichiraku Noodle Bar' }
  },
  {
    id: 'rcpt-cz-03',
    type: 'music',
    title: 'One Summer\'s Day',
    description: 'Joe Hisaishi • Spirited Away Soundtrack',
    timestamp: '22:30',
    date: '2024-12-08',
    location: 'Living Room',
    keywords: ['piano', 'soundtrack', 'peace', 'comfort'],
    mood: 'Reflective',
    clusterId: 'cluster-comfort',
    metadata: { artist: 'Joe Hisaishi', duration: '3:09' }
  },
  {
    id: 'rcpt-cz-04',
    type: 'note',
    title: '"Permitted myself an entire evening of doing absolutely nothing"',
    description: 'Cozy winter reflection',
    timestamp: '23:10',
    date: '2024-12-08',
    location: 'Living Room',
    keywords: ['self-care', 'rest', 'winter', 'comfort'],
    mood: 'Calm',
    clusterId: 'cluster-comfort',
    metadata: { excerpt: "Permitted myself an entire evening of doing absolutely nothing. Heavy rain outside, warm ramen, Miyazaki animation. The best kind of reset." }
  },
];

// Helper to deterministically generate remaining receipts to total exactly 428
function generateFullDataset() {
  const receipts = [...curatedReceipts];
  const targetCount = 428;

  // Rich templates for procedural generation
  const musicTracks = [
    { title: 'Slow Dancing in the Dark', desc: 'Joji • BALLADS 1', genre: 'R&B / Lo-fi', mood: 'Melancholic', kw: ['lofi', 'late night', 'melancholy'] },
    { title: 'Japanese Denim', desc: 'Daniel Caesar • Get You', genre: 'Soul / R&B', mood: 'Calm', kw: ['acoustic', 'chill', 'evening'] },
    { title: 'Intro', desc: 'The xx • xx', genre: 'Indie / Minimal', mood: 'Focused', kw: ['minimal', 'flow state', 'late night'] },
    { title: 'Holocene', desc: 'Bon Iver • Bon Iver', genre: 'Indie Folk', mood: 'Reflective', kw: ['folk', 'reflection', 'quiet'] },
    { title: 'Space Song', desc: 'Beach House • Depression Cherry', genre: 'Dream Pop', mood: 'Reflective', kw: ['dream pop', 'night', 'nostalgia'] },
    { title: 'Clair de Lune', desc: 'Claude Debussy • Suite Bergamasque', genre: 'Classical Piano', mood: 'Serene', kw: ['classical', 'piano', 'peace'] },
    { title: 'Time', desc: 'Hans Zimmer • Inception OST', genre: 'Cinematic', mood: 'Focused', kw: ['soundtrack', 'focus', 'deep work'] },
    { title: 'Gooey', desc: 'Glass Animals • ZABA', genre: 'Psychedelic Pop', mood: 'Energetic', kw: ['vibes', 'afternoon', 'rhythm'] },
    { title: 'Pink + White', desc: 'Frank Ocean • Blonde', genre: 'Neo-Soul', mood: 'Calm', kw: ['warmth', 'summer', 'sunset'] },
    { title: 'Weightless', desc: 'Marconi Union • Ambient Transmissions', genre: 'Ambient', mood: 'Calm', kw: ['ambient', 'sleep', 'unwind'] },
    { title: 'As It Was', desc: 'Harry Styles • Harry\'s House', genre: 'Synth Pop', mood: 'Energetic', kw: ['upbeat', 'commute', 'morning'] },
    { title: 'Sunset Lover', desc: 'Petit Biscuit • Presence', genre: 'Electronic / Chill', mood: 'Serene', kw: ['summer', 'chill', 'golden hour'] },
  ];

  const movies = [
    { title: 'Interstellar', desc: 'Dir. Christopher Nolan • Sci-Fi / Drama', mood: 'Focused', kw: ['sci-fi', 'soundtrack', 'space'] },
    { title: 'Past Lives', desc: 'Dir. Celine Song • Romance / Drama', mood: 'Melancholic', kw: ['nostalgia', 'deep', 'connections'] },
    { title: 'Before Sunrise', desc: 'Dir. Richard Linklater • Romance / Dialogue', mood: 'Reflective', kw: ['conversation', 'night walk', 'romance'] },
    { title: 'Spider-Man: Across the Spider-Verse', desc: 'Sony Pictures Animation', mood: 'Energetic', kw: ['animation', 'visual art', 'dynamic'] },
    { title: 'Arrival', desc: 'Dir. Denis Villeneuve • Sci-Fi / Mystery', mood: 'Focused', kw: ['language', 'time', 'mystery'] },
    { title: 'The Grand Budapest Hotel', desc: 'Dir. Wes Anderson • Comedy / Drama', mood: 'Energetic', kw: ['cinematography', 'palette', 'whimsical'] },
    { title: 'Her', desc: 'Dir. Spike Jonze • Romance / Sci-Fi', mood: 'Reflective', kw: ['solitude', 'ai', 'melancholy'] },
    { title: 'Whiplash', desc: 'Dir. Damien Chazelle • Drama / Music', mood: 'Energetic', kw: ['intensity', 'jazz', 'perfection'] }
  ];

  const places = [
    { title: 'Visited Blue Tokai Coffee Roasters', loc: 'Blue Tokai Coffee Roasters', mood: 'Calm', kw: ['coffee', 'café', 'third place'] },
    { title: 'Third Wave Coffee Workstation', loc: 'Third Wave Coffee Roasters', mood: 'Focused', kw: ['coffee', 'study', 'laptop'] },
    { title: 'Central Public Library • 4th Floor Reading Room', loc: 'City Central Library', mood: 'Focused', kw: ['library', 'books', 'quiet', 'study'] },
    { title: 'Botanical Conservatory & Glasshouse', loc: 'Metropolitan Botanical Gardens', mood: 'Serene', kw: ['nature', 'plants', 'walk', 'peace'] },
    { title: 'Rooftop Terrace at Sunset', loc: 'Skyline Terrace Bar', mood: 'Reflective', kw: ['sunset', 'skyline', 'evening', 'views'] },
    { title: 'Lakeside Jogging Loop', loc: 'Mirror Lake Nature Reserve', mood: 'Energetic', kw: ['running', 'workout', 'lake', 'fresh air'] },
    { title: 'Independent Art Bookstore', loc: 'Pages & Prints Bookshop', mood: 'Curious', kw: ['books', 'reading', 'sanctuary'] },
    { title: 'Subway Commute • Green Line', loc: 'Green Line Express', mood: 'Reflective', kw: ['commute', 'city', 'transit'] }
  ];

  const purchases = [
    { title: 'Flat White & Cinnamon Roll', desc: 'Morning coffee fuel', amount: '$6.50', kw: ['coffee', 'breakfast', 'café'] },
    { title: 'Paperback: "Atomic Habits"', desc: 'Bought from independent bookstore', amount: '$16.20', kw: ['books', 'learning', 'self-improvement'] },
    { title: 'Mechanical Keyboard Switch Set', desc: 'Silent tactile switches for night coding', amount: '$42.00', kw: ['tech', 'workspace', 'hardware'] },
    { title: 'Matcha Latte & Mochi', desc: 'Afternoon refreshment', amount: '$7.10', kw: ['matcha', 'snack', 'café'] },
    { title: 'Metro Transit Pass Refill', desc: 'Monthly subway unlimited pass', amount: '$68.00', kw: ['commute', 'transit', 'city'] },
    { title: 'Spotify Premium Family Subscription', desc: 'Monthly subscription renewal', amount: '$16.99', kw: ['music', 'subscription'] },
    { title: 'Artisan Scented Candle (Cedar & Amber)', desc: 'Cozy study lighting addition', amount: '$22.00', kw: ['cozy', 'home', 'candle'] },
    { title: 'Fresh Sourdough Loaf & Salted Butter', desc: 'Weekend bakery visit', amount: '$8.50', kw: ['bakery', 'weekend', 'food'] }
  ];

  const photos = [
    { title: 'Golden light spilling through tall arched windows', desc: 'Captured silent afternoon study session', mood: 'Serene', kw: ['sunlight', 'study', 'golden hour'] },
    { title: 'Raindrops streaking across cafe window glass', desc: 'Cozy rainy day perspective', mood: 'Melancholic', kw: ['rain', 'coffee', 'cozy', 'window'] },
    { title: 'Steam rising from freshly poured v60 pour-over', desc: 'Macro shot of morning ritual', mood: 'Calm', kw: ['coffee', 'morning', 'still life'] },
    { title: 'City skyline glowing in dusk lavender tones', desc: 'Twilight panoramic view from bridge', mood: 'Reflective', kw: ['skyline', 'dusk', 'city', 'sunset'] },
    { title: 'Messy desk setup with code editor and sketchpad', desc: 'Mid-flow screenshot of project architecture', mood: 'Focused', kw: ['desk', 'workspace', 'code', 'flow'] },
    { title: 'Canopy of red autumn leaves in morning mist', desc: 'Walk through urban park trail', mood: 'Serene', kw: ['autumn', 'nature', 'leaves', 'walk'] }
  ];

  const searches = [
    { title: 'Searched "best ambient music for deep concentration"', query: 'best ambient music for deep concentration without lyrics', mood: 'Focused', kw: ['music', 'study', 'focus'] },
    { title: 'Searched "how to build force-directed graph in canvas"', query: 'force directed graph canvas d3 math spring physics simulation', mood: 'Focused', kw: ['coding', 'javascript', 'graph'] },
    { title: 'Searched "weekend hike trails with scenic views"', query: 'weekend hike trails near me under 2 hours drive with waterfall', mood: 'Curious', kw: ['travel', 'nature', 'hike'] },
    { title: 'Searched "why does listening to the same song on repeat help focus"', query: 'psychology of listening to one song on repeat adhd flow state', mood: 'Curious', kw: ['psychology', 'music', 'focus'] },
    { title: 'Searched "how to roast specialty coffee at home"', query: 'aeropress coffee champion recipe 2024 water ratio', mood: 'Curious', kw: ['coffee', 'hobby', 'learning'] },
    { title: 'Searched "train ticket to coast early morning"', query: 'coastal express morning weekend tickets schedule', mood: 'Curious', kw: ['travel', 'train', 'escape'] }
  ];

  const messages = [
    { title: 'Message from Maya: "Are you at the cafe yet?"', desc: 'Meeting up for co-working session', mood: 'Energetic', kw: ['friends', 'co-working', 'café'] },
    { title: 'Sent message to David: "Sent you the code review link"', desc: 'Engineering sync update', mood: 'Focused', kw: ['work', 'code', 'collaboration'] },
    { title: 'Message from Mom: "Don\'t forget to sleep early!"', desc: 'Warm reminder sent during late night session', mood: 'Nostalgic', kw: ['family', 'care', 'night owl'] },
    { title: 'Shared song link in group chat: "Listen to the bridge in this"', desc: 'Music discovery sharing', mood: 'Energetic', kw: ['music', 'friends', 'recommendation'] }
  ];

  const events = [
    { title: 'Front-End Hackathon Kickoff', desc: '48-hour global builder sprint', mood: 'Energetic', kw: ['hackathon', 'coding', 'event'] },
    { title: 'Specialty Coffee Tasting Workshop', desc: 'Cupping session comparing natural vs washed beans', mood: 'Curious', kw: ['coffee', 'workshop', 'taste'] },
    { title: 'Ambient Electronic Live Set at Warehouse', desc: 'Visual arts and modular synthesizer concert', mood: 'Reflective', kw: ['music', 'concert', 'live', 'night'] },
    { title: 'Weekend Book Club Discussion', desc: 'Discussing philosophy of digital minimalism', mood: 'Reflective', kw: ['books', 'discussion', 'friends'] }
  ];

  const notes = [
    { title: '"A small thought on momentum"', desc: 'Action precedes motivation, not the other way around.', mood: 'Focused', kw: ['momentum', 'habits', 'productivity'] },
    { title: '"The city feels completely different at 6 AM"', desc: 'Before the traffic starts, there is a distinct peaceful hum.', mood: 'Serene', kw: ['morning', 'city', 'quiet'] },
    { title: '"Reminder to slow down"', desc: 'Urgency is often self-manufactured. Take a breath.', mood: 'Reflective', kw: ['mindfulness', 'reflection', 'peace'] },
    { title: '"Idea for digital memory canvas"', desc: 'What if we could view memories as connected constellations rather than lists?', mood: 'Curious', kw: ['ideas', 'canvas', 'design', 'memory'] },
    { title: '"Rain on the skylight"', desc: 'Nothing beats typing while listening to gentle storm sounds.', mood: 'Calm', kw: ['rain', 'cozy', 'focus'] }
  ];

  const categoryPools = {
    music: musicTracks,
    movie: movies,
    place: places,
    purchase: purchases,
    photo: photos,
    search: searches,
    message: messages,
    event: events,
    note: notes
  };

  const types = ['music', 'search', 'photo', 'place', 'purchase', 'note', 'music', 'movie', 'message', 'event'];

  // Months distribution to simulate seasonal peaks (October & April are peak months)
  const monthWeights = [
    { month: 1, name: 'Jan', days: 31, count: 28 },
    { month: 2, name: 'Feb', days: 28, count: 24 },
    { month: 3, name: 'Mar', days: 31, count: 36 }, // Includes The Reset
    { month: 4, name: 'Apr', days: 30, count: 48 }, // The Grind Era peak
    { month: 5, name: 'May', days: 31, count: 38 },
    { month: 6, name: 'Jun', days: 30, count: 32 },
    { month: 7, name: 'Jul', days: 31, count: 42 }, // The Escape peak
    { month: 8, name: 'Aug', days: 31, count: 30 },
    { month: 9, name: 'Sep', days: 30, count: 34 },
    { month: 10, name: 'Oct', days: 31, count: 64 }, // The Late Night Era peak (Most active month)
    { month: 11, name: 'Nov', days: 30, count: 40 },
    { month: 12, name: 'Dec', days: 31, count: 32 }, // Comfort Zone
  ];

  // Pseudo-random deterministic generator with seed
  let seed = 42;
  function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  // Create a pool of timestamps biased towards Night Owl (10 PM - 2 AM) & Afternoon (2 PM - 5 PM)
  function getRandomTime(forceLateNight = false) {
    let hour;
    if (forceLateNight || random() < 0.38) {
      // 38% after 10 PM or before 3 AM (Night Owl pattern!)
      const lateHours = [22, 23, 0, 1, 2, 3];
      hour = lateHours[Math.floor(random() * lateHours.length)];
    } else if (random() < 0.35) {
      // Afternoon focus hours (13:00 - 17:00)
      hour = 13 + Math.floor(random() * 5);
    } else if (random() < 0.2) {
      // Morning (8:00 - 12:00)
      hour = 8 + Math.floor(random() * 4);
    } else {
      // Evening (18:00 - 21:00)
      hour = 18 + Math.floor(random() * 4);
    }
    const minute = Math.floor(random() * 60);
    const hh = hour.toString().padStart(2, '0');
    const mm = minute.toString().padStart(2, '0');
    return `${hh}:${mm}`;
  }

  let idCounter = receipts.length + 1;

  // Track counts per month
  const targetPerMonth = {};
  monthWeights.forEach(m => targetPerMonth[m.month] = m.count);

  // Discount already curated receipts
  receipts.forEach(r => {
    const m = parseInt(r.date.split('-')[1], 10);
    if (targetPerMonth[m]) targetPerMonth[m]--;
  });

  monthWeights.forEach(mConfig => {
    const countNeeded = targetPerMonth[mConfig.month] || 0;
    for (let i = 0; i < countNeeded; i++) {
      if (receipts.length >= targetCount) break;

      const type = types[Math.floor(random() * types.length)];
      const pool = categoryPools[type];
      const itemTemplate = pool[Math.floor(random() * pool.length)];

      const day = 1 + Math.floor(random() * mConfig.days);
      const dayStr = day.toString().padStart(2, '0');
      const monthStr = mConfig.month.toString().padStart(2, '0');
      const date = `2024-${monthStr}-${dayStr}`;

      // If October or November, bias towards late night
      const isLateNightEra = (mConfig.month === 10 || mConfig.month === 11);
      const timestamp = getRandomTime(isLateNightEra && random() < 0.6);

      const id = `rcpt-gen-${idCounter.toString().padStart(3, '0')}`;
      idCounter++;

      const newReceipt = {
        id,
        type,
        title: itemTemplate.title,
        description: itemTemplate.desc || itemTemplate.query || `${itemTemplate.title} on ${mConfig.name} ${day}`,
        timestamp,
        date,
        location: itemTemplate.loc || (random() > 0.4 ? 'Blue Tokai Coffee Roasters' : (random() > 0.5 ? 'Third Wave Coffee Roasters' : 'Home Studio')),
        keywords: [...(itemTemplate.kw || ['digital moment', 'routine'])],
        mood: itemTemplate.mood || (timestamp.startsWith('0') || timestamp.startsWith('23') ? 'Reflective' : 'Focused'),
        metadata: {
          ...itemTemplate,
          sourceApp: type === 'music' ? 'Spotify' : type === 'search' ? 'Google' : type === 'place' ? 'Apple Maps' : 'LifeLens Journal'
        }
      };

      // Ensure coffee keywords link to café visits
      if (newReceipt.location && newReceipt.location.includes('Coffee')) {
        if (!newReceipt.keywords.includes('coffee')) newReceipt.keywords.push('coffee');
        if (!newReceipt.keywords.includes('café')) newReceipt.keywords.push('café');
      }

      receipts.push(newReceipt);
    }
  });

  // Top up if any slight rounding mismatch
  while (receipts.length < targetCount) {
    const id = `rcpt-gen-${receipts.length + 1}`;
    receipts.push({
      id,
      type: 'note',
      title: 'Quick Reflection',
      description: 'Grateful for this quiet chapter of growth.',
      timestamp: '23:14',
      date: '2024-10-24',
      location: 'Home Studio',
      keywords: ['reflection', 'gratitude', 'quiet', 'late night'],
      mood: 'Reflective',
      metadata: { wordCount: 18 }
    });
  }

  // Sort by date and timestamp descending
  return receipts.sort((a, b) => {
    const dateComp = a.date.localeCompare(b.date);
    if (dateComp !== 0) return dateComp;
    return a.timestamp.localeCompare(b.timestamp);
  });
}

export const ALL_RECEIPTS = generateFullDataset();

export function getReceiptById(id) {
  return ALL_RECEIPTS.find(r => r.id === id);
}

export function getReceiptsByCategory(category) {
  if (!category || category === 'all') return ALL_RECEIPTS;
  return ALL_RECEIPTS.filter(r => r.type === category);
}

export function getDemoClusterReceipts() {
  return ALL_RECEIPTS.filter(r => r.clusterId === 'cluster-reset');
}

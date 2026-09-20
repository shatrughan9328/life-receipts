/**
 * LifeLens Story Generator
 * Synthesizes narrative arcs from connected receipts without external AI APIs.
 */

export function generateStoryFromReceipts(receipts) {
  if (!receipts || receipts.length === 0) {
    return {
      title: "An Unwritten Moment",
      subtitle: "Select connected receipts to reveal their story.",
      narrative: [],
      conclusion: "Every receipt has a thread waiting to be pulled."
    };
  }

  // Sort chronologically
  const sorted = [...receipts].sort((a, b) => {
    const d = a.date.localeCompare(b.date);
    if (d !== 0) return d;
    return a.timestamp.localeCompare(b.timestamp);
  });

  // Check if this is the Flagship Demo Cluster "The Reset"
  const isResetCluster = sorted.some(r => r.id.startsWith('rcpt-reset') || r.title.includes('Night Changes'));
  if (isResetCluster) {
    return {
      id: 'story-reset',
      title: 'The Reset',
      subtitle: 'A quiet turning point when you decided to slow down.',
      tagline: '5 disconnected receipts. 1 meaningful evening.',
      dateRange: 'March 18, 2024',
      mood: 'Serene & Reflective',
      stats: {
        duration: '14 hours total span',
        keyLocation: 'Blue Tokai Coffee Roasters',
        dominantMood: 'Reflective → Calming',
      },
      paragraphs: [
        {
          phase: 'The Spark',
          time: '01:48 AM',
          icon: 'Music',
          text: 'It started with a late-night playlist. You played "Night Changes" by One Direction in the quiet darkness of your room, caught in an introspective drift.'
        },
        {
          phase: 'The Longing',
          time: '02:12 AM',
          icon: 'Search',
          text: 'Twenty-four minutes later, you opened a search bar and typed: "quiet places near me with good coffee". You weren\'t looking for caffeine — you were looking for an anchor.'
        },
        {
          phase: 'The Arrival',
          time: '02:45 PM',
          icon: 'MapPin',
          text: 'The next afternoon, you arrived at Blue Tokai Coffee Roasters. The hum of conversation and warm timber aroma broke weeks of isolation.'
        },
        {
          phase: 'The Sensory Anchor',
          time: '03:18 PM',
          icon: 'CreditCard',
          text: 'An iced sea-salt mocha was ordered at the counter, followed minutes later by a photo of warm diagonal sunlight stretching across your wooden table.'
        },
        {
          phase: 'The Reflection',
          time: '03:42 PM',
          icon: 'FileText',
          text: 'And then came the final note written in your pocket journal: "Needed this break."'
        }
      ],
      quote: "Sometimes a change doesn't appear as one big event. It appears as a song, a search, a place, a coffee, a photograph and a sentence.",
      takeaway: "Separately, they were receipts. Together, they captured a moment when you decided to slow down."
    };
  }

  // Check if "The Late Night Era"
  const isLateNight = sorted.some(r => r.clusterId === 'cluster-late-night');
  if (isLateNight) {
    return {
      id: 'story-late-night',
      title: 'The Nocturnal Flow',
      subtitle: 'When the world falls asleep, your mind comes alive.',
      tagline: 'Code, synthwave, and midnight clarity.',
      dateRange: 'October 12, 2024',
      mood: 'Focused & Solitary',
      stats: {
        duration: 'Past Midnight Sprint',
        keyLocation: 'Home Studio',
        dominantMood: 'Deep Focus'
      },
      paragraphs: [
        {
          phase: 'The Rhythm',
          time: '00:34 AM',
          icon: 'Music',
          text: 'As midnight passed, M83\'s "Midnight City" began playing, marking the shift into your zone of deepest concentration.'
        },
        {
          phase: 'The Deep Dive',
          time: '01:15 AM',
          icon: 'Search',
          text: 'Diving past superficial answers, you searched for low-level canvas web worker optimizations to shave off milliseconds.'
        },
        {
          phase: 'The Thought',
          time: '02:20 AM',
          icon: 'FileText',
          text: 'In the stillness of 2:20 AM, you wrote: "Everything feels clearer when the world is asleep."'
        },
        {
          phase: 'The Shared Spark',
          time: '03:10 AM',
          icon: 'MessageCircle',
          text: 'Before finally closing your laptop, you sent a proud demo preview to Alex Mercer.'
        }
      ],
      quote: "The quietest hours often hold our loudest breakthroughs.",
      takeaway: "Disconnected digital timestamps showing that solitude wasn't loneliness — it was your creative sanctuary."
    };
  }

  // Check if "The Escape"
  const isEscape = sorted.some(r => r.clusterId === 'cluster-escape');
  if (isEscape) {
    return {
      id: 'story-escape',
      title: 'The Mountain Crossing',
      subtitle: 'Trading glowing screens for starlit skies.',
      tagline: 'Highway, pines, campfire, and perspective.',
      dateRange: 'July 14, 2024',
      mood: 'Exhilarated & Serene',
      stats: {
        duration: 'Weekend Odyssey',
        keyLocation: 'Emerald Peak National Park',
        dominantMood: 'Awe & Clarity'
      },
      paragraphs: [
        {
          phase: 'The Departure',
          time: '06:00 AM',
          icon: 'Compass',
          text: 'You packed before sunrise and drove out along Highway 101, letting folk harmonies fill the car.'
        },
        {
          phase: 'The Ascent',
          time: '11:45 AM',
          icon: 'Camera',
          text: 'At Emerald Peak Lookout, standing at 1,840 meters, you photographed sea clouds rolling through pine valleys.'
        },
        {
          phase: 'The Hearth',
          time: '10:45 PM',
          icon: 'FileText',
          text: 'Beside a crackling campfire under the Milky Way, you wrote: "You forget how big the sky is until you leave the city."'
        }
      ],
      quote: "Distance from our routines is the shortest path back to ourselves.",
      takeaway: "Every GPS ping and shutter click was a deliberate breath of fresh air."
    };
  }

  // Generic dynamic story generator for arbitrary clusters of receipts
  const typesInStory = [...new Set(sorted.map(r => r.type))];
  const locations = [...new Set(sorted.map(r => r.location).filter(Boolean))];
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const paragraphs = sorted.map((r, idx) => {
    let phase = 'Moment ' + (idx + 1);
    if (idx === 0) phase = 'The Beginning';
    else if (idx === sorted.length - 1) phase = 'The Culmination';
    else phase = 'The Unfolding';

    let text = '';
    if (r.type === 'music') text = `You tuned into "${r.title}". The sound set the tone for what was to follow.`;
    else if (r.type === 'place') text = `You arrived at ${r.location || r.title}. A deliberate change of environment.`;
    else if (r.type === 'search') text = `A question sparked in your mind: ${r.title}. Curiosity taking the wheel.`;
    else if (r.type === 'purchase') text = `You purchased ${r.title} — a tangible marker of your day.`;
    else if (r.type === 'photo') text = `You paused to document ${r.title}. Saving a visual anchor in time.`;
    else if (r.type === 'note') text = `You penned down a thought: "${r.title}". Catching meaning before it evaporated.`;
    else text = `${r.title} took place at ${r.timestamp}. Another piece falling into place.`;

    return {
      phase,
      time: r.timestamp,
      icon: r.type,
      text
    };
  });

  return {
    id: `story-dyn-${first.id}`,
    title: `Echoes of ${first.date}`,
    subtitle: `A tapestry woven across ${typesInStory.length} dimensions of your digital life.`,
    tagline: `${sorted.length} interconnected moments revealing a singular thread.`,
    dateRange: `${first.date} ${first.date !== last.date ? 'to ' + last.date : ''}`,
    mood: first.mood || 'Reflective',
    stats: {
      momentsCount: sorted.length,
      typesCovered: typesInStory.join(', '),
      location: locations[0] || 'Personal Space'
    },
    paragraphs,
    quote: "We do not remember days; we remember moments.",
    takeaway: `These ${sorted.length} receipts were never isolated events. They were beats in the same melody.`
  };
}

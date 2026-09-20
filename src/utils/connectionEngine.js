/**
 * LifeLens Connection Engine
 * Deterministic relationship scoring between digital life receipts.
 * 
 * Scoring Factors:
 * - Same day: +25 pts
 * - Within 2 hours: up to +25 pts
 * - Same location: +20 pts
 * - Shared keywords: +20 pts (scaled by overlap)
 * - Related categories: +10 pts
 * - Shared mood/theme: +10 pts
 */

// Category adjacency matrix (naturally related categories)
const CATEGORY_SYNERGY = {
  music: ['search', 'note', 'photo', 'event'],
  search: ['place', 'music', 'note', 'purchase'],
  place: ['purchase', 'photo', 'note', 'event'],
  purchase: ['place', 'note', 'photo'],
  photo: ['place', 'note', 'event', 'music'],
  note: ['music', 'place', 'photo', 'search'],
  message: ['event', 'place', 'photo', 'music'],
  event: ['photo', 'place', 'music', 'message'],
  movie: ['purchase', 'note', 'music']
};

/**
 * Parses "YYYY-MM-DD" and "HH:MM" into total minutes from a fixed epoch
 */
function getReceiptMinutes(dateStr, timeStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const [h, min] = timeStr.split(':').map(Number);
  const epochDays = (y - 2024) * 365 + m * 31 + d;
  return epochDays * 24 * 60 + h * 60 + min;
}

/**
 * Calculates connection score between two receipts (0 to 100+)
 */
export function calculateConnectionScore(receiptA, receiptB) {
  if (receiptA.id === receiptB.id) return 0;

  let score = 0;
  const reasons = [];

  // Same cluster shortcut guarantee
  const inSameCluster = receiptA.clusterId && receiptA.clusterId === receiptB.clusterId;

  // 1. Date & Time Proximity
  const sameDay = receiptA.date === receiptB.date;
  if (sameDay) {
    score += 25;
    reasons.push({ factor: 'date', label: `Same day (${receiptA.date})`, points: 25 });

    const minA = getReceiptMinutes(receiptA.date, receiptA.timestamp);
    const minB = getReceiptMinutes(receiptB.date, receiptB.timestamp);
    const diffMinutes = Math.abs(minA - minB);

    if (diffMinutes <= 120) {
      // Within 2 hours: scale from 25 down to 10
      const timePoints = Math.round(10 + 15 * (1 - diffMinutes / 120));
      score += timePoints;
      reasons.push({ factor: 'time', label: `Occurred within ${diffMinutes} minutes`, points: timePoints });
    } else if (diffMinutes <= 360) {
      score += 10;
      reasons.push({ factor: 'time', label: 'Same morning/afternoon block', points: 10 });
    }
  } else {
    // Check if consecutive days within 24 hours (e.g. late night search followed by afternoon cafe)
    const minA = getReceiptMinutes(receiptA.date, receiptA.timestamp);
    const minB = getReceiptMinutes(receiptB.date, receiptB.timestamp);
    const diffMinutes = Math.abs(minA - minB);
    if (diffMinutes <= 1440) { // within 24 hours
      score += 15;
      reasons.push({ factor: 'date', label: 'Occurred within 24 hours', points: 15 });
    }
  }

  // 2. Same Location
  if (receiptA.location && receiptB.location && receiptA.location !== 'Home Studio') {
    if (receiptA.location.toLowerCase() === receiptB.location.toLowerCase()) {
      score += 20;
      reasons.push({ factor: 'location', label: `Same location: ${receiptA.location}`, points: 20 });
    }
  }

  // 3. Shared Keywords
  const setA = new Set((receiptA.keywords || []).map(k => k.toLowerCase()));
  const sharedKeywords = (receiptB.keywords || [])
    .map(k => k.toLowerCase())
    .filter(k => setA.has(k) && k !== 'digital moment');

  if (sharedKeywords.length > 0) {
    const kwPoints = Math.min(25, sharedKeywords.length * 10);
    score += kwPoints;
    reasons.push({ 
      factor: 'keyword', 
      label: `Shared theme: ${sharedKeywords.slice(0, 3).join(', ')}`, 
      points: kwPoints,
      keywords: sharedKeywords 
    });
  }

  // 4. Category Synergy
  const synergies = CATEGORY_SYNERGY[receiptA.type] || [];
  if (synergies.includes(receiptB.type)) {
    score += 10;
    reasons.push({ factor: 'category', label: `Related activity: ${receiptA.type} + ${receiptB.type}`, points: 10 });
  }

  // 5. Shared Mood
  if (receiptA.mood && receiptB.mood && receiptA.mood === receiptB.mood) {
    score += 10;
    reasons.push({ factor: 'mood', label: `Shared headspace: ${receiptA.mood}`, points: 10 });
  }

  // Extra boost for explicit curated cluster moments
  if (inSameCluster) {
    score = Math.max(score, 55);
  }

  return {
    score,
    reasons,
    isConnected: score >= 35,
    sourceId: receiptA.id,
    targetId: receiptB.id
  };
}

/**
 * Discovers all connections for a specific receipt or entire dataset
 */
export function getConnectionsForReceipt(receipt, allReceipts, threshold = 35) {
  if (!receipt) return [];
  const connections = [];

  for (const other of allReceipts) {
    if (other.id === receipt.id) continue;
    const result = calculateConnectionScore(receipt, other);
    if (result.score >= threshold) {
      connections.push({
        receipt: other,
        score: result.score,
        reasons: result.reasons
      });
    }
  }

  // Sort by highest connection score first
  return connections.sort((a, b) => b.score - a.score);
}

/**
 * Builds full connection graph for visualization
 */
export function buildConnectionGraph(receipts, threshold = 35) {
  const nodes = receipts.map(r => ({
    id: r.id,
    data: r,
    type: r.type,
    title: r.title,
    clusterId: r.clusterId || null
  }));

  const edges = [];
  const edgeSet = new Set();

  for (let i = 0; i < receipts.length; i++) {
    for (let j = i + 1; j < receipts.length; j++) {
      const rA = receipts[i];
      const rB = receipts[j];
      const result = calculateConnectionScore(rA, rB);

      if (result.score >= threshold) {
        const key = `${rA.id}--${rB.id}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push({
            id: key,
            source: rA.id,
            target: rB.id,
            score: result.score,
            reasons: result.reasons
          });
        }
      }
    }
  }

  return { nodes, edges };
}

/**
 * Groups receipts into clusters (connected components)
 */
export function generateClusters(receipts, threshold = 35) {
  const visited = new Set();
  const clusters = [];

  for (const receipt of receipts) {
    if (visited.has(receipt.id)) continue;

    const clusterMembers = [receipt];
    visited.add(receipt.id);

    const queue = [receipt];
    while (queue.length > 0) {
      const current = queue.shift();
      const connected = getConnectionsForReceipt(current, receipts, threshold);

      for (const conn of connected) {
        if (!visited.has(conn.receipt.id)) {
          visited.add(conn.receipt.id);
          clusterMembers.push(conn.receipt);
          queue.push(conn.receipt);
        }
      }
    }

    if (clusterMembers.length >= 2) {
      clusters.push({
        id: `cluster-${clusters.length + 1}`,
        size: clusterMembers.length,
        receipts: clusterMembers.sort((a, b) => a.date.localeCompare(b.date) || a.timestamp.localeCompare(b.timestamp))
      });
    }
  }

  return clusters.sort((a, b) => b.size - a.size);
}

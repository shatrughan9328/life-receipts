import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { ALL_RECEIPTS, CATEGORIES } from '../data/receipts';
import { calculateConnectionScore } from '../utils/connectionEngine';

const CATEGORY_COLORS = {
  music: '#10b981',
  movie: '#f43f5e',
  place: '#f59e0b',
  purchase: '#06b6d4',
  photo: '#3b82f6',
  message: '#8b5cf6',
  search: '#6366f1',
  event: '#ec4899',
  note: '#eab308'
};

function pseudoRandom(s) {
  const next = (s * 9301 + 49297) % 233280;
  return [next, next / 233280];
}

export default function MemoryConstellation({ onSelectReceipt }) {
  const canvasRef = useRef(null);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [hoveredReceipt, setHoveredReceipt] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [filterType, setFilterType] = useState('all');

  // Generate 2D celestial coordinates for all 428 receipts
  const starfield = useMemo(() => {
    let currentSeed = 1337;

    return ALL_RECEIPTS.map((r) => {
      let randVal1, randVal2, randVal3;
      [currentSeed, randVal1] = pseudoRandom(currentSeed);
      [currentSeed, randVal2] = pseudoRandom(currentSeed);
      [currentSeed, randVal3] = pseudoRandom(currentSeed);

      // Cluster by month and theme in spiral galaxy arms
      const month = parseInt(r.date.split('-')[1], 10);
      const angle = (month / 12) * Math.PI * 2 + (randVal1 - 0.5) * 0.8;
      const distance = 80 + Math.pow(randVal2, 0.7) * 320;

      // Celestial coordinates relative to galaxy center (0, 0)
      const x = Math.cos(angle) * distance + (randVal3 - 0.5) * 40;
      const y = Math.sin(angle) * distance * 0.7 + (randVal1 - 0.5) * 40;

      return {
        ...r,
        origX: x,
        origY: y,
        size: r.clusterId ? 4.5 : 3.0,
        twinkleSpeed: 0.02 + randVal2 * 0.04,
        twinklePhase: randVal3 * Math.PI * 2,
        color: CATEGORY_COLORS[r.type] || '#818cf8'
      };
    });
  }, []);

  // Derive connected moments directly with useMemo
  const connectedIds = useMemo(() => {
    if (!activeReceipt) return new Set();
    const set = new Set();
    ALL_RECEIPTS.forEach(other => {
      if (other.id !== activeReceipt.id) {
        const score = calculateConnectionScore(activeReceipt, other);
        if (score.score >= 35) {
          set.add(other.id);
        }
      }
    });
    return set;
  }, [activeReceipt]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let time = 0;

    const render = () => {
      time += 0.015;
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Stardust Constellation Lines for connected nodes
      if (activeReceipt) {
        const activeStar = starfield.find(s => s.id === activeReceipt.id);
        if (activeStar) {
          const ax = cx + activeStar.origX;
          const ay = cy + activeStar.origY;

          starfield.forEach(star => {
            if (connectedIds.has(star.id)) {
              const sx = cx + star.origX;
              const sy = cy + star.origY;

              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(sx, sy);
              ctx.strokeStyle = 'rgba(129, 140, 248, 0.45)';
              ctx.lineWidth = 1.2;
              ctx.setLineDash([4, 4]);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          });
        }
      }

      // 2. Draw Stars
      starfield.forEach(star => {
        const matchesFilter = filterType === 'all' || star.type === filterType;
        const isActive = activeReceipt && star.id === activeReceipt.id;
        const isConnected = connectedIds.has(star.id);
        const isHovered = hoveredReceipt && star.id === hoveredReceipt.id;

        const x = cx + star.origX;
        const y = cy + star.origY;

        // Twinkle factor
        const twinkle = 0.7 + 0.3 * Math.sin(time * star.twinkleSpeed * 50 + star.twinklePhase);
        let alpha = matchesFilter ? (isActive || isConnected || isHovered ? 1 : 0.4) : 0.1;
        if (!activeReceipt && matchesFilter) alpha = twinkle;

        // Glowing outer halo for active / connected stars
        if (isActive || isConnected || isHovered) {
          ctx.beginPath();
          ctx.arc(x, y, star.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? 'rgba(255, 255, 255, 0.25)' : `${star.color}33`;
          ctx.fill();
        }

        // Core star
        ctx.beginPath();
        ctx.arc(x, y, isActive ? star.size * 1.8 : star.size, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? '#ffffff' : star.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [starfield, activeReceipt, connectedIds, hoveredReceipt, filterType]);

  // Handle Mouse Interaction
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Find closest star within 12px
    let found = null;
    for (const star of starfield) {
      const sx = cx + star.origX;
      const sy = cy + star.origY;
      const dist = Math.hypot(mx - sx, my - sy);
      if (dist < 12) {
        found = star;
        break;
      }
    }

    if (found) {
      setHoveredReceipt(found);
      setTooltipPos({ x: e.clientX, y: e.clientY });
    } else {
      setHoveredReceipt(null);
    }
  };

  const handleClick = (e) => {
    if (hoveredReceipt) {
      setActiveReceipt(hoveredReceipt);
      if (onSelectReceipt) onSelectReceipt(hoveredReceipt);
    }
  };

  return (
    <div className="relative rounded-3xl bg-[#090b14] border border-white/[0.1] shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
      {/* Top Floating Constellation Bar */}
      <div className="p-4 sm:p-6 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4 z-10 bg-[#090b14]/80 backdrop-blur-md">
        <div>
          <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Memory Constellation</span>
          </h3>
          <p className="text-xs text-slate-400">
            428 moments orbiting across 12 months. Twinkling stars connected by relational gravity.
          </p>
        </div>

        {/* Constellation Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
              filterType === 'all' 
                ? 'bg-white text-black font-bold' 
                : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            All 428 Stars
          </button>
          {CATEGORIES.slice(0, 5).map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterType(cat.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-mono border transition-all ${
                filterType === cat.id
                  ? 'border-transparent text-black font-semibold'
                  : 'border-white/[0.06] bg-white/[0.03] text-slate-400 hover:text-white'
              }`}
              style={{
                backgroundColor: filterType === cat.id ? cat.color : undefined,
                color: filterType === cat.id ? '#000' : undefined
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative flex-1 flex items-center justify-center p-4">
        <canvas
          ref={canvasRef}
          width={1000}
          height={650}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          className="max-w-full max-h-full cursor-pointer select-none"
        />

        {/* Hover Celestial Tooltip */}
        {hoveredReceipt && (
          <div 
            className="fixed pointer-events-none z-50 px-3.5 py-2.5 rounded-2xl bg-[#0e1222]/95 backdrop-blur-md border border-indigo-500/40 shadow-2xl text-left transform -translate-x-1/2 -translate-y-14 transition-transform"
            style={{ left: tooltipPos.x, top: tooltipPos.y }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: hoveredReceipt.color }}
              />
              <span className="text-[10px] font-mono uppercase text-slate-400">
                {hoveredReceipt.type} • {hoveredReceipt.timestamp}
              </span>
            </div>
            <p className="text-xs font-bold text-white max-w-xs truncate">
              {hoveredReceipt.title}
            </p>
            <p className="text-[10px] font-mono text-indigo-400 mt-0.5">
              Click to trace constellation connections
            </p>
          </div>
        )}
      </div>

      {/* Active Star Drawer / Bottom Banner */}
      {activeReceipt && (
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#0c0f1d]/90 backdrop-blur-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center border shrink-0"
              style={{
                backgroundColor: `${activeReceipt.color}20`,
                borderColor: `${activeReceipt.color}50`,
                color: activeReceipt.color
              }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">
                  {activeReceipt.title}
                </h4>
                <span className="text-xs font-mono text-slate-400">
                  {activeReceipt.date} at {activeReceipt.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Connected to <span className="text-indigo-400 font-bold">{connectedIds.size} stars</span> across your digital sky.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveReceipt(null)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 transition-colors"
          >
            Clear Constellation
          </button>
        </div>
      )}
    </div>
  );
}

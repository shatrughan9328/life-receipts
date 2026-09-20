import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Sparkles, Eye } from 'lucide-react';
import { ALL_RECEIPTS } from '../data/receipts';
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

const CONSTELLATION_CLUSTERS = [
  { id: 'all', label: 'All Galaxy (428 Stars)' },
  { id: 'cluster-reset', label: '✦ The Reset Constellation' },
  { id: 'cluster-late-night', label: '🌙 Nocturnal Orbit' },
  { id: 'cluster-grind', label: '🎓 The Focus Grid' },
  { id: 'cluster-escape', label: '✈️ Mountain Ridge' },
  { id: 'cluster-comfort', label: '🎬 Comfort Spiral' }
];

export default function MemoryConstellation({ onSelectReceipt }) {
  const canvasRef = useRef(null);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [hoveredReceipt, setHoveredReceipt] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [selectedCluster, setSelectedCluster] = useState('all');

  // Pre-generate deterministic 2D celestial coordinates for all 428 receipts
  const starfield = useMemo(() => {
    return ALL_RECEIPTS.map((r, index) => {
      // Deterministic angle and radius from receipt id/date
      const month = parseInt(r.date.split('-')[1], 10);
      const day = parseInt(r.date.split('-')[2] || '1', 10);
      const angle = (month / 12) * Math.PI * 2 + ((day * 7) % 360) * (Math.PI / 180);
      const distance = 70 + ((index * 37) % 240);

      // Celestial coordinates relative to galaxy center
      const x = Math.cos(angle) * distance + (((index * 13) % 40) - 20);
      const y = Math.sin(angle) * distance * 0.75 + (((index * 19) % 40) - 20);

      return {
        ...r,
        origX: x,
        origY: y,
        size: r.clusterId ? 4.5 : 3.0,
        color: CATEGORY_COLORS[r.type] || '#818cf8',
        twinklePhase: (index * 0.4) % (Math.PI * 2)
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
        const isVisible = selectedCluster === 'all' || star.clusterId === selectedCluster;

        const isActive = activeReceipt && star.id === activeReceipt.id;
        const isConnected = connectedIds.has(star.id);
        const isHovered = hoveredReceipt && star.id === hoveredReceipt.id;

        const x = cx + star.origX;
        const y = cy + star.origY;

        // Twinkle factor
        const twinkle = 0.6 + 0.4 * Math.sin(time * 2 + star.twinklePhase);
        let alpha = isVisible ? (isActive || isConnected || isHovered ? 1 : 0.45) : 0.08;
        if (!activeReceipt && isVisible) alpha = twinkle;

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
  }, [starfield, activeReceipt, connectedIds, hoveredReceipt, selectedCluster]);

  // Find star at canvas client coordinates
  const findStarAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (clientX - rect.left) * scaleX;
    const my = (clientY - rect.top) * scaleY;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (const star of starfield) {
      const sx = cx + star.origX;
      const sy = cy + star.origY;
      const dist = Math.hypot(mx - sx, my - sy);
      if (dist < 16) {
        return star;
      }
    }
    return null;
  };

  const handleMouseMove = (e) => {
    const found = findStarAt(e.clientX, e.clientY);
    if (found) {
      setHoveredReceipt(found);
      setTooltipPos({ x: e.clientX, y: e.clientY });
    } else {
      setHoveredReceipt(null);
    }
  };

  const handleCanvasClick = (e) => {
    const found = findStarAt(e.clientX, e.clientY);
    if (found) {
      setActiveReceipt(found);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const found = findStarAt(touch.clientX, touch.clientY);
      if (found) {
        setActiveReceipt(found);
        setHoveredReceipt(found);
        setTooltipPos({ x: touch.clientX, y: touch.clientY });
      }
    }
  };

  return (
    <div className="relative rounded-3xl bg-[#090b14] border border-white/[0.1] shadow-2xl overflow-hidden min-h-[550px] flex flex-col" role="region" aria-label="Memory Constellation Starfield">
      {/* Top Floating Constellation Bar */}
      <div className="p-4 sm:p-6 border-b border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-4 z-10 bg-[#090b14]/90 backdrop-blur-md">
        <div>
          <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Memory Constellation</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            428 moments orbiting across 12 months. Twinkling stars connected by relational gravity.
          </p>
        </div>

        {/* Constellation Cluster Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
          {CONSTELLATION_CLUSTERS.map(cluster => (
            <button
              key={cluster.id}
              onClick={() => setSelectedCluster(cluster.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                selectedCluster === cluster.id
                  ? 'bg-indigo-600 text-white font-semibold shadow'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cluster.label}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4">
        <canvas
          ref={canvasRef}
          width={1000}
          height={620}
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
          onTouchStart={handleTouchStart}
          className="max-w-full max-h-full cursor-pointer select-none touch-none"
          role="img"
          aria-label="Interactive celestial map of memories"
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
              Click to view connected constellation
            </p>
          </div>
        )}
      </div>

      {/* Active Star Drawer / Bottom Banner */}
      {activeReceipt && (
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#0c0f1d]/95 backdrop-blur-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 animate-in slide-in-from-bottom-2">
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectReceipt && onSelectReceipt(activeReceipt)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Receipt</span>
            </button>
            <button
              onClick={() => setActiveReceipt(null)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

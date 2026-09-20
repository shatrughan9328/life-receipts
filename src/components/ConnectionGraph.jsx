import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Music, 
  Film, 
  MapPin, 
  CreditCard, 
  Camera, 
  MessageCircle, 
  Search, 
  Calendar, 
  FileText,
  Sparkles,
  Sliders,
  BookOpen
} from 'lucide-react';
import { CATEGORIES } from '../data/receipts';
import { calculateConnectionScore } from '../utils/connectionEngine';

const ICON_MAP = {
  music: Music,
  movie: Film,
  place: MapPin,
  purchase: CreditCard,
  photo: Camera,
  message: MessageCircle,
  search: Search,
  event: Calendar,
  note: FileText,
};

export default function ConnectionGraph({ 
  receipts = [], 
  selectedReceipt = null, 
  onSelectReceipt, 
  onRevealStory,
  threshold = 35,
  onThresholdChange
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [internalActive, setInternalActive] = useState(null);
  const activeReceipt = selectedReceipt || internalActive || receipts[0] || null;

  // Handle Resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;
        const h = Math.max(520, Math.min(650, window.innerHeight * 0.65));
        setDimensions({ width: clientWidth, height: h });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Compute node positions layout (organic radial constellation centering on active node or cluster)
  const graphNodes = useMemo(() => {
    if (!receipts.length) return [];
    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;

    // Arrange nodes organically in orbital rings based on index or connection
    return receipts.map((r, i) => {
      const isAnchor = activeReceipt && r.id === activeReceipt.id;
      let x, y;

      if (isAnchor) {
        x = centerX;
        y = centerY;
      } else {
        const angle = (i / receipts.length) * 2 * Math.PI + (i % 3) * 0.4;
        // Distribute in two elliptical orbits
        const radiusX = (i % 2 === 0 ? width * 0.32 : width * 0.42) + (Math.sin(i * 1.5) * 30);
        const radiusY = (i % 2 === 0 ? height * 0.30 : height * 0.38) + (Math.cos(i * 1.5) * 25);
        x = centerX + radiusX * Math.cos(angle);
        y = centerY + radiusY * Math.sin(angle);
      }

      // Clamp inside SVG viewport
      x = Math.max(50, Math.min(width - 50, x));
      y = Math.max(50, Math.min(height - 50, y));

      return {
        ...r,
        x,
        y,
        isAnchor
      };
    });
  }, [receipts, dimensions, activeReceipt]);

  // Compute edges between all nodes, specifically tracking connections to active node
  const { edges, connectedToActiveMap, activeReasons } = useMemo(() => {
    const edgeList = [];
    const connectedMap = new Map();
    const reasonsMap = new Map();

    if (!activeReceipt) return { edges: [], connectedToActiveMap: connectedMap, activeReasons: [] };

    for (let i = 0; i < receipts.length; i++) {
      const rA = receipts[i];
      if (rA.id === activeReceipt.id) continue;

      const result = calculateConnectionScore(activeReceipt, rA);
      if (result.score >= threshold) {
        connectedMap.set(rA.id, {
          score: result.score,
          reasons: result.reasons
        });
        reasonsMap.set(rA.id, result.reasons);
      }
    }

    // Build visual edges
    graphNodes.forEach(nodeA => {
      if (connectedMap.has(nodeA.id) || (activeReceipt && nodeA.id === activeReceipt.id)) {
        if (nodeA.id !== activeReceipt.id) {
          const connInfo = connectedMap.get(nodeA.id);
          const activeNode = graphNodes.find(n => n.id === activeReceipt.id);
          if (activeNode) {
            edgeList.push({
              id: `${activeNode.id}-${nodeA.id}`,
              source: activeNode,
              target: nodeA,
              score: connInfo.score,
              reasons: connInfo.reasons,
              isActiveConnection: true
            });
          }
        }
      }
    });

    // Flatten top reasons for the summary drawer
    const combinedReasons = [];
    reasonsMap.forEach((reasonsList) => {
      reasonsList.forEach(r => {
        if (!combinedReasons.some(cr => cr.label === r.label)) {
          combinedReasons.push(r);
        }
      });
    });

    return {
      edges: edgeList,
      connectedToActiveMap: connectedMap,
      activeReasons: combinedReasons
    };
  }, [receipts, graphNodes, activeReceipt, threshold]);

  const handleNodeClick = (node) => {
    setInternalActive(node);
    if (onSelectReceipt) onSelectReceipt(node);
  };

  const connectedCount = connectedToActiveMap.size;

  return (
    <div className="relative flex flex-col xl:flex-row gap-6">
      {/* Interactive SVG Graph Area */}
      <div 
        ref={containerRef}
        className="relative flex-1 rounded-3xl bg-[#090c16] border border-white/[0.1] shadow-2xl shadow-indigo-950/40 overflow-hidden min-h-[520px]"
      >
        {/* Ambient Cosmic Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* Top Floating Controls Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          <div className="flex items-center gap-2 bg-[#0d101d]/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/[0.08] shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-slate-300">
              {receipts.length} Nodes Active
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs font-mono text-indigo-400 font-semibold">
              {connectedCount} Connected Moments
            </span>
          </div>

          {/* Sensitivity Slider Control */}
          <div className="flex items-center gap-2.5 bg-[#0d101d]/90 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-white/[0.08] shadow-lg">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-mono text-slate-300">Sensitivity:</span>
            <input
              type="range"
              min="20"
              max="55"
              step="5"
              value={threshold}
              onChange={(e) => onThresholdChange && onThresholdChange(Number(e.target.value))}
              className="w-20 accent-indigo-500 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-indigo-400 w-8 text-right">
              {threshold}pt
            </span>
          </div>
        </div>

        {/* SVG Drawing Layer */}
        <svg 
          width={dimensions.width} 
          height={dimensions.height}
          className="w-full h-full cursor-crosshair select-none"
        >
          <defs>
            {/* Linear gradient for glowing edges */}
            <linearGradient id="activeEdgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
            </linearGradient>

            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render Connection Edges */}
          {edges.map((edge) => {
            const dx = edge.target.x - edge.source.x;
            const dy = edge.target.y - edge.source.y;
            // Bezier curve control point offset
            const cx = (edge.source.x + edge.target.x) / 2 - dy * 0.15;
            const cy = (edge.source.y + edge.target.y) / 2 + dx * 0.15;
            const pathData = `M ${edge.source.x} ${edge.source.y} Q ${cx} ${cy} ${edge.target.x} ${edge.target.y}`;

            return (
              <g key={edge.id} className="transition-all duration-300">
                {/* Glow aura */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="url(#activeEdgeGlow)"
                  strokeWidth="4"
                  strokeOpacity="0.3"
                  filter="url(#glowFilter)"
                />
                {/* Core animated dashed line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="url(#activeEdgeGlow)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </g>
            );
          })}

          {/* Render Nodes */}
          {graphNodes.map((node) => {
            const isAnchor = activeReceipt && node.id === activeReceipt.id;
            const isConnected = connectedToActiveMap.has(node.id);
            const isHovered = hoveredNode && hoveredNode.id === node.id;
            const categoryConfig = CATEGORIES.find(c => c.id === node.type) || CATEGORIES[0];
            const IconComponent = ICON_MAP[node.type] || FileText;

            // Opacity handling: anchor & connected nodes remain vivid; unrelated nodes dim out
            const opacity = isAnchor || isConnected || isHovered ? 1 : 0.22;
            const nodeRadius = isAnchor ? 28 : (isConnected ? 22 : 18);

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity }}
              >
                {/* Pulsing ring for anchor or connected nodes */}
                {(isAnchor || isConnected) && (
                  <circle
                    r={nodeRadius + 8}
                    fill="none"
                    stroke={isAnchor ? '#818cf8' : categoryConfig.color}
                    strokeWidth="1.5"
                    strokeOpacity={isAnchor ? 0.8 : 0.4}
                    className={isAnchor ? 'animate-ping' : ''}
                  />
                )}

                {/* Node Outer Circle */}
                <circle
                  r={nodeRadius}
                  fill="#0e1324"
                  stroke={isAnchor ? '#ffffff' : (isConnected ? categoryConfig.color : 'rgba(255,255,255,0.15)')}
                  strokeWidth={isAnchor ? 3 : 2}
                  filter={isAnchor ? 'url(#glowFilter)' : undefined}
                />

                {/* Internal colored tint */}
                <circle
                  r={nodeRadius - 3}
                  fill={categoryConfig.color}
                  fillOpacity={isAnchor ? 0.25 : 0.15}
                />

                {/* Center Category Icon Placeholder via foreignObject for crisp SVG Lucide rendering */}
                <foreignObject
                  x={-nodeRadius + 4}
                  y={-nodeRadius + 4}
                  width={(nodeRadius - 4) * 2}
                  height={(nodeRadius - 4) * 2}
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <IconComponent 
                      className="w-4 h-4 transition-transform group-hover:scale-110"
                      style={{ color: categoryConfig.color }}
                    />
                  </div>
                </foreignObject>

                {/* Node Label (Title & Timestamp snippet) */}
                <text
                  y={nodeRadius + 14}
                  textAnchor="middle"
                  className={`text-[11px] font-sans font-medium transition-colors pointer-events-none ${
                    isAnchor ? 'fill-white font-bold' : (isConnected ? 'fill-slate-200' : 'fill-slate-500')
                  }`}
                >
                  {node.title.length > 20 ? node.title.slice(0, 18) + '...' : node.title}
                </text>
                <text
                  y={nodeRadius + 26}
                  textAnchor="middle"
                  className="text-[9px] font-mono fill-slate-400 pointer-events-none"
                >
                  {node.timestamp}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Bottom Helper Hint */}
        <div className="absolute bottom-3 left-4 text-[11px] text-slate-500 font-mono pointer-events-none">
          Click any node to re-center connections & calculate relational vectors
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Right Story & Connection Breakdown Panel                       */}
      {/* ------------------------------------------------------------- */}
      <div className="xl:w-96 flex flex-col justify-between p-6 rounded-3xl bg-[#0d101c] border border-white/[0.1] shadow-2xl shadow-indigo-950/40">
        <div>
          {/* Active Moment Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              Selected Center
            </span>
            <span className="text-xs font-mono text-slate-400">
              {activeReceipt?.date} • {activeReceipt?.timestamp}
            </span>
          </div>

          <h3 className="text-xl font-bold font-display text-white mb-1.5">
            {activeReceipt?.title || 'Select a Receipt'}
          </h3>

          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            {activeReceipt?.description}
          </p>

          {/* Connection Headline */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 mb-5">
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-indigo-200">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>We found {connectedCount} connected {connectedCount === 1 ? 'moment' : 'moments'}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              These digital footprints happened in the same rhythm, sharing temporal proximity, shared physical spaces, or semantic focus.
            </p>
          </div>

          {/* Reasons List */}
          <div className="mb-6 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
              Why they are connected:
            </h4>

            {activeReasons.length > 0 ? (
              activeReasons.slice(0, 4).map((r, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 bg-white/[0.03] px-3 py-2 rounded-xl border border-white/[0.05]">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  <span className="font-medium truncate">{r.label}</span>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-500 italic p-3 bg-white/[0.02] rounded-xl">
                Try lowering the sensitivity slider or selecting another receipt.
              </div>
            )}
          </div>
        </div>

        {/* Primary Story Reveal Action Button */}
        <div>
          <button
            onClick={() => {
              if (onRevealStory && activeReceipt) {
                // Collect active receipt and its connected peers
                const related = [activeReceipt];
                connectedToActiveMap.forEach((_, id) => {
                  const found = receipts.find(r => r.id === id);
                  if (found) related.push(found);
                });
                onRevealStory(related);
              }
            }}
            disabled={connectedCount === 0}
            className={`w-full py-3.5 px-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xl transition-all duration-300 ${
              connectedCount > 0
                ? 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white hover:opacity-95 shadow-indigo-500/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                : 'bg-white/[0.05] text-slate-500 border border-white/[0.08] cursor-not-allowed'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Reveal the Story →</span>
          </button>
        </div>
      </div>
    </div>
  );
}

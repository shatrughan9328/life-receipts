import React, { useState } from 'react';
import { 
  FileText,
  Sparkles,
  Sliders,
  BookOpen
} from 'lucide-react';
import { getCategoryConfig, ICON_MAP } from '../constants/categories';
import { useConnectionGraph } from '../hooks/useConnectionGraph';
import ConnectionChain from './ConnectionChain';

export default function ConnectionGraph({ 
  receipts = [], 
  selectedReceipt = null, 
  onSelectReceipt, 
  onRevealStory,
  threshold = 35,
  onThresholdChange
}) {
  const [viewMode, setViewMode] = useState('reasons'); // 'reasons' | 'chain'

  const {
    containerRef,
    dimensions,
    activeReceipt,
    setInternalActive,
    hoveredNode,
    setHoveredNode,
    graphNodes,
    edges,
    connectedToActiveMap,
    activeReasons,
    connectedReceiptsList,
    connectedCount
  } = useConnectionGraph({ receipts, selectedReceipt, threshold });

  const handleNodeClick = (node) => {
    setInternalActive(node);
    if (onSelectReceipt) onSelectReceipt(node);
  };

  return (
    <section className="relative flex flex-col xl:flex-row gap-6" aria-label="Interactive Connection Network">
      {/* Interactive SVG Graph Canvas */}
      <div 
        ref={containerRef}
        className="relative flex-1 rounded-3xl bg-[#090c16] border border-white/[0.1] shadow-2xl shadow-indigo-950/40 overflow-hidden min-h-[420px] sm:min-h-[520px]"
      >
        {/* Ambient Cosmic Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Top Floating Controls Bar */}
        <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2.5 pointer-events-auto">
          <div className="flex items-center gap-2 bg-[#0d101d]/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/[0.08] shadow-lg text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300">
              {receipts.length} Nodes
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-indigo-400 font-semibold">
              {connectedCount} Connected
            </span>
          </div>

          {/* Sensitivity Slider Control */}
          <div className="flex items-center gap-2 bg-[#0d101d]/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/[0.08] shadow-lg">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <label htmlFor="sensitivity-range" className="text-xs font-mono text-slate-300">
              Score:
            </label>
            <input
              id="sensitivity-range"
              type="range"
              min="20"
              max="55"
              step="5"
              value={threshold}
              onChange={(e) => onThresholdChange && onThresholdChange(Number(e.target.value))}
              className="w-16 sm:w-20 accent-indigo-500 cursor-pointer"
              aria-label="Connection score sensitivity threshold"
            />
            <span className="text-xs font-mono font-bold text-indigo-400 w-7 text-right">
              {threshold}
            </span>
          </div>
        </div>

        {/* SVG Drawing Layer with dynamic responsive viewBox */}
        <svg 
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          className="w-full h-full cursor-crosshair select-none"
          role="img"
          aria-label="Visual graph of connected life moments"
        >
          <defs>
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
            const cx = (edge.source.x + edge.target.x) / 2 - dy * 0.15;
            const cy = (edge.source.y + edge.target.y) / 2 + dx * 0.15;
            const pathData = `M ${edge.source.x} ${edge.source.y} Q ${cx} ${cy} ${edge.target.x} ${edge.target.y}`;

            return (
              <g key={edge.id} className="transition-all duration-300">
                <path
                  d={pathData}
                  fill="none"
                  stroke="url(#activeEdgeGlow)"
                  strokeWidth="3.5"
                  strokeOpacity="0.3"
                  filter="url(#glowFilter)"
                />
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

          {/* Render Nodes with Keyboard Accessibility */}
          {graphNodes.map((node) => {
            const isAnchor = activeReceipt && node.id === activeReceipt.id;
            const isConnected = connectedToActiveMap.has(node.id);
            const isHovered = hoveredNode && hoveredNode.id === node.id;
            const categoryConfig = getCategoryConfig(node.type);
            const IconComponent = ICON_MAP[node.type] || FileText;

            const opacity = isAnchor || isConnected || isHovered ? 1 : 0.22;
            const nodeRadius = isAnchor ? 28 : (isConnected ? 22 : 18);

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => handleNodeClick(node)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNodeClick(node);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${node.title}, ${node.type} recorded at ${node.timestamp}. ${isAnchor ? 'Selected' : (isConnected ? 'Connected' : 'Dimmed')}`}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer transition-all duration-300 focus-visible:outline-none"
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

                {/* Center Category Icon */}
                <foreignObject
                  x={-nodeRadius + 4}
                  y={-nodeRadius + 4}
                  width={(nodeRadius - 4) * 2}
                  height={(nodeRadius - 4) * 2}
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <IconComponent 
                      className="w-4 h-4 transition-transform"
                      style={{ color: categoryConfig.color }}
                    />
                  </div>
                </foreignObject>

                {/* Node Label */}
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
        <div className="absolute bottom-3 left-4 text-[11px] text-slate-500 font-mono pointer-events-none hidden sm:block">
          Click any node or press Tab / Enter to trace relational gravity
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Right Story & Connection Breakdown Panel                       */}
      {/* ------------------------------------------------------------- */}
      <aside className="xl:w-96 flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-[#0d101c] border border-white/[0.1] shadow-2xl shadow-indigo-950/40">
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

          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            {activeReceipt?.description}
          </p>

          {/* View Mode Toggle: Summary Reasons vs Causal Chain */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-4">
            <button
              onClick={() => setViewMode('reasons')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'reasons'
                  ? 'bg-indigo-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Relational Reasons
            </button>
            <button
              onClick={() => setViewMode('chain')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'chain'
                  ? 'bg-indigo-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Causal Life Chain
            </button>
          </div>

          {/* View Mode 1: Relational Reasons */}
          {viewMode === 'reasons' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30">
                <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-indigo-200">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>We found {connectedCount} connected {connectedCount === 1 ? 'moment' : 'moments'}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  These moments occurred in the same emotional and physical rhythm, sharing coordinates or thematic overlap.
                </p>
              </div>

              {/* Reasons List */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
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
                    Try lowering the sensitivity slider or clicking another receipt node.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* View Mode 2: Sequential Causal Chain */}
          {viewMode === 'chain' && (
            <div className="max-h-[300px] overflow-y-auto pr-1">
              <ConnectionChain 
                receipts={connectedReceiptsList} 
                onSelectReceipt={(r) => handleNodeClick(r)} 
              />
            </div>
          )}
        </div>

        {/* Primary Story Reveal Action Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              if (onRevealStory && activeReceipt) {
                onRevealStory(connectedReceiptsList);
              }
            }}
            disabled={connectedCount === 0}
            className={`w-full py-3.5 px-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              connectedCount > 0
                ? 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white hover:opacity-95 shadow-indigo-500/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                : 'bg-white/[0.05] text-slate-500 border border-white/[0.08] cursor-not-allowed'
            }`}
            aria-label="Reveal the synthesized story from connected moments"
          >
            <BookOpen className="w-4 h-4" />
            <span>Reveal the Story →</span>
          </button>
        </div>
      </aside>
    </section>
  );
}

import React from 'react';

export default function StatCard({ title, value, detail, icon: Icon, accentColor = '#818cf8', trend }) {
  return (
    <div className="relative group p-6 rounded-2xl bg-[#0e1220]/70 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden">
      {/* Subtle Glow Backdrop */}
      <div 
        className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {Icon && (
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center border"
            style={{ 
              backgroundColor: `${accentColor}15`, 
              borderColor: `${accentColor}30`,
              color: accentColor 
            }}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mb-1 group-hover:text-indigo-200 transition-colors">
        {value}
      </div>

      {detail && (
        <p className="text-xs text-slate-400 leading-relaxed">
          {detail}
        </p>
      )}

      {trend && (
        <div className="mt-3 pt-2 border-t border-white/[0.05] flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}

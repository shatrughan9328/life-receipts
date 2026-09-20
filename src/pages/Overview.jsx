import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Music, 
  MapPin, 
  Compass, 
  ArrowRight,
  TrendingUp,
  Activity,
  Network
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { storyService } from '../services/storyService';
import { getCategoryConfig } from '../constants/categories';

const CustomPulseTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-xl bg-[#0c101d] border border-indigo-500/30 shadow-xl text-xs font-mono">
        <p className="text-white font-bold mb-1">{label} 2024</p>
        <p className="text-indigo-400">{payload[0].value} digital moments recorded</p>
      </div>
    );
  }
  return null;
};

const CustomHourlyTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2.5 rounded-lg bg-[#0c101d] border border-sky-500/30 text-xs font-mono">
        <p className="text-white font-bold">{label}</p>
        <p className="text-sky-400">{payload[0].value} activities logged</p>
      </div>
    );
  }
  return null;
};

export default function Overview() {
  const analytics = storyService.getAnalytics();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]" aria-labelledby="overview-title">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              Annual Digital Pulse
            </span>
            <span className="text-xs text-slate-400 font-mono">January – December 2024</span>
          </div>
          <h1 id="overview-title" className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            The Shape of Your Year
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
            A birds-eye view of your digital rhythm — identifying your creative peaks, recurring sanctuaries, and nocturnal habits.
          </p>
        </div>

        <Link
          to="/connections"
          className="self-start md:self-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-90 shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          aria-label="Navigate to Connect the Dots"
        >
          <span>Connect the Dots</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 6 Key Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="Key Life Statistics">
        <StatCard
          title="Total Recorded Moments"
          value={analytics.totalMoments}
          detail="Digital receipts collected across 9 life dimensions"
          icon={Activity}
          accentColor="#818cf8"
        />
        <StatCard
          title="Most Active Month"
          value={analytics.mostActiveMonth}
          detail="Late-night architectural sprints & deep music sessions"
          icon={Calendar}
          accentColor="#c084fc"
          trend="Peak output period (+42%)"
        />
        <StatCard
          title="Most Active Time"
          value="10 PM – 2 AM"
          detail="38% of your creative moments happened after dark"
          icon={Clock}
          accentColor="#38bdf8"
          trend="Night Owl archetype confirmed"
        />
        <StatCard
          title="Most Frequent Category"
          value={analytics.mostFrequentCategory}
          detail="The emotional backbone of your year"
          icon={Music}
          accentColor="#10b981"
        />
        <StatCard
          title="Your Third Place"
          value="Blue Tokai Coffee"
          detail="18 visits for focus, artisanal pour-overs & quiet reflection"
          icon={MapPin}
          accentColor="#f59e0b"
          trend="Primary external sanctuary"
        />
        <StatCard
          title="Dominant Music Genre"
          value={analytics.mostPlayedGenre}
          detail="Introspective textures soundtracking your coding sprints"
          icon={Sparkles}
          accentColor="#ec4899"
        />
      </section>

      {/* Visualization 1: Your Digital Pulse (Monthly Area Chart) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#0d101c]/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-indigo-950/30" aria-label="Monthly Digital Pulse Chart">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>Your Digital Pulse</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Fluctuations in your daily life activity over the course of 12 months.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              Moments per Month
            </span>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip content={<CustomPulseTooltip />} />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#818cf8" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#pulseGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Narrative Context Footer */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <span>April & October marked intense creative output; July was an intentional retreat into nature.</span>
          <span className="font-mono text-indigo-400">Source: Local Receipts Engine</span>
        </div>
      </section>

      {/* Grid: Circadian Rhythm & Category Proportions */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Circadian Rhythm and Category Dimensions">
        
        {/* Circadian Clock (Activity by Hour) */}
        <article className="p-6 sm:p-8 rounded-3xl bg-[#0d101c]/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-400" />
              <span>Circadian Distribution (24 Hours)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Notice the distinct spikes between 14:00 (Afternoon coffee) and 01:00 (Nocturnal focus).
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.hourlyData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="hour" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={2} />
                <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip content={<CustomHourlyTooltip />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {analytics.hourlyData.map((entry, idx) => (
                    <Cell 
                      key={`cell-${idx}`} 
                      fill={entry.isNight ? '#818cf8' : '#38bdf8'} 
                      opacity={entry.isNight ? 0.9 : 0.6}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8]" />
              Late Night (22:00 – 04:00)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
              Daytime Activity
            </span>
          </div>
        </article>

        {/* Category Breakdown Proportions */}
        <article className="p-6 sm:p-8 rounded-3xl bg-[#0d101c]/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" />
              <span>Dimensions of Your Life</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              How your 428 receipts distribute across activities and mediums.
            </p>
          </div>

          <div className="space-y-3">
            {analytics.categoryData.map((cat) => {
              const catConf = getCategoryConfig(cat.type);
              return (
                <div key={cat.type} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catConf.color }} />
                      {cat.name}
                    </span>
                    <span className="text-slate-400">
                      {cat.count} ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${cat.percentage * 3}%`, 
                        backgroundColor: catConf.color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

      </section>

      {/* Bottom Emotional Callout */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-pink-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-2xl font-bold font-display text-white mb-1">
            Ready to Connect the Dots?
          </h3>
          <p className="text-sm text-indigo-200/80 max-w-xl">
            See how an emotional song at 1:48 AM connected to a café visit, an iced latte, a golden photograph, and a journal note.
          </p>
        </div>
        <Link
          to="/connections"
          className="px-6 py-3 rounded-2xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <Network className="w-4 h-4" />
          <span>Launch Connection Engine</span>
        </Link>
      </section>

    </div>
  );
}

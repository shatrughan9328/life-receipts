import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

/**
 * WaveformPlayer
 * Interactive simulated music player with animated audio visualization bars.
 * 
 * @param {Object} props
 * @param {Object} props.metadata - Track metadata (artist, genre, duration, lyricsExcerpt)
 */
export default function WaveformPlayer({ metadata }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const barHeights = [40, 65, 80, 45, 90, 70, 30, 85, 95, 60, 40, 75, 50, 90, 65, 45, 80, 100, 60, 40, 70, 85, 50];

  return (
    <div className="mb-6 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause simulated track' : 'Play simulated track'}
            className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
          <div>
            <p className="text-sm font-semibold text-white">{metadata?.artist || 'Unknown Artist'}</p>
            <p className="text-xs text-slate-400">{metadata?.genre || 'Alternative / Ambient'} • {metadata?.duration || '3:45'}</p>
          </div>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Spotify High-Res
        </span>
      </div>

      {/* Simulated Animated Waveform */}
      <div className="h-8 flex items-end gap-1 px-2" aria-hidden="true">
        {barHeights.map((height, i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-full transition-all duration-300 ${
              isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500/30'
            }`}
            style={{ height: isPlaying ? `${height}%` : '25%' }}
          />
        ))}
      </div>

      {metadata?.lyricsExcerpt && (
        <p className="mt-3 text-xs italic text-slate-400 border-l-2 border-emerald-500/40 pl-3">
          "{metadata.lyricsExcerpt}"
        </p>
      )}
    </div>
  );
}

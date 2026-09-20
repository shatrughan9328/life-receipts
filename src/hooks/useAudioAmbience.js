import { useState, useEffect, useRef } from 'react';

/**
 * Custom Hook: useAudioAmbience
 * Uses native Web Audio API to create a gentle harmonic ambient drone
 * (No external audio files or mp3 dependencies).
 */
export function useAudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    };
  }, []);

  const toggle = () => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  };

  const start = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Soothing tripartite harmonic chord (A3: 220Hz, C#4: 277.18Hz, E4: 329.63Hz)
      const freqs = [220, 277.18, 329.63];
      freqs.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.035, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
      });

      setIsPlaying(true);
    } catch (err) {
      console.warn('Web Audio ambience failed to initialize', err);
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsPlaying(false);
  };

  return { isPlaying, toggle, start, stop };
}

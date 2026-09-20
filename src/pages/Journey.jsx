import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  RotateCcw, 
  Music, 
  Search, 
  MapPin, 
  CreditCard, 
  Camera, 
  FileText,
  X
} from 'lucide-react';

const JOURNEY_STEPS = [
  {
    step: 1,
    time: '1:48 AM • March 18',
    category: 'Music',
    icon: Music,
    color: '#10b981',
    heading: 'It started in the dark.',
    subheading: 'You played "Night Changes" by One Direction.',
    detail: 'Alone in your room, letting acoustic melodies wash over weeks of accumulated fatigue.',
    bg: 'from-emerald-950/40 to-slate-950'
  },
  {
    step: 2,
    time: '2:12 AM • March 18',
    category: 'Search',
    icon: Search,
    color: '#6366f1',
    heading: 'A quiet question took shape.',
    subheading: 'You searched: "quiet places near me with good coffee".',
    detail: 'You weren\'t looking for caffeine. You were seeking a sanctuary away from the screen.',
    bg: 'from-indigo-950/40 to-slate-950'
  },
  {
    step: 3,
    time: '2:45 PM • March 18',
    category: 'Place',
    icon: MapPin,
    color: '#f59e0b',
    heading: 'You followed the prompt.',
    subheading: 'You arrived at Blue Tokai Coffee Roasters.',
    detail: 'Sunlight filtering through timber blinds. Low jazz. The scent of roasted beans.',
    bg: 'from-amber-950/40 to-slate-950'
  },
  {
    step: 4,
    time: '3:18 PM • March 18',
    category: 'Purchase',
    icon: CreditCard,
    color: '#06b6d4',
    heading: 'A small, deliberate treat.',
    subheading: 'Purchased an Iced Sea Salt Mocha & warm croissant.',
    detail: 'A tangible receipt marking an hour stolen back from urgency.',
    bg: 'from-cyan-950/40 to-slate-950'
  },
  {
    step: 5,
    time: '3:25 PM • March 18',
    category: 'Photo',
    icon: Camera,
    color: '#3b82f6',
    heading: 'You preserved the stillness.',
    subheading: 'Captured a photo of diagonal sunlight on your wooden table.',
    detail: 'Documenting a rare moment where time felt expansive instead of compressed.',
    bg: 'from-blue-950/40 to-slate-950'
  },
  {
    step: 6,
    time: '3:42 PM • March 18',
    category: 'Note',
    icon: FileText,
    color: '#eab308',
    heading: 'The realization landed.',
    subheading: 'You penned down five words: "Needed this break."',
    detail: 'The final line connecting a late-night thought into an intentional afternoon.',
    bg: 'from-yellow-950/40 to-slate-950'
  },
  {
    step: 7,
    time: 'The Reveal',
    category: 'Story',
    icon: Sparkles,
    color: '#c084fc',
    heading: 'The Reset.',
    subheading: 'You weren\'t looking at six receipts. You were looking at one story.',
    detail: 'Separately, they were receipts. Together, they captured a moment when you decided to slow down.',
    isClimax: true,
    bg: 'from-purple-950/50 via-indigo-950/50 to-slate-950'
  }
];

export default function Journey() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const step = JOURNEY_STEPS[currentStepIndex];
  const IconComponent = step.icon;
  const isFinal = currentStepIndex === JOURNEY_STEPS.length - 1;

  // Trigger confetti on final reveal
  useEffect(() => {
    if (isFinal) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isFinal]);

  // Autoplay progression timer
  useEffect(() => {
    if (!isAutoPlaying || isFinal) return;

    const timer = setTimeout(() => {
      setCurrentStepIndex(prev => Math.min(JOURNEY_STEPS.length - 1, prev + 1));
    }, 4500);

    return () => clearTimeout(timer);
  }, [currentStepIndex, isAutoPlaying, isFinal]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentStepIndex(prev => Math.min(JOURNEY_STEPS.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentStepIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === ' ') {
        setIsAutoPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 sm:p-8 select-none">
      
      {/* Dynamic Background Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b ${step.bg} transition-colors duration-1000 -z-10`}
      />

      {/* Top Header: Progress Ticks & Close */}
      <div className="max-w-3xl mx-auto w-full">
        {/* Story Ticks Bar */}
        <div className="flex items-center gap-1.5 mb-6">
          {JOURNEY_STEPS.map((s, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden cursor-pointer"
            >
              <div 
                className={`h-full bg-white transition-all duration-300 ${
                  idx < currentStepIndex ? 'w-full' : (idx === currentStepIndex ? 'w-full' : 'w-0')
                }`}
                style={{ backgroundColor: idx === currentStepIndex ? step.color : undefined }}
              />
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: step.color }} />
            <span>{step.time}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <Link to="/overview" className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Moment Visual Center */}
      <div className="max-w-2xl mx-auto w-full text-center py-12 px-4 animate-in fade-in zoom-in-95 duration-500 key={currentStepIndex}">
        {/* Animated Icon Halo */}
        <div 
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl flex items-center justify-center mb-8 border shadow-2xl transition-all duration-500"
          style={{
            backgroundColor: `${step.color}20`,
            borderColor: `${step.color}50`,
            color: step.color,
            boxShadow: `0 0 50px -10px ${step.color}40`
          }}
        >
          <IconComponent className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3">
          {step.category} • Moment {step.step} of 7
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4 leading-tight">
          {step.heading}
        </h2>

        <p className="text-lg sm:text-2xl font-serif italic text-indigo-200/90 mb-6 max-w-xl mx-auto">
          {step.subheading}
        </p>

        <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto font-light leading-relaxed">
          {step.detail}
        </p>

        {/* If final reveal, show action buttons */}
        {step.isClimax && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/connections?focus=rcpt-reset-01"
              className="px-6 py-3 rounded-2xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl transition-all"
            >
              Explore In Connection Graph
            </Link>
            <button
              onClick={() => setCurrentStepIndex(0)}
              className="px-5 py-3 rounded-2xl text-xs font-mono text-slate-300 hover:text-white bg-white/[0.05] border border-white/[0.1] transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Journey</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Step Controls */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between pt-6 border-t border-white/[0.08]">
        <button
          onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
          disabled={currentStepIndex === 0}
          className={`flex items-center gap-1 text-xs font-mono px-4 py-2 rounded-xl transition-all ${
            currentStepIndex === 0
              ? 'opacity-30 cursor-not-allowed text-slate-500'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-xs font-mono text-slate-500">
          Use ← / → Arrow Keys
        </span>

        <button
          onClick={() => setCurrentStepIndex(prev => Math.min(JOURNEY_STEPS.length - 1, prev + 1))}
          disabled={isFinal}
          className={`flex items-center gap-1 text-xs font-mono px-4 py-2 rounded-xl transition-all ${
            isFinal
              ? 'opacity-30 cursor-not-allowed text-slate-500'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

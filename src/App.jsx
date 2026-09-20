import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Sparkles } from 'lucide-react';

// Code-split route components for optimal production performance
const Landing = React.lazy(() => import('./pages/Landing'));
const Overview = React.lazy(() => import('./pages/Overview'));
const Explorer = React.lazy(() => import('./pages/Explorer'));
const Connections = React.lazy(() => import('./pages/Connections'));
const Chapters = React.lazy(() => import('./pages/Chapters'));
const ChapterDetail = React.lazy(() => import('./pages/ChapterDetail'));
const Insights = React.lazy(() => import('./pages/Insights'));
const ConstellationPage = React.lazy(() => import('./pages/ConstellationPage'));
const Journey = React.lazy(() => import('./pages/Journey'));

function PageLoadingFallback() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8 space-y-4 animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-indigo-400 animate-spin" />
      </div>
      <p className="text-xs font-mono text-slate-400 tracking-wider uppercase">
        Loading LifeLens Interface...
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        <main className="flex-1" role="main">
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/explorer" element={<Explorer />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/chapters" element={<Chapters />} />
              <Route path="/chapters/:id" element={<ChapterDetail />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/constellation" element={<ConstellationPage />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

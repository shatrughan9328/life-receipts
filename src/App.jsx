import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Overview from './pages/Overview';
import Explorer from './pages/Explorer';
import Connections from './pages/Connections';
import Chapters from './pages/Chapters';
import ChapterDetail from './pages/ChapterDetail';
import Insights from './pages/Insights';
import ConstellationPage from './pages/ConstellationPage';
import Journey from './pages/Journey';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        <main className="flex-1">
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
        </main>
      </div>
    </BrowserRouter>
  );
}

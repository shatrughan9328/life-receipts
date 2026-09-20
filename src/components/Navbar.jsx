import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Sparkles, 
  Layers, 
  Network, 
  BookOpen, 
  Lightbulb, 
  Stars, 
  Menu, 
  X,
  Play
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Overview', path: '/overview', icon: Compass },
    { name: 'Explore', path: '/explorer', icon: Layers },
    { name: 'Connections', path: '/connections', icon: Network },
    { name: 'Chapters', path: '/chapters', icon: BookOpen },
    { name: 'Insights', path: '/insights', icon: Lightbulb },
    { name: 'Constellation', path: '/constellation', icon: Stars },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/85 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LifeLens Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0b0d14] rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                LifeLens
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                In Receipts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Journey Mode CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/journey"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-90 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Journey</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0b0d14]/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                {link.name}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
}

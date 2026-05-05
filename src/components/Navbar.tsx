import { useState, useEffect } from 'react'
import { Tv2, Menu, X, Radio, Bell } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Live Now', href: '#live' },
    { label: 'Matches', href: '#matches' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Teams', href: '#teams' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(10, 13, 20, 0.95)'
          : 'linear-gradient(to bottom, rgba(10,13,20,0.9), transparent)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid hsl(220 15% 18%)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'hsl(82 72% 44%)' }}>
              <Tv2 size={20} className="text-black" />
            </div>
            <div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(50 20% 95%)' }}
              >
                CRICKET<span style={{ color: 'hsl(82 72% 44%)' }}>LIVE</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: 'hsl(220 10% 65%)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'hsl(82 72% 44%)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'hsl(220 10% 65%)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(220, 50, 50, 0.15)', border: '1px solid rgba(220,50,50,0.3)', color: '#ef4444' }}>
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              LIVE
            </div>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg transition-all"
              style={{ background: 'hsl(220 15% 16%)', color: 'hsl(50 20% 70%)' }}>
              <Bell size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: 'hsl(82 72% 44%)', color: 'hsl(220 20% 7%)' }}>
              <Radio size={14} />
              Watch Live
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}
            style={{ color: 'hsl(50 20% 80%)' }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2"
          style={{ background: 'rgba(10, 13, 20, 0.98)', borderBottom: '1px solid hsl(220 15% 18%)' }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2.5 text-sm font-medium"
              style={{ color: 'hsl(220 10% 70%)' }}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: 'hsl(82 72% 44%)', color: 'hsl(220 20% 7%)' }}>
              <Radio size={14} />
              Watch Live
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

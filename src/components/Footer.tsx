import { Tv2, Radio, Share2, Rss, Globe, Bell } from 'lucide-react'

const FOOTER_LINKS = {
  'Watch': ['Live Streams', 'Match Highlights', 'Full Matches', 'Press Conferences'],
  'Cricket': ['ICC Rankings', 'IPL', 'Test Series', 'T20 World Cup'],
  'More': ['About Us', 'Contact', 'Advertise', 'Privacy Policy'],
}

export default function Footer() {
  return (
    <footer style={{ background: 'hsl(220 22% 5%)', borderTop: '1px solid hsl(220 15% 14%)' }}>
      {/* CTA Banner */}
      <div className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, hsl(82 72% 20%) 0%, hsl(82 72% 12%) 100%)' }}>
        <div className="absolute inset-0"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1774168062292-479f413d3b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08,
          }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(50 20% 95%)', letterSpacing: '-0.02em' }}>
            NEVER MISS A <span style={{ color: 'hsl(82 72% 44%)' }}>SINGLE BALL</span>
          </h2>
          <p className="mb-6 max-w-md mx-auto text-sm" style={{ color: 'hsl(220 10% 65%)' }}>
            Subscribe to live alerts and get notified the moment your favourite team steps onto the field.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'hsl(50 20% 90%)',
              }}
            />
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 shrink-0"
              style={{ background: 'hsl(82 72% 44%)', color: 'hsl(220 20% 7%)' }}>
              <Radio size={14} />
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'hsl(82 72% 44%)' }}>
                <Tv2 size={20} className="text-black" />
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(50 20% 95%)' }}>
                CRICKET<span style={{ color: 'hsl(82 72% 44%)' }}>LIVE</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'hsl(220 10% 50%)' }}>
              Your ultimate destination for live cricket streaming, match highlights, and real-time scorecards.
            </p>
            <div className="flex items-center gap-3">
              {[Share2, Rss, Globe, Bell].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'hsl(220 15% 14%)', color: 'hsl(220 10% 55%)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'hsl(82 72% 44%)'
                    ;(e.currentTarget as HTMLElement).style.color = 'black'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'hsl(220 15% 14%)'
                    ;(e.currentTarget as HTMLElement).style.color = 'hsl(220 10% 55%)'
                  }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'hsl(220 10% 55%)' }}>
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors duration-150"
                      style={{ color: 'hsl(220 10% 50%)' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'hsl(82 72% 44%)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'hsl(220 10% 50%)')}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid hsl(220 15% 14%)' }}>
          <p className="text-xs" style={{ color: 'hsl(220 10% 40%)' }}>
            © 2024 CricketLive. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'hsl(220 10% 40%)' }}>
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            <span>3 matches streaming live right now</span>
          </div>
        </div>
      </div>

    </footer>
  )
}

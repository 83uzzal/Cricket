import { Play, Clock, Users } from 'lucide-react'

const MATCHES = [
  {
    id: 1,
    status: 'LIVE',
    competition: 'IPL 2024 • Match 34',
    team1: { name: 'MI', full: 'Mumbai Indians', score: '187/4', overs: '18.2', flag: '🔵' },
    team2: { name: 'CSK', full: 'Chennai Super Kings', score: '165/7', overs: '20', flag: '🟡' },
    image: 'https://images.unsplash.com/photo-1774167287506-704e630b3e6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    viewers: '1.2M',
    venue: 'Wankhede Stadium, Mumbai',
  },
  {
    id: 2,
    status: 'LIVE',
    competition: 'Test Series • Day 3',
    team1: { name: 'ENG', full: 'England', score: '312/8', overs: '88.4', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    team2: { name: 'SA', full: 'South Africa', score: '285', overs: '94', flag: '🇿🇦' },
    image: 'https://images.unsplash.com/photo-1774199741529-0e33dc3b8bdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    viewers: '840K',
    venue: 'Lord\'s Cricket Ground, London',
  },
  {
    id: 3,
    status: 'UPCOMING',
    competition: 'T20 World Cup • Group B',
    team1: { name: 'PAK', full: 'Pakistan', score: null, overs: null, flag: '🇵🇰' },
    team2: { name: 'NZ', full: 'New Zealand', score: null, overs: null, flag: '🇳🇿' },
    image: 'https://images.unsplash.com/photo-1774168062292-479f413d3b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    viewers: null,
    venue: 'Nassau County Int\'l, New York',
    startTime: 'Starts in 2h 15m',
  },
]

export default function LiveMatchesSection() {
  return (
    <section id="matches" className="py-20 relative" style={{ background: 'hsl(220 20% 7%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-5 rounded-full" style={{ background: 'hsl(82 72% 44%)' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(82 72% 44%)' }}>
                Matches
              </span>
            </div>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 600, color: 'hsl(50 20% 95%)', letterSpacing: '-0.02em' }}>
              LIVE & UPCOMING
            </h2>
          </div>
          <a href="#schedule" className="text-sm font-medium transition-colors" style={{ color: 'hsl(82 72% 44%)' }}>
            View Schedule →
          </a>
        </div>

        {/* Match cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MATCHES.map((match, i) => (
            <div
              key={match.id}
              className="rounded-2xl overflow-hidden transition-all duration-300 group animate-fade-in-up"
              style={{
                background: 'hsl(220 18% 10%)',
                border: '1px solid hsl(220 15% 16%)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                animationDelay: `${i * 100}ms`,
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'hsl(82 72% 44% / 0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'hsl(220 15% 16%)')}
            >
              {/* Match thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={match.image}
                  alt={`${match.team1.name} vs ${match.team2.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 video-overlay" />

                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  {match.status === 'LIVE' ? (
                    <span className="live-dot flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(220,50,50,0.85)', color: '#fff' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                      LIVE
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(35,100,200,0.85)', color: '#fff' }}>
                      <Clock size={10} />
                      UPCOMING
                    </span>
                  )}
                </div>

                {/* Viewers */}
                {match.viewers && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                    style={{ background: 'rgba(10,13,20,0.75)', backdropFilter: 'blur(8px)', color: 'hsl(50 20% 75%)' }}>
                    <Users size={10} />
                    {match.viewers}
                  </div>
                )}

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(130,200,60,0.9)' }}>
                    <Play size={18} fill="black" className="ml-0.5" style={{ color: 'black' }} />
                  </div>
                </div>

                {/* Score overlay */}
                {match.team1.score && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between text-sm px-3 py-2 rounded-lg"
                      style={{ background: 'rgba(10,13,20,0.85)', backdropFilter: 'blur(8px)' }}>
                      <span style={{ color: 'hsl(50 20% 90%)', fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}>
                        {match.team1.name} {match.team1.score}
                      </span>
                      <span style={{ color: 'hsl(220 10% 50%)', fontSize: '0.7rem' }}>vs</span>
                      <span style={{ color: 'hsl(50 20% 75%)', fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}>
                        {match.team2.name} {match.team2.score}
                      </span>
                    </div>
                  </div>
                )}
                {match.startTime && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-center px-3 py-2 rounded-lg text-sm font-medium"
                      style={{ background: 'rgba(10,13,20,0.85)', backdropFilter: 'blur(8px)', color: 'hsl(35 100% 55%)' }}>
                      {match.startTime}
                    </div>
                  </div>
                )}
              </div>

              {/* Match info */}
              <div className="p-4">
                <div className="text-xs mb-2" style={{ color: 'hsl(82 72% 44%)' }}>{match.competition}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(50 20% 90%)' }}>
                    {match.team1.full}
                  </span>
                  <span style={{ color: 'hsl(220 10% 45%)' }}>vs</span>
                  <span className="text-base font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(50 20% 90%)' }}>
                    {match.team2.full}
                  </span>
                </div>
                <div className="text-xs" style={{ color: 'hsl(220 10% 50%)' }}>{match.venue}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

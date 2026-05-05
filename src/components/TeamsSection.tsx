import { TrendingUp, Award, Target } from 'lucide-react'

const TEAMS = [
  {
    code: 'IND',
    name: 'India',
    flag: 'https://images.unsplash.com/photo-1685541000777-8d0995d38909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    ranking: 1,
    wins: 18,
    losses: 4,
    points: 124,
    color: '#FF9933',
  },
  {
    code: 'AUS',
    name: 'Australia',
    flag: 'https://images.unsplash.com/photo-1685541000562-a00dcf472343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    ranking: 2,
    wins: 16,
    losses: 5,
    points: 112,
    color: '#FFDD00',
  },
  {
    code: 'ENG',
    name: 'England',
    flag: 'https://images.unsplash.com/photo-1685541000847-f764510e2175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    ranking: 3,
    wins: 14,
    losses: 7,
    points: 98,
    color: '#003399',
  },
  {
    code: 'SA',
    name: 'South Africa',
    flag: 'https://images.unsplash.com/photo-1706102005390-2d1f41fdddcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    ranking: 4,
    wins: 13,
    losses: 8,
    points: 88,
    color: '#007749',
  },
]

const TOP_PLAYERS = [
  { name: 'V. Kohli', country: 'India', role: 'Batsman', runs: 2847, avg: 54.8, image: 'https://images.unsplash.com/photo-1774167287506-704e630b3e6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400' },
  { name: 'P. Cummins', country: 'Australia', role: 'Bowler', wickets: 68, avg: 19.2, image: 'https://images.unsplash.com/photo-1774168062292-479f413d3b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400' },
  { name: 'B. Stokes', country: 'England', role: 'All-rounder', runs: 1540, wickets: 28, image: 'https://images.unsplash.com/photo-1763718627682-4dbc728064d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400' },
]

export default function TeamsSection() {
  return (
    <section id="teams" className="py-20" style={{ background: 'hsl(220 20% 7%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 rounded-full" style={{ background: 'hsl(35 100% 55%)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(35 100% 55%)' }}>
              Rankings
            </span>
          </div>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 600, color: 'hsl(50 20% 95%)', letterSpacing: '-0.02em' }}>
            TEAMS & PLAYERS
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* ICC Rankings */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: 'hsl(220 10% 55%)' }}>
              ICC ODI Rankings
            </h3>
            <div className="space-y-3">
              {TEAMS.map((team, i) => (
                <div
                  key={team.code}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group cursor-pointer animate-fade-in-up"
                  style={{
                    background: 'hsl(220 18% 10%)',
                    border: '1px solid hsl(220 15% 16%)',
                    animationDelay: `${i * 80}ms`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${team.color}40`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'hsl(220 15% 16%)')}
                >
                  {/* Rank */}
                  <div className="text-2xl font-bold w-8 text-center shrink-0"
                    style={{ fontFamily: 'Oswald, sans-serif', color: i === 0 ? 'hsl(35 100% 55%)' : 'hsl(220 10% 50%)' }}>
                    #{team.ranking}
                  </div>

                  {/* Team image */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0"
                    style={{ border: `2px solid ${team.color}40` }}>
                    <img src={team.flag} alt={team.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold" style={{ color: 'hsl(50 20% 90%)', fontFamily: 'Oswald, sans-serif' }}>
                      {team.name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'hsl(220 10% 50%)' }}>
                      W{team.wins} • L{team.losses}
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: team.color }}>
                      {team.points}
                    </div>
                    <div className="text-xs" style={{ color: 'hsl(220 10% 50%)' }}>pts</div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-16 shrink-0">
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(220 15% 18%)' }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(team.wins / (team.wins + team.losses)) * 100}%`, background: team.color }} />
                    </div>
                    <div className="text-xs mt-1 text-right" style={{ color: 'hsl(220 10% 50%)' }}>
                      {Math.round((team.wins / (team.wins + team.losses)) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Players */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: 'hsl(220 10% 55%)' }}>
              Top Performers
            </h3>
            <div className="space-y-4">
              {TOP_PLAYERS.map((player, i) => (
                <div
                  key={player.name}
                  className="rounded-2xl overflow-hidden animate-fade-in-up"
                  style={{
                    background: 'hsl(220 18% 10%)',
                    border: '1px solid hsl(220 15% 16%)',
                    animationDelay: `${i * 100 + 200}ms`,
                  }}
                >
                  <div className="flex gap-4 p-4">
                    {/* Player image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(50 20% 92%)' }}>
                        {player.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs px-1.5 py-0.5 rounded"
                          style={{ background: 'hsl(220 15% 16%)', color: 'hsl(35 100% 55%)' }}>
                          {player.role}
                        </span>
                        <span className="text-xs" style={{ color: 'hsl(220 10% 50%)' }}>{player.country}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {player.runs !== undefined && (
                          <div>
                            <div className="flex items-center gap-1 text-xs mb-0.5" style={{ color: 'hsl(220 10% 50%)' }}>
                              <TrendingUp size={10} /> Runs
                            </div>
                            <div className="text-xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(82 72% 44%)' }}>
                              {player.runs.toLocaleString()}
                            </div>
                          </div>
                        )}
                        {player.wickets !== undefined && (
                          <div>
                            <div className="flex items-center gap-1 text-xs mb-0.5" style={{ color: 'hsl(220 10% 50%)' }}>
                              <Target size={10} /> Wickets
                            </div>
                            <div className="text-xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(35 100% 55%)' }}>
                              {player.wickets}
                            </div>
                          </div>
                        )}
                        {player.avg !== undefined && (
                          <div>
                            <div className="flex items-center gap-1 text-xs mb-0.5" style={{ color: 'hsl(220 10% 50%)' }}>
                              <Award size={10} /> Average
                            </div>
                            <div className="text-xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(200 80% 55%)' }}>
                              {player.avg}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

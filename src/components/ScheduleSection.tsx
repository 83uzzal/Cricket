import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react'

const SCHEDULE = [
  {
    id: 1,
    date: 'Mar 27',
    day: 'Thu',
    time: '14:00 IST',
    competition: 'ICC World Cup',
    team1: { code: 'IND', name: 'India' },
    team2: { code: 'AUS', name: 'Australia' },
    venue: 'Eden Gardens, Kolkata',
    format: 'ODI',
    status: 'TODAY',
  },
  {
    id: 2,
    date: 'Mar 28',
    day: 'Fri',
    time: '19:30 IST',
    competition: 'IPL 2024',
    team1: { code: 'RCB', name: 'Royal Challengers' },
    team2: { code: 'DC', name: 'Delhi Capitals' },
    venue: 'M. Chinnaswamy, Bengaluru',
    format: 'T20',
    status: 'TOMORROW',
  },
  {
    id: 3,
    date: 'Mar 29',
    day: 'Sat',
    time: '09:30 GMT',
    competition: 'The Ashes',
    team1: { code: 'ENG', name: 'England' },
    team2: { code: 'AUS', name: 'Australia' },
    venue: 'Lord\'s, London',
    format: 'TEST',
    status: null,
  },
  {
    id: 4,
    date: 'Mar 30',
    day: 'Sun',
    time: '15:00 IST',
    competition: 'IPL 2024',
    team1: { code: 'MI', name: 'Mumbai Indians' },
    team2: { code: 'KKR', name: 'Kolkata KR' },
    venue: 'Wankhede Stadium, Mumbai',
    format: 'T20',
    status: null,
  },
  {
    id: 5,
    date: 'Mar 31',
    day: 'Mon',
    time: '10:00 NZST',
    competition: 'T20 Series',
    team1: { code: 'NZ', name: 'New Zealand' },
    team2: { code: 'SA', name: 'South Africa' },
    venue: 'Eden Park, Auckland',
    format: 'T20',
    status: null,
  },
]

const FORMAT_COLORS: Record<string, string> = {
  ODI: 'hsl(82 72% 44%)',
  T20: 'hsl(35 100% 55%)',
  TEST: 'hsl(200 80% 55%)',
}

export default function ScheduleSection() {
  return (
    <section id="schedule" className="py-20" style={{ background: 'hsl(220 20% 6%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-5 rounded-full" style={{ background: 'hsl(82 72% 44%)' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(82 72% 44%)' }}>
                Fixtures
              </span>
            </div>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 600, color: 'hsl(50 20% 95%)', letterSpacing: '-0.02em' }}>
              MATCH SCHEDULE
            </h2>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm font-medium" style={{ color: 'hsl(82 72% 44%)' }}>
            Full Calendar <ChevronRight size={16} />
          </a>
        </div>

        {/* Schedule list */}
        <div className="space-y-3">
          {SCHEDULE.map((match, i) => (
            <div
              key={match.id}
              className="rounded-xl overflow-hidden transition-all duration-200 animate-fade-in-up group cursor-pointer"
              style={{
                background: 'hsl(220 18% 10%)',
                border: '1px solid hsl(220 15% 16%)',
                animationDelay: `${i * 80}ms`,
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'hsl(82 72% 44% / 0.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'hsl(220 15% 16%)')}
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Date block */}
                <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0 sm:w-16 sm:text-center shrink-0">
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(50 20% 90%)' }}>
                    {match.date.split(' ')[1]}
                  </div>
                  <div className="text-xs uppercase" style={{ color: 'hsl(220 10% 50%)' }}>
                    {match.day} {match.date.split(' ')[0]}
                  </div>
                  {match.status && (
                    <span className="sm:mt-2 px-2 py-0.5 rounded text-xs font-bold"
                      style={{
                        background: match.status === 'TODAY' ? 'rgba(130,200,60,0.2)' : 'rgba(35,150,200,0.2)',
                        color: match.status === 'TODAY' ? 'hsl(82 72% 44%)' : 'hsl(200 80% 55%)',
                        border: `1px solid ${match.status === 'TODAY' ? 'rgba(130,200,60,0.3)' : 'rgba(35,150,200,0.3)'}`,
                      }}>
                      {match.status}
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px self-stretch" style={{ background: 'hsl(220 15% 18%)' }} />

                {/* Teams */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded"
                      style={{ background: 'rgba(0,0,0,0.3)', color: FORMAT_COLORS[match.format], border: `1px solid ${FORMAT_COLORS[match.format]}40` }}>
                      {match.format}
                    </span>
                    <span className="text-xs" style={{ color: 'hsl(220 10% 50%)' }}>{match.competition}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(50 20% 92%)' }}>
                      {match.team1.name}
                    </span>
                    <span className="text-sm font-bold" style={{ color: 'hsl(220 10% 40%)' }}>VS</span>
                    <span className="text-lg font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(50 20% 92%)' }}>
                      {match.team2.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'hsl(220 10% 50%)' }}>
                      <MapPin size={10} /> {match.venue}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'hsl(220 10% 50%)' }}>
                      <Clock size={10} /> {match.time}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center gap-2 shrink-0">
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
                    style={{
                      background: match.status === 'TODAY' ? 'hsl(82 72% 44%)' : 'hsl(220 15% 16%)',
                      color: match.status === 'TODAY' ? 'hsl(220 20% 7%)' : 'hsl(50 20% 70%)',
                      border: '1px solid hsl(220 15% 22%)',
                    }}>
                    <Calendar size={13} />
                    {match.status === 'TODAY' ? 'Watch Now' : 'Set Reminder'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

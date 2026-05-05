import { useState } from 'react'
import { Play, Clock, Eye, ChevronRight } from 'lucide-react'

const VIDEOS = [
  {
    id: 1,
    title: 'Kohli\'s Masterclass 89 off 72 balls',
    duration: '4:32',
    views: '2.8M',
    thumb: 'https://images.unsplash.com/photo-1685541000562-a00dcf472343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Batting',
    featured: true,
  },
  {
    id: 2,
    title: 'Cummins Takes 5 Wickets in Devastating Spell',
    duration: '6:15',
    views: '1.5M',
    thumb: 'https://images.unsplash.com/photo-1706102005390-2d1f41fdddcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Bowling',
    featured: false,
  },
  {
    id: 3,
    title: 'Best Catches of IPL 2024 – Top 10',
    duration: '8:47',
    views: '4.2M',
    thumb: 'https://images.unsplash.com/photo-1685541000777-8d0995d38909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Fielding',
    featured: false,
  },
  {
    id: 4,
    title: 'Last Over Thriller — 12 Needed Off 1',
    duration: '3:18',
    views: '6.1M',
    thumb: 'https://images.unsplash.com/photo-1685541000847-f764510e2175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Moments',
    featured: false,
  },
  {
    id: 5,
    title: 'Six Sixes in an Over — Historic Moment',
    duration: '2:04',
    views: '9.3M',
    thumb: 'https://images.unsplash.com/photo-1765943908190-291ca22e115b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Records',
    featured: false,
  },
]

const CATEGORIES = ['All', 'Batting', 'Bowling', 'Fielding', 'Moments', 'Records']

export default function HighlightsSection() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? VIDEOS : VIDEOS.filter(v => v.category === activeCategory)
  const featured = VIDEOS.find(v => v.featured)
  const rest = filtered.filter(v => !v.featured)

  return (
    <section id="highlights" className="py-20" style={{ background: 'hsl(220 20% 6%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-5 rounded-full" style={{ background: 'hsl(35 100% 55%)' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(35 100% 55%)' }}>
                Videos
              </span>
            </div>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 600, color: 'hsl(50 20% 95%)', letterSpacing: '-0.02em' }}>
              MATCH HIGHLIGHTS
            </h2>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm font-medium" style={{ color: 'hsl(35 100% 55%)' }}>
            View All Videos <ChevronRight size={16} />
          </a>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shrink-0"
              style={{
                background: activeCategory === cat ? 'hsl(35 100% 55%)' : 'hsl(220 15% 14%)',
                color: activeCategory === cat ? 'hsl(220 20% 7%)' : 'hsl(220 10% 60%)',
                border: `1px solid ${activeCategory === cat ? 'hsl(35 100% 55%)' : 'hsl(220 15% 20%)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured video + grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured */}
          {featured && (
            <div className="lg:col-span-2 rounded-2xl overflow-hidden group cursor-pointer"
              style={{ background: 'hsl(220 18% 10%)', border: '1px solid hsl(220 15% 16%)' }}>
              <div className="relative aspect-video overflow-hidden">
                <img src={featured.thumb} alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 video-overlay" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(35,150,200,0.9)' }}>
                    <Play size={24} fill="white" className="ml-1" style={{ color: 'white' }} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-2 py-0.5 rounded text-xs font-semibold mb-2 inline-block"
                    style={{ background: 'hsl(35 100% 55%)', color: 'hsl(220 20% 7%)' }}>
                    {featured.category}
                  </span>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(50 20% 95%)' }}>
                    {featured.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: 'hsl(220 10% 60%)' }}>
                    <span className="flex items-center gap-1"><Clock size={10} /> {featured.duration}</span>
                    <span className="flex items-center gap-1"><Eye size={10} /> {featured.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video list */}
          <div className="space-y-3">
            {rest.slice(0, 4).map((video, i) => (
              <div
                key={video.id}
                className="flex gap-3 rounded-xl overflow-hidden group cursor-pointer transition-all duration-200 p-3"
                style={{
                  background: 'hsl(220 18% 10%)',
                  border: '1px solid hsl(220 15% 16%)',
                  animationDelay: `${i * 80}ms`,
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'hsl(35 100% 55% / 0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'hsl(220 15% 16%)')}
              >
                {/* Thumbnail */}
                <div className="relative w-28 shrink-0 rounded-lg overflow-hidden aspect-video">
                  <img src={video.thumb} alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={14} fill="white" style={{ color: 'white' }} />
                  </div>
                  <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-xs"
                    style={{ background: 'rgba(0,0,0,0.8)', color: 'hsl(50 20% 85%)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem' }}>
                    {video.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 py-0.5">
                  <span className="text-xs font-medium" style={{ color: 'hsl(35 100% 55%)' }}>{video.category}</span>
                  <p className="text-sm font-semibold mt-0.5 line-clamp-2" style={{ color: 'hsl(50 20% 88%)' }}>
                    {video.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: 'hsl(220 10% 50%)' }}>
                    <span className="flex items-center gap-1"><Eye size={9} /> {video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

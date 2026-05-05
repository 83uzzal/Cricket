import { useState } from 'react'
import { ZoomIn, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'

const GALLERY_IMAGES = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1774199741529-0e33dc3b8bdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    thumb: 'https://images.unsplash.com/photo-1774199741529-0e33dc3b8bdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    caption: 'Arun Jaitley Stadium — Empty seats before the big match',
    category: 'Stadiums',
    span: 'col-span-2',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1774167287506-704e630b3e6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    thumb: 'https://images.unsplash.com/photo-1774167287506-704e630b3e6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    caption: 'Packed stands as fans witness history',
    category: 'Crowd',
    span: '',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1774167766179-e6242efa2dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    thumb: 'https://images.unsplash.com/photo-1774167766179-e6242efa2dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    caption: 'Aerial panorama of the cricket oval',
    category: 'Aerial',
    span: '',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1763718627682-4dbc728064d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    thumb: 'https://images.unsplash.com/photo-1763718627682-4dbc728064d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    caption: 'Fans in the stands cheering their team',
    category: 'Crowd',
    span: '',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1750716413349-df33aeca8429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    thumb: 'https://images.unsplash.com/photo-1750716413349-df33aeca8429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    caption: 'Wankhede Stadium — Home of Mumbai Indians',
    category: 'Stadiums',
    span: '',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1765943908190-291ca22e115b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    thumb: 'https://images.unsplash.com/photo-1765943908190-291ca22e115b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    caption: 'Powerful batting shot — lush green outfield',
    category: 'Action',
    span: 'col-span-2',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1685541000777-8d0995d38909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    thumb: 'https://images.unsplash.com/photo-1685541000777-8d0995d38909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    caption: 'Players in the middle during tense moments',
    category: 'Action',
    span: '',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1685541000562-a00dcf472343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    thumb: 'https://images.unsplash.com/photo-1685541000562-a00dcf472343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    caption: 'Mid-wicket conference between batsmen',
    category: 'Action',
    span: '',
  },
]

const CATEGORIES = ['All', 'Stadiums', 'Action', 'Crowd', 'Aerial']

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = activeCategory === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === activeCategory)

  const openLightbox = (id: number) => setLightbox(id)
  const closeLightbox = () => setLightbox(null)

  const currentIndex = lightbox !== null ? filtered.findIndex(img => img.id === lightbox) : -1

  const prev = () => {
    if (currentIndex > 0) setLightbox(filtered[currentIndex - 1].id)
    else setLightbox(filtered[filtered.length - 1].id)
  }
  const next = () => {
    if (currentIndex < filtered.length - 1) setLightbox(filtered[currentIndex + 1].id)
    else setLightbox(filtered[0].id)
  }

  const currentImage = lightbox !== null ? filtered.find(img => img.id === lightbox) : null

  return (
    <section id="gallery" className="py-20 relative" style={{ background: 'hsl(220 20% 7%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-5 rounded-full" style={{ background: 'hsl(200 80% 55%)' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(200 80% 55%)' }}>
                Photos
              </span>
            </div>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 600, color: 'hsl(50 20% 95%)', letterSpacing: '-0.02em' }}>
              PHOTO GALLERY
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-sm" style={{ color: 'hsl(220 10% 50%)' }}>
            <Camera size={14} />
            <span>{GALLERY_IMAGES.length} photos</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shrink-0"
              style={{
                background: activeCategory === cat ? 'hsl(200 80% 55%)' : 'hsl(220 15% 14%)',
                color: activeCategory === cat ? 'hsl(220 20% 7%)' : 'hsl(220 10% 60%)',
                border: `1px solid ${activeCategory === cat ? 'hsl(200 80% 55%)' : 'hsl(220 15% 20%)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              onClick={() => openLightbox(img.id)}
              className={`relative rounded-xl overflow-hidden group cursor-pointer animate-fade-in-up ${img.span}`}
              style={{
                animationDelay: `${i * 60}ms`,
                aspectRatio: img.span ? '2/1' : '4/3',
              }}
            >
              <img
                src={img.thumb}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{ background: 'hsl(200 80% 55%)', color: 'hsl(220 20% 7%)' }}>
                  {img.category}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                  <ZoomIn size={16} style={{ color: 'white' }} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: 'linear-gradient(to top, rgba(10,13,20,0.9), transparent)' }}>
                <p className="text-xs font-medium line-clamp-1" style={{ color: 'hsl(50 20% 90%)' }}>{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && currentImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={closeLightbox}>
          <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full z-10 transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            onClick={closeLightbox}>
            <X size={20} />
          </button>
          <button className="absolute left-4 w-10 h-10 flex items-center justify-center rounded-full z-10 transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            onClick={e => { e.stopPropagation(); prev() }}>
            <ChevronLeft size={20} />
          </button>
          <button className="absolute right-4 w-10 h-10 flex items-center justify-center rounded-full z-10 transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            onClick={e => { e.stopPropagation(); next() }}>
            <ChevronRight size={20} />
          </button>
          <div className="max-w-4xl mx-4 w-full" onClick={e => e.stopPropagation()}>
            <img src={currentImage.src} alt={currentImage.caption}
              className="w-full rounded-xl object-contain max-h-[80vh]" />
            <div className="mt-3 text-center">
              <p className="text-sm font-medium" style={{ color: 'hsl(50 20% 80%)' }}>{currentImage.caption}</p>
              <p className="text-xs mt-1" style={{ color: 'hsl(220 10% 50%)' }}>{currentIndex + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

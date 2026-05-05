import { useState, useRef, useEffect } from 'react'
import Hls from 'hls.js'
import { Play, Pause, Volume2, VolumeX, Maximize, Radio, TrendingUp, Users, Loader2, AlertCircle } from 'lucide-react'

const HERO_BG = 'https://images.unsplash.com/photo-1774168062292-479f413d3b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'

// ✏️  UPDATE STREAM LINK HERE — just replace the RAW_STREAM_URL string below
const RAW_STREAM_URL = 'https://dz2.bhalocast.com:7059/hls/geosp.m3u8?md5=r3qhJQDWhdIxG1PZa40OCw&expires=1774611729&ch=geosp&s=49d1c83ea3b86d8b731b0649dbd359d6'

// Optional proxy URL to bypass CORS / mixed-content
const PROXY_BASE = import.meta.env.VITE_STREAM_PROXY_URL || ''
const STREAM_URL = PROXY_BASE ? `${PROXY_BASE}?url=${encodeURIComponent(RAW_STREAM_URL)}` : RAW_STREAM_URL

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [levels, setLevels] = useState<{ height: number; bitrate: number }[]>([])
  const [currentLevel, setCurrentLevel] = useState(-1)

  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }
    }
  }, [])

  const initPlayer = () => {
    const video = videoRef.current
    if (!video) return

    setLoading(true)
    setError(null)

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        manifestLoadingMaxRetry: 6,
        manifestLoadingRetryDelay: 2000,
        levelLoadingMaxRetry: 6,
        levelLoadingRetryDelay: 2000,
        fragLoadingMaxRetry: 6,
        fragLoadingRetryDelay: 2000,
        xhrSetup: (xhr: XMLHttpRequest) => {
          xhr.withCredentials = false
        },
      })
      hlsRef.current = hls
      hls.loadSource(STREAM_URL)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, (_e, data) => {
        setLevels(data.levels.map((l: { height: number; bitrate: number }) => ({ height: l.height, bitrate: l.bitrate })))
        setCurrentLevel(hls.currentLevel)
        setLoading(false)
        video.muted = muted
        video.play().catch(() => {
          // autoplay blocked – user needs to tap
          setPlaying(false)
        })
        setPlaying(true)
      })
      hls.on(Hls.Events.ERROR, (_e, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // Try to recover from network errors (CORS / mixed-content / timeout)
              hls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError()
              break
            default:
              setLoading(false)
              setError('Stream unavailable — check if the link is still active.')
              break
          }
        }
      })
      hls.on(Hls.Events.LEVEL_SWITCHED, (_e, data) => {
        setCurrentLevel(data.level)
      })

      // Fallback timeout – if nothing loads in 25s, show friendly message
      setTimeout(() => {
        if (video && (!video.readyState || video.readyState < 2)) {
          setLoading(false)
          setError((prev) => prev || 'Cannot connect to stream. Open in a new tab or check the link.')
        }
      }, 25000)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS (Safari / iOS)
      video.src = STREAM_URL
      video.addEventListener('loadedmetadata', () => {
        setLoading(false)
        video.muted = muted
        video.play().catch(() => setPlaying(false))
        setPlaying(true)
      })
      video.addEventListener('error', () => {
        setLoading(false)
        setError('Stream unavailable — open in a new tab to verify.')
      })
    } else {
      setLoading(false)
      setError('HLS playback is not supported in this browser.')
    }
  }

  const handlePlay = () => {
    if (!started) {
      setStarted(true)
      initPlayer()
      return
    }
    const video = videoRef.current
    if (!video) return
    if (playing) {
      video.pause()
      setPlaying(false)
    } else {
      video.play()
      setPlaying(true)
    }
  }

  const handleMute = () => {
    const video = videoRef.current
    if (video) video.muted = !muted
    setMuted(m => !m)
  }

  const handleFullscreen = () => {
    const el = containerRef.current
    if (!el) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      el.requestFullscreen()
    }
  }

  const qualityLabel = () => {
    if (!levels.length || currentLevel < 0) return 'AUTO'
    const l = levels[currentLevel]
    if (!l) return 'AUTO'
    return l.height ? `${l.height}p` : 'AUTO'
  }

  return (
    <section id="live" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Cricket stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(10,13,20,1) 0%, rgba(10,13,20,0.7) 40%, rgba(10,13,20,0.3) 80%, rgba(10,13,20,0.15) 100%)'
        }} />
        <div className="absolute inset-0 grass-texture" />
      </div>

      {/* Floating stats bar */}
      <div className="absolute top-24 left-4 right-4 md:left-8 md:right-8 z-10">
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {[
            { label: 'Viewers', value: '2.4M', icon: <Users size={12} /> },
            { label: 'Matches Live', value: '3', icon: <Radio size={12} /> },
            { label: 'Today\'s Sixes', value: '48', icon: <TrendingUp size={12} /> },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs shrink-0"
              style={{ background: 'rgba(10,13,20,0.7)', backdropFilter: 'blur(8px)', border: '1px solid hsl(220 15% 22%)', color: 'hsl(50 20% 85%)' }}>
              <span style={{ color: 'hsl(82 72% 44%)' }}>{stat.icon}</span>
              <span className="font-semibold">{stat.value}</span>
              <span style={{ color: 'hsl(220 10% 55%)' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main stream player */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <div className="grid lg:grid-cols-3 gap-6 items-end">
          {/* Stream window */}
          <div className="lg:col-span-2">
            {/* Match title */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="live-dot inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(220,50,50,0.2)', border: '1px solid rgba(220,50,50,0.4)', color: '#ef4444' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                  LIVE
                </span>
                <span className="text-xs" style={{ color: 'hsl(220 10% 55%)' }}>Geo Super • Live Stream</span>
              </div>
              <h1 style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                fontWeight: 700,
                color: 'hsl(50 20% 95%)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}>
                GEO SUPER <span style={{ color: 'hsl(82 72% 44%)' }}>—</span> LIVE
              </h1>
            </div>

            {/* Video player */}
            <div
              ref={containerRef}
              className="relative rounded-xl overflow-hidden aspect-video"
              style={{ border: '1px solid hsl(220 15% 20%)', boxShadow: '0 0 40px rgba(0,0,0,0.6)', background: '#000' }}
            >
              {/* Actual HLS video element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted={muted}
                style={{ display: started ? 'block' : 'none' }}
              />

              {/* Poster image (before play) */}
              {!started && (
                <img
                  src="https://images.unsplash.com/photo-1774167287506-704e630b3e6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Live match"
                  className="w-full h-full object-cover"
                />
              )}

              {/* Gradient overlay */}
              {!started && <div className="absolute inset-0 video-overlay" />}

              {/* Loading spinner */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <Loader2 size={36} className="animate-spin" style={{ color: 'hsl(82 72% 44%)' }} />
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3 px-6 text-center">
                  <AlertCircle size={32} style={{ color: '#ef4444' }} />
                  <p className="text-sm font-medium" style={{ color: 'hsl(50 20% 80%)' }}>{error}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setError(null); setStarted(false); setPlaying(false); if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null } }}
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                      style={{ background: 'hsl(82 72% 44%)', color: 'black' }}>
                      Retry
                    </button>
                    <a
                      href={RAW_STREAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                      style={{ background: 'hsl(220 15% 18%)', color: 'hsl(50 20% 80%)', border: '1px solid hsl(220 15% 24%)' }}>
                      Open in New Tab
                    </a>
                  </div>
                </div>
              )}

              {/* Centre play button (idle) */}
              {!loading && !error && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center group"
                  style={{ display: playing ? 'none' : 'flex' }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(130,200,60,0.9)', backdropFilter: 'blur(8px)' }}>
                    <Play size={24} fill="black" className="ml-1" style={{ color: 'black' }} />
                  </div>
                  {!started && (
                    <div className="absolute bottom-12 text-sm font-medium px-3 py-1 rounded-full"
                      style={{ background: 'rgba(10,13,20,0.8)', color: 'hsl(50 20% 80%)' }}>
                      Click to start live stream
                    </div>
                  )}
                </button>
              )}

              {/* Score overlay (top) */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
                <div className="px-3 py-2 rounded-lg text-sm font-bold"
                  style={{ background: 'rgba(10,13,20,0.85)', backdropFilter: 'blur(8px)', fontFamily: 'Oswald, sans-serif' }}>
                  <span style={{ color: 'hsl(50 20% 90%)' }}>IND </span>
                  <span className="score-flash text-xl" style={{ color: 'hsl(82 72% 44%)' }}>287/6</span>
                  <span style={{ color: 'hsl(220 10% 55%)' }}> (45.2)</span>
                </div>
                <div className="px-3 py-2 rounded-lg text-sm"
                  style={{ background: 'rgba(10,13,20,0.85)', backdropFilter: 'blur(8px)' }}>
                  <span style={{ color: 'hsl(50 20% 90%)' }}>AUS </span>
                  <span className="text-xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'hsl(50 20% 75%)' }}>—</span>
                </div>
              </div>

              {/* Controls (bottom) */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* Play/Pause */}
                  {started && !loading && !error && (
                    <button
                      onClick={handlePlay}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{ background: 'rgba(10,13,20,0.7)', color: 'hsl(50 20% 80%)' }}>
                      {playing ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                  )}
                  {/* Mute */}
                  <button
                    onClick={handleMute}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: 'rgba(10,13,20,0.7)', color: 'hsl(50 20% 80%)' }}>
                    {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  {/* Quality badge */}
                  <div className="text-xs px-2 py-1 rounded"
                    style={{ background: 'rgba(10,13,20,0.7)', color: 'hsl(82 72% 44%)', fontFamily: 'IBM Plex Mono, monospace' }}>
                    {started ? qualityLabel() : 'HLS'}
                  </div>
                </div>
                <button onClick={handleFullscreen} className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(10,13,20,0.7)', color: 'hsl(50 20% 80%)' }}>
                  <Maximize size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Live scorecard sidebar */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(220 10% 50%)' }}>
              Live Scorecard
            </h3>
            {/* Batsmen */}
            <div className="rounded-xl p-4 space-y-3"
              style={{ background: 'rgba(10,13,20,0.85)', backdropFilter: 'blur(12px)', border: '1px solid hsl(220 15% 20%)' }}>
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(82 72% 44%)' }}>Batting</div>
              {[
                { name: 'V. Kohli', runs: 89, balls: 72, sr: '123.6', active: true },
                { name: 'KL Rahul', runs: 54, balls: 48, sr: '112.5', active: true },
              ].map(b => (
                <div key={b.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {b.active && <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />}
                    <span style={{ color: 'hsl(50 20% 90%)' }}>{b.name}</span>
                  </div>
                  <div className="flex items-center gap-3" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.8rem' }}>
                    <span className="font-bold" style={{ color: 'hsl(82 72% 44%)' }}>{b.runs}</span>
                    <span style={{ color: 'hsl(220 10% 50%)' }}>({b.balls})</span>
                    <span style={{ color: 'hsl(220 10% 45%)' }}>{b.sr}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bowler */}
            <div className="rounded-xl p-4"
              style={{ background: 'rgba(10,13,20,0.85)', backdropFilter: 'blur(12px)', border: '1px solid hsl(220 15% 20%)' }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'hsl(35 100% 55%)' }}>Bowling</div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: 'hsl(50 20% 90%)' }}>P. Cummins</span>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.8rem', color: 'hsl(35 100% 55%)' }}>
                  9-1-52-2
                </span>
              </div>
            </div>

            {/* Recent balls */}
            <div className="rounded-xl p-4"
              style={{ background: 'rgba(10,13,20,0.85)', backdropFilter: 'blur(12px)', border: '1px solid hsl(220 15% 20%)' }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'hsl(220 10% 50%)' }}>This Over</div>
              <div className="flex items-center gap-2">
                {['1', '4', 'W', '0', '6', '2'].map((ball, i) => (
                  <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: ball === 'W' ? 'rgba(220,50,50,0.2)' : ball === '6' ? 'rgba(130,200,60,0.2)' : ball === '4' ? 'rgba(35,150,200,0.2)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${ball === 'W' ? 'rgba(220,50,50,0.4)' : ball === '6' ? 'rgba(130,200,60,0.4)' : ball === '4' ? 'rgba(35,150,200,0.4)' : 'hsl(220 15% 22%)'}`,
                      color: ball === 'W' ? '#ef4444' : ball === '6' ? 'hsl(82 72% 44%)' : ball === '4' ? '#60a5fa' : 'hsl(50 20% 70%)',
                    }}>
                    {ball}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export default function FooterAd() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      if (containerRef.current?.querySelector('.adsbygoogle')) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch {
      // Ignore ad blocker / duplicate init errors
    }
  }, [])

  return (
    <section className="px-4 py-6" style={{ background: 'hsl(220 20% 7%)' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: 'hsl(220 10% 38%)' }}>
          Advertisement
        </div>
        <div
          ref={containerRef}
          className="overflow-hidden rounded-xl border p-2"
          style={{
            minHeight: '98px',
            borderColor: 'hsl(220 15% 14%)',
            background: 'hsl(220 22% 5%)',
          }}
        >
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minHeight: '90px', width: '100%' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="7777777777"
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </section>
  )
}

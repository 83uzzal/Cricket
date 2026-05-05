import { useEffect, useRef } from 'react'

export default function NativeBannerAd() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || container.dataset.loaded === 'true') return

    container.dataset.loaded = 'true'
    container.innerHTML = ''

    const target = document.createElement('div')
    target.id = 'container-088f78ae1a9a8ac91b28e8d69fb71acc'

    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-cfasync', 'false')
    script.src = 'https://pl28852010.effectivegatecpm.com/088f78ae1a9a8ac91b28e8d69fb71acc/invoke.js'

    container.appendChild(target)
    container.appendChild(script)
  }, [])

  return (
    <section className="px-4 py-6" style={{ background: 'hsl(220 20% 7%)' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: 'hsl(220 10% 38%)' }}>
          Sponsored
        </div>
        <div
          ref={containerRef}
          className="overflow-hidden rounded-xl border p-3"
          style={{
            minHeight: '120px',
            borderColor: 'hsl(220 15% 14%)',
            background: 'hsl(220 22% 5%)',
          }}
        />
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'

let adCounter = 0

// AdBanner — dynamically injects Adsterra native banner between sections
// Each instance gets a unique container id so the ad network can render into it
export default function AdBanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(`ad-container-${++adCounter}`)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (container.querySelector('script')) return

    // Create the target div Adsterra expects
    const atContainer = document.createElement('div')
    atContainer.id = idRef.current
    container.appendChild(atContainer)

    // Inject the invoke script — Adsterra native banner
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `
      (function(d,z,s){s.src='https://pl28852010.effectivegatecpm.com/088f78ae1a9a8ac91b28e8d69fb71acc/invoke.js';try{(document.body||document.documentElement).appendChild(s)}catch(e){}})
      (document,0,document.createElement('script'));
    `
    container.appendChild(script)

    // Also inject a 468x60 banner ad (highperformanceformat)
    const bannerDiv = document.createElement('div')
    bannerDiv.style.textAlign = 'center'
    bannerDiv.style.marginTop = '8px'
    bannerDiv.innerHTML = `<div id="container-0430ba3a1f1f44580691c4c33ac229f9"></div>`
    container.appendChild(bannerDiv)

    const bannerScript = document.createElement('script')
    bannerScript.async = true
    bannerScript.setAttribute('data-cfasync', 'false')
    bannerScript.src = 'https://www.highperformanceformat.com/0430ba3a1f1f44580691c4c33ac229f9/invoke.js'
    container.appendChild(bannerScript)
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center py-3 px-4"
      style={{
        background: 'hsl(220 22% 5%)',
        borderTop: '1px solid hsl(220 15% 11%)',
        borderBottom: '1px solid hsl(220 15% 11%)',
        minHeight: '90px',
        overflow: 'hidden',
      }}
    >
      <span className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'hsl(220 10% 30%)' }}>
        Advertisement
      </span>
    </div>
  )
}

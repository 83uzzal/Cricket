import { useEffect, useRef } from 'react'

export default function TopBannerAd() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || container.dataset.loaded === 'true') return

    container.dataset.loaded = 'true'
    container.innerHTML = ''

    const configScript = document.createElement('script')
    configScript.type = 'text/javascript'
    configScript.text = `
      atOptions = {
        'key'    : '0430ba3a1f1f44580691c4c33ac229f9',
        'format' : 'iframe',
        'height' : 60,
        'width'  : 468,
        'params' : {}
      };
    `

    const invokeScript = document.createElement('script')
    invokeScript.type = 'text/javascript'
    invokeScript.src = 'https://www.highperformanceformat.com/0430ba3a1f1f44580691c4c33ac229f9/invoke.js'

    container.appendChild(configScript)
    container.appendChild(invokeScript)
  }, [])

  return (
    <div className="w-full px-4 pt-20 pb-4" style={{ background: 'hsl(220 20% 7%)' }}>
      <div className="mx-auto flex max-w-7xl justify-center">
        <div
          ref={containerRef}
          className="flex min-h-[60px] items-center justify-center overflow-hidden rounded-lg border px-2 py-2"
          style={{
            width: '100%',
            maxWidth: '500px',
            borderColor: 'hsl(220 15% 14%)',
            background: 'hsl(220 22% 5%)',
          }}
        />
      </div>
    </div>
  )
}

import React from 'react'

interface ShellProps {
  sidebar: React.ReactNode
  appName?: string
  children: React.ReactNode
}

export function Shell({ sidebar, appName = 'App', children }: ShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground md:grid md:grid-cols-[280px_1fr]">
      <aside className="hidden border-r border-border bg-card md:block">
        {sidebar}
      </aside>

      <main>
        <div className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background px-4 md:hidden">
          <span className="font-semibold text-sm">{appName}</span>
        </div>
        {children}
      </main>
    </div>
  )
}

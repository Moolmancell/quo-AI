// src/mocks/MSWProvider.tsx
'use client'
import { useEffect, useState } from 'react'

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mockingEnabled, setMockingEnabled] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('./browser').then(async ({ worker }) => {
        await worker.start({ onUnhandledRequest: 'bypass' })
        setMockingEnabled(true)
      })
    } else {
      setMockingEnabled(true)
    }
  }, [])

  if (!mockingEnabled) return null // Prevent flash of real data
  return <>{children}</>
}
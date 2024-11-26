'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Particles } from '@/components/ui/particles'

export function ParticlesDemo() {
  const { theme } = useTheme()
  const [color, setColor] = useState('#ffffff')

  useEffect(() => {
    setColor(theme === 'dark' ? '#ffffff' : '#000000')
  }, [theme])

  return (
    <Particles
      className="absolute -z-10 inset-0"
      quantity={400}
      ease={80}
      color={color}
      refresh
    />
  )
}

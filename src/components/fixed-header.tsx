'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import { Header } from './header'

export const FixedHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div
      className={`desktop:fixed top-0 left-0 right-0 z-50 py-2 px-4 desktop:px-0 transition-all duration-300 ${isScrolled ? 'bg-background shadow-md' : 'bg-transparent'}`}
    >
      <Header />
    </div>
  )
}

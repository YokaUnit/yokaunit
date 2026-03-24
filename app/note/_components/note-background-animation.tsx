"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Particle = {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

export function NoteBackgroundAnimation() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const particleCount = Math.min(Math.floor(windowSize.width / 20), 70)
    const colors = ["#d1fae5", "#bbf7d0", "#a7f3d0", "#ccfbf1", "#dcfce7"]
    const nextParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      nextParticles.push({
        id: i,
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        size: Math.random() * 48 + 14,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 16,
        delay: Math.random() * 5,
      })
    }

    setParticles(nextParticles)
  }, [windowSize])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-[0.24]"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            x: [0, Math.random() * 90 - 45, Math.random() * 90 - 45, 0],
            y: [0, Math.random() * 90 - 45, Math.random() * 90 - 45, 0],
            scale: [1, Math.random() * 0.25 + 0.85, Math.random() * 0.25 + 0.85, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

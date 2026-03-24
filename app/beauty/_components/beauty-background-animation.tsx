"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

// Beauty向けの背景アニメーション（赤・ピンク系）
export function BeautyBackgroundAnimation() {
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
    const particleCount = Math.min(Math.floor(windowSize.width / 32), 42)

    const newParticles: Particle[] = []
    const colors = ["#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48"]

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        size: Math.random() * 60 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
      })
    }

    setParticles(newParticles)
  }, [windowSize])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: 0.16,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            scale: [1, Math.random() * 0.3 + 0.8, Math.random() * 0.3 + 0.8, 1],
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


"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import type { Ball } from "./glass-ball"
import type { BadgeConfig } from "../types/badge-config"

interface BadgeProps {
  x: any
  y: any
  rotation: any
  isMobile: boolean
  handlePointerDown: (e: React.PointerEvent) => void
  holeX: any
  holeY: any
  stringWidth: any
  stringColor: any
  anchor: { x: number; y: number }
  config: BadgeConfig
}

export default function Badge({
  x,
  y,
  rotation,
  isMobile,
  handlePointerDown,
  holeX,
  holeY,
  stringWidth,
  stringColor,
  anchor,
  config,
}: BadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null)
  const ballsContainerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const ballsRef = useRef<Ball[]>([])
  const containerSizeRef = useRef({ width: 0, height: 0 })
  const velocityXRef = useRef(0)
  const velocityYRef = useRef(0)
  const lastRotation = useRef(0)
  const [balls, setBalls] = useState<Ball[]>([])
  const scrollVelocityRef = useRef(0)
  const lastScrollY = useRef(0)
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!badgeRef.current || !ballsContainerRef.current) return

    const badge = badgeRef.current
    const { width, height } = badge.getBoundingClientRect()
    containerSizeRef.current = { width, height }

    const ballCount = Math.floor((width * height) / 12000)
    const newBalls: Ball[] = []

    for (let i = 0; i < ballCount; i++) {
      newBalls.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        radius: 10 + Math.random() * 10,
        deformation: 0,
      })
    }

    ballsRef.current = newBalls
    setBalls([...newBalls])
    startAnimation()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY.current
      scrollVelocityRef.current = scrollDelta * 0.2

      if (ballsRef.current.length > 0 && Math.abs(scrollDelta) > 2) {
        ballsRef.current.forEach((ball) => {
          ball.vy += scrollVelocityRef.current
          ball.vx += (Math.random() - 0.5) * Math.abs(scrollVelocityRef.current) * 0.5
        })
      }

      lastScrollY.current = currentScrollY

      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current)
      }

      scrollTimerRef.current = setTimeout(() => {
        scrollVelocityRef.current = 0
      }, 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current)
      }
    }
  }, [isMobile])

  const startAnimation = () => {
    if (!badgeRef.current || !ballsContainerRef.current) return

    const badge = badgeRef.current
    const { width, height } = badge.getBoundingClientRect()

    const balls = ballsRef.current
    for (let i = 0; i < balls.length; i++) {
      balls[i].y = Math.random() * height
    }

    const animate = () => {
      const currentRotation = rotation.get()
      const rotationDelta = currentRotation - lastRotation.current
      lastRotation.current = currentRotation

      velocityXRef.current = x.getVelocity() * 0.08
      velocityYRef.current = y.getVelocity() * 0.08

      const balls = ballsRef.current
      const maxY = height - 10

      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i]

        ball.vx += rotationDelta * 0.3
        ball.vy += 0.03

        if (Math.random() < 0.1) {
          ball.vy -= 0.05 + Math.random() * 0.1
        }

        ball.vx += velocityXRef.current * 0.15
        ball.vy += velocityYRef.current * 0.15

        ball.x += ball.vx
        ball.y += ball.vy

        ball.deformation = Math.min(Math.abs(ball.vx) + Math.abs(ball.vy), 5) * 0.002

        ball.vx *= 0.995
        ball.vy *= 0.995

        const margin = ball.radius * 1.05

        if (ball.y > maxY) {
          ball.y = maxY
          ball.vy = -Math.abs(ball.vy) * 0.92
          ball.vx += (Math.random() - 0.5) * 0.5
        }

        if (ball.y < margin) {
          ball.y = margin
          ball.vy *= -0.92
          ball.vx += (Math.random() - 0.5) * 0.5
        }

        if (ball.x < margin) {
          ball.x = margin
          ball.vx *= -0.92
          ball.vy += (Math.random() - 0.5) * 0.5
        }

        if (ball.x > width - margin) {
          ball.x = width - margin
          ball.vx *= -0.92
          ball.vy += (Math.random() - 0.5) * 0.5
        }

        for (let j = i + 1; j < balls.length; j++) {
          const ball2 = balls[j]
          const dx = ball2.x - ball.x
          const dy = ball2.y - ball.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDist = ball.radius + ball2.radius

          if (distance < minDist) {
            const angle = Math.atan2(dy, dx)
            const targetX = ball.x + Math.cos(angle) * minDist
            const targetY = ball.y + Math.sin(angle) * minDist
            const ax = (targetX - ball2.x) * 0.08
            const ay = (targetY - ball2.y) * 0.08

            const energyBoost = 1.15

            ball.vx -= ax * energyBoost
            ball.vy -= ay * energyBoost
            ball2.vx += ax * energyBoost
            ball2.vy += ay * energyBoost

            ball.vx += (Math.random() - 0.5) * 0.2
            ball.vy += (Math.random() - 0.5) * 0.2
            ball2.vx += (Math.random() - 0.5) * 0.2
            ball2.vy += (Math.random() - 0.5) * 0.2
          }
        }

        if (Math.random() < 0.02) {
          ball.vx += (Math.random() - 0.5) * 1.0
          ball.vy += (Math.random() - 0.5) * 1.0 - 0.2
        }
      }

      setBalls([...balls])
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  return (
    <>
      {!isMobile && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
          <motion.line
            x1={anchor.x}
            y1={anchor.y}
            x2={holeX}
            y2={holeY}
            stroke="rgba(0,0,0,0.5)"
            strokeWidth={stringWidth}
            strokeLinecap="round"
            style={{
              filter: "blur(4px)",
              opacity: 0.5,
              transform: "translate(3px, 3px)",
            }}
          />

          <motion.line
            x1={anchor.x}
            y1={anchor.y}
            x2={holeX}
            y2={holeY}
            stroke={stringColor}
            strokeWidth={stringWidth}
            strokeLinecap="round"
          />
        </svg>
      )}

      <motion.div
        ref={badgeRef}
        className={`${isMobile ? "relative mx-auto" : "absolute"} flex flex-col ${isMobile ? "w-[320px] h-[440px]" : "w-[380px] h-[500px]"} rounded-2xl overflow-hidden ${!isMobile ? "cursor-grab active:cursor-grabbing" : ""}`}
        style={{
          x: isMobile ? 0 : x,
          y: isMobile ? 0 : y,
          translateX: isMobile ? undefined : "-50%",
          translateY: isMobile ? undefined : "-40px",
          rotate: isMobile ? 0 : rotation,
          boxShadow:
            "0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 20px 60px -10px rgba(0, 0, 0, 0.4), 0 1px 5px rgba(0, 0, 0, 0.1), 0 -1px 1px rgba(255, 255, 255, 0.08) inset",
          transform: isMobile ? undefined : "perspective(1000px)",
          margin: isMobile ? "0 auto 24px" : undefined,
        }}
        onPointerDown={!isMobile ? handlePointerDown : undefined}
        whileTap={!isMobile ? { scale: 1.02 } : undefined}
      >
        {!isMobile && (
          <div
            className="absolute w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-800"
            style={{
              left: "50%",
              top: "-3px",
              transform: "translateX(-50%)",
              zIndex: 20,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3) inset",
            }}
          />
        )}

        <div
          className="text-white p-8 flex-1 relative overflow-hidden"
          style={{
            zIndex: 1,
            backgroundColor: config.badgeColor,
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 flex items-center" style={{ zIndex: 10 }}>
            <div
              className="transform -rotate-90 origin-center whitespace-nowrap"
              style={{
                position: "absolute",
                left: "-30px",
                width: "100%",
                transformOrigin: "center",
              }}
            >
              <span className="text-xl font-medium tracking-wider">{config.eventName}</span>
            </div>
          </div>

          <div className="mb-6 text-center" style={{ zIndex: 10 }}>
            <h3 className="text-lg font-semibold tracking-wider uppercase">{config.eventName}</h3>
            <div className="w-16 h-1 bg-white/40 mx-auto mt-2"></div>
          </div>

          <div className="ml-0 pl-0" style={{ zIndex: 10, position: "relative" }}>
            <h2 className={`${isMobile ? "text-4xl" : "text-5xl"} font-bold mb-2`}>{config.firstName}</h2>
            <h2 className={`${isMobile ? "text-4xl" : "text-5xl"} font-bold mb-8`}>{config.lastName}</h2>
            <p className="text-xl tracking-widest text-gray-100">{config.company}</p>
          </div>
        </div>

        <div
          className="h-[140px] relative"
          style={{
            zIndex: 1,
            backgroundColor: config.badgeBottomColor,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden" style={{ zIndex: 2 }}>
            <div
              className="w-full h-12 rounded-[50%] translate-y-[-50%]"
              style={{ backgroundColor: config.badgeColor }}
            ></div>
          </div>

          <div className="absolute bottom-8 left-8 text-white" style={{ zIndex: 10 }}>
            <p className="text-sm opacity-80 mb-1">{config.role}</p>
            <p className="text-2xl font-mono">{config.badgeId}</p>
          </div>
        </div>

        <div
          ref={ballsContainerRef}
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
          style={{ zIndex: 5 }}
        >
          {balls.map((ball, index) => (
            <div
              key={index}
              className="absolute stage"
              style={{
                width: `${ball.radius * 2}px`,
                height: `${ball.radius * 2}px`,
                transform: `translate(${ball.x - ball.radius}px, ${ball.y - ball.radius}px)`,
                margin: 0,
                padding: 0,
              }}
            >
              <figure
                className="ball bubble"
                style={{
                  transform: `scaleX(${1 + ball.deformation}) scaleY(${1 - ball.deformation})`,
                }}
              ></figure>
            </div>
          ))}
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl"
          style={{ zIndex: 6 }}
        />
        <div
          className="absolute top-0 left-0 w-1/3 h-1/3 bg-white/10 rounded-full blur-md transform translate-x-1/4 translate-y-1/4"
          style={{ zIndex: 6 }}
        />
      </motion.div>
    </>
  )
}

"use client"

import { useRef } from "react"
import { useMotionValue, useTransform } from "framer-motion"
import { useMobileDetector } from "../hooks/use-mobile-detector"
import { useInitElasticBoxPositions } from "../hooks/use-init-elastic-box-positions"
import { useGravityEffect } from "../hooks/use-gravity-effect"
import Badge from "./badge"
import Content from "./content"
import Footer from "./footer"
import { type BadgeConfig, defaultBadgeConfig } from "../types/badge-config"

interface ElasticBoxPhysicsProps {
  config?: Partial<BadgeConfig>
}

export default function ElasticBoxPhysics({ config = {} }: ElasticBoxPhysicsProps) {
  const mergedConfig: BadgeConfig = { ...defaultBadgeConfig, ...config }
  const isMobile = useMobileDetector()
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotation = useMotionValue(0)
  const holeX = useTransform(x, (latest) => latest)
  const holeY = useTransform(y, (latest) => latest - 40)

  const [{ isPositioned, anchor, restPosition }, { velocityX, velocityY }] = useInitElasticBoxPositions(
    containerRef,
    isMobile,
    x,
    y,
    rotation,
  )

  const springConfig = { damping: 8, stiffness: 120, mass: 3 }
  const gravityStrength = 0
  const isDraggingRef = useRef(false)
  const bounceCountX = useRef(0)
  const bounceCountY = useRef(0)
  const lastVelocityX = useRef(0)
  const lastVelocityY = useRef(0)
  const initialPointerX = useRef(0)
  const initialPointerY = useRef(0)
  const initialBadgeX = useRef(0)
  const initialBadgeY = useRef(0)
  const hasAnimatedRef = useRef(false)

  const distance = useTransform([x, y], ([latestX, latestY]) => {
    const dx = latestX - anchor.x
    const dy = latestY - anchor.y
    return Math.sqrt(dx * dx) + Math.sqrt(dy * dy)
  })

  const stringColor = useTransform(distance, [0, 300, 600], ["#ff6b6b", "#ff0000", "#990000"])
  const stringWidth = useTransform(distance, [0, 600], [9, 8])

  useGravityEffect({
    isMobile,
    anchor,
    restPosition,
    isPositioned,
    x,
    y,
    rotation,
    isDraggingRef,
    velocityX,
    velocityY,
    bounceCountX,
    bounceCountY,
    lastVelocityX,
    lastVelocityY,
  })

  const handlePointerUp = () => {
    if (isMobile) return
    window.removeEventListener("pointermove", handlePointerMove)
    window.removeEventListener("pointerup", handlePointerUp)
    window.removeEventListener("pointerleave", handlePointerUp)
    isDraggingRef.current = false
    velocityX.current = velocityX.current * 1.0
    velocityY.current = velocityY.current * 1.0
    bounceCountX.current = 0
    bounceCountY.current = 0
  }

  const handlePointerDown = (e) => {
    if (isMobile) return
    e.preventDefault()
    initialPointerX.current = e.clientX
    initialPointerY.current = e.clientY
    initialBadgeX.current = x.get()
    initialBadgeY.current = y.get()
    isDraggingRef.current = true
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
    window.addEventListener("pointerleave", handlePointerUp)
    prevX.current = x.get()
    prevY.current = y.get()
    lastUpdateTime.current = performance.now()
  }

  const handlePointerMove = (e) => {
    if (isMobile || !isDraggingRef.current) return
    const deltaX = e.clientX - initialPointerX.current
    const deltaY = e.clientY - initialPointerY.current
    const newX = initialBadgeX.current + deltaX
    const newY = initialBadgeY.current + deltaY
    const now = performance.now()
    const dt = now - lastUpdateTime.current

    if (dt > 0) {
      velocityX.current = ((newX - prevX.current) / dt) * 16
      velocityY.current = ((newY - prevY.current) / dt) * 16
      prevX.current = newX
      prevY.current = newY
      lastUpdateTime.current = now
    }

    x.set(newX)
    y.set(newY)
  }

  const prevX = useRef(0)
  const prevY = useRef(0)
  const lastUpdateTime = useRef(0)

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[600px] bg-gradient-to-b from-gray-700 to-gray-800 overflow-hidden rounded-2xl"
    >
      <Content isMobile={isMobile} config={mergedConfig} />

      {isPositioned && (
        <Badge
          x={x}
          y={y}
          rotation={rotation}
          isMobile={isMobile}
          handlePointerDown={handlePointerDown}
          holeX={holeX}
          holeY={holeY}
          stringWidth={stringWidth}
          stringColor={stringColor}
          anchor={anchor}
          config={mergedConfig}
        />
      )}

      <Footer config={mergedConfig} isMobile={isMobile} />
    </div>
  )
}

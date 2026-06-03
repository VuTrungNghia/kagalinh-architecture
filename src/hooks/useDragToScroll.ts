import { useCallback, useRef, useState } from 'react'

type DragState = {
  isDragging: boolean
  startY: number
  scrollTop: number
}

export function useDragToScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<DragState>({
    isDragging: false,
    startY: 0,
    scrollTop: 0,
  })
  const [isDragging, setIsDragging] = useState(false)
  const velocityRef = useRef(0)
  const lastYRef = useRef(0)
  const lastTimeRef = useRef(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Don't start drag if clicking on interactive elements (buttons, links)
    const target = e.target as HTMLElement
    if (target.closest('button, a, [role="button"], input, select, textarea')) {
      return
    }

    dragState.current = {
      isDragging: true,
      startY: e.clientY,
      scrollTop: containerRef.current?.scrollTop || 0,
    }
    lastYRef.current = e.clientY
    lastTimeRef.current = Date.now()
    velocityRef.current = 0
    setIsDragging(true)

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing'
      containerRef.current.style.userSelect = 'none'
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragState.current.isDragging || !containerRef.current) return

    const deltaY = e.clientY - dragState.current.startY
    const newScrollTop = dragState.current.scrollTop - deltaY

    // Calculate velocity for momentum
    const now = Date.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      velocityRef.current = (lastYRef.current - e.clientY) / dt
    }
    lastYRef.current = e.clientY
    lastTimeRef.current = now

    containerRef.current.scrollTop = newScrollTop
  }, [])

  const handleMouseUp = useCallback(() => {
    if (!dragState.current.isDragging) return

    dragState.current.isDragging = false
    setIsDragging(false)

    if (containerRef.current) {
      containerRef.current.style.cursor = ''
      containerRef.current.style.userSelect = ''

      // Apply momentum scrolling
      const applyMomentum = () => {
        if (!containerRef.current || Math.abs(velocityRef.current) < 0.01) return

        velocityRef.current *= 0.95 // Friction
        containerRef.current.scrollTop += velocityRef.current * 16

        if (Math.abs(velocityRef.current) > 0.01) {
          requestAnimationFrame(applyMomentum)
        }
      }
      requestAnimationFrame(applyMomentum)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    handleMouseUp()
  }, [handleMouseUp])

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    dragState.current = {
      isDragging: true,
      startY: touch.clientY,
      scrollTop: containerRef.current?.scrollTop || 0,
    }
    lastYRef.current = touch.clientY
    lastTimeRef.current = Date.now()
    velocityRef.current = 0
    setIsDragging(true)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragState.current.isDragging || !containerRef.current) return

    const touch = e.touches[0]
    const deltaY = touch.clientY - dragState.current.startY
    const newScrollTop = dragState.current.scrollTop - deltaY

    const now = Date.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      velocityRef.current = (lastYRef.current - touch.clientY) / dt
    }
    lastYRef.current = touch.clientY
    lastTimeRef.current = now

    containerRef.current.scrollTop = newScrollTop
  }, [])

  const handleTouchEnd = useCallback(() => {
    handleMouseUp()
  }, [handleMouseUp])

  return {
    containerRef,
    isDragging,
    eventHandlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  }
}

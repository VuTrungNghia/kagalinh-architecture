import { useCallback, useRef, useState } from 'react'

type DragState = {
  isDragging: boolean
  startX: number
  startY: number
}

export function useDragToSlide(onNext: () => void, onPrev: () => void) {
  const dragState = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
  })
  const [isDragging, setIsDragging] = useState(false)

  const THRESHOLD = 50 // Minimum pixels to trigger slide change

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Don't start drag if clicking on interactive elements
    const target = e.target as HTMLElement
    if (target.closest('button, a, [role="button"], input, select, textarea')) {
      return
    }

    dragState.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
    }
    setIsDragging(true)
  }, [])

  const handleMouseMove = useCallback((_e: React.MouseEvent) => {
    // Visual feedback can be added here if needed
  }, [])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!dragState.current.isDragging) return

    const deltaX = e.clientX - dragState.current.startX
    const deltaY = e.clientY - dragState.current.startY

    // Only trigger if horizontal drag is larger than vertical (avoid scroll conflicts)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > THRESHOLD) {
      if (deltaX > 0) {
        onPrev() // Drag right = go to previous
      } else {
        onNext() // Drag left = go to next
      }
    }

    dragState.current.isDragging = false
    setIsDragging(false)
  }, [onNext, onPrev])

  const handleMouseLeave = useCallback(() => {
    dragState.current.isDragging = false
    setIsDragging(false)
  }, [])

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    dragState.current = {
      isDragging: true,
      startX: touch.clientX,
      startY: touch.clientY,
    }
    setIsDragging(true)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragState.current.isDragging) return
    // Prevent page scroll when swiping horizontally on the slideshow
    const touch = e.touches[0]
    const deltaX = touch.clientX - dragState.current.startX
    const deltaY = touch.clientY - dragState.current.startY

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault()
    }
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!dragState.current.isDragging) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - dragState.current.startX
    const deltaY = touch.clientY - dragState.current.startY

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > THRESHOLD) {
      if (deltaX > 0) {
        onPrev()
      } else {
        onNext()
      }
    }

    dragState.current.isDragging = false
    setIsDragging(false)
  }, [onNext, onPrev])

  return {
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

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useSmoothScroll } from '../../lib/SmoothScroll'
import './BaseModal.css'

const EASE_OUT = [0.22, 1, 0.36, 1]
const SHAKE_X = [0, -10, 10, -8, 8, -4, 4, 0]

// Modals can be mounted at the same time (e.g. during a page transition), so
// track locks globally and only release the page once the last one closes.
let scrollLockCount = 0
let previousBodyOverflow = ''

function useScrollLock(active, lenis) {
  useEffect(() => {
    if (!active) return

    if (scrollLockCount === 0) {
      previousBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    }
    scrollLockCount += 1

    return () => {
      scrollLockCount = Math.max(0, scrollLockCount - 1)
      if (scrollLockCount === 0) {
        document.body.style.overflow = previousBodyOverflow
        lenis?.start()
      }
    }
  }, [active, lenis])
}

/**
 * Shared modal shell.
 *
 * Handles portalling, enter/exit animation, ESC + backdrop dismissal, page
 * scroll locking and focus management. Each modal only supplies its own
 * classes and content.
 */
export default function BaseModal({
  isOpen,
  onClose,
  children,
  overlayClassName = '',
  dialogClassName = '',
  closeOnBackdrop = true,
  closeOnEscape = true,
  lockScroll = true,
  restoreFocus = true,
  initialFocusRef,
  shake = false,
  shakeKey,
  ariaLabel,
  ariaLabelledBy,
}) {
  const lenis = useSmoothScroll()
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)

  useScrollLock(isOpen && lockScroll, lenis)

  // ESC to dismiss
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeOnEscape, onClose])

  // Focus the requested element on open, then return focus on close.
  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement
    const timer = window.setTimeout(() => {
      const target = initialFocusRef?.current || dialogRef.current
      target?.focus?.({ preventScroll: true })
    }, 100)

    return () => {
      window.clearTimeout(timer)
      if (restoreFocus) previousFocusRef.current?.focus?.({ preventScroll: true })
    }
  }, [isOpen, initialFocusRef, restoreFocus])

  const handleBackdropClick = (event) => {
    if (closeOnBackdrop && event.target === event.currentTarget) onClose?.()
  }

  // A changing key replays the enter animation, which powers the shake effect.
  const dialogAnimation = shake
    ? {
        opacity: 1,
        scale: 1,
        y: 0,
        x: SHAKE_X,
        transition: { duration: 0.5, ease: 'easeInOut' },
      }
    : {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        transition: { duration: 0.45, ease: EASE_OUT },
      }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`base-modal ${overlayClassName}`.trim()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        >
          <motion.div
            ref={dialogRef}
            key={shakeKey ?? 'base-modal-dialog'}
            className={`base-modal-dialog ${dialogClassName}`.trim()}
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={dialogAnimation}
            exit={{ opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.25 } }}
            tabIndex={-1}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

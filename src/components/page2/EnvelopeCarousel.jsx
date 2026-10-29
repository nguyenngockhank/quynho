import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LETTERS } from '../../data/letters'
import { useSmoothScroll } from '../../lib/SmoothScroll'
import './EnvelopeCarousel.css'

export default function EnvelopeCarousel() {
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  const trackRef = useRef(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const dragDistanceRef = useRef(0)

  const lenis = useSmoothScroll()

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (!lenis) return
    if (selectedLetter) {
      lenis.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis.start()
      document.body.style.overflow = ''
    }
    return () => {
      lenis.start()
      document.body.style.overflow = ''
    }
  }, [selectedLetter, lenis])

  // Keyboard navigation for modal
  useEffect(() => {
    if (!selectedLetter) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedLetter(null)
      } else if (e.key === 'ArrowLeft') {
        navigateModal(-1)
      } else if (e.key === 'ArrowRight') {
        navigateModal(1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedLetter])

  // Update carousel scroll state and progress
  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      setScrollProgress(0)
      return
    }
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < maxScroll - 10)
    const progress = Math.min(Math.max(el.scrollLeft / maxScroll, 0), 1)
    setScrollProgress(progress)

    // Calculate approximate active index
    const cardWidth = el.querySelector('.envelope-card')?.offsetWidth || 300
    const gap = 20
    const current = Math.round(el.scrollLeft / (cardWidth + gap))
    setCurrentIndex(Math.min(Math.max(current, 0), LETTERS.length - 1))
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    updateScrollState()
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  // Carousel arrow scroll navigation
  const scrollCarousel = (direction) => {
    const el = trackRef.current
    if (!el) return
    const cardWidth = el.querySelector('.envelope-card')?.offsetWidth || 320
    const gap = 20
    const scrollAmount = (cardWidth + gap) * (window.innerWidth < 768 ? 1 : 2)
    el.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    })
  }

  // Mouse drag-to-scroll support
  const handleMouseDown = (e) => {
    const el = trackRef.current
    if (!el) return
    isDraggingRef.current = true
    startXRef.current = e.pageX - el.offsetLeft
    scrollLeftRef.current = el.scrollLeft
    dragDistanceRef.current = 0
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return
    const el = trackRef.current
    if (!el) return
    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    const walk = (x - startXRef.current) * 1.5
    el.scrollLeft = scrollLeftRef.current - walk
    dragDistanceRef.current = Math.abs(walk)
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  // Open modal only if not dragged
  const handleCardClick = (letter) => {
    if (dragDistanceRef.current > 8) {
      dragDistanceRef.current = 0
      return
    }
    setSelectedLetter(letter)
  }

  // Modal Next/Prev navigation
  const navigateModal = (direction) => {
    if (!selectedLetter) return
    const currentIdx = LETTERS.findIndex((item) => item.id === selectedLetter.id)
    if (currentIdx === -1) return
    let nextIdx = currentIdx + direction
    if (nextIdx < 0) nextIdx = LETTERS.length - 1
    if (nextIdx >= LETTERS.length) nextIdx = 0
    setSelectedLetter(LETTERS[nextIdx])
  }

  return (
    <div className="envelope-section">
      <div className="envelope-section-header">
        <div className="envelope-badge">
          <span className="envelope-badge-dot"></span>
          {LETTERS.length} LÁ THƯ DÀNH CHO QUỶ NHỎ
          <span className="envelope-badge-dot"></span>
        </div>
        <h3 className="envelope-title">
          Những dòng chữ <span className="gold-text">phủ bụi</span>
        </h3>
        <p className="envelope-subtitle">
          Những lá thư còn dang dở, những lời chưa từng ngỏ, những kỉ niệm có ngọt ngào, có đắng cay
        </p>
      </div>

      {/* Carousel Container */}
      <div className="envelope-carousel-wrap">
        {/* Navigation Arrows */}
        <button
          className={`envelope-nav-btn prev ${!canScrollLeft ? 'disabled' : ''}`}
          onClick={() => scrollCarousel(-1)}
          aria-label="Thư trước"
          data-hover
          disabled={!canScrollLeft}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          className={`envelope-nav-btn next ${!canScrollRight ? 'disabled' : ''}`}
          onClick={() => scrollCarousel(1)}
          aria-label="Thư tiếp theo"
          data-hover
          disabled={!canScrollRight}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Horizontal Track */}
        <div
          className="envelope-track"
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {LETTERS.map((letter) => (
            <div
              key={letter.id}
              className="envelope-card"
              onClick={() => handleCardClick(letter)}
              data-hover
            >
              {/* Envelope flap top */}
              <div className="envelope-flap"></div>

              {/* Envelope stamp */}
              <div className="envelope-stamp">
                <span className="envelope-stamp-inner">
                  <span className="stamp-heart">♥</span>
                  <span className="stamp-text">LOVE</span>
                  <span className="stamp-number">{letter.number}</span>
                </span>
              </div>

              {/* Wax Seal */}
              <div className="envelope-wax-seal">
                <div className="wax-seal-outer">
                  <div className="wax-seal-inner">
                    <span className="wax-monogram">K♡T</span>
                  </div>
                </div>
              </div>

              {/* Envelope Card Body */}
              <div className="envelope-body">
                <div className="envelope-card-header">
                  <span className="envelope-number-pill">#{letter.number}</span>
                  <span className="envelope-tag">{letter.tag}</span>
                </div>

                <div className="envelope-recipient">
                  <span className="to-label">Gửi:</span> Quỷ Nhỏ của anh
                </div>

                <h4 className="envelope-card-title">{letter.title}</h4>

                <p className="envelope-card-preview">{letter.preview}</p>

                <div className="envelope-footer">
                  <span className="envelope-date">{letter.date}</span>
                  <span className="envelope-open-btn">
                    <span>Mở thư</span>
                    <span className="envelope-arrow">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress & Quick Stats Bar */}
      <div className="envelope-status-bar">
        <div className="envelope-counter-indicator">
          Bức thư <strong className="gold-text">#{LETTERS[currentIndex]?.number || '01'}</strong> / {LETTERS.length}
        </div>
        <div className="envelope-progress-track">
          <div
            className="envelope-progress-fill"
            style={{ width: `${Math.max(scrollProgress * 100, 2)}%` }}
          ></div>
        </div>
        {/* <div className="envelope-drag-hint">
          <span className="drag-icon">↔</span> Kéo hoặc vuốt để xem thêm
        </div> */}
      </div>

      {/* SCROLLABLE LETTER MODAL */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            className="letter-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              className="letter-modal-dialog"
              initial={{ scale: 0.88, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="letter-modal-close"
                onClick={() => setSelectedLetter(null)}
                aria-label="Đóng thư"
                data-hover
              >
                ✕
              </button>

              {/* Letter Parchment Container */}
              <div className="parchment-container">
                {/* Vintage Letter Border / Frame */}
                <div className="parchment-border">
                  {/* Decorative Vintage Postmark Stamp */}
                  <div className="parchment-postmark">
                    <div className="postmark-circle">
                      <span>SPECIAL DELIVERY</span>
                      <strong>KHANK & TAM</strong>
                      <span>★ FOREVER ★</span>
                    </div>
                    <div className="postmark-waves">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>

                  {/* Letter Header */}
                  <div className="parchment-header">
                    <div className="parchment-seal-icon">
                      <div className="seal-mini">K ♡ T</div>
                    </div>
                    <div className="parchment-meta">
                      <span className="parchment-number">BỨC THƯ SỐ #{selectedLetter.number}</span>
                      <span className="parchment-tag">• {selectedLetter.tag} •</span>
                      <span className="parchment-date">{selectedLetter.date}</span>
                    </div>
                  </div>

                  <h3 className="parchment-title">{selectedLetter.title}</h3>

                  {/* Scrollable Letter Content */}
                  <div
                    className="parchment-scroll-area"
                    data-lenis-prevent="true"
                  >
                    {/* <div className="parchment-salutation">
                      Gửi Quỷ Nhỏ yêu dấu của anh,
                    </div> */}

                    <div className="parchment-body-text">
                      {selectedLetter.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="parchment-paragraph">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="parchment-divider">
                      <span className="divider-line"></span>
                      <span className="divider-heart">❦</span>
                      <span className="divider-line"></span>
                    </div>

                    {/* Sign-off */}
                    <div className="parchment-signoff">
                      {/* <p className="signoff-quote">"Mãi thương em nhiều hơn mỗi ngày qua"</p> */}
                      <div className="signoff-signature">
                        <span>Người thương của em,</span>
                        <strong className="signature-name">Ngưu Vương</strong>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer Controls */}
                  <div className="parchment-footer-nav">
                    <button
                      className="parchment-nav-btn prev"
                      onClick={() => navigateModal(-1)}
                      data-hover
                    >
                      <span className="nav-arrow">←</span>
                      <span>Bức thư trước</span>
                    </button>

                    <div className="parchment-index-indicator">
                      {selectedLetter.id} / {LETTERS.length}
                    </div>

                    <button
                      className="parchment-nav-btn next"
                      onClick={() => navigateModal(1)}
                      data-hover
                    >
                      <span>Bức thư sau</span>
                      <span className="nav-arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

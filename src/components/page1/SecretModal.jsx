import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BaseModal from '../common/BaseModal'
import { SECRET_GATE } from '../../data/config'
import './SecretModal.css'

/** Strip Vietnamese accents and normalize string for flexible comparison */
function normalizeString(str) {
  if (!str) return ''
  return str
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, ' ')
}

/** Check if user input matches any accepted answer */
function checkAnswerMatch(input, acceptedAnswers) {
  if (!input || !acceptedAnswers) return false
  const cleanInput = input.trim().toLowerCase()
  const normalizedInput = normalizeString(cleanInput)
  const digitsInput = cleanInput.replace(/[^\d]/g, '')

  const list = Array.isArray(acceptedAnswers) ? acceptedAnswers : [acceptedAnswers]

  return list.some((ans) => {
    if (!ans) return false
    const cleanAns = ans.toString().trim().toLowerCase()
    const normalizedAns = normalizeString(cleanAns)
    const digitsAns = cleanAns.replace(/[^\d]/g, '')

    // Direct case-insensitive match
    if (cleanInput === cleanAns) return true
    // Accent-insensitive match
    if (normalizedInput === normalizedAns) return true
    // Digits-only match (e.g. 0502 vs 05/02 or 05022019 vs 05/02/2019)
    if (digitsInput && digitsAns && digitsInput.length >= 4 && digitsInput === digitsAns) {
      return true
    }
    return false
  })
}

export default function SecretModal({ isOpen, onClose, onSuccess, config = SECRET_GATE }) {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'error' | 'success'
  const [feedback, setFeedback] = useState('')
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)
  const inputRef = useRef(null)

  // Reset states whenever modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setValue('')
      setStatus('idle')
      setFeedback('')
      setShowHint(false)
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim() || status === 'success') return

    const isValid = checkAnswerMatch(value, config.acceptedAnswers)

    if (isValid) {
      setStatus('success')
      setFeedback(config.successMessage || 'Chính xác rồi! ✨')
      setTimeout(() => {
        onSuccess?.()
      }, 750)
    } else {
      setStatus('error')
      setFeedback(config.errorMessage || 'Mật mã chưa chính xác rồi, thử lại nhé! ❤️')
      setShakeKey((prev) => prev + 1)
      const attempts = wrongAttempts + 1
      setWrongAttempts(attempts)
      if (attempts >= 2) {
        setShowHint(true)
      }
      inputRef.current?.select()
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={status !== 'success'}
      closeOnEscape={status !== 'success'}
      overlayClassName="secret-modal-backdrop"
      dialogClassName="secret-modal-card"
      ariaLabel={config.title || 'Mật mã tình yêu'}
      initialFocusRef={inputRef}
      shake={status === 'error'}
      shakeKey={shakeKey}
    >
      <div className="secret-modal-glow" aria-hidden />

      {/* Close Button */}
      {status !== 'success' && (
        <button
          type="button"
          className="secret-modal-close"
          onClick={onClose}
          aria-label="Đóng"
          data-hover
        >
          ✕
        </button>
      )}

      {/* Icon */}
      <div className="secret-modal-icon-wrap" aria-hidden>
        {status === 'success' ? (
          <svg
            className="secret-modal-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg
            className="secret-modal-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="3" ry="3" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          </svg>
        )}
      </div>

      {/* Badge & Title */}
      {config.badge && <p className="secret-modal-badge">{config.badge}</p>}
      <h3 className="secret-modal-title">{config.title || 'Mật mã tình yêu'}</h3>
      <p className="secret-modal-question">{config.question}</p>

      {/* Form */}
      <form className="secret-modal-form" onSubmit={handleSubmit}>
        <div className="secret-modal-input-wrap">
          <input
            ref={inputRef}
            type="text"
            className={`secret-modal-input ${
              status === 'error' ? 'is-error' : status === 'success' ? 'is-success' : ''
            }`}
            placeholder={config.placeholder || 'Nhập mật mã tại đây...'}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (status === 'error') {
                setStatus('idle')
                setFeedback('')
              }
            }}
            disabled={status === 'success'}
            autoComplete="off"
            spellCheck="false"
            data-hover
          />
        </div>

        <button
          type="submit"
          className={`secret-modal-submit ${status === 'success' ? 'is-success' : ''}`}
          disabled={status === 'success' || !value.trim()}
          data-hover
        >
          {status === 'success' ? (
            <>
              <span>Đang mở ra vũ trụ</span>
              <span>✨</span>
            </>
          ) : (
            <>
              <span>{config.submitText || 'Mở khóa ký ức'}</span>
              <span>→</span>
            </>
          )}
        </button>

        {/* Status feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.p
              className={`secret-modal-feedback ${
                status === 'error' ? 'is-error' : status === 'success' ? 'is-success' : ''
              }`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {feedback}
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      {/* Hint toggle */}
      {config.hint && status !== 'success' && (
        <div className="secret-modal-hint-area">
          {!showHint ? (
            <button
              type="button"
              className="secret-modal-hint-btn"
              onClick={() => setShowHint(true)}
              data-hover
            >
              💡 Gợi ý cho người thương
            </button>
          ) : (
            <motion.div
              className="secret-modal-hint-box"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {config.hint}
            </motion.div>
          )}
        </div>
      )}
    </BaseModal>
  )
}

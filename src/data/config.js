/* ============================================================
   ✦ EDIT ME ✦  — A romantic anniversary website (for your love).
   Everything personal lives in these data files.
   ============================================================ */

export const COUPLE = {
  // Shown in the nav and around the site (her name, or a pet name).
  name: "Khank's story",
  // How the hero greeting reads:  "Happy Anniversary <heroName>"
  heroName: 'Ngưu Vương x Quỷ Nhỏ',
  // Signed at the very end of the experience.
  signature: 'Forever Yours',
  // The day your story became official — powers the live anniversary counter.
  // Format: YYYY, MM (1-12), DD
  weddingDate: { year: 2019, month: 2, day: 5 },
  // Which anniversary this celebrates (optional, cosmetic). null = auto.
  anniversaryNumber: null,
}

export const MEDIA = {
  // Background music. Set to null to hide the player.
  // To enable: drop an .mp3 in /public/audio and set e.g. '/audio/piano.mp3'.
  music: null,
}

export const SECRET_GATE = {
  // Bật/tắt tính năng hỏi mật mã trước khi chuyển trang
  enabled: true,

  // Tiêu đề & nội dung hiển thị trong modal
  badge: 'Cánh Cổng Bí Mật',
  title: 'Dành riêng cho Quỷ Nhỏ',
  question: 'Tin nhắn đầu tiên của Ngưu vương là gì?',
  // placeholder: 'Ví dụ: 02/09',

  // Gợi ý cho người thương
  hint: 'Gợi ý: Có thể nhập sinh nhật Ngưu Vương',

  // Danh sách các câu trả lời hợp lệ (không phân biệt hoa thường, hỗ trợ cả không dấu)
  acceptedAnswers: [
    'hello, how are you?',
    'hello, how are you',
    'hello how are you',
    '01/09/1993',
    '22/01/2000',
    '01091993',
    '22012000',
    'quỷ nhỏ',
    'quynho',
  ],

  submitText: 'Mở khóa ký ức',
  errorMessage: 'Chưa đúng mật mã rồi nè, Quỷ Nhỏ thử lại nhé! ❤️',
  successMessage: 'Chính xác rồi! Chào mừng Quỷ Nhỏ bước vào vũ trụ ký ức... ✨',
}


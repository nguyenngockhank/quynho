/** Shared domain types for the anniversary story content. */

export interface WeddingDate {
  year: number
  month: number
  day: number
}

export interface Couple {
  name: string
  heroName: string
  signature: string
  weddingDate: WeddingDate
  anniversaryNumber: number | null
}

export interface MediaConfig {
  music: string | null
}

export interface SecretGateConfig {
  enabled: boolean
  badge: string
  title: string
  question: string
  placeholder?: string
  hint: string
  acceptedAnswers: string[]
  submitText: string
  errorMessage: string
  successMessage: string
}

export interface Memory {
  key: string
  title: string
  image: string
  story: string
}

export interface Message {
  from: string
  text: string
}

export interface BookPhoto {
  image: string
  label: string
}

export interface Letter {
  id: number
  number: string
  title: string
  tag: string
  date: string
  preview: string
  content: string
}

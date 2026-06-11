import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
): number {
  return outputMin + ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin)
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })
}

export const springConfig = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
}

export const smoothEase = [0.25, 0.1, 0.25, 1.0]
export const easeOut = [0.0, 0.0, 0.2, 1.0]
export const easeInOut = [0.4, 0.0, 0.2, 1.0]

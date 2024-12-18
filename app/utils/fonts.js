import fs from 'fs/promises'
import path from 'path'
import localFont from 'next/font/local'

// Define the font
export const monsieurFont = localFont({
  src: '../../public/fonts/MonsieurLaDoulaise-Regular.ttf',
  variable: '--font-monsieur'
})

// Utility to get font as base64
export async function getFontBase64() {
  const fontPath = path.join(process.cwd(), 'public/fonts/MonsieurLaDoulaise-Regular.ttf')
  const fontBuffer = await fs.readFile(fontPath)
  return fontBuffer.toString('base64')
}
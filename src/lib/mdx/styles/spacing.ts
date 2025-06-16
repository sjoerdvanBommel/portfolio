import { SpacingToken } from '@/styled-system/tokens/tokens'

// Based on SpacingToken type
export const SPACING_TOKENS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64,
  72, 80, 96, 0.5, 1.5, 2.5, 3.5, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -14, -16, -20,
  -24, -28, -32, -36, -40, -44, -48, -52, -56, -60, -64, -72, -80, -96, -0.5, -1.5, -2.5, -3.5,
] as const

const SPACING_RATIO = 0.25

export const SPACING: Record<SpacingToken, string> = SPACING_TOKENS.reduce(
  (acc, token) => {
    acc[token] = `${token * SPACING_RATIO}rem`
    return acc
  },
  {} as Record<SpacingToken, string>,
)

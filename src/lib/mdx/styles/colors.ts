export const COLORS_NAMES = ['gray', 'yellow', 'amber', 'orange', 'red'] as const
export const COLORS_VARIANTS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
] as const

export type ColorName = (typeof COLORS_NAMES)[number]
export type ColorVariant = (typeof COLORS_VARIANTS)[number]

export type ColorVariable = `${ColorName}-${ColorVariant}`
export type Color = `${ColorName}-${ColorVariant}`

export const COLORS = COLORS_NAMES.reduce(
  (acc, color) => {
    acc[color] = COLORS_VARIANTS.reduce(
      (vAcc, variant) => {
        vAcc[variant] = `var(--${color}-${variant})` as const
        return vAcc
      },
      {} as Record<ColorVariant, `var(--${typeof color}-${ColorVariant})`>,
    )
    return acc
  },
  {} as Record<ColorName, Record<ColorVariant, `var(--${ColorName}-${ColorVariant})`>>,
)

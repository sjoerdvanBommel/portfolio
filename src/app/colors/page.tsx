import { css } from '../../../styled-system/css'

const colors = ['gray', 'orange', 'amber', 'yellow'] // slate can use gray as variable name
const colorVariants = Array.from({ length: 12 }, (_, i) => i + 1)
const variables = colors
  .map((color) =>
    colorVariants.map((variant) => ({
      variable: `${color}-${variant}`,
      text: `gray-${variant < 9 ? 12 : 1}`,
    })),
  )
  .flat()

export default function Colors() {
  return (
    <div className={gridStyles}>
      {variables.map((color) => (
        <div
          key={color.variable}
          style={{ backgroundColor: `var(--${color.variable})`, color: `var(--${color.text})` }}
          className={boxStyles}
        >
          {color.variable}
        </div>
      ))}
    </div>
  )
}

const gridStyles = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  width: 'fit-content',
  padding: '1rem',
  gap: '2',
})

const boxStyles = css({
  width: '100px',
  height: '100px',
  borderRadius: 'md',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

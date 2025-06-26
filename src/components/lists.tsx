import { css } from '@/styled-system/css'

export function Ol(props: React.HTMLAttributes<HTMLOListElement>) {
  return <ol {...props} className={css({ my: '2', listStyleType: 'decimal' })} />
}

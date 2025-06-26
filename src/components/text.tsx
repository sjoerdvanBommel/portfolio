import { css } from '@/styled-system/css'

export function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={css({ my: '2' })} />
}

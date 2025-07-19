import { css } from '@/styled-system/css'

export function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={css({ my: '2' })} />
}

export function A(props: React.HTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} className={css({ color: 'orange.500' })} />
}

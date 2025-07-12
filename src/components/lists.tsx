import { css } from '@/styled-system/css'

export function Ol(props: React.HTMLAttributes<HTMLOListElement>) {
  return <ol {...props} className={css({ my: '2', listStyleType: 'decimal', pl: '4' })} />
}

export function Ul(props: React.HTMLAttributes<HTMLUListElement>) {
  return <ul {...props} className={css({ my: '2', listStyleType: 'disc', pl: '4' })} />
}

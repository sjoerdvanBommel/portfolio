import dynamic from 'next/dynamic'
import { FunctionComponent, PropsWithChildren } from 'react'

const ClientOnlyComponent: FunctionComponent<PropsWithChildren> = ({ children }) => children

export const ClientOnly = dynamic(() => Promise.resolve(ClientOnlyComponent), {
  ssr: false,
})

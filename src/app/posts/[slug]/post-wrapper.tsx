'use client'

import { useWebContainer } from '@/components/providers/web-container-provider'
import { FileSystemTree } from '@webcontainer/api'
import { useEffect } from 'react'

type PostWrapperProps = {
  children: React.ReactNode
  files: FileSystemTree
  initCommand?: string[]
}

export function PostWrapper({ children, files, initCommand }: PostWrapperProps) {
  const { initialize } = useWebContainer()

  useEffect(() => {
    initialize(files, initCommand)
  }, [files, initCommand, initialize])

  return <div>{children}</div>
}

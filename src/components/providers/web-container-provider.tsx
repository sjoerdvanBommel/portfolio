'use client'

import { runCommand } from '@/lib/web-container'
import { FileSystemTree, WebContainer } from '@webcontainer/api'
import { createContext, MutableRefObject, useContext, useEffect, useRef, useState } from 'react'

type WebContainerPromiseContextType = {
  containerBootPromiseRef: MutableRefObject<Promise<WebContainer> | undefined>
}

export const WebContainerPromiseContext = createContext<WebContainerPromiseContextType>({
  containerBootPromiseRef: { current: undefined },
})

/**
 * TLDR; This extra provider prevents initialization of a web container in pages where the container is not needed.
 *
 * This provider is used to store the promise to the WebContainer.boot() call.
 * It prevents multiple initializations of the WebContainer.
 * If we would directly use the WebContainerProvider, we would not be able to teardown
 * the container when the container is still booting while the component unmounts.
 * We are not in control of stopping the container while it is booting, so we need to store the promise globally
 * and check if it exists before initializing the container.
 */
export function WebContainerPromiseProvider({ children }: { children: React.ReactNode }) {
  const containerBootPromiseRef = useRef<Promise<WebContainer> | undefined>()

  return (
    <WebContainerPromiseContext.Provider value={{ containerBootPromiseRef }}>
      {children}
    </WebContainerPromiseContext.Provider>
  )
}

function useWebContainerBootPromiseRef() {
  const context = useContext(WebContainerPromiseContext)

  if (!context) {
    throw new Error('useContainerBootPromiseRef must be used within a WebContainerPromiseProvider')
  }

  return context.containerBootPromiseRef
}

type WebContainerInitializerContextType = {
  container: WebContainer | null
}

export const WebContainerInitializerContext = createContext<WebContainerInitializerContextType>({
  container: null,
})

type WebContainerInitializerProviderProps = {
  children: React.ReactNode
  files: FileSystemTree
  initCommand?: string[]
}

export function WebContainerProvider({
  children,
  files,
  initCommand,
}: WebContainerInitializerProviderProps) {
  const [container, setContainer] = useState<WebContainer | null>(null)
  const containerRef = useRef<WebContainer | null>(null)
  const isInitializingRef = useRef(false)
  const containerBootPromiseRef = useWebContainerBootPromiseRef()

  useEffect(() => {
    // Prevent multiple initializations
    if (container || containerBootPromiseRef?.current) return

    containerBootPromiseRef.current = WebContainer.boot()

    containerBootPromiseRef.current
      .then(async (newContainer) => {
        console.log('container booted')
        containerRef.current = newContainer
        await newContainer.mount(files)
        console.log('container mounted')
        if (initCommand) {
          await runCommand(newContainer, initCommand[0], initCommand.slice(1))
          console.log('container initialized')
        }
        setContainer(newContainer)
      })
      .catch((error) => {
        console.error('Failed to boot container:', error)
        isInitializingRef.current = false
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, initCommand])

  return (
    <WebContainerInitializerContext.Provider value={{ container }}>
      {children}
    </WebContainerInitializerContext.Provider>
  )
}

export function useWebContainer() {
  const context = useContext(WebContainerInitializerContext)

  if (!context) {
    throw new Error('useWebContainer must be used within a WebContainerInitializerProvider')
  }

  return context.container
}

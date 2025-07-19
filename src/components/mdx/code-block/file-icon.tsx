import { getFilenameBasedInfo } from '@/lib/mdx/code-block/get-language-from-filename'

interface FileIconProps {
  fileName: string
  className?: string
}

export function FileIcon({ fileName, className }: FileIconProps) {
  const { icon: Icon } = getFilenameBasedInfo(fileName)

  return <Icon className={className} />
}

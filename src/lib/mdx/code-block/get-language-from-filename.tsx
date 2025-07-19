import { TsConfigIcon } from '@/components/icons/tsconfig-icon'
import { File, FileCode, FileText } from 'lucide-react'
import { TbBrandJavascript, TbBrandNodejs, TbBrandTypescript } from 'react-icons/tb'

export function getExtensionFromFilename(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() ?? ''
}

export function getFilenameBasedInfo(fileName: string): {
  language: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
} {
  const extension = getExtensionFromFilename(fileName)

  if (fileName.endsWith('package.json')) {
    return {
      language: 'json',
      icon: (props) => <TbBrandNodejs {...props} color="#5aa14b" />,
    }
  }

  if (fileName.endsWith('tsconfig.json')) {
    return {
      language: 'json',
      icon: TsConfigIcon,
    }
  }

  switch (extension) {
    case 'js':
      return {
        language: 'javascript',
        icon: (props) => <TbBrandJavascript {...props} color="#e8d44e" />,
      }
    case 'ts':
      return {
        language: 'typescript',
        icon: (props) => <TbBrandTypescript {...props} color="#2f74c0" />,
      }
    case 'jsx':
      return { language: 'jsx', icon: FileCode }
    case 'tsx':
      return { language: 'tsx', icon: FileCode }
    case 'css':
      return { language: 'css', icon: FileText }
    case 'html':
      return { language: 'html', icon: FileText }
    case 'json':
      return { language: 'json', icon: FileText }
    case 'md':
      return { language: 'markdown', icon: FileText }
    case 'sh':
      return { language: 'bash', icon: FileText }
    case 'ansi':
      return { language: 'ansi', icon: FileText }
    default:
      return { language: 'plaintext', icon: File }
  }
}

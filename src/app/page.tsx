import { css } from '@/styled-system/css'
import { Button, Flex, Text } from '@radix-ui/themes'

const textStyles = css({
  color: 'var(--orange-10)',
})

export default function Home() {
  return (
    <Flex direction="column" gap="2">
      <Text className={textStyles}>Hello from Radix Themes using pada styles :)</Text>
      <Button>Let&apos;s go</Button>
    </Flex>
  )
}

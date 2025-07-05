import { SpawnOptions, WebContainer } from '@webcontainer/api'

export async function runCommand(
  container: WebContainer,
  command: string,
  args: string[],
  options?: SpawnOptions,
): Promise<ReadableStream> {
  const spawnedProcess = await container.spawn(command, args, options)
  await spawnedProcess.exit
  return spawnedProcess.output
}

/**
 * Converts a ReadableStream to a string with a 1-second timeout
 * If the stream doesn't complete within 1 second, it assumes it's done
 * This is needed because somehow `done` is false even when the stream is done
 * TODO: investigate if this is a bug in webcontainer api
 */
export async function streamToString(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader()
  let result = ''

  try {
    while (true) {
      // Create a promise that resolves with the read result
      const readPromise = reader.read()

      // Create a timeout promise that resolves after 1 second
      const timeoutPromise = new Promise<{ value: Uint8Array | undefined; done: boolean }>(
        (resolve) => {
          setTimeout(() => resolve({ value: undefined, done: true }), 1000)
        },
      )

      // Race between reading and timeout
      const { value, done } = await Promise.race([readPromise, timeoutPromise])

      if (value) {
        result += value
      }

      if (done) {
        break
      }
    }
  } finally {
    reader.releaseLock()
  }

  return result
}

export function pipeToConsole(stream: ReadableStream) {
  const writer = new WritableStream({
    write(chunk) {
      console.log(chunk)
    },
  })
  return stream.pipeTo(writer)
}

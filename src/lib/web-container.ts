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

// export function readableStreamToString(stream: ReadableStream): string {
//   let output = ''
//   const writer = new WritableStream({
//     write(chunk) {
//       console.log(chunk)
//       output += chunk
//     },
//   })
//   stream.pipeTo(writer)
//   return output
// }

export function pipeToConsole(stream: ReadableStream) {
  const writer = new WritableStream({
    write(chunk) {
      console.log(chunk)
    },
  })
  return stream.pipeTo(writer)
}

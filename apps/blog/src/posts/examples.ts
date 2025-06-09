import { FileStructure } from '../utils/code-block/types';

const multipleScriptTags = import.meta.glob('./javascript-typescript-modules-a-deep-dive/*/*', {
  query: '?raw',
  import: 'default',
});

export const examples = {
  ...(await convertToFileStructure(multipleScriptTags as Record<string, () => Promise<string>>)),
};

async function convertToFileStructure(
  files: Record<string, () => Promise<string>>,
): Promise<Record<string, FileStructure[]>> {
  const resolvedFiles = await Promise.all(
    Object.entries(files).map(async ([key, value]) => {
      const pathSegments = key.replace('./', '').split('/');
      const fileName = pathSegments.pop()!; // Get the last segment as the file name
      const folderPath = pathSegments.join('/'); // Join remaining segments as the folder path
      // Remove number prefix from file name if it exists
      const cleanFileName = fileName.replace(/^\d+-/, '');
      return {
        folder: folderPath,
        name: cleanFileName,
        content: await value(),
      };
    }),
  );

  return resolvedFiles.reduce<Record<string, FileStructure[]>>((acc, { folder, name, content }) => {
    if (!acc[folder]) {
      acc[folder] = [];
    }
    acc[folder].push({ name, content });
    return acc;
  }, {});
}

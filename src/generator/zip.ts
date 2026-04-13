import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function buildAndDownloadZip(
  fileMap: Map<string, string>,
  botName = 'discord-bot'
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder(botName);
  if (!folder) throw new Error('Failed to create ZIP folder');

  for (const [filePath, content] of fileMap.entries()) {
    folder.file(filePath, content);
  }

  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  saveAs(blob, `${botName}.zip`);
}

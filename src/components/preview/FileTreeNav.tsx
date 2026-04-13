interface FileTreeNavProps {
  fileMap: Map<string, string>;
  selectedFile: string;
  onSelectFile: (file: string) => void;
}

function buildTree(files: string[]): Record<string, string[]> {
  const tree: Record<string, string[]> = { '': [] };
  for (const file of files) {
    const parts = file.split('/');
    if (parts.length === 1) {
      tree[''].push(file);
    } else {
      const dir = parts.slice(0, -1).join('/');
      if (!tree[dir]) tree[dir] = [];
      tree[dir].push(file);
    }
  }
  return tree;
}

export function FileTreeNav({ fileMap, selectedFile, onSelectFile }: FileTreeNavProps) {
  const files = Array.from(fileMap.keys()).sort();
  const tree = buildTree(files);

  const rootFiles = tree[''] || [];
  const dirs = Object.keys(tree).filter(k => k !== '').sort();

  const fileIcon = (name: string) => {
    if (name.endsWith('.json')) return '📄';
    if (name.endsWith('.md')) return '📝';
    if (name === '.env.example') return '🔐';
    return '📜';
  };

  return (
    <div className="text-xs font-mono space-y-0.5 pr-2">
      <div className="text-gray-400 dark:text-gray-500 font-sans text-xs font-semibold uppercase tracking-wider mb-2 px-1">
        discord-bot/
      </div>

      {/* Root files */}
      {rootFiles.map(file => (
        <button
          key={file}
          onClick={() => onSelectFile(file)}
          className={`w-full text-left px-2 py-1 rounded flex items-center gap-1.5 transition-colors ${
            selectedFile === file
              ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <span>{fileIcon(file)}</span>
          <span>{file}</span>
        </button>
      ))}

      {/* Directories */}
      {dirs.map(dir => (
        <div key={dir}>
          <div className="px-2 py-1 text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <span>📁</span>
            <span>{dir}/</span>
          </div>
          {tree[dir].map(file => (
            <button
              key={file}
              onClick={() => onSelectFile(file)}
              className={`w-full text-left px-2 py-1 rounded flex items-center gap-1.5 pl-5 transition-colors ${
                selectedFile === file
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>{fileIcon(file)}</span>
              <span>{file.split('/').pop()}</span>
            </button>
          ))}
        </div>
      ))}

      {files.length === 0 && (
        <p className="text-gray-400 dark:text-gray-500 text-center py-4 font-sans">
          Select features to preview
        </p>
      )}
    </div>
  );
}

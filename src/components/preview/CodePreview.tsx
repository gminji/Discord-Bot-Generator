import { useLivePreview } from '../../hooks/useLivePreview';
import { FileTreeNav } from './FileTreeNav';
import { SyntaxPane } from './SyntaxPane';

export function CodePreview() {
  const { fileMap, selectedFile, setSelectedFile, fileContent } = useLivePreview();

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <span className="text-sm font-semibold text-white">📂 Live Preview</span>
        <span className="text-xs text-gray-400">
          {fileMap.size > 0 ? `${fileMap.size} file${fileMap.size !== 1 ? 's' : ''}` : 'No features selected'}
        </span>
      </div>

      {fileMap.size > 0 ? (
        <div className="flex flex-1 overflow-hidden">
          {/* File tree */}
          <div className="w-48 shrink-0 overflow-y-auto p-2 bg-gray-850 border-r border-gray-700 bg-gray-800/50">
            <FileTreeNav
              fileMap={fileMap}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
            />
          </div>
          {/* Code pane */}
          <div className="flex-1 overflow-auto">
            <SyntaxPane content={fileContent} filename={selectedFile} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div>
            <div className="text-5xl mb-4">🤖</div>
            <p className="text-gray-400 text-sm">
              Select features on the left to preview generated bot code
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

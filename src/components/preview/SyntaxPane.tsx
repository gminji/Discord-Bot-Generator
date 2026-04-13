import SyntaxHighlighter from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SyntaxPaneProps {
  content: string;
  filename: string;
}

function getLanguage(filename: string): string {
  if (filename.endsWith('.json')) return 'json';
  if (filename.endsWith('.md')) return 'markdown';
  if (filename === '.env.example') return 'bash';
  return 'javascript';
}

export function SyntaxPane({ content, filename }: SyntaxPaneProps) {
  const language = getLanguage(filename);

  return (
    <div className="h-full overflow-auto rounded-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 rounded-t-lg border-b border-gray-700">
        <span className="text-sm text-gray-300 font-mono">{filename}</span>
        <button
          onClick={() => navigator.clipboard.writeText(content)}
          className="text-xs text-gray-400 hover:text-gray-200 transition-colors px-2 py-1 rounded hover:bg-gray-700"
          title="Copy to clipboard"
        >
          📋 Copy
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 8px 8px',
          fontSize: '12px',
          lineHeight: '1.5',
          minHeight: '200px',
        }}
        showLineNumbers
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useSelectionStore } from '../store/selectionStore';
import { buildFileMap } from '../generator/compose';

export function useLivePreview() {
  const state = useSelectionStore();
  const [fileMap, setFileMap] = useState<Map<string, string>>(new Map());
  const [selectedFile, setSelectedFile] = useState<string>('index.js');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try {
        const map = buildFileMap(state);
        setFileMap(map);
        // Auto-select index.js if current file no longer exists
        if (!map.has(selectedFile) && map.size > 0) {
          setSelectedFile(map.keys().next().value ?? 'index.js');
        }
      } catch {
        // Silently ignore preview errors
      }
    }, 150);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [state, selectedFile]);

  const fileContent = fileMap.get(selectedFile) ?? '// Select a file to preview';

  return { fileMap, selectedFile, setSelectedFile, fileContent };
}

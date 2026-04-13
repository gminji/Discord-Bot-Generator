import { useState, useCallback } from 'react';
import { useSelectionStore } from '../store/selectionStore';
import { buildFileMap } from '../generator/compose';
import { buildAndDownloadZip } from '../generator/zip';

export function useGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const state = useSelectionStore();

  const generate = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const fileMap = buildFileMap(state);
      await buildAndDownloadZip(fileMap, 'discord-bot');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate bot');
    } finally {
      setIsGenerating(false);
    }
  }, [state]);

  return { generate, isGenerating, error };
}

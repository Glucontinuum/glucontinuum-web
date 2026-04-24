import { useState, useEffect } from 'react';
import type { GitHubRelease } from '../services/github';
import { fetchReleases } from '../services/github';

export function useReleases(owner: string, repo: string) {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getReleases() {
      try {
        setLoading(true);
        const data = await fetchReleases(owner, repo);
        setReleases(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }

    if (owner && repo) {
      getReleases();
    }
  }, [owner, repo]);

  return { releases, loading, error };
}

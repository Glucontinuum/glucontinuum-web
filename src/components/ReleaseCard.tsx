import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import type { GitHubRelease } from '../services/github';
import styles from './ReleaseCard.module.css';
import { Download, ExternalLink, Calendar } from 'lucide-react';

interface ReleaseCardProps {
  release: GitHubRelease;
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({ release }) => {
  const publishedDate = format(new Date(release.published_at), 'MMMM d, yyyy');

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.tagName}>{release.tag_name}</h2>
          <span className={styles.date}>
            <Calendar size={14} className={styles.icon} />
            {publishedDate}
          </span>
        </div>
        {release.name && release.name !== release.tag_name && (
          <h3 className={styles.name}>{release.name}</h3>
        )}
      </header>

      <div className={styles.body}>
        <ReactMarkdown>{release.body}</ReactMarkdown>
      </div>

      {release.assets.length > 0 && (
        <section className={styles.assets}>
          <h4 className={styles.assetsTitle}>Downloads</h4>
          <ul className={styles.assetList}>
            {release.assets.map((asset) => (
              <li key={asset.id} className={styles.assetItem}>
                <a
                  href={asset.browser_download_url}
                  className={styles.assetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={16} />
                  <span className={styles.assetName}>{asset.name}</span>
                  <span className={styles.assetSize}>
                    ({(asset.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className={styles.footer}>
        <a 
          href={release.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.viewOnGithub}
        >
          View Release on GitHub <ExternalLink size={14} />
        </a>
      </footer>
    </article>
  );
};

export default ReleaseCard;

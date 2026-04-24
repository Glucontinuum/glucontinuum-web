import React from 'react';
import styles from './Header.module.css';
import { ExternalLink } from 'lucide-react';

interface HeaderProps {
  owner: string;
  repo: string;
  description?: string;
}

const Header: React.FC<HeaderProps> = ({ owner, repo, description }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{repo}</h1>
      {description && <p className={styles.description}>{description}</p>}
      <a 
        href={`https://github.com/${owner}/${repo}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.githubLink}
      >
        <ExternalLink size={18} />
        <span>View on GitHub</span>
      </a>
    </header>
  );
};

export default Header;

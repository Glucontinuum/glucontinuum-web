import React from 'react';
import styles from './Header.module.css';
import { ExternalLink, Box, ShieldCheck, Zap } from 'lucide-react';

interface HeaderProps {
  owner: string;
  repo: string;
}

const Header: React.FC<HeaderProps> = ({ owner, repo }) => {
  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <div className={styles.badge}>v1.0.0 Stable</div>
        <h1 className={styles.title}>Glucontinuum</h1>
        <p className={styles.tagline}>
          Intelligent glucose monitoring and control. Built for metabolic health, 
          powered by Hexagonal Architecture and Material Design 3.
        </p>
        
        <div className={styles.actions}>
          <a href="#releases" className={styles.primaryBtn}>Get the App</a>
          <a 
            href={`https://github.com/${owner}/${repo}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
          >
            <ExternalLink size={18} />
            Source Code
          </a>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.featureCard}>
          <Box className={styles.featureIcon} size={24} />
          <h3>Multiplatform</h3>
          <p>Deploy as PWA or Native Android from a single codebase.</p>
        </div>
        <div className={styles.featureCard}>
          <ShieldCheck className={styles.featureIcon} size={24} />
          <h3>Sustainable</h3>
          <p>Hexagonal architecture for strict domain isolation and long-term health.</p>
        </div>
        <div className={styles.featureCard}>
          <Zap className={styles.featureIcon} size={24} />
          <h3>Intelligent</h3>
          <p>Smart insulin and carb calculations with IndexedDB persistence.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

import Header from './components/Header';
import ReleaseCard from './components/ReleaseCard';
import { useReleases } from './hooks/useReleases';
import './App.css';

const REPO_OWNER = 'Glucontinuum';
const REPO_NAME = 'glucontinuum-web';

function App() {
  const { releases, latestRelease, loading, error } = useReleases(REPO_OWNER, REPO_NAME);

  return (
    <div className="container">
      <Header owner={REPO_OWNER} repo={REPO_NAME} latestRelease={latestRelease} />
      
      <main id="releases">
        <h2 className="release-section-title">Latest Releases</h2>
        
        {loading && (
          <div className="status">
            <p>Fetching the latest builds...</p>
          </div>
        )}

        {error && (
          <div className="status error">
            <p><strong>Error:</strong> {error}</p>
            <p className="hint">The repository might be private or the GitHub API rate limit was reached.</p>
          </div>
        )}

        {!loading && !error && releases.length === 0 && (
          <div className="status">
            <p>No public releases found yet. Check back soon!</p>
          </div>
        )}

        <div className="release-list">
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </main>

      <footer className="page-footer">
        <p>© {new Date().getFullYear()} Glucontinuum Project</p>
        <p>Intelligent metabolic health monitoring.</p>
        <div className="footer-links">
          <a href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`}>GitHub</a>
          <a href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/issues`}>Report an Issue</a>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;

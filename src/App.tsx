import Header from './components/Header';
import ReleaseCard from './components/ReleaseCard';
import { useReleases } from './hooks/useReleases';
import './App.css';

const REPO_OWNER = 'Glucontinuum';
const REPO_NAME = 'Glucontinuum';

function App() {
  const { releases, loading, error } = useReleases(REPO_OWNER, REPO_NAME);

  return (
    <div className="container">
      <Header 
        owner={REPO_OWNER} 
        repo={REPO_NAME} 
        description="Release history and downloads for the Glucontinuum project."
      />
      
      <main>
        {loading && (
          <div className="status">
            <p>Loading releases...</p>
          </div>
        )}

        {error && (
          <div className="status error">
            <p>Error: {error}</p>
            <p className="hint">Make sure the repository is public and the name is correct.</p>
          </div>
        )}

        {!loading && !error && releases.length === 0 && (
          <div className="status">
            <p>No releases found for this repository.</p>
          </div>
        )}

        <div className="release-list">
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </main>

      <footer className="page-footer">
        <p>© {new Date().getFullYear()} Glucontinuum. Built with minimalist intent.</p>
      </footer>
    </div>
  );
}

export default App;

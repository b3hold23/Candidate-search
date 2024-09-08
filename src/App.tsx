import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import GitHubProfile from './interfaces/Candidate.interface';

function App() {
  return (
    <>
      <Nav />
      <main>
        <GitHubProfile />
        <Outlet />
      </main>
    </>
  );
}

export default App;

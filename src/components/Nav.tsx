
const Nav = () => {
  return (
    <nav>

      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link active" href="/CandidateSearch">Home</a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" href="/SavedCandidates">Saved Candidates</a>
        </li>
      </ul>

    </nav>
  )
};

export default Nav;
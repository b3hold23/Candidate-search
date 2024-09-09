import { useState, useEffect } from 'react';
import CandidateProfile from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<CandidateProfile[]>([]);

  useEffect(() => {
    // Load potential candidates from local storage
    const savedCandidates = localStorage.getItem('potentialCandidates');
    if (savedCandidates) {
      setPotentialCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  const handleClearCandidates = () => {
    setPotentialCandidates([]);
    localStorage.removeItem('potentialCandidates');
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {potentialCandidates.length > 0 ? (
        <ul>
          {potentialCandidates.map((candidate) => (
            <li key={candidate.login}>
              <h3>{candidate.login}</h3>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>Company: {candidate.company}</p>
              <img src={candidate.avatar} alt={`${candidate.login}'s avatar`} width="50" />
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates have been accepted.</p>
      )}
      {potentialCandidates.length > 0 && (
        <button onClick={handleClearCandidates}>Clear Potential Candidates</button>
      )}
    </div>
  );
};

export default SavedCandidates;

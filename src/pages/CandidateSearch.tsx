import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API'; // API functions
import CandidateProfile from '../interfaces/Candidate.interface';
import { useNavigate } from 'react-router-dom'; // for navigation

const CandidateSearch = () => {
  const [users, setUsers] = useState<CandidateProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [potentialCandidates, setPotentialCandidates] = useState<CandidateProfile[]>([]);
  
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    // Fetch candidates from GitHub API
    const fetchUsers = async () => {
      const data = await searchGithub();
      const candidateData = data.map((user: CandidateProfile) => ({
        username: user.login,
        location: user.location || 'Somewhere on Earth',
        email: user.email || 'N/A',
        company: user.company || 'N/A',
        bio: user.bio || 'N/A',
        avatar: user.avatar_url || '',
        html_url: user.html_url || '',
      }));
      setUsers(candidateData);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    // Load potential candidates from local storage
    const savedCandidates = localStorage.getItem('potentialCandidates');
    if (savedCandidates) {
      setPotentialCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  const handleSave = () => {
    if (users.length > 0 && currentIndex < users.length) {
      const candidate = users[currentIndex];
      const updatedPotentialCandidates = [...potentialCandidates, candidate];
      setPotentialCandidates(updatedPotentialCandidates);
      localStorage.setItem('potentialCandidates', JSON.stringify(updatedPotentialCandidates));
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentCandidate = users[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div>
          <h2>{currentCandidate.login}</h2>
          <p>Name: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <p>Bio: {currentCandidate.bio}</p>
          <img src={currentCandidate.avatar} alt={`${currentCandidate.login}'s avatar`} width="100" />
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
          <div>
            <button onClick={handleSave}>+</button>
            <button onClick={handleSkip}>-</button>
          </div>
          <button onClick={() => navigate('/saved-candidates')}>View Saved Candidates</button>
        </div>
      ) : (
        <p>No more candidates available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;

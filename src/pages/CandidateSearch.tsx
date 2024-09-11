import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import CandidateProfile from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
  const [users, setUsers] = useState<CandidateProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [potentialCandidates, setPotentialCandidates] = useState<CandidateProfile[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await searchGithub();
      const detailedUsers = await Promise.all(
        data.map(async (user: CandidateProfile) => {
          const userDetailsResponse = await fetch(`https://api.github.com/users/${user.login}`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          });
          const userDetails = await userDetailsResponse.json();
  
          return {
            username: userDetails.login,
            location: userDetails.location || 'Somewhere on Earth',
            email: userDetails.email || 'N/A',
            company: userDetails.company || 'N/A',
            bio: userDetails.bio || 'N/A',
            avatar: userDetails.avatar_url || '',
            html_url: userDetails.html_url || '',
          };
        })
      );
      setUsers(detailedUsers); 
    };
  
    fetchUsers();
  }, []);

  useEffect(() => {
   
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
          <img src={currentCandidate.avatar} alt={`${currentCandidate.username}'s avatar`} width="100" /> 
          <h2>{currentCandidate.username}</h2> 
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <p>Bio: {currentCandidate.bio}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
          <div>
            <button onClick={handleSave}>+</button>
            <button onClick={handleSkip}>-</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;

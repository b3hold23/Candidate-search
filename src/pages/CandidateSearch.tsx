import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateProfile from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [users, setUser] = useState<CandidateProfile[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await searchGithub();

      const candidateData = data.map((user: any) => ({
        username: user.login,
        location: user.location || 'Somewhere on Earth',
        email: user.email || 'N/A',
        company: user.company || 'N/A',
        bio: user.bio || 'N/A',
      }))
      setUser(candidateData);  
    };
    fetchUsers();
  }, []);
  return (
    <div>
    <h1>Candidate Search</h1>
    <div>
      {users.map((user) => (
        <div key={user.username}>
          <h2>{user.username}</h2>
          <p>Location: {user.location}</p>
          <p>Email: {user.email}</p>
          <p>Company: {user.company}</p>
          <p>Bio: {user.bio}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default CandidateSearch;

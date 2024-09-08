import React from "react";
import { useNavigate } from "react-router-dom";

interface GitHubUser {
  avatar_url: string;
  login: string;
  email: string | null;
  company: string | null;
  bio: string | null;
}
const SavedCandidates: React.FC = () => {
  const navigate = useNavigate();
  const acceptedProfile = localStorage.getItem('acceptedProfile');
  const user: GitHubUser | null = acceptedProfile ? JSON.parse(acceptedProfile) : null;

  if (!user) {
    return <p>No accepted profiles found</p>;
  }
  
return (
    <>
      <h1>Potential Candidates</h1>
      <img src={user.avatar_url} alt={user.login} width={150} />
      <p>Username: {user.login}</p>
      <p>Email: {user.email || 'No email provided'}</p>
      <p>Company: {user.company || 'No company listed'}</p>
      <p>Bio: {user.bio || 'No bio available'}</p>
      <button onClick={() => navigate('/')}>Go Back</button>
    </>
  );
};

export default SavedCandidates;
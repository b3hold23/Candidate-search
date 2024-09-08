// TODO: Create an interface for the Candidate objects returned by the API
import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

interface GitHubUser {
    avatar_url: string;
    login: string;
    name?: string;
    location?: string;
    email?: string;
    company?: string;
    bio?: string;
  }

const GitHubProfile: React.FC = () => {
    const [user, setUser] = useState<GitHubUser | null> (null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchGitHubProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.github.com/users/octocat`);
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            const data: GitHubUser = await response.json();
            setUser(data);
            setLoading(false);
        } catch (err) {
            setError('Could not fetch profile');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGitHubProfile();
    }, []);

    const handleAccept = () => {
        localStorage.setItem('acceptedProfile', JSON.stringify(user));
        navigate('/accepted');
    };

    const handleReject = () => {
        fetchGitHubProfile();
    };

    if (loading) {
        return <p>Loading Profile...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        user && (
            <main className='candidate-profile'>
            <h1>Candidate Profile</h1>

            <div className='profile-card'>
            <img src={user.avatar_url} alt={user.login} width={250} />
            <div className='profile-info'>
            <p>Username: {user.login}</p>
            <p>Location: {user.location}</p>
            <p>Email: <a>{user.email || 'No email provided'}</a> </p>
            <p>Company: {user.company || 'No company listed'}</p>
            <p>Bio: {user.bio || 'No bio available'}</p>
            </div>
    
            <div className='action-buttons'>
            <button className='add-button' onClick={handleAccept}>+</button>
            <button className='remove-button' onClick={handleReject}>-</button>
            </div>
            </div>

          </main>
        )
    );
};

export default GitHubProfile;
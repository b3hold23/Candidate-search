// TODO: Create an interface for the Candidate objects returned by the API
import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

interface GitHubUser {
    avatar_url: string;
    login: string;
    email: string | null;
    company: string | null;
    bio: string | null;
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
            <div>
            <h1>GitHub Profile</h1>
            <img src={user.avatar_url} alt={user.login} width={150} />
            <p>Username: {user.login}</p>
            <p>Email: {user.email || 'No email provided'}</p>
            <p>Company: {user.company || 'No company listed'}</p>
            <p>Bio: {user.bio || 'No bio available'}</p>
    
            {/* Accept/Reject Buttons */}
            <button onClick={handleAccept}>Accept</button>
            <button onClick={handleReject}>Reject</button>
          </div>
        )
    );
};

export default GitHubProfile;
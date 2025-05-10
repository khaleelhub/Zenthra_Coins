import { useState, useEffect } from 'react';
import { auth, db, onAuthStateChanged, doc, getDoc, setDoc } from '/src/firebase.js';// import Firebase functions
import '../style/UserProfile.css';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState({});
    const [location, setLocation] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [bio, setBio] = useState('');
    const [lastLogin, setLastLogin] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    

    // Get device info and location on component mount
    useEffect(() => {
        const getDeviceInfo = () => {
            const userAgent = navigator.userAgent;
            const platform = navigator.platform;
            setDeviceInfo({ userAgent, platform });
        };

        const getLocation = async () => {
            try {
                const response = await fetch('https://ipinfo.io?token=YOUR_TOKEN'); // Replace with a valid API token
                const data = await response.json();
                setLocation(data.city || data.country);
            } catch (error) {
                console.error("Failed to fetch location:", error);
            }
        };

        getDeviceInfo();
        getLocation();

        // Check if user is logged in and fetch their data
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                setIsLoggedIn(true);

                // Get user data from Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUsername(userDoc.data().username || 'John Doe');
                    setBalance(userDoc.data().balance || 100);
                    setBio(userDoc.data().bio || '');
                }
                const currentTime = new Date().toLocaleString();
                setLastLogin(currentTime);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    const handleSave = async () => {
        setEditMode(false);

        // Update Firestore with new username, balance, and bio
        if (userId) {
            const userDocRef = doc(db, 'users', userId);
            await setDoc(userDocRef, {
                username,
                balance,
                bio,
            }, { merge: true });

            alert('Profile Updated!');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        alert('You have logged out');
        localStorage.clear();
        navigate('/SignIn')
        
    };
    const btnWallet = () => {
        navigate('/Wallet')
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>

            <div className="profile-info">
                {/* Username */}
                <div className="profile-item">
                    <label htmlFor="username">Username:</label>
                    {editMode ? (
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    ) : (
                        <span>{username}</span>
                    )}
                </div>

                {/* Balance */}
                <div className="profile-item">
                    <label htmlFor="balance">Balance:</label>
                    {editMode ? (
                        <input
                            type="number"
                            id="balance"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                        />
                    ) : (
                        <span>${balance}</span>
                    )}
                </div>

                {/* Bio */}
                <div className="profile-item">
                    <label htmlFor="bio">Bio:</label>
                    {editMode ? (
                        <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    ) : (
                        <span>{bio}</span>
                    )}
                </div>

                {/* Last Login */}
                <div className="profile-item">
                    <label>Last Login:</label>
                    <span>{lastLogin}</span>
                </div>

                {/* Device Info */}
                <div className="profile-item">
                    <label>Device Info:</label>
                    <span>{deviceInfo.userAgent} ({deviceInfo.platform})</span>
                </div>

                {/* Location */}
                <div className="profile-item">
                    <label>Location:</label>
                    <span>{location}</span>
                </div>

                {/* Profile Picture */}
                <div className="profile-item">
                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        onChange={(e) => setProfilePicture(URL.createObjectURL(e.target.files[0]))}
                    />
                    {profilePicture && <img src={profilePicture} alt="Profile" width="100" />}
                </div>
            </div>

            {/* Actions */}
            <div className="profile-actions">
                {editMode ? (
                    <button className="save-button" onClick={handleSave}>
                        Save Changes
                    </button>
                ) : (
                    <button className="edit-button" onClick={() => setEditMode(true)}>
                        Edit Profile
                    </button>
                )}

                {isLoggedIn && (
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                )}
                <button type='button' className='btn-wallet' onClick={btnWallet}>Wallet</button>
            </div>
        </div>
    );
};

export default UserProfile;

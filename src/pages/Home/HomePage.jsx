import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import '../style/HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [userName, setUserName] = useState('');
    const [zenBalance, setZenBalance] = useState(0);
    const [adsBalance, setAdsBalance] = useState(0);
    const [activityLog, setActivityLog] = useState([]);
    const [activeUsers, setActiveUsers] = useState(0);
    const [news, setNews] = useState([]);
    
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserName(user.displayName || 'User');
            const userRef = doc(db, 'users', user.uid);

            getDoc(userRef).then(docSnap => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setZenBalance(data.zenBalance || 0);
                    setAdsBalance(data.adsBalance || 0);
                    setActivityLog(data.activity || []);
                }
            });

            // Fake count for active users (replace with real-time tracking if needed)
            setActiveUsers(Math.floor(Math.random() * 10000000 + 1));

            // News placeholder
            setNews([
                { id: 1, title: "🎉 New Feature Coming Soon!", detail: "Daily Missions launching this weekend." },
                { id: 2, title: "📢 Maintenance Alert", detail: "System maintenance on May 15, 2am–4am UTC." },
            ]);
        }
    }, []);

    const profile = () => {
        navigate('/Userprofile');
    };

    const Earn = () => {
        navigate('/ads')
    };
    return (
        <div className="dashboardContainer">
            <h1 className="welcomeTitle">👋 Welcome, {userName}</h1>

            <div className="dashboardStats">
                <div className="statCard">
                    <h3>Zenthra Wallet</h3>
                    <p>Z{zenBalance}</p>
                </div>
                <div className="statCard">
                    <h3>Ad Rewards</h3>
                    <p>Z{adsBalance}</p>
                </div>
                <div className="statCard">
                    <h3>Active Users</h3>
                    <p>{activeUsers} online</p>
                </div>
            </div>

            <div className="activitySection">
                <h2>📜 Your Recent Activities</h2>
                {activityLog.length > 0 ? (
                    <ul>
                        {activityLog.slice(-5).reverse().map((log, idx) => (
                            <li key={idx}>{log}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No recent activity recorded.</p>
                )}
            </div>

            <div className="newsSection">
                <h2>📰 News & Announcements</h2>
                {news.map(item => (
                    <div key={item.id} className="newsCard">
                        <h4>{item.title}</h4>
                        <p>{item.detail}</p>
                    </div>
                ))}
            </div>

            <div className="featureGrid">
                <h2>🧩 Coming Features</h2>
                <div className='featureCard'>Just Keep Try </div>
            </div>

            <div>
                <button type="button" onClick={profile} className="btnProfile">Go to Profile</button>
                <button type="button" onClick={Earn} className="btnProfile">Earn </button>
            </div>
        </div>
    );
};

export default HomePage;

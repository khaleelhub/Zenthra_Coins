import { useEffect, useState } from 'react';
import '../style/infor.css';
import { getAuth } from 'firebase/auth';



// Infor.js
const Infor = () => {
    const [username, setUsername] = useState();
    const auth = getAuth()


    useEffect(() => {
        const user = auth.currentUser
        if(user) {
            setUsername(user.displayName || 'User');
        }
  }, [auth.currentUser]);

    return (
        <div style={{ fontFamily: 'Poppins, sans-serif', padding: '1px', lineHeight: '1.8', maxWidth: '800px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
            <h1>Hello - {username}</h1>
            <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', textAlign: 'center', marginBottom: '20px' }}>Welcome to Zenthra Wallet</h1>

            <p style={{ fontSize: '1.1rem', color: '#34495e', marginBottom: '20px' }}>
                This platform allows users to interact with a custom currency called <strong>Zenthra</strong>.
                Our symbol for Zenthra is <span style={{ fontWeight: 'bold', color: '#1abc9c' }}>Z<sup style={{ display: 'inline-block', transform: 'rotate(180deg)', marginLeft: '2px', color: '#1abc9c' }}>▲</sup></span>, 
                a stylish representation that combines the letter 'Z' with an upside-down triangle.
            </p>

            <h2 style={{ color: '#2c3e50' }}>How It Works</h2>
            <ul style={{ color: '#34495e', paddingLeft: '20px' }}>
                <li><strong>Create an Account:</strong> Start by signing up and logging into your wallet.</li>
                <li><strong>Earn Zenthra:</strong> You can earn Zenthra through several activities such as:
                    <ul style={{ paddingLeft: '20px' }}>
                        <li>Watching ads</li>
                        <li>Completing tasks</li>
                        <li>Referral bonuses</li>
                    </ul>
                </li>
                <li><strong>Spend or Transfer:</strong> You can use your earned Zenthra to purchase services, send it to other users, or withdraw when available.</li>
                <li><strong>Track Transactions:</strong> All your activities and earnings are stored and shown in your history for transparency.</li>
            </ul>

            <h2 style={{ color: '#2c3e50' }}>Your Wallet</h2>
            <p style={{ color: '#34495e' }}>
                Your wallet displays your total Zenthra balance, recent transactions, and earning status. You’ll always know where your coins come from and where they go.
            </p>

            <h2 style={{ color: '#2c3e50' }}>Stay Active!</h2>
            <p style={{ color: '#34495e' }}>
                The more you engage, the more Zenthra you earn. Watch ads daily, invite friends, and complete challenges to level up and unlock rewards.
            </p>

            {/* New Features Section */}
            <h2 style={{ color: '#2c3e50', marginTop: '30px' }}>New Features</h2>
            <ul style={{ color: '#34495e', paddingLeft: '20px' }}>
                <li><strong>1. Referral Program:</strong> Invite friends and earn a percentage of their earnings as a reward.</li>
                <li><strong>2. Daily Challenges:</strong> Participate in daily challenges to boost your earnings and unlock bonuses.</li>
                <li><strong>3. Coin Withdrawals:</strong> You can withdraw your Zenthra to your personal account or other wallets after reaching a certain limit.</li>
                <li><strong>4. Multiple Payment Options:</strong> Choose from multiple payment methods such as bank transfer, ATM card, or mobile payment for seamless transactions.</li>
                <li><strong>5. Interactive Progress Bars:</strong> Track your earnings with real-time progress bars showing how close you are to your next reward or milestone.</li>
                <li><strong>6. Personalized Dashboard:</strong> Your dashboard customizes itself based on your activity. It will show your most used features and shortcuts for a more efficient experience.</li>
                <li><strong>7. Special Offers & Discounts:</strong> Earn extra Zenthra by participating in special offers, such as limited-time discounts or promotional campaigns.</li>
                <li><strong>8. Rewards for Engagement:</strong> Engage in the community by leaving reviews, participating in polls, or watching ads to earn additional Zenthra.</li>
                <li><strong>9. VIP Member Status:</strong> Become a VIP member by earning a certain amount of Zenthra and enjoy exclusive benefits, such as higher earnings or early access to features.</li>
                <li><strong>10. Multi-Language Support:</strong> Choose your preferred language to navigate the platform easily, making it more accessible for global users.</li>
            </ul>

            {/* CSS Styles for Enhanced Layout and Animation */}
            <div style={{ marginTop: '50px', padding: '20px', borderRadius: '12px', background: '#ffffff', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', animation: 'fadeIn 1s ease-in-out' }}>
                <h3 style={{ textAlign: 'center', color: '#2c3e50' }}>Watch This Space</h3>
                <p style={{ color: '#34495e', fontSize: '1rem', textAlign: 'center' }}>
                    Stay tuned for upcoming features and new ways to earn Zenthra! We are constantly improving and adding more to make your experience even better.
                </p>
            </div>
        </div>
    );
};

export default Infor;

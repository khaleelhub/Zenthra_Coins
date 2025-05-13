import '../style/zenthra.css';
import { useEffect, useState } from 'react';
import { auth, db } from '/src/firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Features:
// - 3D animated "Z" with hover circle and responsive design
// - User balance and claim button (0.000001 Zenthra/hour)
// - Firebase storage for balance and claim time
// - Progress bar for next claim
// - Email/SMS notification every 10 hours
// - Mobile vibration on hover
// - All animations and UI responsive to screen size

const Zenthra = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [lastClaim, setLastClaim] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const claimAmount = 0.000001;

  // Load user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setUser(u);
        const ref = doc(db, 'users', u.uid);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBalance(data.balance || 0);
          setLastClaim(data.lastClaim || 0);
        } else {
          await setDoc(ref, {
            name: u.displayName,
            email: u.email,
            phone: u.phoneNumber || '',
            balance: 0,
            lastClaim: 0,
            history: [],
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastClaim;
      const percent = Math.min((elapsed / 3600000) * 100, 100);
      setProgress(percent);
      setCanClaim(elapsed >= 3600000);

      if (elapsed >= 36000000 && user) {
        // TODO: email/SMS logic
        console.log(`🔔 Notify ${user.email || user.phoneNumber} every 10 hours`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastClaim, user]);

  // Claim coins
  const handleClaim = async () => {
    const now = Date.now();
    if (!canClaim) return alert('🕒 Wait until next hour');
  
    const ref = doc(db, 'users', user.uid);
    const docSnap = await getDoc(ref);
    const data = docSnap.data();
    const existingHistory = data.history || [];
  
    const newBalance = data.balance + claimAmount;
    const newHistoryEntry = {
      time: now,
      amount: claimAmount,
    };
  
    await setDoc(ref, {
      ...data,
      balance: newBalance,
      lastClaim: now,
      history: [...existingHistory, newHistoryEntry],
    });
  
    setBalance(newBalance);
    setLastClaim(now);
    alert('✅ Claimed 0.000001 Zenthra!');
  };
  

  return (
    <div className="container">
      <div
        className="z-wrapper"
        onMouseEnter={() => {
          if (!/Mobi|Android/i.test(navigator.userAgent)) {
            document.querySelector('.z-wrapper').classList.add('hovered');
          }
        }}
        onMouseLeave={() => {
          document.querySelector('.z-wrapper').classList.remove('hovered');
        }}
        onTouchStart={() => navigator.vibrate?.(100)}
      >
        <h1 className="z">Z</h1>
        <div className="circle"></div>
      </div>

      {user && (
        <div className="info">
          <h2>👋 Hello, {user.displayName}</h2>
          <p>💰 Balance: {balance.toFixed(6)} Zenthra</p>
          <button className='buttonBTN' onClick={handleClaim} disabled={!canClaim}>
            {canClaim ? '🎁 Claim Zenthra' : '⏳ Wait...'}
          </button>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Zenthra;

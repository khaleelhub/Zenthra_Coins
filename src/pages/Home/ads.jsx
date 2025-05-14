// File: Ads.jsx

import React, { useEffect, useState } from 'react';
import { db, auth } from '/src/firebase.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import GoogleAd from './GoogleAd';
import '../style/Ads.css';
import { getAuth } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

const Ads = () => {
    const [firebaseAds, setFirebaseAds] = useState([]);
    const [adIndex, setAdIndex] = useState(0);
    const [showGoogleAd, setShowGoogleAd] = useState(true);
    const [canEarn, setCanEarn] = useState(false);
    const [coinsEarned, setCoinsEarned] = useState(0);
    const [username, setUserName] = useState();


    const Auth = getAuth()
    const navigate = useNavigate();
  
    const user = auth.currentUser;
  
    useEffect(() => {
      const fetchAds = async () => {
        const adsSnap = await getDoc(doc(db, 'ads', 'active'));
        if (adsSnap.exists()) {
          const ads = adsSnap.data().items;
          setFirebaseAds(ads);
        }
      };
  
      fetchAds();
      const timer = setTimeout(() => setShowGoogleAd(false), 10000); // Google Ad shows for 10s
      return () => clearTimeout(timer);
    }, []);
  
    const handleClick = async () => {
      if (!canEarn || !user) return;
  
      const coinValue = 0.001;
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      const currentCoins = snap.exists() ? snap.data().coins || 0 : 0;
  
      await updateDoc(userRef, {
        coins: parseFloat((currentCoins + coinValue).toFixed(3))
      });
  
      setCoinsEarned(prev => parseFloat((prev + coinValue).toFixed(3)));
      setCanEarn(false);
    };
  
    const handleNext = () => {
      setAdIndex((prev) => (prev + 1) % firebaseAds.length);
      setCanEarn(true);
    };
  
    const backToHome = () => {
        navigate('/HomePage')
    }


    useEffect(() => {
  
      const User  = Auth.currentUser
      if(user) {
        setUserName(User.displayName || "User")
      }
    }, [Auth.currentUser, user])
    return (
      <div className="adsContainer">
        <button type="button" onClick={backToHome} className='backToHome'> Back To Home </button>
        <h1>{username}</h1>
        {showGoogleAd ? (
          <div className="googleAdBox">
            <GoogleAd />
            <p className="adNotice">Ad from our partner</p>
          </div>
        ) : firebaseAds.length > 0 ? (
          <div className="customAdBox">
            <img
              src={firebaseAds[adIndex].img}
              className="adImage"
              alt="Ad"
            />
            <h3>{firebaseAds[adIndex].title}</h3>
            <p>{firebaseAds[adIndex].desc}</p>
  
            <button
              onClick={handleClick}
              disabled={!canEarn}
              className="earnBtn"
            >
              {canEarn ? 'Earn 0.001 Zenthreah' : 'Please wait...'}
            </button>
  
            <button onClick={handleNext} className="nextBtn">
              Next Ad
            </button>
  
            <p className="earnedText">
              Total Earned: {coinsEarned.toFixed(3)} Zenthreah
            </p>
          </div>
        ) : (
          <p>Loading ads...</p>
        )}
      </div>
    );
  };
  
  export default Ads;
import './App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import z from './assets/images/z.png';
import traiShap from './assets/images/triangle.png';
import './index.css';

function App() {
  const navigate = useNavigate();
  const [isDaytime, setIsDaytime] = useState(true); 

  useEffect(() => {
   
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 18) {
      
      document.body.classList.add('daytime');
      document.body.classList.remove('nighttime');
      setIsDaytime(true);
    } else {
      document.body.classList.add('nighttime');
      document.body.classList.remove('daytime');
      setIsDaytime(false);
    }
  }, []);

  const DarkAndLightBackground = () => {
    console.log('🌓 Toggling background (dark/light)');
    if (isDaytime) {
      document.body.classList.remove('daytime');
      document.body.classList.add('nighttime');
    } else {
      document.body.classList.remove('nighttime');
      document.body.classList.add('daytime');
    }
    setIsDaytime(!isDaytime); // flip
  };

  const handleStartClick = () => {
    navigate('/SignIn');
  };

  return (
    <>
      <div className="titleBox" onClick={DarkAndLightBackground}>
        <h1 className="title">
          <span className="Z">Z</span>enthra
        </h1>
        <p className="subTitle">Easy way to get thrans</p>
        <span className="burderLine"></span>
      </div>

      <div className="ImageContainer">
        <img src={z} alt="Zenthra" className="zenthra" />
        <div className="space" />
        <img src={traiShap} alt="Triangle Shape" className="traiShap" />
      </div>

      <button type="button" className="BtnStart" onClick={handleStartClick}>
        Start
      </button>
    </>
  );
}

export default App;

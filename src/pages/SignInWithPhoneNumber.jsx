import React, { useState, useEffect } from 'react';
import { FaBackward } from 'react-icons/fa';
import './style/SignInWithPhoneNumber.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'; // <-- important

function SignInWithPhoneNumber() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Initialize reCAPTCHA when component loads
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible', // or 'normal'
      'callback': () => {
        console.log('Recaptcha Resolved');
      },
      'expired-callback': () => {
        console.log('Recaptcha expired');
      }
    });
  }, [auth]);

  const handleBackWord = () => {
    navigate('/SignIn');
  };

  const handleSendOtp = async () => {
    setError('');
    if (!phone.startsWith('+')) {
      setError('Phone number must start with country code (e.g., +1, +234)');
      return;
    }
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      console.log('OTP sent successfully!');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    if (!confirmationResult) {
      setError('Please request OTP first');
      return;
    }
    try {
      await confirmationResult.confirm(otp);
      console.log('Phone number verified successfully!');
      // Now you can navigate to home page or dashboard
      navigate('/HomePage');
    } catch (err) {
      console.error(err);
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="signInContainer">

      <p className='bankWord' onClick={handleBackWord}>
        Back to SignIn Options <FaBackward className='Fabackword' />
      </p>

      <div id="recaptcha-container"></div> {/* Invisible but important */}

      {confirmationResult ? (
        <div className="otpVerification">
          <h3>Enter the OTP sent to your phone:</h3>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="otpInput"
          />
          <button onClick={handleVerifyOtp} className="verifyOtpBtn">
            Verify OTP
          </button>
        </div>
      ) : (
        <div className="phoneInput">
          <h3>Enter your phone number:</h3>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number (with country code)"
            className="phoneInputField"
          />
          <button onClick={handleSendOtp} className="sendOtpBtn">
            Send OTP
          </button>
        </div>
      )}

      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
}

export default SignInWithPhoneNumber;

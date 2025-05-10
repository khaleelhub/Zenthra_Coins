import { useState } from 'react';
import { FaBackward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // ✅ Import Firebase Auth
import './style/EmailSignIn.css';

const EmailSignIn = () => {
  const navigate = useNavigate();
  const auth = getAuth(); // ✅ Get Firebase Auth instance

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBackToSignInOption = () => {
    navigate('/SignIn');
  };

  const handleEmailSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Signed in successfully:', user);
      // ✅ Redirect after successful login (optional)
      navigate('/HomePage'); // or any page you want
    } catch (error) {
      console.error('Error signing in:', error.message);
      alert('Failed to sign in. Please check your email and password.');
    }
  };

  return (
    <>
      <div className="Card">
        <h1 className="Title">Sign In With Email And Password</h1>
        <p className="Subtitle">Get Started With Zenthra</p>
      </div>

      <div className="InputsCard">
        <input 
          type="email" 
          placeholder="Email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button type="button" className="EmailBtn" onClick={handleEmailSignIn}>
            Sign In
          </button>
        </div>
      </div>

      <p className="backToSign" onClick={handleBackToSignInOption}>
        Back To Sign Options <FaBackward className="Fabckword" />
      </p>
      <div className="termsAndConditions">
                <p>
                    By creating an account, you agree to our{' '}
                    <span className="termsLink">Terms and Conditions</span> and{' '}
                    <span className="privacyLink">Privacy Policy</span>.
                </p>
            </div>
    </>
  );
};

export default EmailSignIn;

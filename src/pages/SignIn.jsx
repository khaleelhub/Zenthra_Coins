import '../firebase.js'
import { FaGoogle, FaEnvelope, FaPhone } from 'react-icons/fa';
import './style/SignIn.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import Firebase auth

const SignIn = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed in:', user);
      // You can navigate to home page or dashboard after successful sign-in
      navigate('/HomePage');
    } catch (error) {
      console.error('Google Sign In Error:', error.message);
      alert('Google Sign In Failed: ' + error.message);
    }
  };

  const handleEmailSignUp = () => {
    navigate('/EmailSign');
  };

  const handlePhoneSignUp = () => {
    navigate('/SignInWithPhoneNumber');
  };

  const handleBackToCreatedAccount = () => {
    navigate('/SignUp');
  };

  return (
    <>
      <div className="card">
        <h1 className="signInTitle">Welcome Back</h1>
        <p className="signInSubtitle">Choose an Option Below</p>
      </div>

      <div className="signInButtons">
        <button className="signInBtn google" onClick={handleGoogleSignUp}>
          <FaGoogle className="signIcon" />
          Sign In with Google
        </button>

        <button className="signInBtn email" onClick={handleEmailSignUp}>
          <FaEnvelope className="signIcon" />
          Sign In with Email
        </button>

        <button className="signInBtn phone" onClick={handlePhoneSignUp}>
          <FaPhone className="signIcon" />
          Sign In with Phone
        </button>
      </div>

      <div className="signUpContainer">
        <p className="signUpPrompt">
          Don't have an account?{' '}
          <span className="signUpLink" onClick={handleBackToCreatedAccount}>
            Create one
          </span>
        </p>
      </div>

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

export default SignIn;

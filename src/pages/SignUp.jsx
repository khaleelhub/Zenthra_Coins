import React, { useState } from 'react';
import { FaGoogle, FaPhone } from 'react-icons/fa'; // Importing icons
import './style/SignUp.css'; // CSS
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase'; // Firebase setup
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; // ✅ Correctly import createUserWithEmailAndPassword

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function Terms() {
    navigate('/Zenthra')
}

  // Handle Email/Password sign-up
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sign-up data:', formData);
      
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password); // ✅ Use createUserWithEmailAndPassword
      const user = userCredential.user;
      console.log('User created:', user);

      // Optionally, you can update the display name after signup if needed
      // await updateProfile(user, { displayName: formData.name });

      navigate('/homePage'); // ✅ Navigate to /home after successful signup
    } catch (error) {
      console.error('Error signing up with email/password:', error.message);
      alert(error.message); // Optional: show error to user
    }
  };

  // Handle Google Sign-Up
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User signed up with Google:', user);

      navigate('/HomePage'); // Navigate to HomePage (as you wrote)
    } catch (error) {
      console.error('Error signing up with Google:', error.message);
      alert(error.message); // Optional
    }
  };

  // Navigate to phone number sign-up page
  const handleNav = () => {
    navigate('/SignUpWithPhoneNumber');
  };

  return (
    <div className="signUpContainer">
      <h1 className="signUpTitle">Create Your Account</h1>
      <p className="signUpSubtitle">Get started with Zenthra</p>

      {/* Sign-up Form */}
      <form className="signUpForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="signUpInput"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="signUpInput"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="signUpInput"
        />

        <button type="submit" className="signUpBtn">
          Sign Up
        </button>
      </form>

      {/* OR Separator */}
      <div className="orContainer">
        <span className="orText">OR</span>
      </div>

      {/* Google Sign Up */}
      <div className="signUpMethods">
        <button className="signUpBtn google" onClick={handleGoogleSignUp}>
          <FaGoogle className="signIcon" />
          Sign up with Google
        </button>
        <button className="signUpBtn PhoneBtn" onClick={handleNav}>
          <FaPhone className="signIcon" />
          Sign up with phone Number
        </button>

      </div>

      {/* Sign In Prompt */}
      <div className="signInPrompt">
        <p>Already have an account? <a href="/SignIn" className="signInLink">Sign In</a></p>
      </div>

      <div className="termsAndConditions">
                <p>
                    By creating an account, you agree to our{' '}
                    <span className="termsLink" onClick={Terms}>Terms and Conditions</span> and{' '}
                    <span className="privacyLink">Privacy Policy</span>.
                </p>
            </div>
    </div>
  );
}

export default SignUp;

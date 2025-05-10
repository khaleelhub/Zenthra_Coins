// SignUpWithPhoneNumber.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import './style/SignUpWithPhoneNumber.css';
import PasswordStrengthBar from 'react-password-strength-bar';
import { app } from '/src/firebase.js'; 

/// this is s the wayv i like to beeee 
const SignUpWithPhoneNumber = () => {
    const navigate = useNavigate();
    const auth = getAuth(app);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        otp: ''
    });
    const [step, setStep] = useState(1); // Step 1: Fill form, Step 2: Enter OTP
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);

    useEffect(() => {
        setupRecaptcha();
    }, []);

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                size: 'invisible',
                callback: () => console.log('Recaptcha resolved')
            }, auth);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    function Terms() {
        navigate('/HomePage')
    }
    const validateForm = () => {
        const { name, email, password, confirmPassword, phone } = formData;
        if (!name || !email || !password || !confirmPassword || !phone) {
            showToast('Please fill all fields.');
            return false;
        }
        if (password !== confirmPassword) {
            showToast('Passwords do not match.');
            return false;
        }
        if (!/^\d{10}$/.test(phone)) {
            showToast('Phone number must be 10 digits.');
            return false;
        }
        return true;
    };

    const sendOTP = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        const phoneNumber = `+1${formData.phone}`;

        try {
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            showToast('OTP sent successfully!');
            setStep(2);
        } catch (error) {
            console.error('Error sending OTP:', error);
            showToast('Failed to send OTP. Try again.');
        }
        setIsLoading(false);
    };

    const verifyOTP = async () => {
        if (!formData.otp) {
            showToast('Please enter OTP.');
            return;
        }
        setIsLoading(true);

        try {
            await confirmationResult.confirm(formData.otp);
            showToast('OTP verified successfully!');
            navigate('/HomePage');
        } catch (error) {
            console.error('Error verifying OTP:', error);
            showToast('Incorrect OTP. Try again.');
        }
        setIsLoading(false);
    };

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };

    return (
        <div className="signup-container">
            <div className="TitleContainer">
                <h1 className="Title">Create Account</h1>
                <p className="Subtitle">Easy and Secure with Phone Number</p>
            </div>

            {toastMessage && <div className="toast">{toastMessage}</div>}

            {step === 1 ? (
                <div className="inputBox">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <PasswordStrengthBar password={formData.password} />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number (10 digits)"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <div className="btnNext">
                        <button
                            className="next"
                            onClick={sendOTP}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="otpBox">
                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        value={formData.otp}
                        onChange={handleChange}
                    />
                    <div className="btnVerify">
                        <button
                            className="verify"
                            onClick={verifyOTP}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </div>
                </div>
            )}

            <div id="recaptcha-container"></div>

            <div className="termsAndConditions">
                <p>
                    By creating an account, you agree to our{' '}
                    <span className="termsLink" onClick={Terms}>Terms and Conditions</span> and{' '}
                    <span className="privacyLink">Privacy Policy</span>.
                </p>
            </div>

            <div className="backToSignIn">
                <p>
                    Already have an account?{' '}
                    <span className="signInLink" onClick={() => navigate('/SignIn')}>
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignUpWithPhoneNumber;

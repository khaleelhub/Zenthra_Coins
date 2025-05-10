// src/main.jsx
import './index.css'
import App from './App.jsx'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import  SignInWithPhoneNumber from './pages/SignInWithPhoneNumber.jsx';
import SignUpWithPhoneNumber from './pages/SignUpWithPhoneNumber.jsx'
import EmailSignIn from './pages/EmailSignIn.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import NotFound from './pages/NotFound.jsx'
import Zenthra from './pages/Home/zenthra.jsx'
import Wallet from './pages/Home/Wallet.jsx'
import Infor from './pages/Home/Infor.jsx'
import UserProfile from './pages/Home/Userprofile.jsx'
import Ads from './pages/Home/ads.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound/>} />
        <Route path="/" element={<App />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignInWithPhoneNumber" element={<SignInWithPhoneNumber />} />
        <Route path='/EmailSign' element={<EmailSignIn />} />
        <Route path='/SignUpWithPhoneNumber' element={<SignUpWithPhoneNumber/>} />
        <Route path='/HomePage' element={<HomePage/>} />
        <Route path='/Zenthra'  element={<Zenthra/>} />
        <Route path='/Wallet' element={<Wallet/>} />
        <Route path='/Infor' element={<Infor/>} />
        <Route path='/UserProfile' element={<UserProfile/>} />
        <Route path='/ads' element={<Ads/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

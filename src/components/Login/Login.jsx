import React from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const handleLogin = () =>
        navigate("/dashboard");

    const handleConnect = () =>
        navigate("/connect-wallet");

  return (
    <div className='login'>
      <div className="login-header">
        <h2>Connect Wallet</h2>
      </div>
      <div className="login-body">
        <p>
            Sign up in to a new account by selecting your preferred method to continue setting up your account.
        </p>
        <button className="verify" onClick={handleConnect}>
            Connect Wallet
        </button>
        <div className="login-input">
            <input type="email" placeholder='Enter Email Address' />
            <input type="password" placeholder='Enter Password' />
            <p>Forget Password? Reset password</p>
        </div>
      </div>
      <div className="login-footer">
        <button className='verify' onClick={handleLogin}>Login Account</button>
      </div>
    </div>
  );
}

export default Login;

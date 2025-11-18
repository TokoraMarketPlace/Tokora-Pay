import React, { useState } from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';
import Google from "../../assets/google.png";
import { Eye, EyeClosed } from "lucide-react";


const Login = () => {

    const navigate = useNavigate();
    const handleGoogleSignup = () => {
      console.log("Google signup clicked");
      };
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
    
        // Validation
        if (!email || !password) {
          setError("Please fill in all fields.");
          return;
        }
    
        try {
          setLoading(true);
    
          console.log("Dummy Login successful", {email, password });
    
          setSuccess("Login successful! Redirecting...");
          setTimeout(() => {
            localStorage.removeItem("tempUserSignup"); // clear after success
            navigate("/dashboard");
          }, 1500);
        } catch (err) {
          setError("Something went wrong. Please try again later.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

    

  return (
    <div className='login'>
      <div className="login-header">
        <h2>Login</h2>
      </div>
      <div className="login-body">
        <p>
            Sign up in to your account by selecting your preferred method to continue to your account.
        </p>
        <div className="login-input">
            <div className="input">
          <label htmlFor="email">Email</label>
            <input
              id="input"
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
            <div className="input">
              <label htmlFor="password">Password</label>
                <div className="space">
                  <input
                  id="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="showpassword"
                    >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
            </div>
        </div>
        <p>Forget Password?  Reset password</p>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
      

      <div className="login-footer">
        <button className='verify' onClick={handleLogin} disabled={loading}>Login Account</button>
        <p>Or</p>
        <button
          className="google"
          onClick={handleGoogleSignup}
        >
          <img src={Google} alt="google" />
          <p>Continue with Google</p>
        </button>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import Google from "../../assets/google.png";
import { Eye, EyeClosed } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Handle user signup (ready for backend)
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      console.log(" Dummy signup successful", { name, email, password });

      // Temporary success state
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/verifyemail"), 1500);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {

    console.log("Google signup clicked");
  };

  return (
    <div className="signup">
      <div className="header">
        <h2>Hi, Welcome</h2>
        <p>
          Sign up for a new account by selecting your preferred method to
          continue setting up your account.
        </p>
      </div>

      <form className="body" onSubmit={handleSignup}>
        <div className="input">
          <label htmlFor="name">Name</label>
          <input
            id="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Full Name"
            required
          />
        </div>

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
              {showPassword ? <Eye /> : < EyeClosed/>}
            </button>
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>

      <div className="bottom">
        <button
          className="signup"
          type="submit"
          disabled={loading}
          onClick={handleSignup}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p>Or</p>

        <button className="google" onClick={handleGoogleSignup}>
          <img src={Google} alt="google" />
          <p>Continue with Google</p>
        </button>
      </div>
    </div>
  );
};

export default SignUp;

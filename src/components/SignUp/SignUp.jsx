import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import Google from "../../assets/google.png";
import { Eye, EyeClosed } from "lucide-react";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Load saved user input (if any)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("tempUserSignup"));
    if (savedUser) {
      setName(savedUser.name || "");
      setEmail(savedUser.email || "");
      setPassword(savedUser.password || "");
      setConfirmPassword(savedUser.confirmPassword || "");
    }
  }, []);

  // Save form data temporarily
  useEffect(() => {
    const userData = { name, email, password, confirmPassword };
    localStorage.setItem("tempUserSignup", JSON.stringify(userData));
  }, [name, email, password, confirmPassword]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      console.log("Dummy signup successful", { name, email, password });

      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => {
        localStorage.removeItem("tempUserSignup"); // clear after success
        navigate("/verifyemail");
      }, 1500);
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
    <motion.div
      className="signup"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="header">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hi, Welcome
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Sign up for a new account by selecting your preferred method to
          continue setting up your account.
        </motion.p>
      </div>

      <motion.form
        className="body"
        onSubmit={handleSignup}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
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
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
        </div>

        <div className="input">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="space">
            <input
              id="input"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </motion.form>

      <motion.div
        className="bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="signup"
          type="submit"
          disabled={loading}
          onClick={handleSignup}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </motion.button>

        <p>Or</p>

        <motion.button
          className="google"
          onClick={handleGoogleSignup}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          <img src={Google} alt="google" />
          <p>Continue with Google</p>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;

import React from "react";
import "./settings.css";
import { BiArrowBack, BiConversation, BiExit } from "react-icons/bi";
import { ArrowRight, Contact, HelpCircle, IdCard, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../../assets/usericon.png";

const Settings = () => {
  const navigate = useNavigate();

  // --- Navigate handlers (can later call backend endpoints)
  const handleNext = () => navigate("/more-settings");
  const handleLogout = () => {
    //  You’ll replace this with real backend logout later
    // Example: await axios.post("/api/logout");
    navigate("/logout");
  };
  const handlePrevious = () => navigate("/dashboard");

  // --- Dummy user data (replace with real backend data)
  const user = {
    name: "Godknows Ukari",
    email: "godknowsukari@gmail.com",
    phone: "+234 012 345 6789",
    profilePic: ProfilePic,
  };

  return (
    <div className="setting">
      {/* Header */}
      <div className="setting__header">
        <button onClick={handlePrevious} className="setting__back-btn">
          <BiArrowBack />
        </button>
        <h2>Profile</h2>
      </div>

      {/* Profile section */}
      <div className="setting__profile">
        <img src={user.profilePic} alt="User" />
        <div className="setting__profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      </div>

      {/* Account Details */}
      <section className="setting__section">
        <h3>Account Details</h3>
        <div className="setting__card">
          <div className="setting__item">
            <div className="setting__item-left">
              <IdCard />
              <p>Personal Info</p>
            </div>
            <button onClick={handleNext}>
              <ArrowRight />
            </button>
          </div>

          <div className="setting__item">
            <div className="setting__item-left">
              <Languages />
              <p>Language</p>
            </div>
            <button onClick={handleNext}>
              <ArrowRight />
            </button>
          </div>

          <div className="setting__item">
            <div className="setting__item-left">
              <Contact />
              <p>Refer Friend</p>
            </div>
            <button onClick={handleNext}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="setting__section">
        <h3>Help and Support</h3>
        <div className="setting__card">
          <div className="setting__item">
            <div className="setting__item-left">
              <HelpCircle />
              <p>Help Center</p>
            </div>
            <button onClick={handleNext}>
              <ArrowRight />
            </button>
          </div>

          <div className="setting__item">
            <div className="setting__item-left">
              <BiConversation />
              <p>FAQ</p>
            </div>
            <button onClick={handleNext}>
              <ArrowRight />
            </button>
          </div>

          <div className="setting__item logout">
            <div className="setting__item-left">
              <BiExit />
              <p>Log Out</p>
            </div>
            <button onClick={handleLogout}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;

import React from "react";
import "./App.css"
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplalshScreen/Splashscreen.jsx"
import SignUp from "./components/SignUp/SignUp.jsx";
import Layout from "./components/Layout.jsx";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail.jsx";
import Emailcode from "./components/EmailCode/Emailcode.jsx";
import VerifyPhone from "./components/VerifyPhone/VerifyPhone.jsx";
import PhoneCode from "./components/PhoneCode/PhoneCode.jsx";
import Recieve from "./components/Recieve/Recieve.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import Transfer from "./components/Transfer/Transfer.jsx"
import History from "./components/History/History.jsx"
import Settings from "./components/Settings/Settings.jsx"
import Notification from "./components/Notification/Notification.jsx"
import ConfirmTransfer from "./components/confirmtransfer/ConfirmTransfer.jsx";
import Sendtovendor from "./components/Sendtovendor/Sendtovendor.jsx";
import Morersettings from "./components/Moresettings/Moresettings.jsx"
import Logout from "./components/Logout/Logout.jsx"
import TransactionDetails from "./components/TransactionDetails/TransactionDetails.jsx";


function App() {
  return (
    <div className="app">

    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verifyemail" element={<VerifyEmail />} />
      <Route path="/emailcode" element={<Emailcode />} />
      <Route path="/verifyphone" element={<VerifyPhone />} />
      <Route path="/phonecode" element={<PhoneCode />} />
      <Route path="/recieve" element={<Recieve />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/confirmtransfer" element={<ConfirmTransfer />} />
      <Route path="/send" element={<Sendtovendor />} />
      <Route path="/more-settings" element={<Morersettings />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/transaction/:id" element={<TransactionDetails />} />


      {/* Pages with bottom navbar */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/transfer"
        element= {
          <Layout>
            <Transfer />
          </Layout>
        } 
      />

      <Route
        path="/history"
        element= {
          <Layout>
            <History />
          </Layout>
        } 
      />

      <Route
        path="/settings"
        element= {
          <Layout>
            <Settings />
          </Layout>
        } 
      />

    </Routes>

    </div>
  );
}

export default App;
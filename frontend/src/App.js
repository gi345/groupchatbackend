import React, { useState } from 'react';
import CreateGroup from './components/Groups/CreateGroup';
import InviteToGroup from './components/Groups/InviteToGroup';  // Correct path to InviteToGroup
import SearchGroup from './components/Groups/SearchGroup';
import SubscriptionOptions from './components/Subcriptions/SubscriptionOptions';
import ThemeManager from './components/Themes/ThemeManager'; // Import ThemeManager as a component
import OtpVerification from './components/otp/otpVerification';  // Correct import

import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <div className={`app-container ${theme}`}>
      {/* Use ThemeManager as a component */}
      <ThemeManager setTheme={setTheme} />

      <header>
        <h1>Welcome to the Group Management App</h1>
      </header>

      <main>
        {/* Dynamic Group Management */}
        <section>
          <h2>Group Management</h2>
          <CreateGroup />
          <InviteToGroup />
          <SearchGroup />
        </section>

        {/* Subscription Plans */}
        <section>
          <h2>Subscription Plans</h2>
          <SubscriptionOptions />
        </section>

        {/* OTP Verification based on location */}
        <section>
          <h2>OTP Verification</h2>
          <OtpVerification />
        </section>
      </main>

      <footer>
        <p>© 2024 Group Management App - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;

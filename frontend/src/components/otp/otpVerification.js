import React, { useState, useEffect } from 'react';
import { getUserLocation, isInSouthernStates } from '../Themes/ThemeManager';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    const location = getUserLocation();
    setUserLocation(location);

    if (isInSouthernStates(location)) {
      console.log('User is in a southern state');
    }
  }, []);

  const handleOtpSubmit = () => {
    // Handle OTP verification logic here
    if (otp === '1234') {
      setIsVerified(true);
      alert('OTP Verified Successfully!');
    } else {
      alert('Incorrect OTP');
    }
  };

  return (
    <div>
      <h3>OTP Verification</h3>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleOtpSubmit}>Submit OTP</button>

      {isVerified && <p>OTP Verified for user in {userLocation}!</p>} {/* Display user location */}
    </div>
  );
};

export default OtpVerification;

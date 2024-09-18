import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OtpVerification = () => {
  const [location, setLocation] = useState(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState('');

  const fetchLocation = () => {
    if ('geolocation' in navigator) {
      // Request location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null); // Clear any previous errors
        },
        (error) => {
          // Handle errors here
          if (error.code === 1) {
            // User denied permission
            setError('Location permission denied. Please allow access to continue.');
          } else if (error.code === 2) {
            // Position unavailable
            setError('Location information is unavailable.');
          } else if (error.code === 3) {
            // Timeout
            setError('The request to get your location timed out.');
          } else {
            // General error
            setError('An unknown error occurred while fetching location.');
          }
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!location) {
      setError('Location not available yet');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/otp/verify`, {
        otp,
        location, // Send the location along with OTP to the backend
      });

      setVerificationMessage(response.data.message || 'OTP verified successfully');
    } catch (error) {
      setError('Error verifying OTP. Please try again.');
      console.error('Verification error:', error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div>
      <h2>OTP Verification</h2>
      {location ? (
        <p>
          User Location: Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Fetching your location...</p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {verificationMessage && <p>{verificationMessage}</p>}

      <form onSubmit={handleVerifyOTP}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Submit OTP</button>
      </form>
    </div>
  );
};

export default OtpVerification;

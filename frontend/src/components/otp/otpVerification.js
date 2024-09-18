import React, { useState, useEffect } from 'react';

const OtpVerification = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

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

      <form>
        <input type="text" placeholder="Enter OTP" />
        <button type="submit">Submit OTP</button>
      </form>
    </div>
  );
};

export default OtpVerification;

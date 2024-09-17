import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Function to get user's location (using Geolocation API)
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => reject(error)
      );
    } else {
      reject(new Error('Geolocation not supported by this browser.'));
    }
  });
};

// Function to check if user is in Southern states (you can change this logic)
export const isInSouthernStates = (latitude) => {
  const southernThreshold = 23.5; // Modify as per your requirement
  return latitude < southernThreshold;
};

// Main ThemeManager component
const ThemeManager = () => {
  const [themes, setThemes] = useState([]);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Fetch themes from the backend API using Axios
    axios
      .get(`${baseUrl}/themes`)
      .then((response) => {
        setThemes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching themes:', error);
      });
  }, [baseUrl]);

  return (
    <div>
      <h2>Available Themes</h2>
      {themes.map((theme, index) => (
        <div key={index}>
          <h3>{theme.name}</h3>
          <p>{theme.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ThemeManager;

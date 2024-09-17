import { useEffect } from 'react';

// Simulate getting user location (for frontend demo purposes)
export const getUserLocation = () => {
  return "Meerut"; // Change this to simulate different locations
};

// Check if the location is one of the southern states
export const isInSouthernStates = (location) => {
  const southernStates = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra", "Telangana"];
  return southernStates.includes(location);
};

const ThemeManager = ({ setTheme }) => {
  useEffect(() => {
    const currentTime = new Date().getHours();
    const userLocation = getUserLocation(); // Assume a function to get location (simulate for frontend)
    
    if ((currentTime >= 10 && currentTime <= 12) && isInSouthernStates(userLocation)) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [setTheme]);

  return null; // No need to return JSX here for theme management
};

export default ThemeManager;

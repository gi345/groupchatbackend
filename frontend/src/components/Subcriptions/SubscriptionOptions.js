import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubscriptionOptions = () => {
  const [plans, setPlans] = useState([]); // Store subscription plans
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'; // Ensure correct API URL

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${baseUrl}/subscriptions-plans`);
        setPlans(response.data); // Set fetched plans
        setLoading(false); // Disable loading after fetching
      } catch (err) {
        // Set error message for display
        setError('Error fetching subscription plans. Please try again later.');
        setLoading(false);
        // Log error for debugging purposes
        console.error('Error fetching subscription plans:', err.response || err.message);
      }
    };

    fetchPlans(); // Call function to fetch plans on component mount
  }, [baseUrl]);

  if (loading) {
    return <div>Loading subscription plans...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  // If no plans are available, show appropriate message
  if (plans.length === 0) {
    return <div>No subscription plans available at the moment.</div>;
  }

  return (
    <div className="plans-container">
      {plans.map((plan, index) => (
        <div key={index} className="plan-card">
          <h3>{plan.name}</h3>
          <p>Watch time: {plan.time === 'Unlimited' ? plan.time : `${plan.time} mins`}</p>
          <p>Price: ₹{plan.price}</p>
          <button>Upgrade</button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionOptions;


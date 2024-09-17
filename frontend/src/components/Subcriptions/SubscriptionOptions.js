import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Subscription Options Component
const SubscriptionOptions = () => {
  const [plans, setPlans] = useState([]);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Fetch subscription plans from the backend API using Axios
    axios.get(`${baseUrl}/subscriptions`)
      .then(response => {
        // Set the plans in state
        setPlans(response.data);
      })
      .catch(error => {
        console.error('Error fetching subscription plans:', error);
      });
  }, [baseUrl]);

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

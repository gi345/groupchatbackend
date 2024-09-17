const SubscriptionOptions = () => {
  const plans = [
    { name: 'Free', time: 5, price: 0 },
    { name: 'Bronze', time: 7, price: 10 },
    { name: 'Silver', time: 10, price: 50 },
    { name: 'Gold', time: 'Unlimited', price: 100 },
  ];

  return (
    <div className="plans-container">
      {plans.map((plan, index) => (
        <div key={index} className="plan-card">
          <h3>{plan.name}</h3>
          {/* Conditionally handle the display of time */}
          <p>Watch time: {plan.time === 'Unlimited' ? plan.time : `${plan.time} mins`}</p>
          <p>Price: ₹{plan.price}</p>
          <button>Upgrade</button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionOptions;

  
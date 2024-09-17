import React, { useState } from 'react';

const InviteToGroup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInvite = () => {
    if (email) {
      // Corrected string interpolation with backticks
      setMessage(`Invitation sent to ${email}`);
      setEmail(''); // Clear input after invite
    } else {
      setMessage('Please enter an email address.');
    }
  };

  return (
    <div className="invite-container">
      <h2>Invite Someone to Your Group</h2>
      <input
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleInvite}>Send Invite</button>
      {message && <p>{message}</p>}
    </div>
  );
};

// Corrected export statement
export default InviteToGroup;

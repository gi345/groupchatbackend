// CreateGroup.js
import React, { useState } from 'react';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');

  const handleCreateGroup = () => {
    // Logic to create a group (can be hooked with backend API)
    alert(`Group '${groupName}' created!`);
  };

  return (
    <div className="group-container">
      <input
        type="text"
        placeholder="Enter Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
};

export default CreateGroup;


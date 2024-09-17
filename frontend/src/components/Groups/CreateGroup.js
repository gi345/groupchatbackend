import React, { useState } from 'react';
import axios from 'axios';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleCreateGroup = async () => {
    const groupData = {
      name: groupName,
    };

    try {
      const response = await axios.post(`${baseUrl}/groups/create`, groupData);
      console.log('Group created successfully:', response.data);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Group</h2>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
      />
      <button onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
};

export default CreateGroup;

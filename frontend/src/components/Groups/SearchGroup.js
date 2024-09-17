// SearchGroup.js
import React, { useState } from 'react';

const SearchGroup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGroups, setFilteredGroups] = useState([]);

  // Sample data for existing groups (we can  replace this with an API call)
  const groups = [
    { id: 1, name: 'React Developers' },
    { id: 2, name: 'JavaScript Enthusiasts' },
    { id: 3, name: 'Python Coders' },
    { id: 4, name: 'Web Designers' },
  ];

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const results = groups.filter(group =>
      group.name.toLowerCase().includes(term)
    );
    
    setFilteredGroups(results);
  };

  return (
    <div className="search-container">
      <h2>Search for Groups</h2>
      <input
        type="text"
        placeholder="Enter group name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="search-results">
        {filteredGroups.length > 0 ? (
          <ul>
            {filteredGroups.map((group) => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul>
        ) : (
          <p>No groups found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchGroup;

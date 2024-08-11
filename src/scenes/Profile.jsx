import React, { useEffect, useState } from 'react';

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [newName, setNewName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/user/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleUpdateName = () => {
    fetch('http://localhost:3000/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name: newName }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Name updated successfully') {
          setProfileData(prev => ({ ...prev, name: newName }));
          setNewName('');
          setIsEditing(false);
        } else {
          console.error('Error updating name:', data.message);
        }
      })
      .catch(error => console.error('Error updating name:', error));
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="mb-4">
        <p>Email: {profileData.email}</p>
        <p>Name: {isEditing ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              className="border-2 border-gray-300 rounded p-2"
            />
            <button
              onClick={handleUpdateName}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update
            </button>
          </>
        ) : (
          <>
            {profileData.name || 'No name set'}
            <button
              onClick={() => setIsEditing(true)}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Edit
            </button>
          </>
        )}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;

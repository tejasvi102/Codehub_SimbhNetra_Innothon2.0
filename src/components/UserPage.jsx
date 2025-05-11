// src/components/UserPage.jsx
import React from 'react';

const UserPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Normal User Page</h2>
        <p>Here you can report a missing person or search for someone.</p>
        <Link to = "/">Report the missing person</Link>
      </div>
    </div>
  );
};

export default UserPage;

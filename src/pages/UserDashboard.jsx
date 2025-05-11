import React from 'react';
import Navbar from '../components/Navbar';

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl mb-4">Normal User Dashboard</h2>
        <p>This is the user dashboard where a user can report a lost person.</p>
      </div>
    </div>
  );
}

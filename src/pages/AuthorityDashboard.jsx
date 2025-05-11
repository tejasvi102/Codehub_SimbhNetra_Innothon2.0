import React from 'react';
import Navbar from '../components/Navbar';

export default function AuthorityDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl mb-4">Authority Dashboard</h2>
        <p>This is the authority dashboard where an authority can view and manage cases.</p>
      </div>
    </div>
  );
}

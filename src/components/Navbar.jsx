import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Simbh Netra</h1>
        <div>
          <Link to="/" className="mr-4">Logout</Link>
        </div>
      </div>
    </nav>
  );
}

// Category.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Category() {
  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-400 mb-6">Category Management</h2>
        <Outlet />
      </div>
    </div>
  );
}
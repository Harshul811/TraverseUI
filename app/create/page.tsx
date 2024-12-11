'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Page = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleCreateList = async () => {
    const userId = 1; // Replace this with the actual user_id
    const description = name; // Use the name as the description

    try {
      const response = await fetch('http://localhost:8001/lists/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          location,
          date,
          description,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('List created successfully!');
        console.log(data);
      } else {
        const errorData = await response.json();
        console.error('Error creating list:', errorData);
        alert(`Failed to create list: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Failed to create list due to a network error.');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Section: TRAVERSE */}
      <div className="flex justify-between items-center p-4">
        {/* App Name */}
        <h1 className="text-3xl font-bold text-primary">TRAVERSE</h1>
        <Link href="/third">
          <button className="btn btn-primary">Go to Dashboard</button>
        </Link>
      </div>

      {/* Middle Section: Name, Date, Location */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        <h2 className="text-4xl font-bold text-gray-700">New Travel List</h2>

        {/* Name Box */}
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-semibold">Name of the list</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        {/* Date Box */}
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-semibold">Date of travel</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        {/* Location Box */}
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-semibold">Location of travel</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section: Swipe Page Button */}
      <div className="flex items-center justify-center p-4 mt-auto mb-6">
        <button
          onClick={handleCreateList}
          className="btn btn-primary w-full max-w-sm"
        >
          Create List
        </button>
        <Link href="/swipe-page">
          <button className="btn btn-secondary w-full max-w-sm ml-4">Swipe Page</button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
'use client'
import React, { useState } from 'react'

import Link from 'next/link';

const page = () => {
    const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
    const handleCreateList = () => {
        // Here, you would normally send this data to a server or perform some other action
        alert(`Creating List with Name: ${name}, Date: ${date}, Location: ${location}`);
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
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold">Name of the list</label>
            <input
              type="text"
              placeholder="Enter name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        {/* Date Box */}
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold">Date of travel</label>
            <input
              type="date"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        {/* Location Box */}
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold">Location of travel</label>
            <input
              type="text"
              placeholder="Enter location"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
      </div>

      {/* listid bussiness id */}

      {/* Create List Button
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg flex justify-center mt-6">
        <button
            onClick={handleCreateList}
            className="btn btn-primary w-full max-w-sm"
        >
            Create List
        </button>
        </div> */}




      {/* Bottom Section: Swipe Page Button */}
      <div className="flex items-center justify-center p-4 mt-auto mb-6">
        <Link href="/swipe-page">
          <button className="btn btn-primary w-full max-w-sm">Swipe Page</button>
        </Link>
      </div>
    </div>
  )
}

export default page

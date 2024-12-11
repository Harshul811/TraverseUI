import React from 'react'
import Link from "next/link";


const page = () => {
  return (
    <div className="flex flex-col h-screen ">
      {/* Top Section: TRAVERSE and Profile */}
      <div className="flex justify-between items-center p-4">
        {/* App Name */}
        <h1 className="text-3xl font-bold text-primary">TRAVERSE</h1>

        {/* Profile Button */}
        <Link href="/profile">
          <button className="btn btn-outline">Profile</button>
        </Link>
      </div>

      {/* Middle Section: Create New and Already Existing Buttons */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        {/* Create New Button */}
        <h2 className="text-4xl font-bold text-gray-700">DASHBOARD</h2>

        <Link href="/create">
          <button className="btn btn-primary w-full max-w-sm">Create New List</button>
        </Link>

        {/* Already Existing Button */}
        <Link href="/existing">
          <button className="btn btn-secondary w-full max-w-sm">Existing Itineraries</button>
        </Link>
      </div>
    </div>
  )
}

export default page

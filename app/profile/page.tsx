import React from 'react'
import Link from 'next/link';


const pages = () => {
  // const [displayName, setDisplayName] = useState("John Doe");
  // const [email, setEmail] = useState("john.doe@example.com");

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

      {/* Middle Section: Change Display Name Button */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        {/* <button className="btn btn-primary w-full max-w-sm">Change Display Name</button> */}
        <h2 className="text-4xl font-bold text-gray-700">PROFILE</h2>


        {/* Name and Email Information */}
        <div className="space-y-4 w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold">Name</label>
            <input
              type="text"
              value="John Doe"
              readOnly
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold">Email</label>
            <input
              type="email"
              value="john.doe@example.com"
              readOnly
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default pages

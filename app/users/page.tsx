import React from 'react'

interface User{
    id: number;
    name: string;
    email: string;
}

const UsersPage = async () => {
    const res= await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[]= await res.json();

  return (
    <div className="flex flex-col h-screen">
      {/* Top Section: TRAVERSE */}
      <div className="flex justify-between items-center p-4">
        {/* App Name */}
        <h1 className="text-3xl font-bold text-primary">TRAVERSE</h1>
      </div>

      {/* Middle Section: Sign Up / Login Box */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up / Login</h2>
          <p className="text-center mb-4">
            Use your Google account to sign up or log in.
          </p>
          <button className="btn btn-outline w-full">Sign Up / Login with Google</button>
        </div>
      </div>
    </div>
  )
}

export default UsersPage

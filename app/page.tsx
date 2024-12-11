import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      
      <div className="flex flex-col h-screen ">
      {/* Top Section: Heading and Login */}
      <div className="flex justify-between items-center p-4">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-primary">TRAVERSE</h1>

        {/* Login Button */}
        <Link href="/users">
          <button className="btn btn-primary">Login</button>
        </Link>
      </div>

      {/* Middle Section: Description */}
      <div className="flex-grow flex items-center justify-center">
        <p className="text-lg text-gray-700 max-w-md text-center">
        Welcome to Traverse!
    Explore NYC your way with personalized itineraries—just swipe, select, and let us do the rest! Whether you’re local or visiting, planning your perfect day in the city has never been easier.
    Ready to discover your next adventure? Start swiping now!
        </p>
      </div>
    </div>  
    
    
    </main>

      
  )
}

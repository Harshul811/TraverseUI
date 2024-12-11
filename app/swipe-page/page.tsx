'use client'
import React, { useEffect , useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link';


// i have gotten the list id , location 
// /composite/view_full_list and it takes list_id to get the full list , and use get /composite/serve_next to swipe to the next bussiness /composite/serve_next needs list_id and location
const initialBusiness = [
  {
    business_name: 'Burger',
    location: 'NY',
    description: 'Delicious close-up photo of a burger.',
    address: 'Shake Shack, Madison Square Park, New York, NY',
    category: 'Burger',
    business_id: 122,
  },
  {
    business_name: 'Pizza',
    description: 'Classic New York-style pizza.',
    location: 'NY',
    address: 'Lombardi Pizza, 32 Spring St, New York, NY',
    category: 'Pizza',
    business_id: 123,
  },
  {
    business_name: 'Sushi',
    description: 'Fresh sushi rolls served with soy sauce.',
    location: 'Sushi Nakazawa, 23 Commerce St, New York, NY',
    address: 'Sushi Nakazawa, 23 Commerce St, New York, NY',
    category: 'Sushi',
    business_id: 124,
  },
];

const Page = () => {
    const searchParams = useSearchParams();
    const listId = searchParams.get('listId'); // Get listId from the URL query
  const location = searchParams.get('location'); // Get location from the URL query

  // Use the listId and location in your swipe page logic
  console.log('List ID:', listId);
  console.log('Location:', location);
 
  
  
  const [businesses, setBusinesses] = useState(initialBusiness);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = async (direction: string) => {
    if (currentIndex >= businesses.length) {
      alert('No more businesses to swipe!');
      return;
    }

    const swipedBusiness = businesses[currentIndex];
    const data = {
      list_id: swipedBusiness.business_id,
      location: swipedBusiness.location,
    };

    const fetchConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    try {
      const feedback = await fetch('http://localhost:8002/businesses/next', fetchConfig);
      const result = await feedback.json();

      if (feedback.ok) {
        console.log('Swipe action sent successfully:', data);
        setBusinesses((prevBusinesses) => {
          return [...prevBusinesses.slice(0, currentIndex), result, ...prevBusinesses.slice(currentIndex + 1)];
        });
        alert(result.message);
      } else {
        console.error('Error occurred while sending swipe action:', result);
      }
    } catch (error) {
      console.error('Error sending swipe action:', error);
      alert('Failed to send swipe action. Please try again.');
    }

    setCurrentIndex((prevIndex) => (prevIndex + 1) % businesses.length);
  };

  return (
    
    
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Section: TRAVERSE */}
      <div className="flex justify-between items-center p-4">
        {/* App Name */}
        <h1 className="text-3xl font-bold text-primary">TRAVERSE</h1>
        {/* Go to Dashboard Button */}
        <Link href="/third">
          <button className="btn btn-primary">Go to Dashboard</button>
        </Link>
      </div>

      {/* Middle Section: Business Swipe Cards */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        {currentIndex < businesses.length ? (
          <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
            
            <h3 className="text-xl font-semibold">{businesses[currentIndex].business_name}</h3>
            <p>{businesses[currentIndex].description}</p>
            <p><strong>Location:</strong> {businesses[currentIndex].location}</p>
            <p><strong>Address:</strong> {businesses[currentIndex].address}</p>
            <p><strong>Category:</strong> {businesses[currentIndex].category}</p>
          </div>
        ) : (
          <h2>No more businesses to swipe!</h2>
        )}
      </div>

      {/* Bottom Section: Swipe Buttons */}
      <div className="flex justify-center p-4 space-x-4 mb-6">
        <button onClick={() => handleSwipe('left')} className="btn btn-danger w-full max-w-xs">Swipe Left</button>
        <button onClick={() => handleSwipe('right')} className="btn btn-success w-full max-w-xs">Swipe Right</button>
      </div>
    </div>
  );
};

export default Page;

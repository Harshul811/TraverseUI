'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define the type for business data
interface Business {
  business_name: string;
  location: string;
  description: string;
  address: string;
  category: string;
  business_id: number;
}

const SwipePage = () => {
  const searchParams = useSearchParams();
  const listId = searchParams.get('listId');  // Get listId from the URL query
  const location = searchParams.get('location');  // Get location from the URL query

  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);

  useEffect(() => {
    if (listId && location) {
      // Fetch the first business when the page loads
      fetchNextBusiness();
    }
  }, [listId, location]);

  const fetchNextBusiness = async () => {
    // Ensure listId and location are available
    if (!listId || !location) return;

    try {
      const response = await fetch(`http://127.0.0.1:8003/composite/serve_next?list_id=${listId}&location=${location}`);
      const data: Business = await response.json();

      if (data && data.business_name) {
        // Set the business data when fetched successfully
        setCurrentBusiness(data);
      } else {
        // If no more businesses are available, show a message
        alert('No more businesses to swipe!');
      }
    } catch (error) {
      console.error('Error fetching next business:', error);
      alert('Error fetching the next business.');
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    // Call fetchNextBusiness when user swipes
    fetchNextBusiness();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-3xl font-bold text-primary mb-6">Swipe Page</h1>

      {currentBusiness ? (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold">{currentBusiness.business_name}</h2>
          <p>{currentBusiness.description}</p>
          <p><strong>Category:</strong> {currentBusiness.category}</p>
          <p><strong>Address:</strong> {currentBusiness.address}</p>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleSwipe('left')}
              className="btn btn-danger w-1/3"
            >
              Swipe Left
            </button>
            <button
              onClick={() => handleSwipe('right')}
              className="btn btn-success w-1/3"
            >
              Swipe Right
            </button>
          </div>
        </div>
      ) : (
        <p>Loading business data...</p>
      )}

      {/* Optionally, display the listId and location for debugging */}
      <div className="mt-6">
        <p><strong>List ID:</strong> {listId}</p>
        <p><strong>Location:</strong> {location}</p>
      </div>
    </div>
  );
};

export default SwipePage;

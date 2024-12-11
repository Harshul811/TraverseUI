'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define the type for business data
interface Business {
  business_name: string;
  location: string;
  address: string;
  category: string;
  description: string;
  business_id: number;
}

const ViewDestinations = () => {
  const searchParams = useSearchParams();
  const listId = searchParams.get('listId'); 
  const description = searchParams.get('description');
  const location = searchParams.get('location');
  const date = searchParams.get('date');
  const weather = searchParams.get('weather');

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (listId) {
      fetchBusinesses();
    }
  }, [listId]);

  const fetchBusinesses = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8003/composite/view_full_list?list_id=${listId}`);
      const data: Business[] = await response.json();

      setBusinesses(data); // Update state with fetched businesses
    } catch (error) {
      console.error('Error fetching businesses:', error);
      alert('Error fetching businesses.');
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">Itinerary Details</h1>

      {/* Display the details passed via query parameters without the surrounding box */}
      <div className="w-full max-w-2xl mb-6 text-center">
        <h2 className="text-xl font-semibold  mb-2">{description}</h2>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Weather:</strong> {weather}°C
        </p>
      </div>

      {loading ? (
        <p>Loading destinations...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
          {businesses.map((business) => (
            <div
              key={business.business_id}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">{business.business_name}</h2>
              <p>
                <strong>Location:</strong> {business.location}
              </p>
              <p>
                <strong>Address:</strong> {business.address}
              </p>
              <p>
                <strong>Category:</strong> {business.category}
              </p>
              <p>
                <strong>Description:</strong> {business.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewDestinations;

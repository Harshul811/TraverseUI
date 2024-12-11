'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const initialList = [
  {
    user_id: '1100',
    description: 'Trip to NY',
    location: 'NY',
    date: '2024-12-10',
    list_id: 122,
  },
  {
    user_id: '1102',
    description: 'Trip to Paris',
    location: 'LA',
    date: '2024-12-12',
    list_id: 123,
  },
];

const initialBusiness = [
  {
    business_name: 'Burger',
    description: 'Delicious burger.',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    location: 'NY',
    address: 'Shake Shack, Madison Square Park, New York, NY',
    category: 'Burger',
    business_id: 122,
  },
  {
    business_name: 'Pizza',
    description: 'Classic pizza.',
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg',
    location: 'Paris',
    address: 'Lombardi Pizza, 32 Spring St, Paris',
    category: 'Pizza',
    business_id: 123,
  },
  {
    business_name: 'Sushi',
    description: 'Fresh sushi rolls served with soy sauce.',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    location: 'NY',
    address: 'Sushi Nakazawa, 23 Commerce St, New York, NY',
    category: 'Sushi',
    business_id: 124,
  },
];

const page = () => {
  const [itineraries, setItineraries] = useState<any[]>(initialList); // State to store the itineraries
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/itineraries'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setItineraries(data); // Set the list of itineraries directly from the API response
        } else {
          console.error('Error fetching itineraries');
        }
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchItineraries();
  }, []);

  const temperature = 25; // Sample temperature data

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

      {/* Middle Section: Existing Travels */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        <h2 className="text-4xl font-bold text-gray-700">Existing Travels</h2>

        {/* Itinerary List Box */}
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <label className="text-lg font-semibold">Your Travels</label>
          {loading ? (
            <p>Loading itineraries...</p> // Loading message while data is being fetched
          ) : (
            <div className="space-y-4">
              {itineraries.map((itinerary, index) => (
                <div key={index} className="p-4 border-b border-gray-200">
                  <div className="flex flex-col space-y-2">
                    {/* Itinerary Details */}
                    <div>
                      <strong>Travel Name:</strong> {itinerary.description}
                    </div>
                    <div>
                      <strong>Date of Travel:</strong> {itinerary.date}
                    </div>
                    <div>
                      <strong>Location of Travel:</strong> {itinerary.location}
                    </div>
                    <div>
                      <strong>Weather of Travel:</strong> {25}
                    </div>

                    {/* Business List for each itinerary */}
                    <div className="mt-4">
                      <strong>Businesses to Visit:</strong>
                      <ul className="list-disc pl-5 mt-2">
                        {initialBusiness
                          .filter((business) => business.business_id === itinerary.list_id)
                          .map((business, index) => (
                            <li key={index} className="mb-2">
                              <div>
                                <strong>Business Name:</strong> {business.business_name}
                              </div>
                              <div>
                                <strong>Location:</strong> {business.location}
                              </div>
                              <div>
                                <strong>Description:</strong> {business.description}
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

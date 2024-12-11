'use client';
import Link from "next/link";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define the type for list data
interface List {
  user_id: number;
  location: string;
  date: string;
  description: string;
  list_id: number;
  weather?: string; 
}

const ListPage = () => {
  const searchParams = useSearchParams();
//   const userId = searchParams.get('user_id'); // Get user_id from the URL query
    const userId =1;
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    if (userId) {
      // Fetch the lists when the page loads
      fetchLists();
    }
  }, [userId]);

  const fetchLists = async () => {
    if (!userId) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8001/lists/?user_id=${userId}&skip=0&limit=10`
      );
      const data: List[] = await response.json();
    //   setLists(data); // Set the fetched lists data
    const listsWithWeather = await Promise.all(
        data.map(async (list) => {
          const weather = await fetchWeather(list.location, list.date);
          return { ...list, weather }; // Add weather to the list item
        })
      );

      setLists(listsWithWeather); 
    } catch (error) {
      console.error('Error fetching lists:', error);
      alert('Error fetching the lists.');
    }
  };

  const fetchWeather = async (location: string, date: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8001/weather/?location=${location}&date=${date}`
      );
      const data = await response.text(); // Assuming the weather API returns a string
      return data;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return 'Unavailable'; // Fallback if the weather API fails
    }
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
    <div className="flex flex-col items-center justify-center min-h-screen ">
        {/* Top Section: TRAVERSE */}
      
      <h1 className="text-3xl font-bold text-primary mb-6">User Lists</h1>

      {lists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
          {lists.map((list) => (
            <div
              key={list.list_id}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">{list.description}</h2>
              <p>
                <strong>Location:</strong> {list.location}
              </p>
              <p>
                <strong>Date:</strong> {list.date}
              </p>
              <p>
                <strong>Weather:</strong> {list.weather}°C
                {/* <strong>Weather in Celsius:</strong> {list.weather || 'Loading...'} */}
              </p>
              <Link
            href={{
                pathname: '/viewdestinations',
                query: { 
                    listId: list.list_id,
                    description: list.description,
                    location: list.location,
                    date: list.date,
                    weather: list.weather,  // Pass listId as a query parameter
                  },    
                }}
        >
                <button className="btn btn-secondary w-full max-w-xs text-sm py-1 px-2">
                Destination List
        </button>
                {/* <button className="btn btn-secondary w-full max-w-sm">Existing Itineraries</button> */}
                </Link>
              
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading lists or no lists found...</p>
      )}
    </div>
    </div>
  );
};

export default ListPage;

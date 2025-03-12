'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push(`/protected?key=${encodeURIComponent(apiKey)}`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-md mx-auto mt-16">
          <h1 className="text-2xl font-bold mb-8">API Playground</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your API Key
              </label>
              <input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="tvly-xxxxxxxx"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Validate API Key
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 
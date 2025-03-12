'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Notification from '@/components/Notification';
import Sidebar from '@/components/Sidebar';

export default function Protected() {
  const searchParams = useSearchParams();
  const [notification, setNotification] = useState(null);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateApiKey = async () => {
      const key = searchParams.get('key');
      if (!key) {
        setNotification({
          message: 'No API key provided',
          type: 'error'
        });
        setIsValidating(false);
        return;
      }

      try {
        // Query Supabase to check if the API key exists and is valid
        const { data, error } = await supabase
          .from('api_keys')
          .select('*')
          .eq('key', key)
          .single();

        if (error || !data) {
          setNotification({
            message: 'Invalid API key',
            type: 'error'
          });
        } else {
          setNotification({
            message: `Valid API key "${data.name}". /protected can be accessed`,
            type: 'success'
          });
        }
      } catch (err) {
        setNotification({
          message: 'Error validating API key',
          type: 'error'
        });
      }
      setIsValidating(false);
    };

    validateApiKey();
  }, [searchParams]);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-md mx-auto mt-16">
          <h1 className="text-2xl font-bold mb-8">Protected Page</h1>
          
          {isValidating ? (
            <div className="text-center">
              <p>Validating API key...</p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600">
                This is a protected page that can only be accessed with a valid API key.
              </p>
            </div>
          )}
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}
    </div>
  );
} 
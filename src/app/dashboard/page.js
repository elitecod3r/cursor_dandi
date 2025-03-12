'use client';

import { useState } from 'react';

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  
  const generateNewKey = () => {
    if (!newKeyName.trim()) return;
    
    const newKey = {
      id: Date.now(),
      name: newKeyName,
      key: `key_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`,
      createdAt: new Date().toISOString()
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
  };

  const deleteKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Keys Management</h1>
        
        {/* Create new key section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Create New API Key</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter key name"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              onClick={generateNewKey}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Generate Key
            </button>
          </div>
        </div>

        {/* API Keys list */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your API Keys</h2>
          
          {apiKeys.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No API keys created yet.</p>
          ) : (
            <div className="space-y-4">
              {apiKeys.map(key => (
                <div key={key.id} className="border dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{key.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Created: {new Date(key.createdAt).toLocaleDateString()}
                      </p>
                      <p className="font-mono text-sm mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        {key.key}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteKey(key.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
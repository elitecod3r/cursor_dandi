'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ApiKeysDashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editName, setEditName] = useState('');
  const [showCopied, setShowCopied] = useState(null);

  const generateNewKey = () => {
    if (!newKeyName.trim()) return;
    
    const newKey = {
      id: Date.now(),
      name: newKeyName,
      key: `pk_live_${Math.random().toString(36).substr(2, 9)}_${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
  };

  const deleteKey = (id) => {
    if (confirm('Are you sure you want to delete this API key?')) {
      setApiKeys(apiKeys.filter(key => key.id !== id));
    }
  };

  const updateKeyName = (id) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, name: editName } : key
    ));
    setIsEditing(null);
  };

  const toggleKeyStatus = (id) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' } : key
    ));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setShowCopied(id);
    setTimeout(() => setShowCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Keys</h1>
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Create new key section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create New API Key</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter key name"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={generateNewKey}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Generate Key
            </button>
          </div>
        </div>

        {/* API Keys list */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your API Keys</h2>
            
            {apiKeys.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No API keys created yet.</p>
            ) : (
              <div className="space-y-4">
                {apiKeys.map(key => (
                  <div key={key.id} className="border dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        {isEditing === key.id ? (
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <button
                              onClick={() => updateKeyName(key.id)}
                              className="text-green-500 hover:text-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setIsEditing(null)}
                              className="text-gray-500 hover:text-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900 dark:text-white">{key.name}</h3>
                            <button
                              onClick={() => {
                                setIsEditing(key.id);
                                setEditName(key.name);
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              ✎
                            </button>
                          </div>
                        )}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Created: {new Date(key.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded flex-1">
                            {key.key}
                          </code>
                          <button
                            onClick={() => copyToClipboard(key.key, key.id)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            {showCopied === key.id ? '✓ Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleKeyStatus(key.id)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            key.status === 'active'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {key.status === 'active' ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => deleteKey(key.id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
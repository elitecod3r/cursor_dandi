'use client';

import { useState } from 'react';
import Link from 'next/link';

const sampleApiKeys = [
  {
    id: 1,
    name: 'default',
    key: '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',
    createdAt: '2024-03-12T10:00:00.000Z',
    usage: 24
  },
  {
    id: 2,
    name: 'tmp1',
    key: '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',
    createdAt: '2024-03-11T15:30:00.000Z',
    usage: 0
  },
  {
    id: 3,
    name: 'my-cool-api-key',
    key: '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',
    createdAt: '2024-03-10T09:15:00.000Z',
    usage: 0
  },
  {
    id: 4,
    name: 'cursor',
    key: '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',
    createdAt: '2024-03-09T14:45:00.000Z',
    usage: 0
  }
];

export default function ApiKeysDashboard() {
  const [apiKeys, setApiKeys] = useState(sampleApiKeys);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyLimit, setNewKeyLimit] = useState('1000');
  const [isEditing, setIsEditing] = useState(null);
  const [editName, setEditName] = useState('');
  const [showCopied, setShowCopied] = useState(null);
  const [revealedKeys, setRevealedKeys] = useState(new Set());

  const generateNewKey = () => {
    if (!newKeyName.trim()) return;
    
    const newKey = {
      id: Date.now(),
      name: newKeyName,
      key: `tvly-${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      usage: 0
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
  };

  const deleteKey = (id) => {
    if (confirm('Are you sure you want to delete this API key?')) {
      setApiKeys(apiKeys.filter(key => key.id !== id));
    }
  };

  const toggleKeyVisibility = (id) => {
    setRevealedKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setShowCopied(id);
    setTimeout(() => setShowCopied(null), 2000);
  };

  const updateKeyName = () => {
    if (!editName.trim()) return;
    
    setApiKeys(apiKeys.map(key => 
      key.id === isEditing ? { ...key, name: editName } : key
    ));
    setIsEditing(null);
    setEditName('');
    document.getElementById('editKeyModal').close();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span>Pages</span>
          <span>/</span>
          <span>Overview</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Overview</h1>

        {/* Current Plan Card */}
        <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 rounded-xl p-6 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-md text-sm">
              Manage Plan
            </button>
          </div>
          <div className="mb-8">
            <span className="text-white/80 text-sm">CURRENT PLAN</span>
            <h2 className="text-3xl font-semibold mt-2">Researcher</h2>
          </div>
          <div>
            <span className="text-white/80 text-sm">API Limit</span>
            <div className="mt-2">
              <div className="h-2 bg-white/20 rounded-full">
                <div className="h-2 bg-white rounded-full" style={{ width: '10%' }}></div>
              </div>
              <p className="text-sm mt-1">24 / 1,000 Requests</p>
            </div>
          </div>
        </div>

        {/* API Keys Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <button
              onClick={() => document.getElementById('newKeyModal').showModal()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <span className="text-2xl">+</span>
            </button>
          </div>
          
          <p className="text-gray-600 text-sm mb-6">
            The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
          </p>

          <table className="w-full">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="text-left py-2 font-medium">NAME</th>
                <th className="text-left py-2 font-medium">USAGE</th>
                <th className="text-left py-2 font-medium">KEY</th>
                <th className="text-right py-2 font-medium">OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map(key => (
                <tr key={key.id} className="border-b">
                  <td className="py-4">{key.name}</td>
                  <td className="py-4">{key.usage}</td>
                  <td className="py-4 font-mono">
                    {showCopied === key.id ? (
                      <span className="text-green-600">✓ Copied!</span>
                    ) : revealedKeys.has(key.id) ? (
                      key.key
                    ) : (
                      key.key.replace(/[a-zA-Z0-9]/g, '*')
                    )}
                  </td>
                  <td className="py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                        title={revealedKeys.has(key.id) ? "Hide API Key" : "Show API Key"}
                      >
                        {revealedKeys.has(key.id) ? '👁️‍🗨️' : '👁️'}
                      </button>
                      <button
                        onClick={() => copyToClipboard(key.key, key.id)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(key.id);
                          setEditName(key.name);
                          document.getElementById('editKeyModal').showModal();
                        }}
                        className="p-2 text-gray-500 hover:text-gray-700"
                        title="Edit key name"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => deleteKey(key.id)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Key Modal */}
      <dialog id="newKeyModal" className="rounded-2xl p-0 w-full max-w-md shadow-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 backdrop:bg-black/50">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">Create a new API key</h3>
          <p className="text-gray-600 text-sm mb-6">Enter a name and limit for the new API key.</p>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            generateNewKey();
            document.getElementById('newKeyModal').close();
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Key Name – A unique name to identify this key
                </label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Key Name"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Limit monthly usage*
                </label>
                <input
                  type="number"
                  value={newKeyLimit}
                  onChange={(e) => setNewKeyLimit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                *If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setNewKeyName('');
                  document.getElementById('newKeyModal').close();
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Edit Key Modal */}
      <dialog id="editKeyModal" className="rounded-2xl p-0 w-full max-w-md shadow-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 backdrop:bg-black/50">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">Edit API key name</h3>
          <p className="text-gray-600 text-sm mb-6">Enter a new name for your API key.</p>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            updateKeyName();
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Key Name – A unique name to identify this key
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Key Name"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(null);
                  setEditName('');
                  document.getElementById('editKeyModal').close();
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
} 
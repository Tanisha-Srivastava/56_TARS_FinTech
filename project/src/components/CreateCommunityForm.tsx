import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export function CreateCommunityForm({ onClose }: { onClose: () => void }) {
  const { currentUser, addCommunity } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    guidelines: '',
    claimLimits: '',
    adminCost: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const community = {
      id: crypto.randomUUID(),
      ...formData,
      claimLimits: parseFloat(formData.claimLimits),
      adminCost: parseFloat(formData.adminCost),
      members: [currentUser.id],
      creator: currentUser.id,
    };
    addCommunity(community);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Community Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Guidelines</label>
        <textarea
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          value={formData.guidelines}
          onChange={(e) => setFormData({ ...formData, guidelines: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Claim Limits (LPA)</label>
        <input
          type="number"
          step="0.1"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.claimLimits}
          onChange={(e) => setFormData({ ...formData, claimLimits: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Admin Cost (LPA)</label>
        <input
          type="number"
          step="0.1"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.adminCost}
          onChange={(e) => setFormData({ ...formData, adminCost: e.target.value })}
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Create Community
        </button>
      </div>
    </form>
  );
}
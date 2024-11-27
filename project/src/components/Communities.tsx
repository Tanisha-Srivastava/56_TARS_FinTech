import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Users } from 'lucide-react';
import { CreateCommunityForm } from './CreateCommunityForm';
import { JoinCommunityModal } from './JoinCommunityModal';

export function Communities() {
  const { communities, currentUser } = useStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to view communities.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Communities</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          Create Community
        </button>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Create New Community</h3>
            <CreateCommunityForm onClose={() => setShowCreateForm(false)} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <div
            key={community.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-6 w-6 text-indigo-600" />
              <h3 className="text-lg font-semibold">{community.name}</h3>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">{community.guidelines}</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Claim Limit: {community.claimLimits} LPA</p>
              <p>Admin Cost: {community.adminCost} LPA</p>
              <p>Members: {community.members.length}</p>
            </div>
            {!community.members.includes(currentUser.id) && (
              <button
                onClick={() => setSelectedCommunityId(community.id)}
                className="mt-4 w-full bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200"
              >
                Join Community
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedCommunityId && (
        <JoinCommunityModal
          communityId={selectedCommunityId}
          onClose={() => setSelectedCommunityId(null)}
        />
      )}
    </div>
  );
}
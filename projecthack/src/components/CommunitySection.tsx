import React, { useState } from 'react';
import { Community, UserProfile } from '../types';
import { Users, Plus, Vote, AlertCircle } from 'lucide-react';

interface Props {
  profile: UserProfile;
}

export const CommunitySection: React.FC<Props> = ({ profile }) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [claimAmount, setClaimAmount] = useState<number>(0);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [votes, setVotes] = useState<{[key: string]: boolean}>({});
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimDescription, setClaimDescription] = useState('');

  const handleCreateCommunity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCommunity: Community = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      guidelines: formData.get('guidelines') as string,
      members: [profile.name],
      claims: []
    };
    setCommunities([...communities, newCommunity]);
    setShowCreateForm(false);
  };

  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCommunity) {
      const newClaim = {
        id: Date.now().toString(),
        userId: profile.name,
        amount: claimAmount,
        description: claimDescription,
        votes: [],
        status: 'pending'
      };
      
      const updatedCommunity = {
        ...selectedCommunity,
        claims: [...selectedCommunity.claims, newClaim]
      };
      
      setCommunities(communities.map(c => 
        c.id === selectedCommunity.id ? updatedCommunity : c
      ));
      setClaimAmount(0);
      setClaimDescription('');
      setShowClaimForm(false);
    }
  };

  const handleVote = (claimId: string, approved: boolean) => {
    setVotes({ ...votes, [claimId]: approved });
  };

  const getVotePercentage = (claim: any) => {
    const totalVotes = Object.keys(votes).filter(key => key === claim.id).length;
    if (totalVotes === 0) return 0;
    const approvedVotes = Object.entries(votes)
      .filter(([key, value]) => key === claim.id && value)
      .length;
    return (approvedVotes / totalVotes) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="mr-2" size={20} />
          Create Community
        </button>
        <button
          onClick={() => setShowClaimForm(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Vote className="mr-2" size={20} />
          Make a Claim
        </button>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Create New Community</h3>
            <form onSubmit={handleCreateCommunity}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Community Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guidelines</label>
                  <textarea
                    name="guidelines"
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {showClaimForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Make a Claim</h3>
            <form onSubmit={handleCreateClaim}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Community</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => setSelectedCommunity(communities.find(c => c.id === e.target.value) || null)}
                    required
                  >
                    <option value="">Select a community</option>
                    {communities.map(community => (
                      <option key={community.id} value={community.id}>
                        {community.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Claim Amount</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    value={claimDescription}
                    onChange={(e) => setClaimDescription(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowClaimForm(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit Claim
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {communities.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Communities</h3>
          <div className="space-y-4">
            {communities.map(community => (
              <div key={community.id} className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold">{community.name}</h4>
                <p className="text-gray-600 mt-2">{community.guidelines}</p>
                
                {community.claims.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Active Claims</h5>
                    {community.claims.map(claim => (
                      <div key={claim.id} className="border rounded-md p-4 mt-2">
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Amount: ${claim.amount}</p>
                              <p className="text-sm text-gray-600">By: {claim.userId}</p>
                              <p className="text-sm text-gray-600">{claim.description}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="text-sm font-medium text-gray-500">
                                Approval Rate: {getVotePercentage(claim)}%
                              </div>
                              {claim.userId !== profile.name && !votes[claim.id] && (
                                <div className="flex space-x-2 mt-2">
                                  <button
                                    onClick={() => handleVote(claim.id, true)}
                                    className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                                  >
                                    Sanction
                                  </button>
                                  <button
                                    onClick={() => handleVote(claim.id, false)}
                                    className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                                  >
                                    No Sanction
                                  </button>
                                </div>
                              )}
                              {votes[claim.id] !== undefined && (
                                <span className={votes[claim.id] ? 'text-green-600' : 'text-red-600'}>
                                  You voted: {votes[claim.id] ? 'Sanctioned' : 'Not Sanctioned'}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${getVotePercentage(claim)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
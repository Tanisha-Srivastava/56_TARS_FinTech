import React, { useState } from 'react';
import { useStore } from '../store/useStore';

interface Props {
  communityId: string;
  onClose: () => void;
}

export function JoinCommunityModal({ communityId, onClose }: Props) {
  const { currentUser, addJoinRequest } = useStore();
  const [amount, setAmount] = useState('');
  const [documents, setDocuments] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const request = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      communityId,
      amount: parseFloat(amount),
      documents,
      votes: [],
      status: 'pending' as const,
      createdAt: new Date(),
    };

    addJoinRequest(request);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real application, you would upload these files to a server
    // For now, we'll just store the file names
    const fileUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setDocuments([...documents, ...fileUrls]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Join Community</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount Needed (LPA)
            </label>
            <input
              type="number"
              step="0.1"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supporting Documents
            </label>
            <input
              type="file"
              multiple
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={handleFileUpload}
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
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
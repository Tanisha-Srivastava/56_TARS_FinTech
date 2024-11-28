import React, { useState } from 'react';
import { UserProfile } from '../types';
import { UserPlus } from 'lucide-react';

interface Props {
  onSubmit: (profile: UserProfile) => void;
}

export const ProfileForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as UserProfile);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <UserPlus className="text-blue-600" size={24} />
        <h2 className="text-2xl font-semibold">Create Your Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            required
            min="18"
            max="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, gender: e.target.value as UserProfile['gender'] })}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Occupation</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pre-existing Disease</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Smoking Status</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, smoking: e.target.value as UserProfile['smoking'] })}
          >
            <option value="">Select status</option>
            <option value="non_smoker">Non Smoker</option>
            <option value="moderate_smoker">Moderate Smoker</option>
            <option value="regular_smoker">Regular Smoker</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">BMI</label>
          <input
            type="number"
            required
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, bmi: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Family History</label>
          <select
            multiple
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              setFormData({ ...formData, familyHistory: selected });
            }}
          >
            <option value="stroke">Stroke</option>
            <option value="diabetes">Diabetes</option>
            <option value="cancer">Cancer</option>
            <option value="heart_disease">Heart Disease</option>
            <option value="kidney_disease">Kidney Disease</option>
            <option value="none">None</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Previous Claims</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, claims: Number(e.target.value) as UserProfile['claims'] })}
          >
            <option value="">Select claims</option>
            <option value="0">No Claims</option>
            <option value="1">Has Claims</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Policy Type</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, policyType: e.target.value as UserProfile['policyType'] })}
          >
            <option value="">Select policy type</option>
            <option value="individual">Individual</option>
            <option value="family">Family</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Annual Income (LPA)</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, income: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Profile
        </button>
      </div>
    </form>
  );
};
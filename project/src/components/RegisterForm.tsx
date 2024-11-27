import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { SmokingStatus } from '../types';

export function RegisterForm() {
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    healthCondition: '',
    smokingStatus: '' as SmokingStatus,
    bmi: '',
    familyHistory: '',
    claims: '',
    policyType: '',
    income: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: crypto.randomUUID(),
      ...formData,
      age: parseInt(formData.age),
      bmi: parseFloat(formData.bmi),
      claims: parseInt(formData.claims),
      income: parseFloat(formData.income),
    };
    setCurrentUser(user);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Health Condition</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.healthCondition}
              onChange={(e) => setFormData({ ...formData, healthCondition: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Smoking Status</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.smokingStatus}
              onChange={(e) => setFormData({ ...formData, smokingStatus: e.target.value as SmokingStatus })}
            >
              <option value="">Select smoking status</option>
              <option value="non-smoker">Non-smoker</option>
              <option value="occasional-smoker">Occasional smoker</option>
              <option value="regular-smoker">Regular smoker</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">BMI</label>
            <input
              type="number"
              step="0.1"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.bmi}
              onChange={(e) => setFormData({ ...formData, bmi: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Family History</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.familyHistory}
              onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Previous Claims</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.claims}
              onChange={(e) => setFormData({ ...formData, claims: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Policy Type</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.policyType}
              onChange={(e) => setFormData({ ...formData, policyType: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Annual Income</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.income}
              onChange={(e) => setFormData({ ...formData, income: e.target.value })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
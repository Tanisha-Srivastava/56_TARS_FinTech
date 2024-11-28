import React, { useState } from 'react';
import { UserProfile } from './types';
import { ProfileForm } from './components/ProfileForm';
import { RiskScore } from './components/RiskScore';
import { CommunitySection } from './components/CommunitySection';

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const handleProfileSubmit = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">P2P Insurance Platform</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!profile ? (
          <ProfileForm onSubmit={handleProfileSubmit} />
        ) : (
          <div className="space-y-6">
            <RiskScore profile={profile} />
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(profile).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <dt className="text-sm font-medium text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {Array.isArray(value) ? value.join(', ') : value.toString()}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <CommunitySection profile={profile} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
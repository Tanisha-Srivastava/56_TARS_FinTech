import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RegisterForm } from './components/RegisterForm';
import { Communities } from './components/Communities';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                P2P Insurance Platform
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join our community-driven insurance platform where members support each other
                through transparent risk sharing and collective decision making.
              </p>
            </div>
          } />
          <Route path="register" element={<RegisterForm />} />
          <Route path="communities" element={<Communities />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
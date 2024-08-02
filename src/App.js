import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './Components/Countries/CountryList';
import CountryDetails from './Components/Countries/CountryDetails';

function App() {
  return (
      <Router>
        <div>
          <h1 className="font-bold text-3xl text-center my-4">Country Information</h1>
          <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:name" element={<CountryDetails />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

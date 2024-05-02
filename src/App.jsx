import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Parks from './components/Parks';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  const [allParks, setAllParks] = useState([]);
 
  useEffect(() => {
    const fetchAllParks = async () => {
      try {
        const result = await fetch('http://localhost:3000/api/parks');
        const allParkData = await result.json();
        setAllParks(allParkData);
      } catch (error) {
        console.error("error fetching all parks", error)
      }
    }
    fetchAllParks();
  }, [])
  return (
    <>
      <Navbar />
      <h1>Rate-A-Park</h1>
      <Routes>
        <Route path="/" element={<Parks allParks={allParks} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App

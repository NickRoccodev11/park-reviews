import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<Parks allParks={allParks} />} />
        <Route path="/" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App

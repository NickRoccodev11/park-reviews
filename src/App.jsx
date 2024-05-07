import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Parks from './components/Parks';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ParkDetails from './components/ParkDetails';
import Users from './components/Users';

function App() {
  const [allParks, setAllParks] = useState([]);
  const [showLogoutButton, setShowLogoutButton] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)


  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      setShowLogoutButton(true)
    }

  }, [])

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role === 'admin') {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [showLogoutButton])

  useEffect(() => {
    const fetchAllParks = async () => {
      try {
        const result = await fetch('/api/parks');
        const allParkData = await result.json();
        setAllParks(allParkData);
      } catch (error) {
        console.error("error fetching all parks", error)
      }
    }
    fetchAllParks();
  }, [])

  const handleLogout = () => {
    sessionStorage.clear();
    setShowLogoutButton(false)
  }

  return (
    <>
      <Navbar />
      {
        showLogoutButton &&
        <button onClick={handleLogout}>Logout</button>
      }
      <h1 className='logo'>Rate-A-Park</h1>
      <Routes>
        <Route path="/" element={<Parks
          setAllParks={setAllParks}
          allParks={allParks}
          setIsAdmin={setIsAdmin}
          isAdmin={isAdmin}
        />} />
        <Route path="/register" element={<Register setShowLogoutButton={setShowLogoutButton} />} />
        <Route path="/login" element={<Login setShowLogoutButton={setShowLogoutButton} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:parkId" element={<ParkDetails />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  )
}

export default App;

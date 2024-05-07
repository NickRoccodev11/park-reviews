import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ setShowLogoutButton }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      const LoggedUserData = await result.json();
      if (LoggedUserData.token) {
        sessionStorage.setItem("token", LoggedUserData.token)
        setShowLogoutButton(true)
        navigate('/profile')
      }
      if (LoggedUserData.loggedUser.is_admin) {
        sessionStorage.setItem("role", "admin")
      } else {
        sessionStorage.setItem("role", "user")
      }
    } catch (error) {
      console.error("error on login fetch", error)
    }
  }

  return (
    <div className='form-container'>
      <div className='form'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label >Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br />
          <label >Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <button>Login</button>
        </form>
      </div></div>

  )
}

export default Login

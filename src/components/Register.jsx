import { useState } from 'react'


const Register = ({ setIsAdmin }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
          firstName,
          lastName
        })
      })
      const userData = await result.json()
      console.log("before session storage")
      if (userData.token) {
        console.log("inside session storage")
        sessionStorage.setItem('token', userData.token)
        console.log("after sesssion storage")
      } else {
        console.log("error registering", userData)
      }
      console.log("beofre adim")
      if (userData.is_admin) {
        console.log("inside adim")
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
      console.log("after adim")
    } catch (error) {
      console.error("error registering user", error)
    }
  }

  return (
    <div>
      <h1>Register an Account</h1>
      <form onSubmit={handleSubmit} >
        <label>Username: </label><br />
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <label> First Name:</label><br />
        <input
          value={firstName}
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          required
        /><br />
        <label>Last Name: </label><br />
        <input
          value={lastName}
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          required
        /><br />
        <label> Email</label><br />
        <input
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <label>Password </label><br />
        <input
          value={password}
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register

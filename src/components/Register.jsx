import { useState } from 'react'


const Register = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch('/auth/register', {
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
      if (userData.token) {
        sessionStorage.setItem('token', userData.token)

        sessionStorage.setItem('role', 'user')

      } else {
        console.log("error registering, no token recieved", userData)
      }
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

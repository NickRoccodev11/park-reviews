import { useEffect, useState } from 'react'

const Users = () => {
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    const fetchAllUsers = async () => {
      const result = await fetch('/auth/users')
      const userData = await result.json()
      setAllUsers(userData)
    }
    fetchAllUsers()
  }, [])

  return (
    <div className='users-container'>
      {
        allUsers &&
        allUsers.map(user => {
          return (
            <div className='single-user'>
              <h3>{user.first_name} {user.last_name}</h3>
              <p><span className='user-info'>username: </span> {user.username}</p>
              <p> <span className='user-info'>email: </span> {user.email}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Users

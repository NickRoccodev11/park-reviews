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
    <div>
      {
        allUsers &&
        allUsers.map(user => {
          return (
            <div className='single-user'>
              <h3>{user.first_name} {user.last_name}</h3>
              <p>username: {user.username}</p>
              <p>email: {user.email}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Users

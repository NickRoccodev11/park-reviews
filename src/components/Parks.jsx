import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import SinglePark from "./SinglePark"
import Searchbar from "./Searchbar"
import CreatePark from "./CreatePark"

const Parks = ({ allParks, setAllParks, isAdmin, setIsAdmin }) => {
  const [filterText, setFilterText] = useState("")
 
  const [showCreateParkForm, setShowCreateParkForm] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   const role = sessionStorage.getItem('role');
  //   if (role === 'admin') {
  //     setIsAdmin(true)
  //   } else {
  //     setIsAdmin(false)
  //   }
  // }, [])

  return (
    <div>

<Searchbar
        filterText={filterText}
        setFilterText={setFilterText}
      />
      {
        isAdmin &&
        <div className="admin-card">
          <h4>Logged in as Admin</h4>
          <button onClick={() => navigate('/users')}>See All Users</button>
          <button onClick={() => setShowCreateParkForm(true)}>Add a Park:</button>
          {
            showCreateParkForm &&
            <CreatePark 
            setAllParks={setAllParks} 
            setShowCreateParkForm={setShowCreateParkForm}
            />
          }
        </div>
      }



      <div className="park-list">
        {
          allParks.filter(park => {
            return filterText === "" ||
              park.name.toLowerCase().includes(filterText.toLowerCase())
          })
            .map(park => {
              return <SinglePark 
              park={park} />
            })
        }
      </div>
    </div>
  )
}

export default Parks

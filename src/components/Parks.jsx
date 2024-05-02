import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import SinglePark from "./SinglePark"
import Searchbar from "./Searchbar"

const Parks = ({ allParks }) => {
  const [filterText, setFilterText] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role === 'admin') {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [])

  return (
    <div>
      {
        isAdmin &&
        <div>
        <h4>Logged in as Admin</h4>
        <label>See all Users:</label><br />
        <button onClick={() => navigate('/users')}>click here</button>
      </div>
      }
      
      <Searchbar
        filterText={filterText}
        setFilterText={setFilterText}
      />
      <div className="park-list">
        {
          allParks.filter(park => {
            return filterText === "" ||
              park.name.toLowerCase().includes(filterText.toLowerCase())
          })
            .map(park => {
              return <SinglePark park={park} />
            })
        }
      </div>

    </div>
  )
}

export default Parks

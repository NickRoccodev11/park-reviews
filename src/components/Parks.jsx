import { useState } from "react"
import SinglePark from "./SinglePark"
import Searchbar from "./Searchbar"

const Parks = ({ allParks }) => {
  const [filterText, setFilterText] = useState("")
  return (
    <div>
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

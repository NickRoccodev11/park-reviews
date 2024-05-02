import SinglePark from "./SinglePark"

const Parks = ({ allParks }) => {
  return (
    <div>
      {
        allParks.map(park => {
          return <SinglePark park={park} />
        })
      }
    </div>
  )
}

export default Parks

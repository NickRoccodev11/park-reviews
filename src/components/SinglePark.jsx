import React from 'react'

const SinglePark = ({ park }) => {
  return (
    <div className='single-park'>
      <h3>{park.name}</h3>
      <img src={park.image} />
      <p>state: {park.state}</p>
    </div>
  )
}

export default SinglePark

import React from 'react'
import { useNavigate } from 'react-router-dom'

const SinglePark = ({ park }) => {
  const navigate = useNavigate()
  return (
    <div className='single-park'>
      <h3>{park.name}</h3>
      <img src={park.image} />
      <p>state: {park.state}</p>
      <button onClick={()=>navigate(`/${park.id}`)}>See Details</button>
    </div>
  );
}

export default SinglePark;

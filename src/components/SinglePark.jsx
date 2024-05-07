import React from 'react'
import { useNavigate } from 'react-router-dom'

const SinglePark = ({ park }) => {
  const navigate = useNavigate()
  console.log(park)
  return (
    <div className='single-park'>
      <h3>{park.name}</h3>
      <img src={park.image} />
      <p>state: {park.state}</p>
      <span>Tags: </span>
      {
        park.Tag.length> 0 &&

        park.Tag.map(tag=>{
          return(
            <div className='tag-container'>
            <span className='tag'> {tag.category}</span><br/>
            </div>
          ) 
        })
      }
      <button onClick={()=>navigate(`/${park.id}`)}>See Details</button>
    </div>
  );
}

export default SinglePark;

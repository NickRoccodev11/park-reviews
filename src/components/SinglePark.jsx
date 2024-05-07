import React from 'react'
import { useNavigate } from 'react-router-dom'

const getAverageRating = (reviews)=>{
const total = reviews.reduce((acc,curr)=>acc+ curr.stars, 0 )
const average = total/ reviews.length
return average.toFixed(2)
}

const SinglePark = ({ park }) => {
  const navigate = useNavigate()
  console.log(park)
  return (
    <div className='single-park'>
      <h3>{park.name}</h3>
      <img src={park.image} />
      <p>state: {park.state}</p>
      <span>tags: </span>
      {
        park.Tag.length > 0 &&

        park.Tag.map(tag => {
          return (
            <div className='tag-container'>
              <span className='tag'> {tag.category}</span><br />
            </div>
          )
        })
      }
      {
        park.Review.length > 0 &&
        <p>average rating: {getAverageRating(park.Review)} </p>
      }
      <button onClick={() => navigate(`/${park.id}`)}>See Details</button>
    </div>
  );
}

export default SinglePark;

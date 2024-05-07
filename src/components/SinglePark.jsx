import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SinglePark = ({ park }) => {
  const navigate = useNavigate()
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    const getAverageRating = (reviews) => {
      const total = reviews.reduce((acc, curr) => acc + parseInt(curr.stars), 0);
      const average = (total / reviews.length).toFixed(2);
      setAverageRating(average);
    };

    if (park.Review.length > 0) {
      getAverageRating(park.Review);
    }
  }, [park.Review]);

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
        <p>average rating: {averageRating} </p>
      }
      <button onClick={() => navigate(`/${park.id}`)}>See Details</button>
    </div>
  );
}

export default SinglePark;

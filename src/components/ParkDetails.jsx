import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from "./ReviewForm";



const ParkDetails = () => {
  const {parkId} = useParams();
  const [park, setPark] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
const [token, setToken] = useState("");

console.log(park)

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      setToken(sessionToken)
    }
  }, [])

  useEffect(() =>{
    
    const fetchParkDetails = async () => {
      try{
        const response = await fetch(`/api/parks/${parkId}`);
        const data = await response.json();
        setPark(data);
      } catch (error) {
        console.error('Failed to fetch park details:', error);
      }
    };

    fetchParkDetails();
  }, []);

  if (!park) return <div>Loading...</div>;

  return (

  <div>
    <h1>{park.name}</h1>
    <img src={park.image} alt={park.name} />
    <p>State: {park.state}</p>
    <p>Description: {park.description}</p>
    <p>Contact: {park.contact}</p>
    <p>Hours: {park.hours}</p>
    <button onClick={()=>setShowReviewForm(true)}>Leave a Review</button>
    {
      showReviewForm && 
      <ReviewForm  
      park={park}
      setPark={setPark}
      token={token}
      /> 

    }
    <h2> Reviews </h2>
    {
      park.Review.map(review => {
        return(
          <div className='park-review'>
            <h4>{review.title}</h4>
            <p>{review.content}</p>
            <p>rating: {review.stars} out of five stars</p>
          </div>
        )
      })
    }

    </div>
    
  );

}


export default ParkDetails;
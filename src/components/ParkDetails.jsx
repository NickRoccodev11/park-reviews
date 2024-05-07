import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from "./ReviewForm";
import CommentForm from './CommentForm';



const ParkDetails = () => {
  const { parkId } = useParams();
  const [park, setPark] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(null)
  const [token, setToken] = useState("");
  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      setToken(sessionToken)
    }
  }, [])

  useEffect(() => {

    const fetchParkDetails = async () => {
      try {
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
      <button onClick={() => setShowReviewForm(true)}>Leave a Review</button>
      {
        showReviewForm &&
        <ReviewForm
          park={park}
          setPark={setPark}
          setShowReviewForm={setShowReviewForm}
          token={token}
        />

      }
      <h2> Reviews </h2>
      {
        park.Review.length > 0 ?
          park.Review.map(review => {
            return (
              <div className='park-review'>
                <h4>{review.title}</h4>
                <p>{review.content}</p>
                <p>rating: {review.stars} out of 5 stars</p>
                <p>review by {review.user.username}</p>
                <h5>Comments on this review:</h5>
                {
                  review.Comment.length > 0 ?
                    review.Comment.map(comment => {
                      return (
                        <>
                          <p>{comment.content}</p>
                          <p>comment by user: {comment.user.username}</p>

                        </>
                      )
                    }) :
                    <>
                      <p>no comments for this review yet</p>
                    </>
                }
                {
                  token &&
                  <button onClick={() => setShowCommentForm(review.id)}>Leave a comment</button>
                }
                {
                  showCommentForm === review.id &&
                  < CommentForm
                    review={review}
                    setPark={setPark}
                    setShowCommentForm={setShowCommentForm}
                    token={token}
                  />
                }
              </div>
            )
          }) :
          <>
            <p>No Reviews for this park yet</p>
          </>
      }

    </div>

  );

}


export default ParkDetails;
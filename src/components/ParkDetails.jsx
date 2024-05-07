import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from "./ReviewForm";
import CommentForm from './CommentForm';
import EditPark from './EditPark';



const ParkDetails = () => {
  const { parkId } = useParams();
  const [park, setPark] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(null)
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false)
  const [showEditPark, setShowEditPark] = useState(false)

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      setToken(sessionToken)
    }
    const role = sessionStorage.getItem('role');
    if (role === 'admin') {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
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

  const handleDelete = async () => {
    try {
      const result = await fetch(`/api/parks/${park.id}`, {
        method: 'DELETE'
      })
      const deletedPark = await result.json()

    } catch (error) {

    }
  }

  if (!park) return <div>Loading...</div>;

  return (

    <div className='park-details'>

      <h1>{park.name}</h1>
      <img src={park.image} alt={park.name} />
      <div>
        <p>State: {park.state}</p>
        <p>Description: {park.description}</p>
        <p>Contact: {park.contact}</p>
        <p>Hours: {park.hours}</p>
      </div>

      <span>Tags: </span>
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
        isAdmin &&
        <div className="admin-card">
          <h4>Logged in as Admin</h4>
          <button onClick={() => setShowEditPark(true)}>edit park</button>
          {
            showEditPark &&
            <EditPark
              park={park}
              setPark={setPark}
              setShowEditPark={setShowEditPark}
            />
          }
          <button onClick={handleDelete}>delete park</button>
        </div>
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
      <div className='review-container'>
        {
          park.Review.length > 0 ?
            park.Review.map(review => {
              return (
                <div className='user-post'>
                  <h4>{review.title}</h4>
                  <p>{review.content}</p>
                  <p><span className='park-info'>rating: </span> {review.stars} out of 5 stars</p>
                  <p> <span className='park-info'>review by </span> {review.user.username}</p>
                  <h5 className='park-info'>Comments on this review:</h5>
                  {
                    review.Comment.length > 0 ?
                      review.Comment.map(comment => {
                        return (
                          <div className='user-post'>
                            <p>{comment.content}</p>
                            <p className='park-info'>comment by user: {comment.user.username}</p>

                          </div>
                        )
                      }) :
                      <>
                        <p className='park-info'>no comments for this review yet</p>
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
              <p className='park-info'>No Reviews for this park yet</p>
            </>
        }

      </div>
    </div>


  );

}


export default ParkDetails;
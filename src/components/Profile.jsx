import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserReview from './UserReview'
import UserComment from './UserComment'
// teddyB
// 23947sdkgh
const Profile = () => {
  const [token, setToken] = useState('')
  const [userReviews, setUserReviews] = useState([])
  const [userComments, setUserComments] = useState([])
  const navigate = useNavigate()
  console.log(userComments)
  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      setToken(sessionToken)
    }
  }, [])

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (token) {
        try {
          const result = await fetch('/auth/reviews', {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            }
          })
          const reviewData = await result.json()
          setUserReviews(reviewData)
        } catch (error) {
          console.error("error fetching user reviews", error)
        }
      }
    }
    const fetchUserComments = async () => {
      if (token) {
        try {
          const result = await fetch('auth/comments', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            }
          })
          const commentData = await result.json()
          setUserComments(commentData)
        } catch (error) {
          console.error("error fetching user comments", error)
        }
      }
    }
    fetchUserReviews();
    fetchUserComments();
  }, [token])

  return (
    <div className='profile'>
      {
        token ?
          <>
            <h1>My Reviews</h1>
            {
              userReviews && userReviews.length > 0 ? (
                userReviews.map(review => {
                  return <UserReview
                    token={token}
                    review={review}
                    setUserReviews={setUserReviews}
                  />
                })
              ) : (
                <p>no reviews written yet!</p>
              )
            }
            {
              userComments.length > 0 ?
                <>
                  <h2> My Comments</h2>
                  {
                    userComments.map(comment => {
                      return <UserComment comment={comment} />
                    })
                  }
                </> :
                <>
                  <h2>My Comments</h2>
                  <h3> You haven't written any comments yet</h3>
                </>
            }
          </> :
          <>
            <h1>You must be logged in to view your profile</h1>
            <button onClick={() => navigate('/login')}>Go To Login</button>
          </>
      }

    </div>
  )
}

export default Profile

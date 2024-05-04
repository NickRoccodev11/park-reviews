import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserReview from './UserReview'
// teddyB
// 23947sdkgh
const Profile = () => {
  const [token, setToken] = useState('')
  const [userReviews, setUserReviews] = useState([])
  const navigate = useNavigate()

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
    fetchUserReviews()
  }, [token])

  return (
    <div className='profile'>
      {
        token  ?
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
            ): (
              <p>no reviews written yet!</p>
            )
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

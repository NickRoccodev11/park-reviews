import { useState } from "react"
import ReviewUpdateForm from "./ReviewUpdateForm"

const UserReview = ({ token, review, setUserReviews }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const handleDelete = async (id) => {
    const result = await fetch(`/auth/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const deletedReview = await result.json()
    if (deletedReview.id) {
      setUserReviews(prev => {
        return prev.filter(review => review.id !== deletedReview.id)
      })
    }
  }
    return (
      <div className="user-review">
        <h3>{review.title}</h3>
        <h4>a review for {review.park.name}</h4>
        <p>{review.content}</p>
        <p>rating: {review.stars} out of 5 stars</p>
        <button onClick={() => setShowUpdateForm(true)}>update review</button><br />
        {
          showUpdateForm &&
          <ReviewUpdateForm
            review={review}
            setShowUpdateForm={setShowUpdateForm}
            setUserReviews={setUserReviews}
            token={token}
          />
        }
        <button onClick={() => handleDelete(review.id)}>delete review</button>
      </div>
    )
  }

  export default UserReview

import { useState } from "react"
import ReviewUpdateForm from "./ReviewUpdateForm"

const UserReview = ({ token, review, setUserReviews }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  return (
    <div className="user-review">
      <h3>{review.title}</h3>
      <h4>a review for {review.park.name}</h4>
      <p>{review.content}</p>
      <p>rating: {review.stars} out of 5 stars</p>
      <button onClick={() => setShowUpdateForm(true)}>update review</button>
      {
        showUpdateForm &&
        <ReviewUpdateForm
          review={review}
          setShowUpdateForm={setShowUpdateForm}
          setUserReviews={setUserReviews}
          token={token}
        />
      }
    </div>
  )
}

export default UserReview

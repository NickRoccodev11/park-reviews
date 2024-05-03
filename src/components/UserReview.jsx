
const UserReview = ({ review }) => {
  return (
    <div className="user-review">
      <h3>{review.title}</h3>
      <h4>a review for {review.park.name}</h4>
      <p>{review.content}</p>
      <p>rating: {review.stars} out of 5 stars</p>
    </div>
  )
}

export default UserReview

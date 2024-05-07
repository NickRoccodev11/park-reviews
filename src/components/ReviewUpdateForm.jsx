import { useState } from "react"


const ReviewUpdateForm = ({ review, setShowUpdateForm, setUserReviews, token,  }) => {
  const [title, setTitle] = useState(review.title)
  const [content, setContent] = useState(review.content)
  const [stars, setStars] = useState(parseInt(review.stars))

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(`/auth/reviews/${review.park_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: review.id,
          title,
          content,
          stars
        })
      })
      const updatedReview = await result.json()
      setUserReviews(prev => {
        return prev.map(review => {
          if (review.id === updatedReview.id) {
            review.title = updatedReview.title;
            review.content = updatedReview.content;
            review.stars = updatedReview.stars;
            return review
          } else {
            return review
          }
        })
      })
      setShowUpdateForm(false)
    } catch (error) {

    }
  }

  return (
    <div>
      <h4>Update Review</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label >Title</label><br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br />
        <label >content</label><br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        /><br />
        <label >stars</label><br />
        <input
          type="number"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        /><br />
        <button>submit</button>
      </form>
    </div>
  )
}

export default ReviewUpdateForm

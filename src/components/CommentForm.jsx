import { useState } from 'react'

const CommentForm = ({ review, setPark, token, setShowCommentForm }) => {
  const [content, setContent] = useState("")

  const handleComment = async (e) => {
    e.preventDefault()
    try {
      const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          review_id: review.id,
          content
        })
      })
      const newComment = await result.json()
      setPark(prevPark => {
        const updatedReviews = prevPark.Review.map(prevReview => {
          if (prevReview.id === review.id) {
            return {
              ...prevReview,
              Comment: [...prevReview.Comment, newComment]
            };
          }
          return prevReview;
        });
        return {
          ...prevPark,
          Review: updatedReviews
        };
      });
      setShowCommentForm(null)
    } catch (error) {
      console.error("error leaving comment", error)
    }
  }

  return (
    <div className='comment-form'>
      <form onSubmit={handleComment} >
        <label> your comment:</label><br />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default CommentForm

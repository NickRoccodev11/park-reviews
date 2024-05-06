import { useState } from "react"

const UserComment = ({ comment, setUserComments, token }) => {
  const [showEditForm, setShowEditForm] = useState(false)
  const [content, setContent] = useState("")

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const result = await fetch(`/auth/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          content
        })
      })
      const editedComment = await result.json()
      setUserComments(prev => {
        return prev.map(prevComment => {
          if (prevComment.id === editedComment.id) {
            prevComment.content = editedComment.content
            return prevComment
          } else {
            return prevComment
          }
        })
      })
      setShowEditForm(false)
    } catch (error) {
      console.error("error fetching edited comment", error)
    }
  }

  const handleDelete = async () => {
    try {
      const result = await fetch(`/auth/comments/${comment.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      })
      const deletedComment = await result.json()
      setUserComments(prev => {
        return prev.filter(comment => comment.id !== deletedComment.id)
      })
    } catch (error) {
      console.error("error deleting comment in fetch", error)
    }
  }

  return (
    <div className='user-comment'>
      <h4>{comment.content}</h4>
      <span>comment made on the review: "{comment.review.title}"</span><br />
      <button onClick={() => setShowEditForm(true)}>edit comment</button><br />
      {
        showEditForm &&
        <div>
          <form onSubmit={handleEdit}>
            <label> edit you comment:</label><br />
            <textarea
              placeholder={comment.content}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button>submit</button>
          </form>
        </div>
      }
      <button onClick={handleDelete}>delete comment</button>
    </div>
  )
}

export default UserComment

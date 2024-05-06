const UserComment = ({comment}) => {
  return (
    <div className='user-comment'>
      <h4>{comment.content}</h4>
    <span>comment made on the review: "{comment.review.title}"</span>
    </div>
  )
}

export default UserComment

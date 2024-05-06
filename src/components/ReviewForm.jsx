import { useState } from "react";

const ReviewForm = ({ park, token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [stars, setStars] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          stars,
          park_id: park.id,
        }),
      });
      const newReview = await result.json();
    
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label> <br />
        <input
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br />
        <label>Content</label> <br />
        <input
          value={content}
          type="text"
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <label>Rating</label> <br />
        <input
          value={stars}
          type="number"
          min="1"
          max="5"
          onChange={(e) => setStars(e.target.value)}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;

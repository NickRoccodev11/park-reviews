import { useState } from "react";

const CreatePark = () => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [contact, setContact] = useState("")
  const [state, setState] = useState("")
  const [image, setImage] = useState("")
  const [hours, setHours] = useState("")

  const handleSubmit = async () => {
    try {
      const result = fetch("/parks", {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
          name, description, contact, state, image, hours
        })
      })
      const newPark= await result.json()
      console.log(newPark);
    } catch (error) {
      
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Park Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Contact</label>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <label>State</label>
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label>Image</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />        
        <label>Hours</label>
        <input
          value={hours}
          onChange={(e) => setHours(e.target.value)}/>
          <button>Submit</button>
      </form>
    </div>
  )
}

export default CreatePark;

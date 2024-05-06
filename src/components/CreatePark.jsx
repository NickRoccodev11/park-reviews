import { useState } from "react"

const CreatePark = () => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [contact, setContact] = useState("")
  const [state, setState] = useState("")
  const [image, setImage] = useState("")
  const [hours, setHours] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("/api/parks", {
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
      console.error(error);
      
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Park Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> <br/>
        <label>Description</label><br/>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br/>
        <label>Contact</label><br/>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        /><br/>
        <label>State</label><br/>
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
        /><br/>
        <label>Image</label><br/>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />  <br/>      
        <label>Hours</label><br/>
        <input
          value={hours}
          onChange={(e) => setHours(e.target.value)}/>
          <button>Submit</button>
      </form>
    </div>
  )
}

export default CreatePark

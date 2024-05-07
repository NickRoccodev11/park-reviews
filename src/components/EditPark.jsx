import { useState } from 'react'

const EditPark = ({ park, setPark, setShowEditPark }) => {
  const [name, setName] = useState(park.name)
  const [description, setDescription] = useState(park.description)
  const [contact, setContact] = useState(park.contact)
  const [state, setState] = useState(park.state)
  const [image, setImage] = useState(park.image)
  const [hours, setHours] = useState(park.hours)
  const [tags, setTags] = useState(park.tags)

  const handleTags = (tagString) => {
    tagArray = tagString.split(", ")
    setTags(tagArray)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await fetch(`api/parks/${park.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          contact,
          state,
          image,
          hours,
          tags
        })
      })
      const editedPark = await result.json()
      setPark(editedPark)
      setShowEditPark(false)
    } catch (error) {
      console.error("error editing park", park)
    }
  }

  return (
    <div className='edit-park'>
      <form onSubmit={handleSubmit}>
        <label >park name:</label><br />
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        /><br />
        <label >description:</label><br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />
        <label >contact:</label><br />
        <input
          value={contact}
          type="text"
          onChange={(e) => setContact(e.target.value)}
        /><br />
        <label >state:</label><br />
        <input
          value={state}
          type="text"
          onChange={(e) => setState(e.target.value)}
        /><br />
        <label >image:</label><br />
        <input
          value={image}
          type="text"
          onChange={(e) => setImage(e.target.value)}
        /><br />
        <label >hours:</label><br />
        <textarea
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        /><br />
        <label >tags:&#40;include as a list separated by commas and spaces&#41;:</label><br />
        <texta
          value={tags}
          type="text"
          onChange={(e) => handleTags(e.target.value)}
        /><br />
        <button>submit</button>
      </form>
    </div>
  )
}

export default EditPark

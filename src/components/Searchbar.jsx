const Searchbar = ({ filterText, setFilterText }) => {
  return (
    <div>
      <label > Search By Park Name:</label><br/>
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  )
}

export default Searchbar

const Searchbar = ({ filterText, setFilterText }) => {
  return (
    <div className="search-container">
      <div className="searchbar">
        <label > Search By Park Name:</label><br />
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
    </div>

  )
}

export default Searchbar

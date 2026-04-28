const Search = ({ query, setQuery }) => {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="Search Icon" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search through 300+ movies online"
        />
      </div>
    </div>
  );
};

export default Search;

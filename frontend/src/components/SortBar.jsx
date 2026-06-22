function SortBar({ sortBy, setSortBy }) {
  return (
    <div className="sort-bar">
      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value)
        }
      >
        <option value="newest">
          Newest First
        </option>

        <option value="oldest">
          Oldest First
        </option>

        <option value="likes">
          Most Liked
        </option>

        <option value="comments">
          Most Commented
        </option>

        <option value="title">
          A-Z Title
        </option>
      </select>
    </div>
  );
}

export default SortBar;
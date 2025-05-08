/* ============================================= */
function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  function preventRefresh(event) {
    event.preventDefault();
    // console.log('TodosViewForm value: ', event.target.value); // undefined
  }

  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label htmlFor="search">Search todos:</label>

        <input
          id="search"
          type="text"
          value={queryString}
          onChange={(e) => {
            // console.log(e.target.value);

            setQueryString(e.target.value);
          }}
        />

        <button
          onClick={() => {
            setQueryString('');
          }}
        >
          Clear
        </button>
      </div>

      <div>
        <label htmlFor="sortby">Sort by:</label>

        <select
          id="sortby"
          value={sortField}
          onChange={(e) => {
            console.log('select = ', e.target.value);

            setSortField(e.target.value);
          }}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        <label htmlFor="direction">Direction:</label>

        <select
          id="direction"
          value={sortDirection}
          onChange={(e) => {
            console.log('select = ', e.target.value);

            setSortDirection(e.target.value);
          }}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </form>
  );
}

/* ============================================= */
export default TodosViewForm;

import { useState, useEffect } from 'react';

import styled from 'styled-components';

/* ============================================= */
function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    //
    const debounce = setTimeout(() => setQueryString(localQueryString), 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setLocalQueryString]);

  function preventRefresh(event) {
    event.preventDefault();
    // console.log('TodosViewForm value: ', event.target.value); // undefined
  }

  return (
    // <form onSubmit={preventRefresh}>
    <StyledForm onSubmit={preventRefresh}>
      <div>
        <label htmlFor="search">Search todos:</label>

        <input
          id="search"
          type="text"
          // value={queryString}
          value={localQueryString}
          onChange={(e) => {
            // console.log(e.target.value);

            // setQueryString(e.target.value);
            setLocalQueryString(e.target.value);
          }}
        />

        <button
          onClick={() => {
            // setQueryString('');

            setLocalQueryString('');
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
    </StyledForm>
    // </form>
  );
}

/* ============================================= */

const StyledForm = styled.form`
  & div {
    margin: 20px 0;
  }

  & input {
    padding: 8px 14px;
    margin: 0 10px;
  }

  & button {
    padding: 8px 14px;
    transition: 0.2s;
  }

  & button:hover {
    background: #a7a7a7;
  }

  & label {
    margin-right: 5px;
  }

  & label[for='search'] {
    margin-right: 0px;
  }

  & label[for='direction'] {
    margin-left: 32px;
  }

  select {
    border: 2px solid #ddd;
    padding: 4px 10px;
    background: #efefef;
    transition: 0.3s;
  }

  select:hover,
  select:focus {
    background: #a7a7a7;
  }
`;

/* ============================================= */
export default TodosViewForm;

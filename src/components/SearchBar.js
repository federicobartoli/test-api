import { useState, useCallback, useRef } from 'react';
import ReactTags from 'react-tag-autocomplete';
import '../assets/css/SearchBar.css';

const SearchBar = ({ handleFilter, andOr, setAndOr }) => {
  const [keyWords, setKeyWords] = useState([]);
  const reactTags = useRef();

  const onDelete = useCallback(
    (keyWordIndex) => {
      setKeyWords(keyWords.filter((_, i) => i !== keyWordIndex));
    },
    [keyWords],
  );

  const onAddition = useCallback(
    (newKeyWord) => {
      setKeyWords([...keyWords, newKeyWord]);
    },
    [keyWords],
  );

  return (
    <div className="searchbar">
      <p>
        <small>Insert a comma after each keyword</small>
      </p>
      <ReactTags
        placeholderText="Add keywords"
        allowNew={true}
        delimiters={[',']}
        ref={reactTags}
        tags={keyWords}
        onDelete={onDelete}
        onAddition={onAddition}
      />
      <div className="filter-container">
        <button onClick={() => handleFilter(keyWords)}>FILTER</button>
        <button
          onClick={() => {
            handleFilter([]);
            setKeyWords([]);
          }}
        >
          RESET
        </button>
        <div className="filter-container__choices">
          <div className="filter__choice">
            <input
              checked={!andOr}
              type="radio"
              id="or"
              name="filter"
              value="or"
              onChange={() => setAndOr(false)}
            />
            <label htmlFor="or">||</label>
          </div>

          <div className="filter__choice">
            <input
              checked={andOr}
              type="radio"
              id="and"
              name="filter"
              value="and"
              onChange={() => setAndOr(true)}
            />
            <label htmlFor="and">{`&&`}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

import { useRef } from "react";
import classes from "./SearchInput.module.css";

function SearchInput({ onSearch }) {
  const inputData = useRef("");

  function submitHandler(event) {
    event.preventDefault();
    onSearch(inputData.current.value);
  }

  return (
    <form className={classes.search} onSubmit={submitHandler}>
      <input
        type="text"
        name="searchWord"
        placeholder="Search for Student..."
        aria-label="Search for Student...r"
        ref={inputData}
      />
      <button>Search</button>
    </form>
  );
}

export default SearchInput;

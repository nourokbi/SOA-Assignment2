import { useRef } from "react";
import classes from "./SearchInput.module.css";

function SearchInput({ onSearch }) {
  const searchWord = useRef("");
  const searchProperty = useRef("");

  function submitHandler(event) {
    event.preventDefault();
    const searchData = {
      word: searchWord.current.value,
      property: searchProperty.current.value,
    };
    onSearch(searchData);
    console.log(searchData);
  }

  return (
    <form className={classes.search} onSubmit={submitHandler}>
      <select
        name="searchField"
        aria-label="Select search field"
        ref={searchProperty}
      >
        <option value="id">ID</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="level">Level</option>
        <option value="gpa">GPA</option>
        <option value="address">Address</option>
        <option value="gender">Gender</option>
      </select>
      <input
        type="text"
        name="searchWord"
        placeholder="Search for Student..."
        aria-label="Search for Student...r"
        ref={searchWord}
      />
      <button>Search</button>
    </form>
  );
}

export default SearchInput;

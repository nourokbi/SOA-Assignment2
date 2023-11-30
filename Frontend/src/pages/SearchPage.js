import React, { useState } from "react";
import SearchInput from "../components/SearchInput";
import StudentsList from "../components/StudentsList";

const SearchPage = () => {
  const [students, setStudents] = useState([]);

  const fetchData = async (searchWord) => {
    try {
      const response = await fetch(
        "http://localhost:8080/search?search=" + searchWord,
        {
          method: "GET", // or use the method you prefer
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setStudents(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleSearch = async (searchWord) => {
    console.log(searchWord);
    // Call your fetchData function with the search word
    await fetchData(searchWord);
  };

  return (
    <div>
      <SearchInput onSearch={handleSearch} />

      {students.length > 0 && <p>We found {students.length} Students</p>}
      {students.length > 0 && <StudentsList students={students} />}
    </div>
  );
};

export default SearchPage;

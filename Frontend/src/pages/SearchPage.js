import React, { useState } from "react";
import SearchInput from "../components/SearchInput";
import StudentsList from "../components/StudentsList";

const SearchPage = () => {
  const [students, setStudents] = useState();

  const fetchData = async (searchData) => {
    try {
      const response = await fetch("http://localhost:8080/search", {
        method: "POST", // or use the method you prefer
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setStudents(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleSearch = async (searchData) => {
    console.log(searchData);
    // Call your fetchData function with the search word
    await fetchData(searchData);
  };

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      {students && <StudentsList students={students} />}
    </div>
  );
};

export default SearchPage;

import {
  useLoaderData,
  json,
  defer,
  Await,
  useNavigate,
} from "react-router-dom";
import StudentsList from "../components/StudentsList";
import { Suspense } from "react";
import Spinner from "../components/UI/Spinner";
import SortInput from "../components/SortInput";

function StudentsPage() {
  const { students } = useLoaderData();
  const navigate = useNavigate();

  const sendData = async (sortData) => {
    try {
      const response = await fetch("http://localhost:8080/sort", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(sortData),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data:", error.message);
    }
  };

  const handleSort = async (sortData) => {
    console.log(sortData);
    await sendData(sortData);

    // to force the whole page to reload with the new data
    navigate(".");
  };

  return (
    <Suspense fallback={<Spinner color="#f9c762" />}>
      <SortInput onSort={handleSort} />
      <Await resolve={students}>
        {(loadStudents) => <StudentsList students={loadStudents} />}
      </Await>
    </Suspense>
  );
}

export default StudentsPage;

const loadStudents = async () => {
  const response = await fetch("http://localhost:8080/students");

  if (!response.ok) {
    throw json({ message: "can't find the data" }, { status: 500 });
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const loader = () => {
  return defer({
    students: loadStudents(),
  });
};

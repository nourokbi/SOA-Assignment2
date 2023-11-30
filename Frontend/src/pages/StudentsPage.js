import { useLoaderData, json, defer, Await } from "react-router-dom";
import StudentsList from "../components/StudentsList";
import { Suspense } from "react";
import Spinner from "../components/UI/Spinner";

function StudentsPage() {
  const { students } = useLoaderData();

  return (
    <Suspense fallback={<Spinner color="#f9c762" />}>
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

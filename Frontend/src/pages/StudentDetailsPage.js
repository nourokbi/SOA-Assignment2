import React, { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import StudentItem from "../components/StudentItem";
import Spinner from "../components/UI/Spinner";

const StudentDetailsPage = () => {
  const student = useRouteLoaderData("ourParent");

  return (
    <>
      <Suspense fallback={<Spinner color="#f9c762" />}>
        <Await resolve={student}>
          {(loadStudent) => <StudentItem student={loadStudent} />}
        </Await>
      </Suspense>
    </>
  );
};

export default StudentDetailsPage;

export const loadStudent = async (id) => {
  const response = await fetch("http://localhost:8080/student?id=" + id);
  const data = await response.json();

  if (!response.ok) {
    throw json({ message: "can't get the event details " }, { status: 500 });
  } else {
    return data;
  }
};

export const loader = async ({ request, params }) => {
  const id = params.id;

  return defer({
    ...(await loadStudent(id)),
  });
};

export const action = async ({ request, params }) => {
  const id = params.id;

  const response = await fetch("http://localhost:8080/student?id=" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "can't delete the student.. " }, { status: 500 });
  } else {
    return redirect("/students");
  }
};

import React from "react";
import StudentForm from "../components/StudentForm";
import { useRouteLoaderData } from "react-router-dom";

const EditStudentPage = () => {
  const data = useRouteLoaderData("ourParent");

  return <StudentForm student={data} method="PATCH" editStudent={true} />;
};

export default EditStudentPage;

import { Link, useSubmit } from "react-router-dom";
import classes from "./StudentItem.module.css";

function StudentItem({ student }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const choice = window.confirm("Are you sure to delete it ?");

    if (choice) {
      submit(null, { method: "DELETE" });
    }
  }
  console.log(student);

  return (
    <>
      <div className={classes.student}>
        <h1>
          {student.firstName} {student.lastName}
        </h1>
        <p>
          ID: <strong> {student.id}</strong>
        </p>
        <p>
          Level: <strong>{student.level}</strong>
        </p>
        <p>
          GPA: <strong>{student.gpa}</strong>
        </p>
        <p>
          Gender: <strong>{student.gender}</strong>
        </p>
        <p>
          Address: <strong>{student.address}</strong>
        </p>
      </div>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </>
  );
}

export default StudentItem;

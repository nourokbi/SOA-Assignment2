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
    <article className={classes.event}>
      <h1>{student.firstName}</h1>
      <p>{student.lastName}</p>
      <p>{student.id}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default StudentItem;

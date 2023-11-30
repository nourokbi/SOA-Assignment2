import classes from "./StudentsList.module.css";
import { Link } from "react-router-dom";

function StudentsList({ students }) {
  return (
    <div className={classes.events}>
      <h1>All Students</h1>
      <ul className={classes.list}>
        {students.map((student) => (
          <li key={student.id} className={classes.item}>
            <Link to={`/students/${student.id}`}>
              <div className={classes.content}>
                <h2>{student.firstName}</h2>
                <p>{student.lastName}</p>
                <p>{student.id}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsList;

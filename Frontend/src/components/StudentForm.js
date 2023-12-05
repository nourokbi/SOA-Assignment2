import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import classes from "./StudentForm.module.css";

function StudentForm({ method, student, editStudent }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const data = useActionData();
  function cancelHandler() {
    navigate("..");
  }
  console.log(student);

  return (
    <Form method={method}>
      {data && data.errors && (
        <ul>
          {" "}
          {Object.values(data.errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className={classes.form}>
        <p>
          <label htmlFor="fname">First Name</label>
          <input
            id="fname"
            type="text"
            name="fname"
            required
            defaultValue={student ? student.firstName : ""}
          />
        </p>

        <p>
          <label htmlFor="lname">Last Name</label>
          <input
            id="lname"
            type="text"
            name="lname"
            required
            defaultValue={student ? student.lastName : ""}
          />
        </p>
        {!editStudent && (
          <p>
            <label htmlFor="id">ID</label>
            <input
              id="id"
              type="text"
              name="id"
              required
              defaultValue={student ? student.id : ""}
            />
          </p>
        )}
        {editStudent && (
          <input type="hidden" name="id" value={student ? student.id : ""} />
        )}

        <p>
          <label htmlFor="level">Level</label>
          <input
            id="level"
            name="level"
            type="number"
            min="1"
            max="4"
            required
            defaultValue={student ? student.level : ""}
          />
        </p>
        <p>
          <label htmlFor="gpa">GPA</label>
          <input
            id="gpa"
            name="gpa"
            type="number"
            min="1"
            max="4"
            step="0.1"
            required
            defaultValue={student ? student.gpa : ""}
          />
        </p>
        <p>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            required
            defaultValue={student ? student.address : ""}
          />
        </p>
        <p>
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" required>
            <option
              value=""
              disabled
              defaultValue={student ? student.gender : ""}
            >
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </p>
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default StudentForm;

export const action = async ({ request, params }) => {
  const data = await request.formData();

  console.log(data);

  const studentData = {
    firstName: data.get("fname"),
    lastName: data.get("lname"),
    gender: data.get("gender"),
    level: data.get("level"),
    address: data.get("address"),
    gpa: data.get("gpa"),
    id: data.get("id"),
  };

  console.log(studentData);

  let url = "http://localhost:8080/student";
  let method = request.method;

  const response = await fetch(url, {
    method: method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "can't send the data .." },
      {
        status: 500,
      }
    );
  } else {
    return redirect("/students");
  }
};

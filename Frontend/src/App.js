import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LayoutPage from "./pages/LayoutPage";
import EditStudentPage from "./pages/EditStudentPage";
import StudentsPage, { loader as fetchEvents } from "./pages/StudentsPage";
import NewStudentPage from "./pages/NewStudentPage";
import StudentDetailsPage, {
  loader as fetchEventDetails,
  action as deleteEventAction,
} from "./pages/StudentDetailsPage";
import StudentsLayoutPage from "./pages/StudentsLayoutPage";
import ErrorPage from "./pages/ErrorPage";
import { action as manipulateEventAction } from "./components/StudentForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <ErrorPage />,

    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SearchPage /> },

      {
        path: "students",
        element: <StudentsLayoutPage />,

        children: [
          {
            path: "",
            element: <StudentsPage />,
            loader: fetchEvents,
          },
          {
            path: "new",
            element: <NewStudentPage />,
            action: manipulateEventAction,
          },

          {
            path: ":id",
            id: "ourParent",
            loader: fetchEventDetails,
            children: [
              {
                index: true,
                element: <StudentDetailsPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditStudentPage />,
                action: manipulateEventAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

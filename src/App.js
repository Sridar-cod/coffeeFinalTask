import { useState, useEffect } from "react";
import "./App.css";
import Form from "./pages/Form";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const formSchema = {
  steps: [
    {
      title: "Personal Information",
      repetition: false,
      fields: [
        {
          name: "profile",
          label: "profile",
          type: "file",
          required: true,
        },
        { name: "Name", label: "Name", type: "text", required: true },
        {
          name: "Mobile Number",
          label: "Mobile Number",
          type: "number",
          required: true,
        },
        {
          name: "Email",
          label: "Email",
          type: "email",
          required: true,
        },
      ],
    },
    {
      title: "Education Details",
      repetition: true,
      fields: [
        {
          name: "Passed Out Year",
          label: "Passed Out Year",
          type: "date",
          required: true,
        },
        {
          name: "Course Name",
          label: "Course Name",
          type: "text",
          required: true,
        },
        {
          name: "Institution Name",
          label: "Institution Name",
          type: "text",
          required: true,
        },
      ],
    },
    {
      title: "General Info",
      repetition: false,
      fields: [
        {
          name: "Agree",
          label: "Agree to Terms",
          type: "checkbox",
          required: true,
        },
        {
          name: "Theme",
          label: "Theme",
          type: "dropdown",
          options: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ],
          required: true,
        },
        {
          name: "Gender",
          label: "Gender",
          type: "radio",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ],
          required: true,
        },
      ],
    },
  ],
};

function App() {
    // load userData from localStorage on initial render
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : [] ;
  });
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  // save userData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home userData={userData} editIndex={editIndex} setEditIndex={setEditIndex} />}
          />
          <Route
            path="/form"
            element={
              <Form
                formSchema={formSchema}
                setUserData={setUserData}
                errors={errors}
                setErrors={setErrors}
                userData={userData}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import MultiStep from "../components/MultiStep";
import { useNavigate } from "react-router-dom";

const Form = ({
  setUserData,
  userData,
  formSchema,
  setErrors,
  errors,
  editIndex,
  setEditIndex,
}) => {
  const navigate = useNavigate();
  const [prev, setPrev] = useState(false);
  const [formData, setFormData] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState(formSchema.steps[stepIndex].fields);

  useEffect(() => {
    setData(formSchema.steps[stepIndex].fields);
  }, [stepIndex, formSchema.steps]);

  useEffect(() => {
    if (editIndex !== null) {
      setFormData(userData[editIndex]);
    }
  }, [editIndex]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    let imageUrl = "";

    if (type === "file" && files && files.length > 0) {
      imageUrl = URL.createObjectURL(files[0]);
      setFormData((prev) => ({ ...prev, [name]: imageUrl }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? "Agree" : value,
      }));
    }
  };

  const handleBack = () => {
    if (prev == true) {
      setPrev(false);
    } else {
      setStepIndex((prev) => prev - 1);
    }
  };

  const validateStep = () => {
    const stepErrors = {};
    formSchema.steps[stepIndex].fields.forEach((field) => {
      const value = formData[field.name];
      if (field.required) {
        if (
          ["text", "email", "number", "date"].includes(field.type) &&
          !value
        ) {
          stepErrors[field.name] = `${field.label} is required`;
        }
        if (field.type === "checkbox" && !value) {
          stepErrors[field.name] = `${field.label} is required`;
        }
        if (field.type === "dropdown" && (!value || value === "")) {
          stepErrors[field.name] = `Please select a ${field.label}`;
        }
        if (field.type === "radio" && !value) {
          stepErrors[field.name] = `Please select a ${field.label}`;
        }
        if (field.type === "file" && !value) {
          stepErrors[field.name] = `Please select a file for ${field.label}`;
        }
      }
    });
    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep();
    if (Object.keys(stepErrors).length === 0) {
      if (stepIndex < formSchema.steps.length - 1) {
        setStepIndex((prev) => prev + 1);
      } else {
        setPrev(true);
      }
    } else {
      setErrors(stepErrors);
    }
  };

  const renderField = (field) => {
    const { name, label, type, options } = field;

    switch (type) {
      case "text":
      case "email":
      case "number":
        return (
          <div key={name} className="defalts__inputs ">
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name] || ""}
              onChange={handleInputChange}
              placeholder={label}
            />
            {errors[name] && (
              <p style={{ color: "red", padding: "0", margin: "0" }}>
                {errors[name]}
              </p>
            )}
          </div>
        );
      case "file":
        return (
          <div key={name} className="defalts__inputs">
            <div className="personal__form__profile">
              <div>
                {!formData[name] ? (
                  <svg
                    width={"30px"}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                  </svg>
                ) : (
                  <img
                    src={formData[name]}
                    alt="Profile Preview"
                    width={"100px"}
                  />
                )}
                <input
                  id={name}
                  name={name}
                  type={type}
                  accept="image/jpg, image/png, image/jpeg"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {errors[name] && <p style={{ color: "red" }}>{errors[name]}</p>}
          </div>
        );
      case "date":
        return (
          <div key={name} className="defalts__inputs">
            <label>{label}</label>
            <input
              type="date"
              name={name}
              value={formData[name] || ""}
              onChange={handleInputChange}
            />
            {errors[name] && <p style={{ color: "red" }}>{errors[name]}</p>}
          </div>
        );
      case "dropdown":
        return (
          <div key={name} className="defalts__inputs ">
            <label>{label}</label>
            <select
              name={name}
              value={formData[name] || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select {label}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[name] && <p style={{ color: "red" }}>{errors[name]}</p>}
          </div>
        );
      case "radio":
        return (
          <div key={name} className="radio__input">
            <label>{label}</label>
            {options.map((option) => (
              <div key={option.value}>
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={formData[name] === option.value}
                  onChange={handleInputChange}
                />
                {option.label}
              </div>
            ))}
            {errors[name] && <p style={{ color: "red" }}>{errors[name]}</p>}
          </div>
        );
      case "checkbox":
        return (
          <div key={name} className=" checkbox">
            <label>
              <input
                type="checkbox"
                name={name}
                checked={!!formData[name]}
                onChange={handleInputChange}
              />
              {label}
            </label>
            {errors[name] && <p style={{ color: "red" }}>{errors[name]}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  // const handleAdd = () => {
  //   setData((prev) => [...prev, ...formSchema.steps[stepIndex].fields]);
  // };

  const Prev = () => {
    return (
      <div className="prev">
        <ul>
          {Object.entries(formData).map(([key, value]) => {
            return (
              <li>
                {key == "profile" ? (
                  <img src={value} width={"100px"} />
                ) : (
                  <span>
                    {key}: {value}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  const handleSumbit = () => {
    if (editIndex !== null) {
      // update the existing user data at the editIndex
      setUserData((prev) =>
        prev.map((user, index) => (index === editIndex ? formData : user))
      );

      setEditIndex(null);
    } else {
      //  new user data
      setUserData((prev) => [...prev, formData]);
    }
    navigate("/");
  };
  return (
    <div className="form ">
      <MultiStep
        stepCount={formSchema.steps.length}
        stepIndex={stepIndex}
        prev={prev}
      />

      <div className="form__inner">
        <div className="form__inner__head">
          {stepIndex !== 0 && !prev && (
            <h2>{formSchema.steps[stepIndex].title}</h2>
          )}
          {/* {formSchema.steps[stepIndex].repetition && !prev && (
            <button onClick={handleAdd}>Add</button>
          )} */}
        </div>

        {prev ? <Prev /> : data.map(renderField)}
        <div className="form__inner__buttons">
          {stepIndex > 0 && <button onClick={handleBack}>Back</button>}

          {prev ? (
            <button onClick={handleSumbit}>Submit</button>
          ) : (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;

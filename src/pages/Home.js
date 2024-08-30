import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = ({ userData, setEditIndex }) => {
  const navigate = useNavigate();
  const handleAddUser = () => {
    navigate("/form");
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    navigate("/form");
  };
  return (
    <div className="home">
      {userData.length === 0 ? (
        <div className="emptyUser">
          <h1>Your Data Is Empty</h1>
          <Link to="/form">
            <button className="adduserButton">Add Details</button>
          </Link>
        </div>
      ) : (
        <div className="userDetails">
          <div className="">
            <button className="adduserButton" onClick={handleAddUser}>
              add user
            </button>
          </div>
          {userData.map((item, index) => (
            <div key={index} className="userDetails__card">
              <ul>
                {Object.entries(item).map(([key, value]) => (
                  <li key={key}>
                    <div>
                      {key == "profile" ? (
                        <img src={value} width={"100px"} />
                      ) : (
                        <span>
                          {key}: {value}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="adduserButton"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

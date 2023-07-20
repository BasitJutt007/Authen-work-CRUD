import React, {useState, useEffect} from "react";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import EditUserForm from "./EditUserForm";
import "./Form.css";

const DashBoardPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === "false") {
      navigate("/signin");
    } else {
      // Load the user data when the component mounts
      axios
        .get("http://localhost:3000/UserInfo")
        .then((response) => setUserData(response.data))
        .catch((error) => console.error(`Error: ${error}`));
    }
  }, [isAuthenticated, navigate]);

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
  };

  const handleUpdate = async (userId, updatedUser) => {
    if (userId) {
      await axios.put(`http://localhost:3000/UserInfo/${userId}`, updatedUser);
      // Refresh the user data
      const refreshedUserData = await axios.get(
        "http://localhost:3000/UserInfo"
      );
      setUserData(refreshedUserData.data);
    }
    setSelectedUserId(null); // close the form after updating
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/UserInfo/${userId}`);
      // If successful, update the state to filter out the deleted user
      setUserData(userData.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  // Find the selected user in userData
  const selectedUser = userData.find((user) => user._id === selectedUserId);

  return (
    <div className="dash-board">
      <h1>Dashboard</h1>
      {selectedUser ? (
        <EditUserForm user={selectedUser} onUpdate={handleUpdate} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id}>
                <td>{user.Email}</td>
                <td>{user.Password}</td>
                <td>{user.PhoneNumber}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashBoardPage;

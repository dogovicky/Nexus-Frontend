import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from AuthContext

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    gender: "",
    bio: "",
    institution: "",
    phoneNumber: "",
    fieldsOfInterest: [],
  });

  useEffect(() => {
    // Fetch the current profile data to prefill the form
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/profile?username=${user.username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.data && response.data.status === 200) {
          setProfileData(response.data.data.userProfileDTO); // Set profile data
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "https://nexus-theta-six.vercel.app/profile/update", // API endpoint for updating profile
        profileData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data && response.data.status === 200) {
        alert("Profile updated successfully!");
        navigate("/profile"); // Redirect back to profile page
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={profileData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <input
            type="text"
            className="form-control"
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            className="form-control"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Institution</label>
          <input
            type="text"
            className="form-control"
            name="institution"
            value={profileData.institution}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Fields of Interest</label>
          <input
            type="text"
            className="form-control"
            name="fieldsOfInterest"
            value={profileData.fieldsOfInterest.join(", ")}
            onChange={(e) => {
              const fields = e.target.value.split(", ");
              setProfileData({ ...profileData, fieldsOfInterest: fields });
            }}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;

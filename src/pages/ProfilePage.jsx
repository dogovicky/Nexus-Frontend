// // src/pages/ProfilePage.js
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";

// const ProfilePage = () => {
//   const { user, token } = useAuth();
//   const [formData, setFormData] = useState({});
//   const [userPosts, setUserPosts] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (user) {
//       setFormData({ ...user });
//       fetchUserPosts();
//     }
//   }, [user]);

//   const fetchUserPosts = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/posts/user/${user.username}`,
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       setUserPosts(res.data.data);
//     } catch (err) {
//       console.error("Failed to fetch user posts", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put("http://localhost:8080/profile/update", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setMessage("Profile updated successfully");
//     } catch (err) {
//       setMessage("Failed to update profile");
//     }
//   };

//   return (
//     <div className="container-fluid d-flex">
//       <div className="container mt-4">
//         <h4 className="mb-3">Your Profile</h4>
//         {message && <div className="alert alert-info">{message}</div>}
//         <form onSubmit={handleUpdate} className="mb-5">
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label>Full Name</label>
//               <input
//                 name="fullName"
//                 value={formData.fullName || ""}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//             <div className="col-md-6">
//               <label>Email</label>
//               <input
//                 name="email"
//                 value={formData.email || ""}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//             <div className="col-md-6">
//               <label>Institution</label>
//               <input
//                 name="institution"
//                 value={formData.institution || ""}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//             <div className="col-md-6">
//               <label>Field of Interest</label>
//               <input
//                 name="fieldOfInterest"
//                 value={formData.fieldOfInterest || ""}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//             <div className="col-12">
//               <button type="submit" className="btn btn-success">
//                 Update Profile
//               </button>
//             </div>
//           </div>
//         </form>

//         <h5>Your Posts</h5>
//         <ul className="list-group">
//           {userPosts.map((post) => (
//             <li key={post.id} className="list-group-item">
//               <p>{post.content}</p>
//               <small className="text-muted">{post.label}</small>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const { user } = useAuth(); // To get user data from global auth context
  const navigate = useNavigate();

  // State for profile data and posts
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch profile data and posts when the page loads
  useEffect(() => {
    if (!user) {
      // Redirect to login if user is not authenticated
      navigate("/login");
      return;
    }

    // Fetch user profile data and posts
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `https://nexus-theta-six.vercel.app/profile?username=${user.username}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.data && response.data.status === 200) {
          setProfileData(response.data.data.userProfileDTO); // Set profile data
          setPosts(response.data.data.posts); // Set posts data
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, navigate]);

  // Render profile page
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Error fetching profile data</div>;
  }

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2>{profileData.fullName}'s Profile</h2>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User Information</h5>
              <p>
                <strong>Username:</strong> {profileData.username}
              </p>
              <p>
                <strong>Email:</strong> {profileData.email}
              </p>
              <p>
                <strong>Gender:</strong> {profileData.gender}
              </p>
              <p>
                <strong>Institution:</strong> {profileData.institution}
              </p>
              <p>
                <strong>Bio:</strong> {profileData.bio}
              </p>
              <p>
                <strong>Phone Number:</strong> {profileData.phoneNumber}
              </p>
              <p>
                <strong>Fields of Interest:</strong>{" "}
                {profileData.fieldsOfInterest.join(", ")}
              </p>
              <button className="btn btn-primary" onClick={handleUpdateProfile}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 mt-5">
          <h5>Recent Posts</h5>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="card mb-3">
                <div className="card-body">
                  {/* <h6 className="card-title">{post.author.username}</h6> */}
                  <p className="card-text">{post.content}</p>
                  <p className="text-muted">
                    {new Date(post.timestamp).toLocaleString()}
                  </p>
                  <p>
                    Likes: {post.likeCount} | Reposts: {post.repostCount} |
                    Comments: {post.commentCount}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No posts to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

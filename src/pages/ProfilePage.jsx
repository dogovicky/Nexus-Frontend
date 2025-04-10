import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProfilePage.css";

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
          `http://localhost:8080/profile?username=${user.username}`,
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
    <div className="profile-container">
      <div className="row">
        <div className="col-12">
          <h2 className="profile-header">{profileData.fullName}'s Profile</h2>
          <div className="profile-card">
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Username:</span>
                {profileData.username}
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                {profileData.email}
              </div>
              <div className="info-item">
                <span className="info-label">Gender:</span>
                {profileData.gender}
              </div>
              <div className="info-item">
                <span className="info-label">Institution:</span>
                {profileData.institution}
              </div>
              <div className="info-item">
                <span className="info-label">Bio:</span>
                {profileData.bio}
              </div>
              <div className="info-item">
                <span className="info-label">Phone Number:</span>
                {profileData.phoneNumber}
              </div>
              <div className="info-item">
                <span className="info-label">Fields of Interest:</span>
                {profileData.fieldsOfInterest.join(", ")}
              </div>
              <button className="update-button" onClick={handleUpdateProfile}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 posts-section">
          <h3 className="posts-header">Recent Posts</h3>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-content">
                  <p className="post-text">{post.content}</p>
                  <p className="post-timestamp">
                    {new Date(post.timestamp).toLocaleString()}
                  </p>
                  <div className="post-stats">
                    Likes: {post.likeCount} | Reposts: {post.repostCount} |
                    Comments: {post.commentCount}
                  </div>
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

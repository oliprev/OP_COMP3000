import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProfilePage() {
    const [profileData, setProfileData] = useState(null); // State to store fetched profile data

    // Fetches the user's profile data from the API
    useEffect(() => {
        const fetchProfileData = async () => {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!userId || !token) {
                console.error("User ID or token not found.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:9000/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []);
    
    return (
        <div>
          <Link to = "/main" className = "back-link">← Back to Dashboard</Link>
          <h1>Profile</h1>
          <p>Find your profile information below</p>
          <div>
            {/* Renders the user's profile data */}
            {profileData ? (
              <div>
                <p>Name: {profileData.name}</p> // Renders the user's name
                <p>Email: {profileData.email}</p> // Renders the user's email
                <p>Date of Birth: {new Date(profileData.dateOfBirth).toLocaleDateString()}</p> // Renders the user's date of birth
                <p>Experience Level: {profileData.experienceLevel}</p> // Renders the user's experience level
                <p>Risk Score: work in progress</p>
                <Link to = "/main/profile/updatepassword">Update Password</Link><br></br>
                <Link to = "/main/profile/deleteprofile">Delete Profile</Link>
              </div>
            ) : (
              <p>Loading profile data...</p> // Renders if profile data is still loading
            )}
          </div>
        </div>
      );
}

export default ProfilePage;
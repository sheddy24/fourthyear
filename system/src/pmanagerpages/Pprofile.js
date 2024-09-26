import React, { useState, useEffect } from "react";
import { getManagerDetails } from "../auth"; // Importing auth function for getting manager details
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState(null); // State for storing edited profile data
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [showAlert, setShowAlert] = useState(false); // State to control the display of the alert
  const [showPasswordForm, setShowPasswordForm] = useState(false); // State to control the display of the password change form
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { token } = getManagerDetails(); // Get token containing userid

  useEffect(() => {
    // Fetch profile data when component mounts
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/profile/manager", {
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          setEditData({ ...data }); // Set initial values for editData
        } else {
          throw new Error("Failed to fetch profile");
        }
      } catch (error) {
        console.error(error);
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchProfile();
  }, [token]);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Function to submit edited profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/profile/manager/edit",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(editData),
        }
      );
      if (response.ok) {
        const responseData = await response.text();
        if (responseData.trim() === "") {
          // Empty response case
          // Show alert indicating successful update
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
          // Hide edit form after successful update
          setIsEditing(false);
        } else {
          // Non-empty response case
          const updatedData = JSON.parse(responseData);
          setProfileData(updatedData);
          // Show alert when changes are saved successfully
          setShowAlert(true);
          // Hide alert after 3 seconds
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
          // Hide edit form after successful update
          setIsEditing(false);
        }
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  // Function to handle edit button click
  const handleEditClick = () => {
    setIsEditing(true); // Show edit form when edit button is clicked
  };

  // Function to handle password change form submission
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // Check if new password and confirm password match
    if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
      // Show alert indicating password mismatch
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8000/profile/manager/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(passwordFormData),
        }
      );
      if (response.ok) {
        // Show alert indicating successful password change
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        // Clear password form data
        setPasswordFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        // Hide password change form
        setShowPasswordForm(false);
      } else {
        throw new Error("Failed to change password");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  // Function to handle password change button click
  const handlePasswordChangeClick = () => {
    setShowPasswordForm(true); // Show password change form when button is clicked
  };

  return (
    <Box maxW="600px" m="auto" p="20px">
      {profileData ? (
        <Box>
          <Heading mb="20px">Profile</Heading>
          <Box mb="20px">
            <p>
              <strong>First Name:</strong> {profileData.fname}
            </p>
            <p>
              <strong>Last Name:</strong> {profileData.lname}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Username:</strong> {profileData.username}
            </p>
            {/* Add more profile fields as needed */}
          </Box>
          {!isEditing && (
            <Button mb="20px" colorScheme="blue" onClick={handleEditClick}>
              Edit
            </Button>
          )}
          {isEditing && (
            <form onSubmit={handleSubmit}>
              <FormControl mb="10px">
                <FormLabel>First Name:</FormLabel>
                <Input
                  type="text"
                  name="fname"
                  value={editData.fname}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb="10px">
                <FormLabel>Last Name:</FormLabel>
                <Input
                  type="text"
                  name="lname"
                  value={editData.lname}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb="10px">
                <FormLabel>Email:</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb="10px">
                <FormLabel>Username:</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={editData.username}
                  onChange={handleInputChange}
                />
              </FormControl>
              {/* Add more profile fields as needed */}
              <Button type="submit" colorScheme="green" mr="4">
                Save Changes
              </Button>
            </form>
          )}
          {!showPasswordForm && (
            <Button
              mb="20px"
              colorScheme="blue"
              onClick={handlePasswordChangeClick}
            >
              Change Password
            </Button>
          )}
          {showPasswordForm && (
            <form onSubmit={handlePasswordChange}>
              <FormControl mb="10px">
                <FormLabel>Current Password:</FormLabel>
                <Input
                  type="password"
                  name="currentPassword"
                  value={passwordFormData.currentPassword}
                  onChange={(e) =>
                    setPasswordFormData({
                      ...passwordFormData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl mb="10px">
                <FormLabel>New Password:</FormLabel>
                <Input
                  type="password"
                  name="newPassword"
                  value={passwordFormData.newPassword}
                  onChange={(e) =>
                    setPasswordFormData({
                      ...passwordFormData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl mb="10px">
                <FormLabel>Confirm New Password:</FormLabel>
                <Input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordFormData.confirmNewPassword}
                  onChange={(e) =>
                    setPasswordFormData({
                      ...passwordFormData,
                      confirmNewPassword: e.target.value,
                    })
                  }
                />
              </FormControl>
              {passwordFormData.newPassword !==
                passwordFormData.confirmNewPassword && (
                <Alert status="error" mt="2">
                  <AlertIcon />
                  Passwords do not match.
                </Alert>
              )}
              <Button type="submit" colorScheme="green" mr="4">
                Change Password
              </Button>
            </form>
          )}
          {showAlert && (
            <Alert status="success" mt="4">
              <AlertIcon />
              Changes saved successfully!
            </Alert>
          )}
        </Box>
      ) : (
        <p>Loading profile...</p>
      )}
    </Box>
  );
}

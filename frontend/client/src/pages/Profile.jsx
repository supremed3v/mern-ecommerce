import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import { useAlert } from 'react-alert'

const Profile = () => {
  const { authState, updateProfile, updatePassword } = useAuthContext();
  const [name, setName] = useState(authState.user?.name);
  const [email, setEmail] = useState(authState.user?.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const alert = useAlert()

  const handleUpdateProfile = () => {
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    updateProfile(myForm)
    if (authState.error) {
      alert.error(authState.error)
    } else {
      alert.success("Password updated successfully")
    }
  }

  const handleUpdatePassword = () => {
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword
    );
    myForm.set("confirmPassword", confirmPassword);
    updatePassword(myForm)
    if (authState.error) {
      alert.error(authState.error)
    } else {
      alert.success("Password updated successfully")
    }

  }

  if (authState.loading) return <Typography>Loading...</Typography>

  return (
    <Box sx={{
      width: "100%",
      height: "100vh",
    }}>
      <Box sx={{
        mt: 5,
      }}>
        <Typography textAlign={"center"} variant="h1"
          sx={{
            color: "#e7e7e7e7"
          }}
        >Account Information</Typography>
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 10
      }}>
        <Typography textAlign={"center"} variant="h3"
          sx={{
            color: "#e7e7e7e7"
          }}
        >Profile</Typography>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "500px",
          mt: 2
        }}>
          <Box sx={{
            width: "100%",
            mb: 2,
            bgcolor: "#e7e7e7e7"
          }}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box sx={{
            width: "100%",
            mb: 2,
            bgcolor: "#e7e7e7e7"
          }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Button variant="contained" sx={{
            mt: 2,
            width: "100%",
            maxWidth: "500px",
          }}
            onClick={handleUpdateProfile}
          >Update Profile</Button>
        </Box>
        <Typography textAlign={"center"} variant="h3" sx={{
          mt: 5,
          color: "#e7e7e7e7"
        }}>Update Password</Typography>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "500px",
          mt: 2
        }}>
          <Box sx={{
            width: "100%",
            mb: 2,
            bgcolor: "#e7e7e7e7"
          }}>
            <TextField
              fullWidth
              label="Current Password"
              variant="outlined"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
            />
          </Box>
          <Box sx={{
            width: "100%",
            mb: 2,
            bgcolor: "#e7e7e7e7"
          }}>
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
          </Box>
          <Box sx={{
            width: "100%",
            mb: 2,
            bgcolor: "#e7e7e7e7"
          }}>
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
            />
          </Box>
          <Button variant="contained" sx={{
            mt: 2,
            width: "100%",
            maxWidth: "500px",
          }}
            onClick={handleUpdatePassword}
          >Update Password</Button>

        </Box>
      </Box>
    </Box>

  );
};

export default Profile;

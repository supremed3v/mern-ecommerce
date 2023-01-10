import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, redirect } from "react-router-dom";
import { useAlert } from "react-alert";

export default function LoginSignup() {
  const navigate = useNavigate();
  const alert = useAlert()
  const { register, login, authState, } = useAuthContext();
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === 1) {
      const myForm = new FormData()
      myForm.set('email', email)
      myForm.set('password', password)
      login(myForm)
    } else {
      const myForm = new FormData()
      myForm.set('name', name)
      myForm.set('email', email)
      myForm.set('password', password)
      register(myForm)

    }
  }


  useEffect(() => {
    if (authState.error === "Auth") {
      alert.error(authState.error)
    }

    if (authState.isAuthenticated) {
      window.location.href = "/"
    }
  }, [authState.isAuthenticated, authState.error])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSignup = () => {
    const myForm = new FormData()

    myForm.set('name', name)
    myForm.set('email', email)
    myForm.set('password', password)
    console.log(email, password, name)
    register(myForm)
    if (authState.error) {
      console.log(authState.error)
    }

    if (authState.isAuthenticated) {
      navigate("/")
    }
  }
  if (authState.loading) return <h1>Loading...</h1>

  return (
    <Container component="main" maxWidth="xs">
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: 15,
            my: 2,
            width: "100%",
          }}
        >
          <Tab label="Signup" value={0} />
          <Tab label="Login" value={1} />
        </TabList>

        <TabPanel value={0}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignup}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link onClick={handleChange} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={1}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link variant="body2" onClick={() => navigate('/password/forgot')} style={{
                      cursor: 'pointer'
                    }} >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </TabPanel>
      </TabContext>
    </Container>
  );
}

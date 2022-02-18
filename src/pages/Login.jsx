import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import ConfirmLoginComponent from "../components/ConfirmLoginComponent";
import LoginComponent from "../components/LoginComponent";
import { login } from "../service/service";

const theme = createTheme();

export default function LogInSide() {
  const [isloged, setIsLoged] = useState(true);
  const [errors, setErrors] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    localStorage.setItem("email", email);
    const userData = {
      email: email,
      password: password,
    };
    login(userData)
      .then(() => setIsLoged(!isloged))
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data);
          return;
        }
        error.request ? setErrors(error.request) : setErrors("Error", error.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {isloged ? (
          <LoginComponent handleSubmit={handleSubmit} errors={errors} />
        ) : (
          <ConfirmLoginComponent setIsLoged={setIsLoged} />
        )}
      </Grid>
    </ThemeProvider>
  );
}

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import ConfirmLoginComponent from "../components/ConfirmLoginComponent";
import LoginComponent from "../components/LoginComponent";

const theme = createTheme();

export default function SignInSide() {
  const [isloged, setIsLoged] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoged(!isloged);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: "100vh" }}>
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
        {isloged ? <LoginComponent handleSubmit={handleSubmit} /> : <ConfirmLoginComponent />}
      </Grid>
    </ThemeProvider>
  );
}

import { useState, useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./confirmLoginComponent.css";
import { useNavigate } from "react-router-dom";
import { confirmCode } from "../service/service";

export default function ConfirmLoginComponent({ setIsLoged }) {
  let navigate = useNavigate();

  const [conteur, setConteur] = useState(60);

  useEffect(() => {
    if (conteur !== 0) {
      const timeOunt = setTimeout(() => {
        setConteur(conteur - 1);
      }, 1000);
      return () => {
        clearTimeout(timeOunt);
      };
    }
    setIsLoged(true);
  }, [conteur]);
  const [code, setCode] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      code: code,
      email: localStorage.getItem("email"),
    };
    confirmCode(userData)
      .then(() => navigate("/", { replace: true }))
      .catch((error) => console.log(error));
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Code
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="Code"
            label="Code"
            type="text"
            id="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="numberCircle">{conteur}</div>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
            Login
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

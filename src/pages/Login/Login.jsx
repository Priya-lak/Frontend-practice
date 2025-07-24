import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function Login() {
  const { login } = useAuth();
  const navigateHome = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" color="primary" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            navigateHome("/");
            login();
          })}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", { required: "Please fill in the email" })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Please fill in the password",
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ mt: 1 }}
          >
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

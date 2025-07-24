import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
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
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            navigate("/");
            login();
          })}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoComplete="given-name"
            autoFocus
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            {...register("firstName", {
              required: "Please fill in the first name",
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            autoComplete="family-name"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            {...register("lastName", {
              required: "Please fill in the last name",
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            autoComplete="email"
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
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Please fill in the password",
              minLength: { value: 4, message: "Minimum length is 4" },
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="info"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Button
            component={Link}
            to="/login"
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ mt: 1 }}
          >
            Already have an account? Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

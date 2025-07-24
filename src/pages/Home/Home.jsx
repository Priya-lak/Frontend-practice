import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../features/session/sessionSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Paper,
} from "@mui/material";

export default function Home() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  return (
    <Box
      color="text"
      sx={{
        minHeight: "100vh",
        backgroundImage: 'url("src/assets/images/landing-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "relative",
        display: "flex",
        alignItems: "center",
        color: "white",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Welcome to ShopCart!
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                mb: 4,
                fontWeight: 300,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              Your one-stop destination for amazing products
            </Typography>
          </Box>
          {isLoggedIn ? (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/products")}
              sx={{
                py: 2,
                px: 4,
                fontSize: "1.2rem",
                borderRadius: 2,
              }}
            >
              View Our Products
            </Button>
          ) : (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: "100%", maxWidth: 400 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: "1.1rem",
                  borderRadius: 2,
                  flex: 1,
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/register")}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: "1.1rem",
                  borderRadius: 2,
                  flex: 1,
                }}
              >
                Register
              </Button>
            </Stack>
          )}
        </Box>
      </Container>
    </Box>
  );
}

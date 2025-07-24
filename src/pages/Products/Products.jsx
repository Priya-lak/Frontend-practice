import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../features/products/productSlice";
import AddToCart from "../../components/addToCart/addToCart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";

export default function Products() {
  const dispatch = useDispatch();
  const {
    items: productData,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchProducts({ page: page, limit: limit })); // page 1, limit 10
  }, [dispatch, page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productData.length) return <div>No products found</div>;
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        Products Page
      </Typography>

      <Grid container spacing={3} className="products-list">
        {productData.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                maxWidth: 345,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardActionArea
                component={Link}
                to={`${product.id}`}
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0]}
                  alt={product.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      mb: 2,
                    }}
                  >
                    {product.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Rating
                      value={product.rating}
                      readOnly
                      precision={0.1}
                      size="small"
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      ({product.rating}/5)
                    </Typography>
                  </Box>

                  <Chip
                    label={`$${product.price}`}
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />
                </CardContent>
              </CardActionArea>

              <CardActions
                sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
              >
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={`${product.id}`}
                >
                  View Details
                </Button>
                <AddToCart productId={product.id} quantity={1} size="small" />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 4,
        }}
      >
        {page > 1 && (
          <Button
            variant="outlined"
            onClick={() => setPage((page) => page - 1)}
            sx={{ minWidth: 100 }}
          >
            Previous
          </Button>
        )}

        <Typography variant="body1" sx={{ mx: 2 }}>
          Page {page}
        </Typography>

        <Button
          variant="outlined"
          onClick={() => setPage((page) => page + 1)}
          sx={{ minWidth: 100 }}
        >
          Next
        </Button>
      </Box>

      <Outlet />
    </Container>
  );
}

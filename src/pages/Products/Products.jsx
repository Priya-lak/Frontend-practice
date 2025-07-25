import { Link, Outlet, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchProducts,
  searchProduct,
} from "../../features/products/productSlice";
import AddToCart from "../../components/addToCart/addToCart";
import CircularProgress from "@mui/material/CircularProgress";
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
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function Products() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    items: productData,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const limit = 9;

  useEffect(() => {
    // Update URL when page changes (for non-search scenarios)
    if (!searchParams.get("search")) {
      const newParams = new URLSearchParams(searchParams);
      if (page > 1) {
        newParams.set("page", page.toString());
      } else {
        newParams.delete("page");
      }
      setSearchParams(newParams, { replace: true });
      dispatch(fetchProducts({ page: page, limit: limit }));
    }
  }, [page, searchParams, setSearchParams, dispatch]);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const searchValue = event.target.value.trim();
      const newParams = new URLSearchParams();

      if (searchValue) {
        newParams.set("search", searchValue);
        setSearchParams(newParams);
        dispatch(searchProduct(searchValue));
      } else {
        // Clear search and go back to products
        setSearchParams({});
        setPage(1);
      }
    }
  };

  const handleGoBack = () => {
    // Clear all search params and reset to products page
    setSearchParams({});
    setSearchTerm("");
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading)
    return (
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center", py: 8 }}
      >
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading product details...
          </Typography>
        </Box>
      </Container>
    );

  if (error) return <div>Error: {error}</div>;
  if (!productData.length)
    return (
      <Container maxWidth="md">
        <Typography
          variant="h6"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
          color="text.primary"
        >
          No products found
        </Typography>

        <Button onClick={handleGoBack}>Go Back</Button>
      </Container>
    );

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
        color="text.primary"
      >
        Products
      </Typography>

      <Box sx={{ display: "flex", alignItems: "flex-end", margin: "50px 0px" }}>
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="search-input"
          label="Search products"
          variant="standard"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          sx={{ minWidth: 200 }}
        />
      </Box>

      {/* Show search results info */}
      {searchParams.get("search") && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Search results for: "{searchParams.get("search")}"
          </Typography>
          <Button size="small" onClick={handleGoBack} sx={{ mt: 1 }}>
            Clear Search
          </Button>
        </Box>
      )}

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
                <AddToCart
                  productId={product.id}
                  quantity={1}
                  size="small"
                  update={false}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls - Only show for non-search results */}
      {!searchParams.get("search") && (
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
              onClick={() => handlePageChange(page - 1)}
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
            onClick={() => handlePageChange(page + 1)}
            sx={{ minWidth: 100 }}
          >
            Next
          </Button>
        </Box>
      )}

      <Outlet />
    </Container>
  );
}

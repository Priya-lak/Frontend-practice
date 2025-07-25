import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  selectProduct,
} from "../../features/products/productSlice";
import AddToCart from "../../components/addToCart/addToCart";

// Material-UI imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ButtonGroup from "@mui/material/ButtonGroup";

// Icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import InventoryIcon from "@mui/icons-material/Inventory";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Product() {
  const { product: productIdParam } = useParams();
  const dispatch = useDispatch();
  const productId = Number(productIdParam);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { loading, error } = useSelector((state) => state.products);
  const productDetails = useSelector((state) =>
    selectProduct(state, productId)
  );

  useEffect(() => {
    if (!productDetails) {
      dispatch(fetchProductById({ productId }));
    }
  }, [dispatch, productId, productDetails]);

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    if (quantity < productDetails.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? productDetails.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === productDetails.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Loading state
  if (loading) {
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
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error: {error}
        </Alert>
      </Container>
    );
  }

  // No product found
  if (!productDetails) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info">Loading product details...</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid size={6}>
          <Card elevation={2} sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="400"
              image={productDetails.images[selectedImageIndex]}
              alt={productDetails.title}
              sx={{ objectFit: "contain", p: 2 }}
            />

            {/* Navigation buttons - only show if multiple images */}
            {productDetails.images && productDetails.images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePreviousImage}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 8,
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    boxShadow: 2,
                  }}
                  size="large"
                >
                  <ChevronLeftIcon />
                </IconButton>

                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 8,
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    boxShadow: 2,
                  }}
                  size="large"
                >
                  <ChevronRightIcon />
                </IconButton>

                {/* Image indicator dots */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 1,
                  }}
                >
                  {productDetails.images.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor:
                          selectedImageIndex === index
                            ? "primary.main"
                            : "rgba(255, 255, 255, 0.6)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor:
                            selectedImageIndex === index
                              ? "primary.dark"
                              : "rgba(255, 255, 255, 0.8)",
                        },
                      }}
                    />
                  ))}
                </Box>
              </>
            )}
          </Card>

          {/* Image thumbnails if multiple images */}
          {productDetails.images && productDetails.images.length > 1 && (
            <Box sx={{ display: "flex", gap: 1, mt: 2, overflowX: "auto" }}>
              {productDetails.images.map((image, index) => (
                <Paper
                  key={index}
                  elevation={selectedImageIndex === index ? 4 : 1}
                  sx={{
                    minWidth: 80,
                    height: 80,
                    cursor: "pointer",
                    border: selectedImageIndex === index ? 2 : 0,
                    borderColor: "primary.main",
                    overflow: "hidden",
                  }}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${productDetails.title} ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Paper>
              ))}
            </Box>
          )}
        </Grid>

        {/* Product Information */}
        <Grid size={6}>
          <Box>
            {/* Title */}
            <Typography variant="h4" component="h1" gutterBottom>
              {productDetails.title}
            </Typography>

            {/* Rating */}
            {productDetails.rating && (
              <Box sx={{ display: "flex", aligns: "center", mb: 2 }}>
                <Rating
                  value={productDetails.rating}
                  readOnly
                  precision={0.1}
                />
                <Typography
                  variant="body2"
                  sx={{ ml: 1, color: "text.secondary" }}
                >
                  ({productDetails.rating}/5)
                </Typography>
              </Box>
            )}

            {/* Price */}
            <Typography
              variant="h5"
              component="div"
              sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
            >
              ${productDetails.price}
            </Typography>

            {/* Stock Status */}
            <Box sx={{ mb: 3 }}>
              <Chip
                icon={<InventoryIcon />}
                label={`${productDetails.stock} in stock`}
                color={
                  productDetails.stock > 10
                    ? "success"
                    : productDetails.stock > 0
                    ? "warning"
                    : "error"
                }
                variant="outlined"
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Description */}
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.7 }}
            >
              {productDetails.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Quantity Selector */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quantity
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ButtonGroup variant="outlined" aria-label="quantity selector">
                  <IconButton
                    onClick={handleQuantityDecrease}
                    disabled={quantity <= 1}
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Button disabled sx={{ minWidth: 60, fontWeight: "bold" }}>
                    {quantity}
                  </Button>
                  <IconButton
                    onClick={handleQuantityIncrease}
                    disabled={quantity >= productDetails.stock}
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                </ButtonGroup>
                <Typography variant="body2" color="text.secondary">
                  Max: {productDetails.stock}
                </Typography>
              </Box>
            </Box>

            {/* Add to Cart */}
            <Box sx={{ mb: 4 }}>
              <AddToCart
                productId={productId}
                quantity={quantity}
                size="large"
                fullWidth
                disabled={productDetails.stock === 0}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Product Features */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Product Features
              </Typography>
              <Grid container spacing={2}>
                <Grid>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <LocalShippingIcon color="primary" fontSize="small" />
                    <Typography variant="body2">Free Shipping</Typography>
                  </Box>
                </Grid>
                <Grid>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <SecurityIcon color="primary" fontSize="small" />
                    <Typography variant="body2">Secure Payment</Typography>
                  </Box>
                </Grid>
                <Grid>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <AssignmentReturnIcon color="primary" fontSize="small" />
                    <Typography variant="body2">30-Day Returns</Typography>
                  </Box>
                </Grid>
                <Grid>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <InventoryIcon color="primary" fontSize="small" />
                    <Typography variant="body2">Quality Guarantee</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

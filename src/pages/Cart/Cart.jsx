import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  fetchCartData,
  removeFromCart,
} from "../../features/cart/cartSlice";
import { useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
  Chip,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ShoppingCart, ShoppingBag, Clear, Payment } from "@mui/icons-material";

export default function Cart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData(1));
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.totalAmount);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  console.log("cartItems", cartItems);
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart({ productId }));
  };
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <ShoppingCart sx={{ mr: 2, fontSize: 32, color: "info.main" }} />
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="text.primary"
          >
            Shopping Cart
          </Typography>
        </Box>

        {/* Cart Summary */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Chip
            icon={<ShoppingBag />}
            label={`${cartQuantity} Items`}
            color="primary"
            variant="outlined"
            sx={{ mr: 2 }}
          />
          <Typography variant="h6" color="text.secondary">
            Total: ${cartTotal?.toFixed(2) || "0.00"}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Cart Items */}
        {cartItems?.length > 0 ? (
          <Stack spacing={2} sx={{ mb: 4 }}>
            {cartItems.map((item) => (
              <Card
                key={item.id}
                variant="outlined"
                sx={{ transition: "all 0.2s", "&:hover": { boxShadow: 2 } }}
              >
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    {/* Product Title */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="medium"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Grid>

                    {/* Quantity */}
                    <Grid item xs={4} sm={2}>
                      <Box sx={{ textAlign: { xs: "center", sm: "center" } }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Qty
                        </Typography>
                        <Chip
                          label={item.quantity}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      </Box>
                    </Grid>

                    {/* Total Price */}
                    <Grid item xs={4} sm={2}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Total
                        </Typography>
                        <Typography
                          variant="h6"
                          color="primary.main"
                          fontWeight="bold"
                        >
                          ${(item.total || 0).toFixed(2)}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Remove Button */}
                    <Grid item xs={4} sm={2}>
                      <Box sx={{ textAlign: "center" }}>
                        <Button
                          onClick={() => handleRemoveItem(item.id)}
                          startIcon={<ClearIcon />}
                          size="small"
                          color="error"
                          variant="outlined"
                          aria-label={`Remove ${item.title} from cart`}
                          sx={{ minWidth: "auto" }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: "background.paper",
              mb: 4,
            }}
          >
            <ShoppingCart sx={{ fontSize: 48, color: "grey.400", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Your cart is empty
            </Typography>
          </Paper>
        )}

        {/* Cart Total and Actions */}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            backgroundColor: "primary.light",
            color: "primary.contrastText",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Cart Total:
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              ${cartTotal?.toFixed(2) || "0.00"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<Payment />}
              onClick={() => {
                dispatch(clearCart());
              }}
              disabled={!cartItems?.length}
              sx={{
                flex: 1,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              Order Now!
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              size="large"
              startIcon={<Clear />}
              onClick={() => {
                dispatch(clearCart());
              }}
              disabled={!cartItems?.length}
              sx={{
                borderColor: "primary.contrastText",
                color: "primary.contrastText",
                "&:hover": {
                  borderColor: "primary.contrastText",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Clear Cart
            </Button>
          </Box>
        </Paper>
      </Paper>
    </Container>
  );
}

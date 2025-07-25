import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
  updateQuantity,
} from "../../features/cart/cartSlice";
import { Button, Snackbar } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { selectIsLoggedIn } from "../../features/session/sessionSlice";
import { useNavigate } from "react-router";
import { ButtonGroup } from "@mui/material";

export default function AddToCart({
  productId,
  quantity = 1,
  size = "small",
  variant = "contained",
  color = "secondary",
  fullWidth = false,
  disabled = false,
  update = true,
  sx = {},
}) {
  const [snackBar, setSnackBar] = useState({ open: false, message: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartItems = useSelector(selectCartItems);

  const isInCart = cartItems.some((item) => item.id === productId);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({ open: false, message: "" });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      return navigate("/login");
    }
    dispatch(addToCart({ productId, quantity, userId: 1 }));
    setSnackBar({ open: true, message: "Item added to cart" });
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromCart({ productId }));
    setSnackBar({ open: true, message: "Item removed from cart" });
  };
  const handleUpdateCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(updateQuantity({ productId, quantity }));
    setSnackBar({ open: true, message: "Item updated!" });
  };

  return (
    <>
      {isInCart ? (
        <ButtonGroup>
          {update ? (
            <Button
              size={size}
              variant={variant}
              color={"background"}
              fullWidth={fullWidth}
              disabled={disabled}
              onClick={handleUpdateCart}
              startIcon={<AddShoppingCartIcon />}
              sx={{
                fontWeight: "bold",
                ...sx,
              }}
            >
              {"Update quantity"}
            </Button>
          ) : (
            <></>
          )}
          <Button
            size={size}
            variant={variant}
            color={"error"}
            fullWidth={fullWidth}
            disabled={disabled}
            onClick={handleRemoveFromCart}
            startIcon={<RemoveShoppingCartIcon />}
            sx={{
              fontWeight: "bold",
              ...sx,
            }}
          >
            {"Remove from Cart"}
          </Button>
          /
        </ButtonGroup>
      ) : (
        <Button
          size={size}
          variant={variant}
          color={color}
          fullWidth={fullWidth}
          disabled={disabled}
          onClick={handleAddToCart}
          startIcon={<AddShoppingCartIcon />}
          sx={{
            fontWeight: "bold",
            ...sx,
          }}
        >
          {"Add to Cart"}
        </Button>
      )}
      <Snackbar
        open={snackBar.open}
        color="info"
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
        message={snackBar.message}
      />
    </>
  );
}

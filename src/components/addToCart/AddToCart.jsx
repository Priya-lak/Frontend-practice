import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from "../../features/cart/cartSlice";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { selectIsLoggedIn } from "../../features/session/sessionSlice";
import { useNavigate } from "react-router";

export default function AddToCart({
  productId,
  quantity = 1,
  size = "small",
  variant = "contained",
  color = "secondary",
  fullWidth = false,
  disabled = false,
  sx = {},
}) {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartItems = useSelector(selectCartItems);
  // console.log("cur")
  const isInCart = cartItems.find((item) => item.productId === productId);
  console.log(`item ${productId} in cart?`, isInCart);
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      console.log("Not logged in");
      return redirect("/login");
    }

    if (isInCart) {
      dispatch(removeFromCart({ productId }));
    } else {
      dispatch(addToCart({ productId, quantity, userId: 1 }));
    }
  };

  return (
    <Button
      size={size}
      variant={variant}
      color={isInCart ? "error" : color}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={handleClick}
      startIcon={
        isInCart ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />
      }
      sx={{
        fontWeight: "bold",
        ...sx,
      }}
    >
      {isInCart ? "Remove from Cart" : "Add to Cart"}
    </Button>
  );
}

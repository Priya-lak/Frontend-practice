import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function AddToCart({
  productId,
  quantity = 1,
  size = "small",
  variant = "contained",
  color = "primary",
  fullWidth = false,
  disabled = false,
  sx = {},
}) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation when used inside links
    e.stopPropagation(); // Prevent event bubbling
    dispatch(addToCart({ productId, quantity, userId: 1 }));
  };

  return (
    <Button
      size={size}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={handleClick}
      startIcon={<AddShoppingCartIcon />}
      sx={{
        fontWeight: "bold",
        ...sx,
      }}
    >
      Add to Cart
    </Button>
  );
}

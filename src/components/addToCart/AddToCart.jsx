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
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartItems = useSelector(selectCartItems);

  const isInCart = cartItems.some((item) => item.id === productId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      return navigate("/login");
    }

    if (isInCart) {
      dispatch(removeFromCart({ productId }));
    } else {
      dispatch(addToCart({ productId, quantity, userId: 1 }));
    }
  };

  return (
    <div>
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
    </div>
  );
}

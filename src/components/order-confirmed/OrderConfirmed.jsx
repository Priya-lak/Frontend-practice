import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import "./OrderConfirmed.css";

function OrderConfirmed({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
  cartItems,
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="order-confirmed-overlay">
        <DialogPanel className="order-confirmed-panel">
          <DialogTitle className="order-confirmed-title">
            Confirm Your Order
          </DialogTitle>

          <p className="order-confirmed-subtitle">
            Please review your order details before confirming.
          </p>

          <div className="order-items-container">
            {cartItems.map((item) => (
              <div key={item.name} className="order-item">
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-details">
                    {item.quantity} x @${item.price}
                  </p>
                </div>
                <div className="item-amount">${item.amount}</div>
              </div>
            ))}
          </div>

          <div className="total-amount">
            <span>Total:</span>
            <span>${totalAmount}</span>
          </div>

          <div className="action-buttons">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button className="confirm-button" onClick={onConfirm}>
              Confirm Order
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default OrderConfirmed;

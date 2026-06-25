import { useAccount } from "../context/accountContext";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import "./orders.css";

export default function Orders() {
  const { user, currentOrders, removeOrder } = useAccount();

  if (!user) {
    return (
      <main className="orders-page">
        <div className="orders-card">
          <h1>View your orders</h1>
          <p>You need to sign in to see your order history.</p>
          <Link to="/signin" className="orders-link">
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-card">
        <h1>Your orders</h1>
        {currentOrders.length === 0 ? (
          <div className="orders-empty">
            <p>You don't have any orders yet.</p>
            <Link to="/products" className="orders-link">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {currentOrders.map((order) => (
              <article key={order.id} className="order-item">
                <div className="order-header">
                  <div>
                    <p className="order-title">Order {order.id}</p>
                    <p className="order-date">{order.placedAt}</p>
                  </div>
                  <div className="order-header-right">
                    <p className="order-total">R{order.total.toLocaleString()}</p>
                    <button
                      type="button"
                      className="order-delete-btn"
                      aria-label={`Remove order ${order.id}`}
                      onClick={() => removeOrder(order.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                <div className="order-details">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-product">
                      <img src={item.image} alt={item.title} />
                      <div>
                        <p>{item.title}</p>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <p>R{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="order-summary">
                  <span>Status: {order.status}</span>
                  <span>Delivery: {order.delivery.label}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

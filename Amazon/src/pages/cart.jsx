function Cart() {
  return (
    <div>
      <h1>Your Cart</h1>

    Wireless Headphones
    R999

    Gaming Mouse
    R499

    Subtotal: R1498
    </div>
  );
}

const subtotal = cart.reduce(
  (total, item) => total + item.price,
  0
);

export default Cart;
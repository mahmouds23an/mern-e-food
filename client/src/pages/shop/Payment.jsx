import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";

export default function Payment() {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
  const [cart] = useCart();
  //   calculate prices
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalPrice = parseFloat(cartTotal.toFixed(2));
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <Elements stripe={stripePromise}>
        <CheckOutForm price={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
}

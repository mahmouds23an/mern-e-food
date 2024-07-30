<div>
          <h5 className="font-medium">Credit/Debit card</h5>
          {/* Strip form */}
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "black",
                    "::placeholder": {
                      color: "gray",
                    },
                  },
                  invalid: {
                    color: "#red",
                  },
                },
              }}
            />
            <button
              type="submit"
              disabled={!stripe}
              className="btn btn-sm mt-5 w-full border-black hover:bg-black hover:text-white bg-white"
            >
              Pay{" "}
              <span className="text-gray-500">
                {price} <span>$</span>
              </span>
            </button>
          </form>
          {cardErr ? <p className="text-red text-xs">{cardErr}</p> : ""}
          {/* paypal options */}
          <div className="mt-5 text-center">
            <hr />
            <button
              type="submit"
              className="btn btn-sm mt-5 border-black hover:bg-black hover:text-white bg-white"
            >
              <FaPaypal /> Pay with paypal
            </button>
          </div>
        </div> 

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!stripe || !elements) {
    return;
  }

  const card = elements.getElement(CardElement);
  if (card == null) {
    return;
  }

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card,
  });
  if (error) {
    setCardErr(error.message);
  } else {
    setCardErr("");
    console.log("[PaymentMethod]", paymentMethod);
  }
  const { paymentIntent, error: confirmError } =
    await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || "Unknown",
          email: user?.email || "Unknown",
        },
      },
    });
  if (confirmError) {
    console.log(confirmError);
  }
  console.log(paymentIntent);
  if (paymentIntent.status === "succeeded") {
    console.log(paymentIntent.id);
  }
  const paymentInfo = {
    email: user.email,
    transactionId: paymentIntent.id,
    price,
    quantity: cart.length,
    status: "Order pending",
    itemName: cart.map((item) => item.name),
    cartItems: cart.map((item) => item._id),
    menuItems: cart.map((item) => item.menuItemId),
  };
  console.log(paymentInfo);
  axiosSecure.post("/payments", paymentInfo).then((res) => {
    alert("Done");
  });
};

// backend
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Stripe payment
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount(items),
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
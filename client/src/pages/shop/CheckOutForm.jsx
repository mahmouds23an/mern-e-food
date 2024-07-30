/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AuthProvider from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function CheckOutForm({ price, cart }) {
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const { user } = useAuth(AuthProvider);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (typeof price !== "number" || price < 1) {
  //     return;
  //   }
  //   axiosSecure.post("/create-payment-intent", { price }).then((res) => {
  //     setClientSecret(res.data.clientSecret);
  //   });
  // }, [price, axiosSecure]);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const paymentInfo = {
      email: user.email,
      price,
      quantity: cart.length,
      status: "Order pending",
      itemName: cart.map((item) => item.name),
      cartItems: cart.map((item) => item._id),
      menuItems: cart.map((item) => item.menuItemId),
    };
    axiosSecure.post("/payments", paymentInfo).then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Order confirmed successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/order");
      console.log(res.data)
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
      {/* Left side */}
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order summery</h4>
        {/* Table */}
        <table className="table">
          {/* head */}
          <thead className="bg-black text-white rounded-lg">
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td className="font-medium">{item.name}</td>
                <td className="font-medium">{item.quantity}</td>
                <td className="font-medium">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div>
            <p>Number of items: {cart.length}</p>
            <p>
              Total price: {price} <span>$</span>
            </p>
          </div>
          <div>
            <Link to="/cart-page">
              <button className="btn btn-sm mt-5 w-full border-black hover:bg-black hover:text-white bg-white">
                <FaEdit /> Edit your order
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="md:w-1/3 w-full space-y-3 gap-5 card shrink-0 max-w-sm shadow-2xl bg-white px-4 py-8 text-black">
        <h4 className="text-lg font-semibold">Choose your payment method</h4>
        <div className="payment-card">
          <div className="payment-options flex flex-col gap-3">
            <label className="payment-option">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
              />
              Cash on Delivery.
            </label>
            <label className="payment-option">
              <input
                type="radio"
                value="Credit"
                checked={paymentMethod === "Credit"}
              />
              Pay with Credit (Coming soon).
            </label>
          </div>
        </div>
        <button
          onClick={handleCheckoutSubmit}
          className="btn bg-white border-black hover:bg-black hover:text-white"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Order = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");
  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:6001/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  const formatDate = (createdAT) => {
    const createdAtDate = new Date(createdAT);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track all your<span className="text-teal-500"> orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table */}
      <div>
        {orders.length > 0 ? (
          <div>
            <div className="">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="bg-teal-500 text-white rounded-lg">
                    <tr>
                      <th>#</th>
                      <th>Order date</th>
                      {/* <th>TransactionId</th> */}
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item.createdAT)}</td>
                        {/* <td className="font-medium">{item.transactionId}</td> */}
                        <td>{item.price}</td>
                        <td>{item.status}</td>
                        <td>
                          <Link
                            to="/contact"
                            className="btn btn-sm border-none text-red bg-transparent"
                          >
                            Contact
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* foot */}
                </table>
              </div>
            </div>
            <hr />
          </div>
        ) : (
          <div className="text-center mt-20">
            <p>Cart is empty, please add products.</p>
            <Link to="/menu">
              <button className="btn bg-teal-500 rounded-full text-white mt-3">
                Back to Menu
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

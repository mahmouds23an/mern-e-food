/* eslint-disable no-unused-vars */
import { FaTrashAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";

export default function ManageBookings() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });

  const handleConfirm = async (item) => {
    await axiosSecure.patch(`/payments/${item._id}`).then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Order confirmed successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      refetch();
    });
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/payments/${item._id}`)
          .then((response) => {
            if (response) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All orders</h5>
        <h5>Total orders: {orders.length}</h5>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-teal-500 text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Price</th>
                <th>Status</th>
                <th>Confirm order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.displayName}</td>
                  <td>{item.price}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.status === "confirmed" ? (
                      <button
                        onClick={() => handleConfirm(item)}
                        className="btn btn-xs bg-teal-500 text-white"
                      >
                        <GiConfirmed />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConfirm(item)}
                        className="btn btn-xs bg-white-500 text-black"
                      >
                        <GiConfirmed />
                      </button>
                    )}
                  </td>
                  <td>
                    {item.status === "confirmed" ? (
                      <button
                        onClick={() => handleDelete(item)}
                        className="btn btn-xs bg-white text-red"
                      >
                        <FaTrashAlt />
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

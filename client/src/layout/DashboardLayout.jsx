/* eslint-disable no-unused-vars */
import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import {
  FaHome,
  FaLocationArrow,
  FaQuestionCircle,
  FaUsers,
} from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import logo from "/logo.png";
import { MdDashboardCustomize } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <FaHome /> Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartShopping />
        Menu
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaLocationArrow />
        Orders tracking
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaQuestionCircle />
        Customer support
      </Link>
    </li>
  </>
);

export default function DashboardLayout() {
  const { loading } = useAuth;
  const [isAdmin, isAdminLoading] = useAdmin();
  return (
    <div>
      {isAdmin ? (
        <div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn bg-teal-500 drawer-button lg:hidden"
              >
                <MdDashboardCustomize />
              </label>
              <button className="btn rounded-full px-6 bg-teal-500 gap-2 flex items-center text-white sm:hidden">
                <FaRegUser />
                Logout
              </button>
            </div>
            <div className="mt-5 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link to="/dashboard" className="flex justify-start mb-3">
                  <img src={logo} alt="" className="w-20" />
                  <span className="badge badge-primary">admin</span>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="/dashboard">
                  <MdDashboard />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-bookings">
                  <FaShoppingBag />
                  Manage bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-menu">
                  <FaPlusCircle />
                  Add item
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items">
                  <FaEdit />
                  Manage items
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/dashboard/users">
                  <FaUsers />
                  Users
                </Link>
              </li>
              <hr />
              {/* shared nav links */}
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

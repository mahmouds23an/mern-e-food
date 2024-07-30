/* eslint-disable no-unused-vars */
import { FaFacebook, FaGoogle, FaYahoo } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

export default function Modal() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // google signin
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // redirecting to home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    if (password.length < 6) {
      return setErrorMessage("Wrong email or password");
    }
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axios.post("http://localhost:6001/users", userInfo).then((response) => {
          // console.log(response);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Logged in successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate(from, { replace: true });
        });
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Please provide valid email & password!");
      });
    reset();
  };

  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axios.post("http://localhost:6001/users", userInfo).then((response) => {
          // console.log(response);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Logged in successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/");
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h2 className="font-bold text-lg">Please login</h2>
            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>
            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register("password")}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* Error text */}
            {errorMessage ? (
              <p className="text-red text-xs">{errorMessage}</p>
            ) : (
              ""
            )}
            {/* Login button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-teal-500 text-white hover:text-black"
              />
            </div>
            <p className="text-center my-2">
              Do not have an account?{" "}
              <Link
                className="text-teal-400 ml-1 cursor-pointer hover:text-teal-500"
                to="/register"
              >
                Register
              </Link>{" "}
            </p>
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          <div className="text-center space-x-3 mb-3">
            <button
              className="btn btn-circle hover:bg-teal-500 hover:text-white"
              onClick={handleLogin}
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-teal-500 hover:text-white">
              <FaFacebook />
            </button>
            <button className="btn btn-circle hover:bg-teal-500 hover:text-white">
              <FaYahoo />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

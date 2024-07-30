/* eslint-disable no-unused-vars */
import { FaFacebook, FaGoogle, FaYahoo } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic()
  const { createUser, signUpWithGmail, updateUserProfile } =
    useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // redirecting to home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    if (password.length < 6) {
      return setErrorMessage("Password must be at least 6 characters");
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic
            .post("/users", userInfo)
            .then((response) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User created successfully",
                showConfirmButton: false,
                timer: 2500,
              });
              document.getElementById("my_modal_5").close();
              navigate(from, { replace: true });
            });
        });
      })
      .catch((err) => {
        const errorMessage = err.message;
        setErrorMessage("User already exist");
      });
  };

  // register with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/users", userInfo).then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User created successfully",
            showConfirmButton: false,
            timer: 2500,
          });
          document.getElementById("my_modal_5").close();
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h2 className="font-bold text-lg">Create your own account</h2>
          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>
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
          {/* Register button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Register"
              className="btn bg-teal-500 text-white hover:text-black"
            />
          </div>
          <p className="text-center my-2">
            Do you have an account?{" "}
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="text-teal-400 ml-1 cursor-pointer hover:text-teal-500"
            >
              Login
            </button>{" "}
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        <div className="text-center space-x-3 mb-3">
          <button
            className="btn btn-circle hover:bg-teal-500 hover:text-white"
            onClick={handleRegister}
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
      <Modal />
    </div>
  );
}

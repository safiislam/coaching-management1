/* eslint-disable react-hooks/rules-of-hooks */
"use client";
/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import React, { useState } from "react";
import { useLoginUserMutation } from "../../Redux/features/Auth/auth.api";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/features/Auth/auth.slice";
import { jwtDecoded } from "../../utils/decoded";
import { useRouter } from "next/navigation";
import defaultLoginImage from "../../../public/images/theme/login.jpg";
import Image from "next/image";
import showToast from "../../utils/toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [loginUserFromDB] = useLoginUserMutation();
  const router = useRouter();
  // State for user input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form has errors");
      return;
    }

    try {
      console.log("Form data submitted:", formData);

      // Call API to login user
      const res = await loginUserFromDB(formData);

      if (res?.data?.data?.token) {
        const token = res.data.data.token;
        console.log("Token:", token);

        // Dispatch login action to Redux store
        dispatch(loginUser(token));

        // Decode JWT to get user role
        const decodedData = await jwtDecoded(token);

        // Show success message
        showToast("success", "Success", "Login Successfully");
        router.push(`/dashboard/${decodedData?.role?.toLowerCase()}`);
      }
      if (res.error) {
        showToast("error", "Error", res.error.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      showToast("error", "Error", error.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-gray-100 relative flex items-center justify-center overflow-hidden min-h-screen w-full">
      <div className=" absolute z-[0] h-full w-1/2 overflow-hidden right-24 rotate-45 bg-gray-00">
        <Image
          className=" object-cover h-full  -rotate-45"
          src={defaultLoginImage}
          alt="login-image"
        ></Image>
      </div>
      <div className=" bg-white relative z-10 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            href="/register"
            className="text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

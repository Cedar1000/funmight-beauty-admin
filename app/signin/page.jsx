"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import cookie from "react-cookies";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { funmight, google, apple } from "@/public/icons";

// Reusable Input component
const Input = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  extraContent,
}) => (
  <div className="mb-4 relative ">
    <label htmlFor={id} className="block text-sm font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
    />
    {extraContent && (
      <div className="absolute top-[75%] right-3 transform -translate-y-1/2">
        {extraContent}
      </div>
    )}
  </div>
);

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");
     const router = useRouter();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Handle form submission
 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError("");

   try {
     const response = await axios.post("/users/login", formData);

     // Assuming the server returns token and username in the response
     const { accessToken, user } = response.data;




     // Save the token and username in cookies
     cookie.save("token", accessToken);
     cookie.save("user", JSON.stringify(user));

     // Redirect to the dashboard
     router.push("/dashboard");
   } catch (err) {
     setError(
       err.response?.data?.message || "An error occurred during sign-in"
     );
   } finally {
     setLoading(false);
   }
 };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-pink-100 p-10">
        <Image
          src={funmight}
          alt="FunMight Beauty"
          width={200}
          height={200}
          className="mb-6"
        />
        <h1 className="text-4xl font-bold">FunMight Beauty</h1>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 lg:p-20">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Welcome Back</h2>
          <p className="mb-4">Welcome back! please enter your details.</p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="@funmight.co.uk"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              extraContent={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              }
            />

            <button
              type="submit"
              className={`w-full py-2 ${
                loading ? "bg-gray-400" : "bg-orange-300 hover:bg-orange-400"
              } text-white font-semibold rounded-md transition`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Display error message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

"use client";

import React, { useState } from "react";
import { Link } from "@mui/material";
import userRegister from "@/libs/userRegister";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await userRegister(name, email, password, tel);
      // console.log("Registration successful");
      // alert("Registration successful");

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        if (router) {
          // alert("Login success");
          window.location.reload();
          window.location.href = "/";
        }
      }
    } catch (error: unknown) {
      const err = error as any;
      alert("Please check your tel. or Email it already registered.");
      // throw new Error(err.message || "Failed to register user");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="max-w-md w-full p-8 bg-white border border-black rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="tel" className="block mb-1">
              Telephone:
            </label>
            <input
              type="tel"
              id="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center h-12 border border-green-500 rounded-full bg-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:bg-green-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/api/auth/login">
            <a className="text-blue-500 underline">Already have an account?</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

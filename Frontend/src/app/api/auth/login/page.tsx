"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Link } from "@mui/material";
import styles from "@/components/Login.module.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
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
    } catch (error) {
      console.error("Error during login", error);
      // alert("Please check your Email and Password");
    }
  };

  return (
    <div className="bg-[#F9F9F9] h-[100vh] flex justify-center items-center">
      <div className={styles.login}>
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#285F3E]">
          Login
        </h2>
        {error && (
          <div className="text-red-500 mb-4 text-center my-4">{error}</div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-[#285F3E] text-sm"
            >
              Email
            </label>
            <input
              type="Email"
              height={100}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#285F3E] rounded px-3 py-1 focus:outline-none focus:ring focus:border-green-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-[#285F3E] text-sm"
            >
              Password
            </label>
            <input
              type="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#285F3E] rounded px-3 py-1 focus:outline-none focus:ring focus:border-green-300"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center h-12 rounded-xl bg-[#285F3E] text-white font-bold text-lg
            focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 hover:bg-green-500 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="flex flex-row mt-10  my-8 items-center justify-center">
          <div className="w-[50%] border-b-2 border-[#BEBEBE]"></div>
          <div className=" inline w-auto px-2 text-[#BEBEBE]">or</div>
          <div className="w-[50%] border-b-2 border-[#BEBEBE]"></div>
        </div>

        <div className="mt-4 text-center flex items-center justify-center">
          <a className="text-[#10561B] mr-2 text-md">Don't have an account?</a>
          <Link
            href="/api/auth/register"
            className="text-[#10561B] underline decoration-[#10561B] text-md"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

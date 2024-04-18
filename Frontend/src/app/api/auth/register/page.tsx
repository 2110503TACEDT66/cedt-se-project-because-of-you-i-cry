"use client";

import React, { useState } from "react";
import { Link } from "@mui/material";
import userRegister from "@/libs/userRegister";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "@/components/Login.module.css";

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
    <div className="bg-[#F9F9F9] h-[100vh] flex justify-center items-center">
      <div className={styles.login}>
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#285F3E]">
          Create new Account
        </h2>
        {error && (
          <div className="text-red-500 mb-4 text-center my-4">{error}</div>
        )}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 text-[#285F3E] text-sm">
              Name<span className="text-red-500 m-0 p-0 text-left">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className={`w-full border border-[#285F3E] rounded px-3 py-1 focus:outline-none focus:ring focus:ring-green-800 focus:ring-opacity-60 ${styles.placeholderOpacity}`}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-[#285F3E] text-sm"
            >
              Email<span className="text-red-500 m-0 p-0 text-left">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border border-[#285F3E] rounded px-3 py-1 focus:outline-none focus:ring focus:ring-green-800 focus:ring-opacity-60 ${styles.placeholderOpacity}`}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-[#285F3E] text-sm"
            >
              Password<span className="text-red-500 m-0 p-0 text-left">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border border-[#285F3E] rounded px-3 py-1 focus:outline-none focus:ring focus:ring-green-800 focus:ring-opacity-60 ${styles.placeholderOpacity}`}
            />
          </div>
          <div>
            <label htmlFor="tel" className="block mb-1 text-[#285F3E] text-sm">
              Telephone<span className="text-red-500 m-0 p-0 text-left">*</span>
            </label>
            <input
              type="tel"
              id="tel"
              value={tel}
              placeholder="Tel."
              style={{ color: "#333333" }}
              onChange={(e) => setTel(e.target.value)}
              className={`w-full border border-[#285F3E] rounded px-3 py-1 focus:outline-none focus:ring focus:ring-green-800 focus:ring-opacity-60 ${styles.placeholderOpacity}`}
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center h-12 rounded-xl bg-[#285F3E] text-white font-bold text-lg
            focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 hover:bg-green-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <div className="flex flex-row mt-10  my-8 items-center justify-center">
          <div className="w-[50%] border-b-2 border-[#BEBEBE]"></div>
          <div className=" inline w-auto px-2 text-[#BEBEBE]">or</div>
          <div className="w-[50%] border-b-2 border-[#BEBEBE]"></div>
        </div>

        <div className="mt-4 text-center flex items-center justify-center">
          <a className="text-[#10561B] mr-2 text-md">
            Already have an account?
          </a>
          <Link
            href="/api/auth/login"
            className="text-[#10561B] underline decoration-[#10561B] text-md"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

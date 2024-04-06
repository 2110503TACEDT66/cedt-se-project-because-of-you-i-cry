"use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";
import DateReserve from "@/components/DateReserve";
import userLogOut from "@/libs/userLogout";
import Image from "next/image";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { UserJson } from "../../../../interface";
import { fetchData } from "next-auth/client/_utils";
import updateUser from "@/libs/updateUser";
import LogoutModal from "@/components/LogoutModel";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
// import ProfilePage from "@/components/ProfilePage";
// import { useRouter } from "next/navigation";

export default function Profile() {
  // const router = useRouter();

  // const [isEditing, setIsEditing] = useState(false);
  // const [name, setName] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [statusName, setStatusName] = useState(true);
  const [statusEmail, setStatusEmail] = useState(true);
  const [statusTel, setStatusTel] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [createAt, setcreateAt] = useState("");
  const [id, setId] = useState("");

  const session = useSession();
  // console.log(session);

  useEffect(() => {
    async function fetchUserProfile() {
      if (session.data?.user) {
        const res = await getUserProfile(session.data.user.token);
        setId(res.data._id);
        setName(res.data.name);
        setEmail(res.data.email);
        setTel(res.data.tel);
        setcreateAt(res.data.createdAt);
      }
    }
    fetchUserProfile();
  }, [session.data?.user]);

  if (!session || !session.data?.user?.token)
    return <div className="text-xl text-center my-24">...Loading</div>;

  if (!name && !email && !tel) return null;

  return (
    <div className="w-full h-full flex flex-row justtify-center items-center">
      <Suspense
        fallback={
          <p className="m-10">
            <p className="text-xl mb-5">Loading ...</p>
            <LinearProgress />
          </p>
        }
      >
        <div className="w-full h-full text-center mx-auto mt-36 items-center flex flex-col ">
          <div className="text-4xl ml-4 mb-6">Your Profile</div>
          <div className="flex items-center justify-center">
            <img
              src="/img/logo2.png"
              alt="profile picture"
              className="w-[60%]"
            />
          </div>

          <div className="flex flex-col space-y-4 m-4 mt-50">
            <div className="space-y-1">
              <div className="text-left ml-1 text-lg">Name</div>
              <div className="flex flex-row">
                <div className="w-[90%]">
                  <TextField
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    size="small"
                    InputProps={{
                      readOnly: statusName,
                      style: { width: "300px" },
                    }}
                  />
                </div>
                <div className="w-[10%] flex flex-row items-end ml-1.5">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      !statusName
                        ? "ml animate-pulse active:scale-75"
                        : "ml hover:opacity-50 active:scale-75"
                    }
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.8787 4.08205C15.0503 2.91048 16.9497 2.91047 18.1213 4.08205L20.2929 
                      6.25362C21.4645 7.4252 21.4645 9.32469 20.2929 10.4963L11.4142 19.3749H21C21.5523 
                      19.3749 22 19.8227 22 20.3749C22 20.9272 21.5523 21.3749 21 21.3749H4C3.44772 21.3749 3 
                      20.9272 3 20.3749V15.3749C3 15.1097 3.10536 14.8554 3.29289 14.6678L13.8787 4.08205ZM8.58579 
                      19.3749L16.5858 11.3749L13 7.78916L5 15.7892V19.3749H8.58579ZM14.4142 6.37494L18 9.96073L18.8787
                      9.08205C19.2692 8.69152 19.2692 8.05836 18.8787 7.66784L16.7071 5.49626C16.3166 5.10574 15.6834 
                      5.10574 15.2929 5.49626L14.4142 6.37494Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="ml-1 text-left text-lg">Email</div>
              <div className="flex flex-row">
                <div className="w-[90%]">
                  <TextField
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    size="small"
                    InputProps={{
                      readOnly: statusEmail,
                      style: { width: "300px" },
                    }}
                  />
                </div>
                <div className="w-[10%] flex flex-row items-end ml-1.5">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      !statusName
                        ? "ml animate-pulse active:scale-75"
                        : "ml hover:opacity-50 active:scale-75"
                    }
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.8787 4.08205C15.0503 2.91048 16.9497 2.91047 18.1213 4.08205L20.2929 
                      6.25362C21.4645 7.4252 21.4645 9.32469 20.2929 10.4963L11.4142 19.3749H21C21.5523 
                      19.3749 22 19.8227 22 20.3749C22 20.9272 21.5523 21.3749 21 21.3749H4C3.44772 21.3749 3 
                      20.9272 3 20.3749V15.3749C3 15.1097 3.10536 14.8554 3.29289 14.6678L13.8787 4.08205ZM8.58579 
                      19.3749L16.5858 11.3749L13 7.78916L5 15.7892V19.3749H8.58579ZM14.4142 6.37494L18 9.96073L18.8787
                      9.08205C19.2692 8.69152 19.2692 8.05836 18.8787 7.66784L16.7071 5.49626C16.3166 5.10574 15.6834 
                      5.10574 15.2929 5.49626L14.4142 6.37494Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="ml-1 text-left text-lg">Tel.</div>
              <div className="flex flex-row">
                <div className="w-[90%]">
                  <TextField
                    onChange={(e) => {
                      setTel(e.target.value);
                    }}
                    value={tel}
                    size="small"
                    InputProps={{
                      readOnly: statusTel,
                      style: { width: "300px" },
                    }}
                  />
                </div>
                <div className="w-[10%] flex flex-row items-end ml-1.5">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      !statusName
                        ? "ml animate-pulse active:scale-75"
                        : "ml hover:opacity-50 active:scale-75"
                    }
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.8787 4.08205C15.0503 2.91048 16.9497 2.91047 18.1213 4.08205L20.2929 
                      6.25362C21.4645 7.4252 21.4645 9.32469 20.2929 10.4963L11.4142 19.3749H21C21.5523 
                      19.3749 22 19.8227 22 20.3749C22 20.9272 21.5523 21.3749 21 21.3749H4C3.44772 21.3749 3 
                      20.9272 3 20.3749V15.3749C3 15.1097 3.10536 14.8554 3.29289 14.6678L13.8787 4.08205ZM8.58579 
                      19.3749L16.5858 11.3749L13 7.78916L5 15.7892V19.3749H8.58579ZM14.4142 6.37494L18 9.96073L18.8787
                      9.08205C19.2692 8.69152 19.2692 8.05836 18.8787 7.66784L16.7071 5.49626C16.3166 5.10574 15.6834 
                      5.10574 15.2929 5.49626L14.4142 6.37494Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <button
                className="rounded-md bg-[#285F3E] hover:bg-green-600 px-8 py-2
              shadow-sm text-white text-bold right-0 bottom-0 mt-4"
                onClick={() => {
                  if (id && session.data.user.token) {
                    updateUser(id, name, email, session.data.user.token);
                    alert("User information saved successfully!");
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

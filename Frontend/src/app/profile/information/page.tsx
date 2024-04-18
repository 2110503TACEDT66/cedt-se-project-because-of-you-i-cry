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
    <div className="w-full h-full flex flex-row justtify-center items-center h-[100vh] w-[100vw] pt-[9.5vh]">
      <Suspense
        fallback={
          <p className="m-10">
            <p className="text-xl mb-5">Loading ...</p>
            <LinearProgress />
          </p>
        }
      >
        <div className="w-full h-full text-center mx-auto mt-20 items-center flex flex-col ">
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
                      disabled: statusName,
                      style: {
                        width: "300px",
                        backgroundColor: statusName ? "#E7E7E7" : "#FFFFFF",
                      },
                    }}
                  />
                </div>
                <div className="w-[10%] flex flex-row items-end ml-2">
                  <Image
                    src={"/img/edit.png"}
                    alt="edit name"
                    width={24}
                    height={25}
                    className={
                      !statusName
                        ? "scale-75 ml animate-pulse active:scale-50"
                        : "scale-75 ml hover:opacity-50 active:scale-50"
                    }
                    onClick={() => {
                      setStatusName(!statusName);
                    }}
                  />
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
                      disabled: statusEmail,
                      style: {
                        width: "300px",
                        backgroundColor: statusEmail ? "#E7E7E7" : "#FFFFFF",
                      },
                    }}
                  />
                </div>
                <div className="w-[10%] flex flex-row items-end ml-2">
                  <Image
                    src={"/img/edit.png"}
                    alt="edit email"
                    width={24}
                    height={25}
                    className={
                      !statusEmail
                        ? "scale-75 ml animate-pulse active:scale-50"
                        : "scale-75 ml hover:opacity-50 active:scale-50"
                    }
                    onClick={() => {
                      setStatusEmail(!statusEmail);
                    }}
                  />
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
                      style: {
                        width: "300px",
                        backgroundColor: statusTel ? "#E7E7E7" : "#FFFFFF",
                      },
                      disabled: statusTel,
                    }}
                  />
                </div>
                <div className="w-[10%] flex flex-row items-end ml-2">
                  <Image
                    src={"/img/edit.png"}
                    alt="edit Telephone"
                    width={24}
                    height={25}
                    className={
                      !statusTel
                        ? "scale-75 ml animate-pulse active:scale-50"
                        : "scale-75 ml hover:opacity-50 active:scale-50"
                    }
                    onClick={() => {
                      setStatusTel(!statusTel);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                className="rounded-md bg-[#285F3E] hover:bg-green-600 px-8 py-2
              shadow-sm text-white text-bold right-0 bottom-0 mt-4"
                onClick={async () => {
                  if (id && session.data.user.token) {
                    const dataupdated = await updateUser(
                      id,
                      name,
                      email,
                      tel,
                      session.data.user.token
                    );

                    if (dataupdated && dataupdated.success) {
                      alert("User information saved successfully!");
                    } else {
                      alert("User information update failed!!");
                    }
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

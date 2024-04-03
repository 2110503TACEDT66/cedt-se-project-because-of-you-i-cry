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
    <div className="w-full h-[100vh] flex flex-row justtify-center items-center">
      <Suspense
        fallback={
          <p className="m-10">
            <p className="text-xl mb-5">Loading ...</p>
            <LinearProgress />
          </p>
        }
      >
        <div className="w-[30%] h-full bg-slate-200 flex flex-col items-center py-10 space-y-5 relative">
          <div className="h-[30%] w-[60%] relative">
            <Image
              src={"/img/logo2.png"}
              alt="profile picture"
              objectFit="cover"
              width={300}
              height={300}
            />
          </div>
          <div className="h-[5%] w-[90%] relative">
            <div className="text-3xl text-center mt-12">{name}</div>
          </div>
          <div className="h-[20%] w-[95%] space-y-2 flex-1 itemscenter relative">
            <Link href={"/profile/information"}>
              <div className="pb-2 pl-5 border-b border-black mt-16 hover:text-bold hover:border-b-2">
                Profile
              </div>
            </Link>
            <Link href={"/profile/booking"}>
              <div className="pb-2 pl-5 border-b border-black mt-5 hover:text-bold hover:border-b-2">
                Booking
              </div>
            </Link>
          </div>
          <div className="h-[75%] w-[95%] flex items-end">
            <div
              className="w-[100%] pb-2 pl-5 border-b border-black flex flex-row bottom-4 cursor-pointer hover:text-bold hover:border-b-2"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
              <Image
                src={"/img/logoutprofile.png"}
                alt="logout logo"
                width={20}
                height={10}
                className="ml-2 scale-75"
              />
            </div>
          </div>
        </div>
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        />

        <div className="w-[70%] h-full text-left mx-20 mt-48">
          <div className="text-2xl ml-4 mb-12">Profile</div>
          <div className="flex flex-col space-y-8 m-4 mt-50">
            <div className="space-y-3">
              <div>Name</div>
              <div className="flex flex-row">
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

                <Image
                  onClick={() => {
                    setStatusName(!statusName);
                  }}
                  src={"/img/edit.jpg"}
                  alt="edit"
                  objectFit="cover"
                  width={40}
                  height={40}
                  className={
                    !statusName
                      ? "ml-2 animate-pulse active:scale-75"
                      : "ml-2 hover:opacity-50 active:scale-75"
                  }
                />
              </div>
            </div>
            <div className="space-y-3">
              <div>Email</div>
              <div className="flex flex-row">
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
                <Image
                  onClick={() => {
                    setStatusEmail(!statusEmail);
                  }}
                  src={"/img/edit.jpg"}
                  alt="edit"
                  objectFit="cover"
                  width={40}
                  height={40}
                  className={
                    !statusEmail
                      ? "ml-2 animate-pulse active:scale-75"
                      : "ml-2 hover:opacity-50 active:scale-75"
                  }
                />
              </div>
            </div>
            <div className="space-y-3">
              <div>Tel</div>
              <div className="flex flex-row">
                <TextField
                  defaultValue={tel}
                  size="small"
                  disabled
                  InputProps={{
                    style: { width: "300px" },
                  }}
                />
              </div>
            </div>
            <div>
              <button
                className="rounded-md bg-orange-600 hover:bg-orange-400 px-8 py-2
              shadow-sm text-white right-0 bottom-0 mt-8"
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

/*
    <div className="w-[100%] flex flex-col items-center space-y-4 min-h-[70vh] justify-center">
      <div className="border border-black p-10 rounded-xl">
        <div className="text-3xl font-medium"> Profile </div>
        <br />

        {
          <Link href={"/campground"}>
            <button
              className="block rounded-md bg-orange-600 hover:bg-orange-400 px-3 py-2
              shadow-sm text-white "
              >
              Book campground
            </button>
          </Link>
        }
        <div className="flex flex-col">
          <div className="w-200 h-20 border border-gray-500 p-5 m-5 flex items-center justify-center">
            {" "}
            Name : {profile.data.name} <br />
          </div>
          <div className="w-200 h-20 border border-gray-500 p-5 m-5 flex items-center justify-center">
            {" "}
            Email : {profile.data.email} <br />
          </div>
          <div className="w-200 h-20 border border-gray-500 p-5 m-5 flex items-center justify-center">
            {" "}
            Telephone : {profile.data.tel} <br />
          </div>
        </div>
        <div>
          <Link href="/api/auth/logout">
            <button
              className="rounded-md bg-orange-600 hover:bg-orange-400 px-3 py-2
              shadow-sm text-white right-0 bottom-0"
              >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
*/

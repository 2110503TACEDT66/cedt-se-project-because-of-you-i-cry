import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
    <div
      className="inset-x-0 top-0 fixed z-40 flex flex-row h-14 bg-transparent pt-17 px-15 justify-center text-slate-100 font-sans font-normal text-lg text-center text-wrap"
    >
      <div className="left-0 w-[50%] flex flex-row justify-start items-left justify-items-start ">
        <Image
          src={"/img/logo1.png"}
          className="w-auto h-full"
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
        />
        <Link
          href="/"
          className="w-28 text-center my-auto text-base stone-800  font-poppins2 "
        >
          Home
        </Link>
        <Link
          href="/campground"
          className="w-28 text-center my-auto text-base stone-800  font-poppins2"
        >
          Campground
        </Link>
      </div>
      <div className="right-0 flex flex-row justify-end justify-items-end items-right w-[50%]">
        {session ? (
          <div className="ml-2">
            <Link
              href="/profile/information" 
              className="w-32 text-center my-auto"
            >
              <Image
                src={session.user._id ? session.user.name : "/img/logo2.png"}
                className="w-auto h-full"
                alt="logo"
                width={0}
                height={0}
                sizes="100vh"
              />
            </Link>
          </div>
        ) : (
          <Link
            href="/api/auth/login"
            className="w-28 text-center my-auto text-base stone-800 bg-transparent rounded-lg  ml-1 font-poppins2 border py-2"
            style={{ marginTop: "-0.25rem" }} // Adjust vertical alignment
          >
            Sign-In
          </Link>
        )}
      </div>
    </div>
  );
}

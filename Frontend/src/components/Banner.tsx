"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./banner.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Banner() {
  const router = useRouter();
  const { data: session } = useSession();
  //console.log(session?.user.token)

  const scrollToContent = () => {
    // Scroll to a position just below the banner
    window.scrollTo({
      top: window.innerHeight - 100, // Adjust this value as needed
      behavior: "smooth", // Optional: Adds smooth scrolling animation
    });
  };

  return (
    <div className={styles.banner}>
      <Image
        src={"/img/campground.jpg"}
        alt="cover"
        fill={true}
        priority
        objectFit="cover"
      />
      {/* <div className={styles.bannerText}>
        <h1 className="text-4xl font-medium z-40"> Nature Awaits </h1>
        <h2 className="text-3xl font-serif z-40">
          {" "}
          "Unlock Boundless Camping Experiences"{" "}
        </h2>
      </div> */}
      {/* {session ? (
        <div className="z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl">
          Welcome {session.user?.name}
        </div>
      ) : null} */}
      <div className="flex justify-center items-center h-screen relative">
        <div className="absolute top-[20%] w-full ">
          <h1 className="text-5xl font-medium text-white z-40  font-poppins text-center">
            Nature Awaits
          </h1>
          <h1 className="text-5xl font-medium text-white z-40 mt-5 font-poppins text-center">
            “Unlock Boundless Camping Experiences”
          </h1>
        </div>
        <button
          className="text-xl bg-transparent text-white border-2 border-white  font-semibold py-2   px-3 m-2 rounded-xl z-30
           hover:shadow-xl transform translate-y-40 mt-40"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/campground");
          }}
        >
          Choose Your Campground Escape!
        </button>
        <div className="absolute bottom-5 mb-5 cursor-pointer" onClick={scrollToContent}>
          <p className="text-white">View more</p>
          <div className="transform rotate-180 text-center">
            <span className="text-white">^</span>
          </div>
        </div>
      </div>
    </div>
  );
}

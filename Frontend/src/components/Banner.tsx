"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./banner.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = [
    "/img/camp1.jpg",
    "/img/camp2.jpg",
    "/img/camp3.jpg",
    "/img/camp4.jpg",
  ];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();
  //console.log(session?.user.token)

  return (
    <div className={styles.banner} onClick={() => setIndex(index + 1)}>
      <Image
        src={covers[index % 4]}
        alt="cover"
        fill={true}
        priority
        objectFit="cover"
        className="opacity-50"
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
      <div className="flex justify-center items-center h-screen">
        <div className="absolute top-[20%] w-full text-center">
          <h1 className="text-5xl font-medium text-white z-40">
            Nature Awaits
          </h1>
          <h1 className="text-5xl font-medium text-white z-40 mt-5">
            Unlock Boundless Camping Experiences
          </h1>
        </div>
        <button
          className="text-xl bg-orange-600 text-white border-2 border-orange-700 hover:border-green-700 font-semibold py-6 px-5 m-2 rounded-xl z-30
                hover:bg-green-600 hover:text-white hover:transparent hover:shadow-xl transform translate-y-10"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/campground");
          }}
        >
          Choose Your Campground Escape!
        </button>
      </div>
    </div>
  );
}

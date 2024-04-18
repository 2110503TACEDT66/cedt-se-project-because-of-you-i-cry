import styles from "./newtopmenu2.module.css";
import Image from "next/image";
import TopMenuItem from "../TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function NewTopMenu() {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.fullBar}>
      <div className={styles.leftBar}>
        <div className={styles.imageBlock}>
          <Image
            src={"/img/blackologo.png"}
            className={styles.logoimg}
            alt="logo"
            width={0}
            height={0}
            sizes="100vh"
          />
        </div>
        <div className={styles.textBlock}>
          <div className={styles.homeBlock}>
            <Link href="/" className="font-poppins2 text-black">Home</Link>
          </div>
          <div className={styles.campgroundBlock}>
            <Link href="/campground" className="font-poppins2 text-black">Campground</Link>
          </div>
        </div>
      </div>
      <div className={styles.rightBar}>
        {session ? (
          <div className={styles.wrapper}>
            
            <div className={styles.mybookingBlock}>
              <Link href="/mybooking" className="font-poppins2 text-black">My booking</Link>
            </div>
            <div className={styles.profileBlock}>
              <Link href="/profile/information">
                <Image
                  src={session.user._id ? session.user.name : "/img/logo2.png"}
                  className={styles.profilePicture}
                  alt="logo"
                  width={0}
                  height={0}
                  sizes="100vh"
                />
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.signinBlock}>
            <Link href="/api/auth/login" className={`${styles.button} font-poppins2 text-black`}>
              Sign-In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
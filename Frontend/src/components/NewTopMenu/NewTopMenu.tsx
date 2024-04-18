import styles from "./newtopmenu.module.css";
import Image from "next/image";
import TopMenuItem from "../TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import BackgroundLetterAvatars from "../profile";
export default async function NewTopMenu() {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.fullBar}>
      <div className={styles.leftBar}>
        <div className={styles.imageBlock}>
          <Image
            src={"/img/bestlogo.png"}
            className={styles.logoimg}
            alt="logo"
            width={0}
            height={0}
            sizes="100vh"
          />
        </div>
        <div className={styles.textBlock}>
          <div className={styles.homeBlock}>
            <Link href="/" className="font-poppins2">Home</Link>
          </div>
          <div className={styles.campgroundBlock}>
            <Link href="/campground" className="font-poppins2">Campground</Link>
          </div>
        </div>
      </div>
      <div className={styles.rightBar}>
        {session ? (
          <div className={styles.wrapper}>
            
            <div className={styles.mybookingBlock}>
              <Link href="/mybooking" className="font-poppins2">My booking</Link>
            </div>
            <div className={styles.profileBlock}>
              <Link href="/profile/information">
                <BackgroundLetterAvatars/>
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.signinBlock}>
            <Link href="/api/auth/login" className={`${styles.button} font-poppins2`}>
              Sign-In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
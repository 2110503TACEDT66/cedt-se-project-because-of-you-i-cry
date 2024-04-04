import styles from './newtopmenu.module.css'
import Image from "next/image";
import TopMenuItem from '../TopMenuItem';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function NewTopMenu(){
    const session = await getServerSession(authOptions);

  return (
    <div className={styles.fullBar}>
      <div className={styles.leftBar}>
        <div className={styles.imageBlock}>
            <Image
            src={"/img/logo1.png"}
            className="w-auto h-full"
            alt="logo"
            width={0}
            height={0}
            sizes="100vh"
            />
        </div>
        <div className={styles.textBlock}>
            <div className={styles.homeBlock}>
                <Link
                href="/"
                >
                Home
                </Link>
            </div>
            <div className={styles.campgroundBlock}>
                <Link
                href="/campground"
                >
                Campground
                </Link>
            </div>
        </div>
        
      </div>
      <div className={styles.rightBar}>
        {session ? (
          <div className={styles.profileBlock}>
            <Link
              href="/profile/information"
            >
              <Image
                src={session.user._id ? session.user.name : "/img/logo2.png"}
                alt="logo"
                width={0}
                height={0}
                sizes="100vh"
              />
            </Link>
          </div>
        ) : (
        <div className={styles.signinBlock}>
          <Link
            href="/api/auth/login"
            className={styles.button}
          >
            Sign-In
          </Link>
        </div>
        )}
      </div>
    </div>
  );
}

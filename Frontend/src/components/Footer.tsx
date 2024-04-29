import Image from "next/image";
import styles from "@/components/footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div
      className="relative z-40 block h-[25vh] bg-[#285F3E] p-2 justify-center 
      text-slate-100 font-sans font-normal text-wrap"
    >
      <div className="grid grid-cols-3 gap-5 justify-center items-center h-full p-5">
        <div className="flex justify-center">
          <Image
            src={"/img/bestlogo.png"}
            className="w-auto h-[50%]"
            alt="logo"
            width={0}
            height={0}
            sizes="35vh"
          />
        </div>
        <div className="text-left space-y-4">
          <div className="h-[30%] pl-2">
            <h1 className="text-2xl"> Contact </h1>
          </div>
          <div className="h-[70%] text-lg">
            <table className="border-spacing-x-2 border-separate table-auto">
              <tbody>
                <tr>
                  <td>Email </td>
                  <td>:</td>
                  <td>
                    {" "}
                    <a href="mailto:example@gmail.com">example@gmail.com</a>
                  </td>
                </tr>
                <tr>
                  <td>Tel </td>
                  <td>:</td>
                  <td>0XX-XXX-XXXX</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-left space-y-4">
          <div className="h-[30%]">
            <h1 className="text-2xl"> Get Outside </h1>
          </div>
          <div className="h-[70%] text-lg">
            <Link href={"/"} className="hover:underline">
              <h2> Home </h2>
            </Link>
            <Link href={"/campground"} className="hover:underline">
              <h2> All Campground </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

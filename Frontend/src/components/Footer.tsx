import Image from "next/image";

export default function Footer() {
  return (
    <div
      className="inset-x-0 bottom-0 relative z-40 block
    h-[25vh] border border-solid border-slate-300
    bg-stone-800 px-2 py-1.5 justify-center
    text-slate-100 font-sans font-normal text-wrap"
    >
      <div className="flex flex-row justify-center items-center h-[100%] p-5 m-5">
        <div className="right-0 w-[10%] h-auto flex flex-row justify-center items-right">
          <Image
            src={"/img/logo1.png"}
            className="w-auto h-[50%]"
            alt="logo"
            width={0}
            height={0}
            sizes="10vh"
          />
        </div>
        <div className="text-left w-[27%] items-center space-y-1">
          <h1 className="text-2xl text-left underline"> Contact </h1>
          <h2> Email : example@gmail.com </h2>
          <h2> Tel : 0xx-xxx-xxxx </h2>
        </div>
        <div className="text-left w-[27%] items-center space-y-1">
          <h1 className="text-2xl text-left underline"> Get Outside </h1>
          <h2> Home </h2>
          <h2> All Campground </h2>
        </div>
      </div>
    </div>
  );
}

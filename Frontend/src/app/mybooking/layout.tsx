import NewTopMenu from "@/components/NewTopMenu/NewTopMenu3";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <NewTopMenu />
      {children}
    </div>
  );
}

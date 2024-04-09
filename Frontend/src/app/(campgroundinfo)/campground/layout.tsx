import NewTopMenu2 from "@/components/NewTopMenu/NewTopMenu2";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <NewTopMenu2 />
      {children}
    </div>
  );
}

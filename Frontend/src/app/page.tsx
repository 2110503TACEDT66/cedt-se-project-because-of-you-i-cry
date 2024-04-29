import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import CardPanel from "@/components/CardPanel";
import PromoteCard from "@/components/PromoteCard";
import TopCampground from "@/components/TopCampground";
import TrendingNow from "@/components/trendingnow";
import ExploreThailand from "@/components/ExploreThailand";
import NewTopMenu from "@/components/NewTopMenu/NewTopMenu";
import ChooseYourStyles from "@/components/ChooseYourstyles";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ backgroundColor: "ghostwhite" }}>
      <NewTopMenu />
      <Banner />
      <TrendingNow />
      <ExploreThailand />
      <ChooseYourStyles />
      <Footer />
    </main>
  );
}

import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import CardPanel from "@/components/CardPanel";
import PromoteCard from "@/components/PromoteCard";
import TopCampground from "@/components/TopCampground";

export default function Home() {
  return (
    <main style={{ backgroundColor: "ghostwhite" }}>
      <Banner />
      <TopCampground></TopCampground>
    </main>
  );
}

"use client";
import CardPanel from "@/components/CardPanel";
import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { CampgroundJson, CampgroundItem } from "../../../../interface";

export default function Campground() {
  const campgrounds = getCampgrounds();
  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-medium mt-10">Select Your Campground</h1>
      <CampgroundCatalog campgroundJson={campgrounds} />
    </main>
  );
}

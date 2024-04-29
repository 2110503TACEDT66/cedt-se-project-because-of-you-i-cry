"use client";
import CardPanel from "@/components/CardPanel";
import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { CampgroundJson, CampgroundItem } from "../../../../interface";
import EditTagPopupEach from "@/components/EditTagPopupEach";
export default function Campground() {
  
  return (
    <main className="text-center p-5 mt-10">
      <EditTagPopupEach/>
    </main>
  );
}

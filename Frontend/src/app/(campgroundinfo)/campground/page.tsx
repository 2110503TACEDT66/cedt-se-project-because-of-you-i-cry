import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { CampgroundJson, CampgroundItem } from "../../../../interface";
import EditTagPopupEach from "@/components/EditTagPopupEach";
export default function Campground() {
  const campgrounds = getCampgrounds();

  return (
    <main className="text-center p-5 mt-10">
      <EditTagPopupEach campgroundJson={campgrounds} />
    </main>
  );
}

import CardPanel from "@/components/CardPanel";
import getCampgrounds from "@/libs/getCampgrounds";
import TopCampgroundCatalog from "./TopCC";
import { Suspense } from "react";
import { CampgroundJson } from "../../interface";
import { LinearProgress } from "@mui/material";

export default function TopCampground() {
  const campgrounds = getCampgrounds();

  return (
    <main className="p-10">
      <h1 className="text-2xl text-center text-black font-semibold">
        Top Campground
      </h1>
      <Suspense
        fallback={
          <p className="text-black">
            {" "}
            Loading ... <LinearProgress />{" "}
          </p>
        }
      >
        <TopCampgroundCatalog campgroundJson={campgrounds} />
      </Suspense>
    </main>
  );
}

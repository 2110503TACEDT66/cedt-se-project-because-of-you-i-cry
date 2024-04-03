import { useReducer } from "react";
import CardBanner from "./CardBanner";
import Link from "next/link";

import { useRef } from "react";
import { CampgroundJson, CampgroundItem } from "../../interface";

export default async function TopCampgroundCatalog({
  campgroundJson,
}: {
  campgroundJson: Promise<CampgroundJson>;
}) {
  const campgroundJsonReady = await campgroundJson;
  let i = 0;
  return (
    <>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around",
        }}
      >
        {campgroundJsonReady?.data
          .slice(0, 3)
          .map((campgroundItem: CampgroundItem) => (
            <Link
              href={`/campground/${campgroundItem.id}`}
              className="w-1/5 flex flex-row m-30px"
            >
              <CardBanner
                campgroundName={campgroundItem.name}
                imgSrc={campgroundItem.coverpicture}
              />
            </Link>
          ))}
      </div>
    </>
  );
}

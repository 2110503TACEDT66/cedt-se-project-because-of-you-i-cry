"use client";
import Card from "./Card";
import { useReducer, useState, useEffect } from "react";
import Link from "next/link";
import getCampgrounds from "@/libs/getCampgrounds";
import { CampgroundJson } from "../../interface";

export default function CardPanel() {
  const [campgroundsResponse, setcampgroundsResponse] =
    useState<null | CampgroundJson>(null);

  useEffect(() => {
    const fetchData = async () => {
      const campgrounds = await getCampgrounds();
      setcampgroundsResponse(campgrounds);
      fetchData();
    };
  }, []);

  if (!campgroundsResponse) return <p>Campground Panel is Loading ...</p>;
  return (
    <div className="w-full block space-y-5 items-center">
      <div className="flex flex-col flex-wrap justify-center">
        {campgroundsResponse.data.map((campgroundItem) => (
          <Link href={`/campground/${campgroundItem.id}`} className="w-full">
            <Card
              key={campgroundItem.name}
              campgroundName={campgroundItem.name}
              imgSrc={campgroundItem.coverpicture}
              price={campgroundItem.price}
              province={campgroundItem.province}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

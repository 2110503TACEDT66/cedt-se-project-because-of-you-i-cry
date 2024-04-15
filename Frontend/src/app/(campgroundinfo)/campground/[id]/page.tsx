"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import getCampground from "@/libs/getCampground";
import DateReserve from "@/components/DateReserve";
import Link from "next/link";
import { FormControl, Rating } from "@mui/material";
import Available from "@/components/Available";
import styles from "./page.module.css";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SuccessModal from "@/components/SuccessModel";
import { useSession } from "next-auth/react";
import createBooking from "@/libs/createBooking";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import {
  CampgroundJson,
  CampgroundItem,
  CreateBookingItem,
  UserJson,
} from "../../../../../interface";
import CommentCard from "@/components/CommentCard/CommentCard";
import CommentPanel from "@/components/CommentPanel/CommentPanel";

export default function CampgroundDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [campgroundReady, setCampgroundReady] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const session = useSession();
  const router = useRouter();
  const urlParams = useSearchParams();
  const id = urlParams.get(`id`);
  const [checkin, setCheckin] = useState<Dayjs | null>(null);
  const currentDate = dayjs();

  const fetchCampground = useCallback(async () => {
    const campgroundData = await getCampground(params.id);
    setCampgroundReady(campgroundData);
  }, [params.id]);

  useEffect(() => {
    fetchCampground();
  }, [params.id, fetchCampground]);

  const makeReservation = () => {
    if (params.id && campgroundReady && session.data) {
      try {
        const item: CreateBookingItem = {
          apptDate: dayjs(checkin).toISOString(),
          user: session.data.user._id,
          campground: params.id,
        };
        createBooking(item, session.data.user.token);
      } catch (error) {
        console.log(error);
      }
      // dispatch(addBooking(item));
      // router.push("/success");
    } else {
      alert("Please Choose your campground to reserve");
    }
  };

  if (!campgroundReady) return <p>Campground Loading ...</p>;


  const commentsData = [
    {
      name: "Name of comment's owner",
      rating: 5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    },
    {
      name: "Bob sleepy af helpp meeeeeeeeeeeeeeeeeeeeeeeeeeee",
      rating: 4,
      comment: "Great product! Really enjoyed using it. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamLorem ipsum dolor sit amet, consectetur adipiscing  et dolore magna aliqua. Ut enim ad minim veniam",
    },
    {
      name: "Charlie",
      rating: 3,
      comment: "It's good, but there is room for improvement.",
    },
    {
      name: "Dana",
      rating: 2,
      comment: "Not very satisfied with the quality.",
    },
    {
      name: "Eve",
      rating: 4,
      comment: "Nice experience overall, but a bit pricey.",
    },
    {
      name: "Frank",
      rating: 5,
      comment: "An amazing product! I highly recommend it.",
    },
    {
      name: "Grace",
      rating: 3,
      comment: "Decent quality, but not quite what I expected.",
    },
    {
      name: "Hank",
      rating: 4,
      comment: "Good value for the price, will buy again.",
    },
    {
      name: "Ivy",
      rating: 2,
      comment: "Disappointed with the performance.",
    },
    {
      name: "Jack",
      rating: 5,
      comment: "Top-notch! Can't wait to order again.",
    },
    {
      name: "Karen",
      rating: 3,
      comment: "Okay, but not great.",
    },
    {
      name: "Leo",
      rating: 4,
      comment: "Really nice product, but could be better.",
    },
    {
      name: "Mona",
      rating: 5,
      comment: "Simply outstanding!",
    },
    {
      name: "Nina",
      rating: 2,
      comment: "Not impressed with the quality.",
    },
    {
      name: "Oscar",
      rating: 4,
      comment: "Good, but there's some room for improvement.",
    },
    {
      name: "Paula",
      rating: 5,
      comment: "Exceeded my expectations! Highly recommend.",
    },
    {
      name: "Quinn",
      rating: 3,
      comment: "It's okay, but I've seen better.",
    },
    {
      name: "Rachel",
      rating: 4,
      comment: "Good quality, satisfied with my purchase.",
    },
    {
      name: "Sam",
      rating: 5,
      comment: "Fantastic! Loved every bit of it.",
    },
    {
      name: "Tina",
      rating: 2,
      comment: "Poor performance, not worth the money.",
    },
    {
      name: "Uma",
      rating: 4,
      comment: "Overall, a good experience.",
    },
    {
      name: "Vince",
      rating: 3,
      comment: "Average product, nothing special.",
    },
    {
      name: "Wendy",
      rating: 5,
      comment: "Exceptional quality! Will buy again.",
    },
    {
      name: "Xavier",
      rating: 4,
      comment: "Nice product, but some improvements needed.",
    },
    {
      name: "Yara",
      rating: 3,
      comment: "Decent, but not outstanding.",
    },
    {
      name: "Zane",
      rating: 5,
      comment: "Excellent product! Highly recommend.",
    },
  ];

  

  return (
    <div className={styles.page}>
      <div className={styles.campgroundBlock}>
        <div className={styles.rowBlock}>
          <div className={styles.campgroundDetail}>
            <div className={styles.rowBlock}>
              <div className={styles.name}>{campgroundReady.data.name}</div>
              <div className={styles.link}>
                <a href={campgroundReady.data.url}>
                  Visit website{" "}
                  <LinkIcon style={{ transform: "rotate(135deg)" , fontSize: "1.1rem" }} />
                </a>
              </div>
            </div>
            <div className={styles.rating}>
              <Rating
                name="camground rating"
                defaultValue={campgroundReady.data.rating}
                max={5}
                readOnly
              />
            </div>
            <div className={styles.address}>
              <LocationOnIcon style={{ color: "#222222", opacity: 1 }} />
              {campgroundReady.data.address}
              {", "} {campgroundReady.data.district}
              {", "}
              {campgroundReady.data.province} {campgroundReady.data.postalcode}
              {", "}
              {campgroundReady.data.region}
            </div>
          </div>
          <div className={styles.priceBlock}>
            <div className={styles.priceHead}>Avg per night</div>
            <div className={styles.price}>THB {campgroundReady.data.price}</div>
          </div>
        </div>
        <div className={styles.rowBlock}>
          <div className={styles.pictureBlock}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{
                dynamicBullets: true,
                clickable: true,
                //currentClass: 'pagination',
                //el: '.swiper-pagination-custom'
              }}
            >
              <div>
                <SwiperSlide className={styles.slideBlock}>
                  <Image
                    src={campgroundReady.data.coverpicture}
                    alt={"Campground Image 0"}
                    width={10000}
                    height={0}
                    className={styles.sliderImage}
                  />
                </SwiperSlide>
                {campgroundReady.data.picture.map(
                  (imgSrc: string, index: number) => (
                    <SwiperSlide className={styles.slideBlock}>
                      <Image
                        src={imgSrc}
                        alt={`Campground Image ${index + 1}`}
                        width={10000}
                        height={0}
                        className={styles.sliderImage}
                      />
                    </SwiperSlide>
                  )
                )}
              </div>
            </Swiper>
          </div>
          <div className={styles.descriptionBlock}>
            <div className={styles.description}>
              {campgroundReady.data.description}
            </div>
            <FormControl className={styles.rowBlock2}>
              <div className={styles.rowBlock}>
                <div className={styles.checkInBlock}>
                  Check In
                  <div className={styles.dateReserve}>
                    <DateReserve
                      onDateChange={(value: Dayjs) => {
                        if (value.isAfter(currentDate)) {
                          //alert("set Check IN")
                          setCheckin(value);
                        } else {
                          alert(
                            "Please select a date other than today and before today."
                          );
                        }
                      }}
                    />
                  </div>
                </div>
                <div className={styles.buttonBlock}>
                  <button
                    type="submit"
                    name="Book Campground"
                    className={styles.reserveButton}
                    onClick={() => {
                      if (checkin) {
                        setShowSuccessModal(true);
                        makeReservation();
                      } else {
                        alert("Please pick a date to reserve. ");
                      }
                    }}
                  >
                    Reserve
                  </button>
                </div>
              </div>
              <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
              />
            </FormControl>
          </div>
        </div>
      </div> 
      <div className={styles.commentText}>
        Comment
      </div>
      <CommentPanel CommentArray={commentsData}/>

    </div>
  );
}

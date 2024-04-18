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
import { Autoplay , Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
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
import getComments from "@/libs/getComments";
import { Comments } from "../../../../../interface";
export default function CampgroundDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [campgroundReady, setCampgroundReady] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [campgroundData, setCampgroundData] = useState(null);
  const [commentsData, setCommentsData] = useState<Comments>({
    success: false,
    count: 0,
    data: []
});
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
    } else {
      alert("Please Choose your campground to reserve");
    }
  };

  

  useEffect(() => {
    getCampground(params.id).then((data) => {
      setCampgroundData(data);
    });

    getComments(params.id).then((data) => {
      setCommentsData(data);
    });
  }, [params.id]);
  const fetchComments = async () => {
    const data = await getComments(params.id);
    setCommentsData(data);
};

  if (!campgroundReady) return <p>Campground Loading ...</p>;
  if (!campgroundData || commentsData.count === 0) {
    return <p>Loading...</p>;
  }

  
  
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
              modules={[Navigation, Pagination, Scrollbar, A11y , Autoplay ]}
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay:2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: `swiper-pagination-bullet ${styles.swiperPaginationBullet}`,
                bulletActiveClass: `swiper-pagination-bullet-active ${styles.swiperPaginationBulletActive}`,
              }}

              className={styles.swiperContainer}
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
                          setCheckin(null);
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
        {commentsData.count}
      </div>
      <CommentPanel CommentArray={commentsData} Campground_id={campgroundReady.data._id} fetchComments={fetchComments} />

    </div>
  );
}

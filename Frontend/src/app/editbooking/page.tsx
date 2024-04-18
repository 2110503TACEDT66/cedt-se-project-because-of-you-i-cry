"use client";
import { useSearchParams, useRouter } from "next/navigation";
import DateReserve from "@/components/DateReserve";
import getUserProfile from "@/libs/getUserProfile";
import { BookingItem } from "../../../interface";
import getOneBooking from "@/libs/getOneBooking";
import updateBooking from "@/libs/updateBooking";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FormControl } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import styles from "./page.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import deleteBooking from "@/libs/deleteBooking";

export default function NewEditBooking() {
  const router = useRouter();
  const session = useSession();
  // console.log(session.data.user);

  const urlParams = useSearchParams();
  const id = urlParams.get(`id`);
  const [bookingResponse, setBookingResponse] = useState<null | BookingItem>(
    null
  );
  const [name, setName] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [tel, setTel] = useState<null | string>(null);
  const [isDeleting, setisDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.data && session.data.user) {
          const booking = await getOneBooking(
            id as string,
            session.data?.user.token
          );
          setBookingResponse(booking.data);
          const profile = await getUserProfile(session.data.user.token);
          setName(profile.data.name);
          setEmail(profile.data.email);
          setTel(profile.data.tel);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, session.data?.user]);

  const [checkin, setCheckin] = useState<Dayjs | null>(null);

  if (!session || !session.data) return null;

  const updateReservation = () => {
    if (id && bookingResponse && session.data) {
      try {
        if (checkin == null) {
          alert("Please select a new date for your booking.");
          return;
        }

        // Check if the new appointment date is today or before
        const newApptDate = dayjs(checkin);
        const today = dayjs();
        if (newApptDate.isBefore(today)) {
          alert("You cannot update the booking to today or a past date.");
          return;
        }

        updateBooking(
          id,
          dayjs(checkin).toISOString(),
          session.data.user.token
        );

        alert("Edit success");
        if (router) {
          window.location.reload();
          window.location.href = "/mybooking";
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please select a new date for your booking.");
    }
  };

  return (
    <main>
      <FormControl className={styles.page}>
        <div className={styles.fullBlock}>
          <div className={styles.leftBlock}>
            <div className={styles.topLeft}>
              <div className={styles.campName}>
                {bookingResponse?.campground.name}
              </div>
              <div className={styles.rowBlock}>
                <div className={styles.iconBlock}>
                  <LocationOnIcon className={styles.icon} />
                </div>
                <div className={styles.detailBlock}>
                  <div className={styles.address}>
                    {bookingResponse?.campground?.address}
                    {bookingResponse?.campground?.district} district,{" "}
                    {bookingResponse?.campground?.province}{" "}
                    {bookingResponse?.campground?.postalcode}
                  </div>
                  <div className={styles.campLink}>
                    <a href={bookingResponse?.campground.url}>
                      Visit campground website{" "}
                      <LinkIcon style={{ transform: "rotate(135deg)" }} />
                    </a>
                  </div>
                  <div className={styles.checkIn}>Check In</div>
                  <div className={styles.datePicker}>
                    <DateReserve
                      onDateChange={(value: Dayjs) => {
                        setCheckin(value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.botLeft}>
              <div className={styles.contact}>Contact Information</div>
              <div className={styles.rowBlock2}>
                <div className={styles.iconBlock}>
                  <LocationOnIcon style={{ color: "white", opacity: 0 }} />
                </div>
                <div className={styles.detailBlock2}>
                  <div>Name : {name}</div>
                  <div>Email : {email}</div>
                  <div>Tel : {tel}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.topRight}>
              <div className={styles.priceBlock}>
                <div className={styles.priceHead}>Price</div>
                <div className={styles.priceDetail}>
                  THB {bookingResponse?.campground.price}/night
                </div>
              </div>
              <div className={styles.dateBlock}>
                <div className={styles.dateHead}>Date</div>
                <div className={styles.dateDetail}>
                  {dayjs(bookingResponse?.apptDate).format("YYYY/MM/DD")}
                </div>
              </div>
              <div className={styles.buttonBlock}>
                <button
                  type="submit"
                  name="cancel"
                  onClick={() => router.back()}
                  className={styles.cancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  name="save"
                  onClick={updateReservation}
                  className={styles.save}
                >
                  Save
                </button>
              </div>
            </div>
            <div className={styles.botRight}>
              <button
                type="submit"
                name="delete"
                className={styles.delete}
                disabled={isDeleting}
                onClick={async () => {
                  if (session.data) {
                    setisDeleting(true);
                    try {
                      await deleteBooking(
                        id as string,
                        session.data?.user.token
                      );
                      router.back();
                    } catch (error) {
                      console.log(error);
                    } finally {
                      setisDeleting(false);
                    }
                  }
                }}
              >
                Delete this booking
              </button>
            </div>
          </div>
        </div>
      </FormControl>
    </main>
  );
}

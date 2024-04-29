import styles from "./slidercard.module.css";
import Image from "next/image";
export default function SliderCard({ data }: { data: any }) {
  return (
    <div
      className={styles.Card}
      onClick={(event) => (window.location.href = `./campground/${data.id}`)}
    >
      <Image
        height={0}
        width={0}
        alt="campground"
        sizes="100vh"
        src={data.picture[0]}
      />
      <div className={styles.InfoCard}>
        <div className={styles.UpperPart}>
          <h2>
            {data.name.length >= 18
              ? data.name.substr(0, 18) + "..."
              : data.name}
          </h2>
          <div className="flex justify-center items-start">
            <div className={styles.RatingBox}>
              <h2>{data.rating}</h2>
              <Image
                height={0}
                width={0}
                sizes="100vh"
                alt="star"
                src="/img/star.png"
              ></Image>
            </div>
          </div>
        </div>
        <div className={styles.LowerPart}>
          <h2>
            📍
            {data.province.length >= 18
              ? data.province.substr(0, 18) + "..."
              : data.province}
          </h2>
          <div className={styles.LowerTag}>
            {data.tagsName.map((tagName: string) => (
              <span key={tagName}>
                <div
                  className={`m-1 py-1 px-2 rounded-lg cursor-pointer bg-[#AF9670] text-white`}
                >
                  {tagName}
                </div>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

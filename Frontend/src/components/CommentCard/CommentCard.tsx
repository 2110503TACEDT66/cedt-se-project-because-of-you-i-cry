import styles from "./commentcard.module.css"
import { Rating } from "@mui/material";

export default function CommentCard({
    name,
    rating,
    comment,
  }: {
    name: string;
    rating: number;
    comment: string;
  }){
    return(
            <div className={styles.fullBlock}>
                <div className={styles.leftBlock}>
                    {name}
                    <Rating
                        name="comment rating"
                        value={rating}
                        max={5}
                        readOnly
                        className={styles.rating}
                    />
                </div>
                <div className={styles.rightBlock}>
                    {comment}
                </div>
            </div>
    );
}
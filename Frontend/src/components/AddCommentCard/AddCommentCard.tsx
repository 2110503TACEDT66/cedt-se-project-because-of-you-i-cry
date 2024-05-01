import { Rating, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './addcommentcard.module.css';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import createComment from "@/libs/createComment";
import { UserJson } from '../../../interface';

const CustomRating = styled(Rating)({
  '& .MuiRating-icon': {
    margin: '0 0.5vw',
  },
});

export default function AddCommentCard({ campground_id , onCommentAdded}: { campground_id: string ,onCommentAdded:any}) {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<UserJson | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [commentText, setCommentText] = useState<string>('');


  const handleAddComment = async () => {
    // Existing code for adding a comment
    if (userProfile && userRating !== null && session) {
        try {
            const response = await createComment({
                campground_id,
                user_id: userProfile.data._id,
                text: commentText,
                user_rating: userRating,
                token: session.user.token,
            });

            // Handle successful response
            // Call the function passed as a prop to notify the parent component about the new comment
            onCommentAdded();
        } catch (error) {
            console.log("Error creating comment", error);
        }
    } else {
      alert("Error creating comment");
    }
};
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session && session.user && session.user.token) {
        try {
          const profile = await getUserProfile(session.user.token);
          setUserProfile(profile as UserJson);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [session]);

  const handleRatingChange = (event: React.SyntheticEvent, newRating: number | null) => {
    setUserRating(newRating);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  

  return (
    <div className={styles.fullBlock}>
      <div className={styles.bottomBorder}>
        <div className={styles.cardBlock}>
          <div className={styles.headText}>Add your comment here:</div>
          <div className={styles.rateAndCommentBlock}>
            <div className={styles.rateBlock}>
              <CustomRating
                size="large"
                value={userRating}
                onChange={handleRatingChange}
                data-testid="RatingBox"
              />
            </div>
            <div className={styles.commentBlock}>
              <TextField
                data-test="addCommentBlock"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={commentText}
                onChange={handleCommentChange}
                
              />
            </div>
          </div>
          <div className={styles.buttonBlock}>
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddComment}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

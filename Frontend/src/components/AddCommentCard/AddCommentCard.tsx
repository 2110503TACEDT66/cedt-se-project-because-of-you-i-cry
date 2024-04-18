import { Rating, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './addcommentcard.module.css';

const CustomRating = styled(Rating)({
  '& .MuiRating-icon': {
    margin: '0 0.5vw', 
  },
});

export default function AddCommentCard() {
  return (
    <div className={styles.fullBlock}>
      <div className={styles.bottomBorder}>
        <div className={styles.cardBlock}>
          <div className={styles.headText}>Add your comment here:</div>
          <div className={styles.rateAndCommentBlock}>
            <div className={styles.rateBlock}>
              <CustomRating size="large" />
            </div>
            <div className={styles.commentBlock}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </div>
          </div>
          <div className={styles.buttonBlock}>
            <button type="submit" name="Add Comment" className={styles.addButton}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
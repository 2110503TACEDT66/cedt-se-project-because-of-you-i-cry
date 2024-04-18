import styles from "./commentpanel.module.css";
import CommentCard from "../CommentCard/CommentCard";
import { useState } from "react";
import AddCommentCard from "../AddCommentCard/AddCommentCard";

export default function CommentPanel({ CommentArray }: { CommentArray: any }) {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  // Calculate the index of the first and last comment to display
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;

  // Get the comments to display on the current page
  const currentComments = CommentArray.slice(indexOfFirstComment, indexOfLastComment);

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(CommentArray.length / commentsPerPage);

  return (
    <div className={styles.fullBlock}>
      <div className={styles.addCommentBlock}>
        <AddCommentCard />
      </div>
      <div className={styles.commentBlock}>
        {currentComments.map((comment: any, index: number) => (
          <CommentCard key={index} name={comment.name} rating={comment.rating} comment={comment.comment} />
        ))}
      </div>
      <div className={styles.pagination}>
        <div
          className={`${styles.pageArrow} ${currentPage === 1 ? styles.disabledArrow : ""}`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        >
          {"<"}
        </div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <div
            key={page}
            className={`${styles.pageBullet} ${currentPage === page ? styles.activeBullet : ""}`}
            onClick={() => handlePageChange(page)}
          >
            •
          </div>
        ))}
        <div
          className={`${styles.pageArrow} ${currentPage === totalPages ? styles.disabledArrow : ""}`}
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        >
          {">"}
        </div>
      </div>
    </div>
  );
}
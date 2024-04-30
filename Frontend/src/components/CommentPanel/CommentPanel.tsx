import styles from "./commentpanel.module.css";
import CommentCard from "../CommentCard/CommentCard";
import { useState } from "react";
import AddCommentCard from "../AddCommentCard/AddCommentCard";
import { Comments } from "../../../interface";
import getComments from "@/libs/getComments";

export default function CommentPanel({ CommentArray, Campground_id , fetchComments}: { CommentArray: Comments; Campground_id: string , fetchComments: Function}) {
    const [currentPage, setCurrentPage] = useState(1);
    
  
    const commentsPerPage = 5;

    // Extract the comments data from the CommentArray prop
    const comments = CommentArray.data;

    // Calculate the index of the first and last comment to display
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;

    // Get the comments to display on the current page
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    // Function to handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the total number of pages
    const totalPages = Math.ceil(comments.length / commentsPerPage);
    const handleCommentAdded = async () => {
        // Call the function to fetch updated comments data
        await fetchComments();
    };
    return (
        <div className={styles.fullBlock}>
            <div className={styles.addCommentBlock}>
                <AddCommentCard campground_id={Campground_id} onCommentAdded={handleCommentAdded} />
            </div>
            <div data-test="commentBlock" className={styles.commentBlock}>
                {currentComments.map((comment: any, index: number) => (
                    <CommentCard
                        key={index}
                        name={comment.user_id?.name ?? "Unknown User"}
                        rating={comment.user_rating}
                        comment={comment.text}
                    />
                
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

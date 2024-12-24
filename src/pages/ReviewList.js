import React, { useEffect, useState } from "react";
import axios from "axios";
import BookReviewCard from "../components/BookReviewCard";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

function ReviewList({ userId }) {
  const [reviews, setReviews] = useState([]); 
  const [sortOrder, setSortOrder] = useState("Newest");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/reviews");
      console.log("Fetched reviews:", response.data);

      // Convert object to array with IDs
      const reviewsArray = Object.entries(response.data).map(([id, review]) => ({
        id,
        ...review,
      }));
      console.log("Converted reviews array:", reviewsArray);

      setReviews(reviewsArray); // Update state with array
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`, { data: { userId } });
      fetchReviews(); 
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/updatereview/${id}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedReviews = [...reviews]; 
    if (order === "Newest") {
      sortedReviews.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (order === "Highest Rated") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    }
    setReviews(sortedReviews);
    setDropdownVisible(false);
  };

  console.log("Reviews to render:", reviews); 
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h2>Reviews</h2>
        <div className="position-relative">
          <button
            className="btn btn-secondary d-flex align-items-center"
            onClick={toggleDropdown}
            style={{
              color: "white",
              backgroundColor: "#6c757d",
              border: "none",
              borderRadius: "4px",
              padding: "8px 12px",
            }}
          >
            <FaFilter className="me-2" /> Filter
          </button>
          {dropdownVisible && (
            <div
              className="dropdown-menu show"
              style={{
                position: "absolute",
                right: "0px",
                top: "40px",
                zIndex: 1000,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
              }}
            >
              <button className="dropdown-item" onClick={() => handleSort("Newest")}>
                Newest Reviews
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleSort("Highest Rated")}
              >
                Highest Rated Reviews
              </button>
            </div>
          )}
        </div>
      </div>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div style={{ padding: "20px" }} key={review.id}>
              <BookReviewCard
                title={review.title}
                author={review.author}
                rating={review.rating}
                reviewText={review.reviewText}
                dateAdded={review.dateAdded}
                onEdit={() => handleEdit(review.id)}
                onDelete={() => handleDelete(review.id)}
              />
            </div>
          ))
        ) : (
          <p>No reviews to display.</p>
        )}
      </ul>
    </div>
  );
}

export default ReviewList;

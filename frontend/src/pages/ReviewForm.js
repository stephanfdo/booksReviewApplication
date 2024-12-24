import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ReviewForm.css';

const ReviewForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !rating || !reviewText) {
      setError('All fields are required');
      return;
    }

    const reviewData = {
      title,
      author,
      rating,
      reviewText,
      userId,
    };

    try {
      const response = await axios.post('http://localhost:5000/reviews', reviewData);
      console.log('Review added:', response.data);
      
      navigate('/');
    } catch (error) {
      setError('Failed to add review');
      console.error(error);
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="review-form-container">
      <h2>Create a Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        {error && <div className="error">{error}</div>}

        <div className="form-group">
          <label>Book Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label>Rating</label>
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`star ${rating > index ? 'filled' : ''}`}
                onClick={() => handleRatingClick(index)}
              />
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Review Text</label>
          <textarea
            className="form-control"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            rows="5"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">Submit Review</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;

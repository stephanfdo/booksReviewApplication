import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'; 
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ReviewForm.css';

const UpdateReviewForm = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the review 
    axios
      .get(`http://localhost:5000/reviews/${id}`)
      .then((response) => {
        const review = response.data;
        setTitle(review.title);
        setAuthor(review.author);
        setRating(review.rating);
        setReviewText(review.reviewText);
      })
      .catch((err) => setError('Failed to fetch review details'));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !rating || !reviewText) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Send PUT request to update the review
      await axios.put(`http://localhost:5000/reviews/${id}`, {
        title,
        author,
        rating,
        reviewText,
      });
      navigate('/'); 
    } catch (err) {
      setError('Failed to update review. Please try again.');
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="review-form-container">
      <h2>Update Review</h2>
      {error && <div className="error">{error}</div>}
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Rating:</label>
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`star ${rating > index ? 'filled' : ''}`}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Review Text:</label>
          <textarea
            className="form-control"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Update Review</button>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReviewForm;

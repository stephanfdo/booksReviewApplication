import React from 'react';

const BookReviewCard = ({ title, author, rating, reviewText, dateAdded, onEdit, onDelete }) => {
  return (
    <center>
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <span style={styles.date}>{dateAdded}</span>
      </div>
      <p style={styles.author}>By: {author}</p>
      <div style={styles.rating}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} style={{ color: i < rating ? '#FFD700' : '#CCC' }}>★</span>
        ))}
      </div>
      <p style={styles.reviewText}>{reviewText}</p>
      <div style={styles.actions}>
        <button style={{ ...styles.button, ...styles.editButton }} onClick={onEdit}>
          Edit
        </button>
        <button style={{ ...styles.button, ...styles.deleteButton }} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
    </center>
  );
};

const styles = {
  card: {
    justifyContent:'center',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
    maxWidth: '600px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  title: {
    fontSize: '1.25em',
    margin: 0,
  },
  date: {
    fontSize: '0.85em',
    color: '#666',
  },
  author: {
    fontSize: '1em',
    color: '#333',
    marginBottom: '8px',
  },
  rating: {
    fontSize: '1.5em',
    display: 'flex',
    marginBottom: '8px',
  },
  reviewText: {
    fontSize: '1em',
    color: '#555',
    marginBottom: '16px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
  },
  button: {
    padding: '8px 12px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9em',
    color: '#fff',
  },
  editButton: {
    backgroundColor: '#007BFF',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    transition: 'background-color 0.3s',
  },
};

export default BookReviewCard;

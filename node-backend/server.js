const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors'); // Import CORS
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use CORS
  

// Controllers
const authController = require('./controllers/authController');
const reviewController = require('./controllers/reviewController');

// Routes
app.post('/signup', authController.signup);
app.post('/login', authController.login);
app.get('/reviews', reviewController.getReviews);
app.post('/reviews', reviewController.createReview);
app.get('/reviews/:id', reviewController.getReviewById);
app.put('/reviews/:id', reviewController.updateReview);
app.delete('/reviews/:id', reviewController.deleteReview);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

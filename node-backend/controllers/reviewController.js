const admin = require('../utils/firebase');

// Get all reviews
exports.getReviews = async (req, res) => {
    try {
        const snapshot = await admin.database().ref('reviews').once('value');
        const reviews = snapshot.val() || {};
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
    const { id } = req.params;

    try {
        const ref = admin.database().ref(`reviews/${id}`);
        const snapshot = await ref.once('value');
        const review = snapshot.val();

        if (!review) {
            return res.status(404).send('Review not found');
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Create a new review
exports.createReview = async (req, res) => {
    const { title, author, rating, reviewText } = req.body;

    // Validation for required fields
    if (!title || !author || !rating || !reviewText) {
        return res.status(400).send('All fields are required');
    }

    try {
        const newReview = {
            title,
            author,
            rating,
            reviewText,
            dateAdded: new Date().toISOString(),
        };

        // Create new review in Firebase
        const ref = admin.database().ref('reviews').push();
        await ref.set(newReview);
        res.status(201).send({ message: 'Review added', id: ref.key });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update an existing review
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { title, author, rating, reviewText } = req.body;

    try {
        const ref = admin.database().ref(`reviews/${id}`);
        const snapshot = await ref.once('value');
        const review = snapshot.val();

        if (!review) {
            return res.status(404).send('Review not found');
        }

        // Update review fields in Firebase
        await ref.update({ title, author, rating, reviewText });
        res.status(200).send({ message: 'Review updated' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const ref = admin.database().ref(`reviews/${id}`);
        const snapshot = await ref.once('value');
        const review = snapshot.val();

        if (!review) {
            return res.status(404).send('Review not found');
        }

        // Remove review from Firebase
        await ref.remove();
        res.status(200).send({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const admin = require('../utils/firebase');

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).send('All fields are required');

    try {
        const user = await admin.auth().createUser({ email, password, displayName: name });
        res.status(201).send({ message: 'User created successfully', uid: user.uid });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Email and password are required');

    try {
        const user = await admin.auth().getUserByEmail(email);
        res.status(200).send({ message: 'Login successful', uid: user.uid });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

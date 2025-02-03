const Auth = require('../models/auth.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Kullanıcı var mı kontrol et
        const user = await Auth.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Şifre uzunluğu kontrolü
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Şifreyi hash'le
        const passwordHash = await bcrypt.hash(password, 12);

        // Yeni kullanıcıyı oluştur
        const newUser = await Auth.create({
            username,
            email,
            password: passwordHash
        });

        // JWT Token oluştur
        const userToken = jwt.sign(
            { id: newUser.id },
            process.env.SECRET_TOKEN,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            status: "OK",
            newUser,
            userToken
        });

    } catch (e) {
        console.error("Register Hatası:", e);
        return res.status(500).json({ message: e.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET_TOKEN,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            status: "OK",
            user,
            token
        });

    } catch (error) {
        console.error("Login Hatası:", error);
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login };

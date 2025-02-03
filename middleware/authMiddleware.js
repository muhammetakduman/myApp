const jwt = require('jsonwebtoken');
const User = require('../models/auth.js');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ error: 'Yetkisiz erişim. Token bulunamadı.' });
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_TOKEN);

        const user = await User.findById(decoded.id).select('-password'); // Şifreyi hariç tut

        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }

        req.user = user; // Kullanıcı bilgisini req.user içine ekle
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token geçersiz veya süresi dolmuş.' });
    }
};

module.exports = authMiddleware;

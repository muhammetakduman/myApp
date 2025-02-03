const User = require('../models/auth.js');

// Belirli bir kullanıcının bilgilerini getir
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password'); // Şifreyi gösterme

        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Kullanıcı getirme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası, kullanıcı getirilemedi.' });
    }
};

// Doğru şekilde export edildiğinden emin ol!
module.exports = { getUserById };

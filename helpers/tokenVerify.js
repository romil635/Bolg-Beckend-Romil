const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/api/users/login');
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.redirect('/api/users/login');
            }
            req.userId = payload.userId;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}
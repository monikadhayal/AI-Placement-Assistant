// JWT check (protected routes)

const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            message: "please log in first"
        });
    }

    const token  = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid token"
        });     
    }
};
module.exports = protect;
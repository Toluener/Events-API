const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('token');
    if(!token) return res.status(401).json({message: 'Authentication Error'});

    try{
        const decoded = jwt.verify(token, 'randomString');
        req.user = decoded.user;
        next();
    } catch(err) {
        console.error(err);
        res.status(500).send({message: 'Invalid Token'});
    }
};
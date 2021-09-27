const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = user;
            //console.log(req);
        } else {
        return res.status(400).json({ message: "Access denied" });
        }
        next();
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth
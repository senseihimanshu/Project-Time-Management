const jwt = require('jsonwebtoken');
const config = require('config');

authenticator = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ','');
    console.log(token);

    if(!token) return res.status(401).send(
        {
            success: false,
            payload: {
                message: 'Token Not Provided. Hence, Unauthorized'
            }
        } 
    );

    try{
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.employee = payload;
        next();
    }catch(e){
        console.log(e);
        res.status(400).send({
            success: false,
            payload: {
                message: 'Invalid Token'
            }
        });
    }
}

module.exports = authenticator;
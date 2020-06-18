/*  Author: Trevor Frame
*   Description: 
*/

const config = require('config');
const jwt = require('jsonwebtoken');

//get token sent in
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //check for token
    if(!token) {
        return res.status(401).json({msg: "Unauthorized access"});
    }
    try{
        //verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //add user from payload
        req.user = decoded;
        next();
    }catch(e){
        res.status(400).json({msg: "Token invalid"});
    }
}

module.exports = auth;
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Murtazaisagoodboy";

const fetchuser = (req, res, next) =>{
   //Get the user from the JWT token and idd id to req object 
   const token = req.header('auth-token');
   if (!token) {
    res.status(401).send({error: "Please authrnticate using valid token"});
   }
   
   try {
    const data = jwt.verify(token, JWT_SECRET);
   req.user = data.user;
   
   } catch (error) {
    res.status(401).send({error: "Please authrnticate using valid token"});
   }
   next(); 

}

module.exports = fetchuser;
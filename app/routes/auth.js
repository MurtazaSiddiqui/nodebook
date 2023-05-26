const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');




const JWT_SECRET = "Murtazaisagoodboy";


//ROUTE:1 create a user using post "/api/auth/createuser". no login required
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enater a valid email').isEmail(),
    body('password', 'password must be at least 5 character').isLength({ min: 5 }),
], async (req, res) => {
    //if there are error so return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check weath er of user with the same email exist already

    try {
        
    

    let user = await User.findOne({email: req.body.email})
    if (user) {
        return res.status(400).json({error:"sorry a user with this eamil is already exists"})
    }

    const salt = await bcrypt.genSalt(10);

    const secpass = await bcrypt.hash(req.body.password, salt) 
    //create user
     user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
    });

    const data = {
        user:{
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    

    res.json({authtoken});
}
    catch (error) {
     console.log(error.message)       
     res.status(500).send("Internal some error occured")
    }
    
});


//ROUTE:2 Authentication a user using post "/api/auth/createuser". no login required
router.post('/login', [
    body('email', 'enater a valid email').isEmail(),
    body('password', 'password cannot be blanked').exists(),
    
], async (req, res) => {
      //if there are error so return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const {email, password} = req.body;
      
      try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({error: "Please try to login with correct credentials"});
            
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});

      } catch (error) {
        console.log(error.message)       
        res.status(500).send("Internal some error occured")
       }

});


//ROUTE:3 Get user details using: post "/api/auth/geteuser". login required
router.post('/geteuser', fetchuser, async (req, res) => {
try {
 userId = req.user.id;   
const user = await User.findById(userId).select("-password")
res.send(user)
    
} catch (error) {
    console.log(error.message)       
    res.status(500).send("Internal some error occured")
}

});

module.exports = router

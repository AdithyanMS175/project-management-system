const jwt = require("jsonwebtoken")


const jwtMiddleware = (req,res,next) =>{
    console.log("Inside jwtMiddleware");

    //getToken
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
            console.log(jwtResponse);
            req.payload = jwtResponse.userMail;
            req.role = jwtResponse.role;
            console.log("Authorization Success");
            next();
        } catch (err) {
            console.log(err);
            res.status(401).json("Authorization failed!!! Invalid Token...");
        }
    } else {
        res.status(401).json("Authorisation Failed!!! Token Missing");
    }
    
    

}

module.exports = jwtMiddleware
const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  console.log("Inside adminMiddleware");

  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if (token) {
    try {
      const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
      console.log(jwtResponse);
      req.payload = jwtResponse.userMail;
      const role = jwtResponse.role;
      if (role === "admin") {
        console.log("Admin Success");
        next();
      } else {
        res.status(401).json("Authorization failed!!! Unauthorized user... ");
      }
    } catch (error) {
      console.log(error);
      res.status(401).json("Authoriztion failed!!! Invalid token");
    }
  } else {
    res.status(401).json("Authhorization failed!!! Token Missing ");
  }
};

module.exports = adminMiddleware

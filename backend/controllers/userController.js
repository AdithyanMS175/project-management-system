const users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
exports.registerController = async (req, res) => {
  console.log("Inside registerController");
  const { name, email, password, role } = req.body;
  console.log(name, email, password, role);

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(409).json("User Already Exists. Please Login!!!");
    } else {
      const hashpassword = await bcrypt.hash(password, 10);
      const newUser = await users.create({
        name,
        email,
        password: hashpassword,
        role,
      });
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//login
exports.loginController = async (req, res) => {
  console.log("Inside loginController");
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json("Account Does not exist");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (isMatch) {
      const token = jwt.sign(
        {userMail: existingUser.email, role: existingUser.role},
        process.env.JWT_SECRET,
      );

      res.status(200).json({ user: existingUser, token });
    } else {
      return res.status(401).json("Incorrect Email / Password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

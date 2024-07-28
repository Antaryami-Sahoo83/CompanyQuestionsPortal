const adminModel = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const newUser = req.body;
    const { email, password } = newUser;
    const user = await adminModel.findOne({ email });
    if (user) {
      res.status(404).json({ message: "Email Already exists!!" });
      return;
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      newUser.password = hashedPassword;
      await adminModel.create(newUser);
      res
        .status(201)
        .json({ message: "User Successfully Registered!", user: newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const signin = async (req, res) => {
  try {
    const user = req.body;
    const { email, password } = user;
    const dbUser = await adminModel.findOne({ email });
    if (!dbUser) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    const isValidPass = bcrypt.compareSync(password, dbUser.password);
    if (!isValidPass) {
      return res.status(401).json({ auth: false, message: "Invalid Password" });
    }
    const token = jwt.sign(
      {
        user: {
          id: dbUser._id,
          name: dbUser.name,
          mobile: dbUser.mobile,
          email: dbUser.email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );
    res.status(200).send({ message: "Successfully Logged In!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  signin,
};

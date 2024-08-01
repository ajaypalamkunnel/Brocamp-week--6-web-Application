
import userModel from "../model/user_model.js";

export const registerUser = async (req, res) => {
  try {
    console.log("inside register user");
    // console.log("Received data: ", JSON.stringify(req.body, null, 2));
    const { username, password, email, phone } = req.body; // Destructure the properties
    let user = new userModel({
      username: username,
      password: password,
      email: email,
      phone: phone,
    });
    const newUser = await user.save();
    console.log("new user : ", newUser);
    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "User created succesfully",
      data: newUser,
    });
    // console.log("Username: ", username); // Print the username
    // console.log("Email: ", email);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    console.log("inside get user");

    let userData = await userModel.find({});
    return res
      .status(200)
      .json({
        errorcode: 0,
        status: true,
        msg: "User data found",
        data: userData,
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const authUser = async (req, res) => {
  try {
    console.log("inside auth");
    const { username, password } = req.body;
    let user = await userModel.findOne({ username: username });
    console.log("this is user : ",user);
    if (!user)
      return res
        .status(200)
        .json({
          errorcode: 2,
          status: false,
          msg: "User not present",
          data: null,
        });
    if (user.password !== password)
      return res
        .status(200)
        .json({
          errorcode: 0,
          status: false,
          msg: "password Incorrect",
          data: "null",
        });
    return res
      .status(200)
      .json({
        errorcode: 0,
        status: true,
        msg: "user signin succsessfully",
        data: user,
      });
  } catch (error) {}
};

import userModel from "../model/user_model.js";

export const registerUser = async (req, res) => {
  try {
    console.log("inside register user");
    // console.log("Received data: ", JSON.stringify(req.body, null, 2));
    const { username, password, phone } = req.body; // Destructure the properties
    let user = new userModel({
      username: username,
      password: password,
      phone: phone,
    });
    const newUser = await user.save();
    console.log("new user : ", newUser);
    return res
      .status(200)
      .json({
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
  } catch (error) {
    console.log(error.message);
  }
};

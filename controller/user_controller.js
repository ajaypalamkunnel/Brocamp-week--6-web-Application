import userModel from "../model/user_model.js";

export const registerGet = async (req, res) => {
  try {
    if (!req.session.user) {
      res.render("signup");
    } else {
      res.redirect("/user/home");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body; // Destructure the properties
    //console.log("hello  ",username);
    if (!username || !password || !email) {
      return res.status(400).json({
        errorcode: 1,
        status: false,
        msg: "All fields are required",
      });
    }

    let user = new userModel({
      username: username,
      password: password,
      email: email,
      phone: phone,
    });

    const newUser = await user.save();
    console.log("new user : ", newUser);

    req.session.user = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "User created successfully",
      data: newUser,
      redirectUrl: "home",
    });

    // console.log("Username: ", username); // Print the username
    // console.log("Email: ", email);
  } catch (error) {
    console.log(error.message);

    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({
        errorcode: 3,
        status: false,
        msg: "User already exists with this email or username",
      });
    }

    return res.status(500).json({
      errorcode: 2,
      status: false,
      msg: "Server error",
    });
  }
};

export const getHome = async (req, res) => {
  try {
    if (req.session.user) {
      return res.render("home", { user: req.session.user }); // Redirect to login if user is not authenticated
    } else {
      if (req.session.passwordwrong) {
        res.render("signin", { errorMessage: "Password Incorrect" });
        req.session.passwordwrong = false;
      } else {
        res.render("login");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    console.log("inside get user");

    let userData = await userModel.find({});
    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "User data found",
      data: userData,
    });
  } catch (error) {
    console.log(error.message);
  }
};


//login page rendering 
export const sigin = (req, res) => {
  try {
    if (!req.session.user) {
      const mess = req.session.message;
      if (req.session.message) {
        req.session.message = "";
        res.render("signin", { errorMessage: mess });
      } else {
        res.render("signin", { errorMessage: "" });
      }
    } else {
      res.redirect("/user/home");
    }
  } catch (error) {
    console.log(error.message);
  }
};


//user login authentication
export const authUser = async (req, res) => {
  try {
    console.log("inside auth == ", req.session.message);

    const { username, password } = req.body;
    let user = await userModel.findOne({ username: username });

    //console.log("this is user : ", user);

    const message = req.flash("message");
    console.log("inside auth == ", message);

    if (message.length > 0) {
      return res.render("signin", { message: message[0] });
    }

    if (req.session.user) {
      console.log("hi guyss iam session");
      return res.redirect("/user/home");
    }

    if (!user) {
      req.session.message = "Username does not exist";
      return res.redirect("/user/signin");
      // return res.render("signin", { errorMessage: "Username does not exist" });
    }

    if (user.password !== password) {
      req.session.passwordwrong = true;
      req.session.message = "Username does not exist";
      return res.render("signin", { errorMessage: "Password Incorrect" });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    return res.redirect("/user/home");
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      errorcode: 2,
      status: false,
      msg: "Server error",
    });
  }
};

export const signOut = async (req, res) => {
  try {
    req.flash("message", "Logged out successfully");
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session: " + err);
        return res.status(500).send("Error signing out");
      }
      res.redirect("signin");
    });
  } catch (error) {
    console.log("This is an error: " + error);
  }
};

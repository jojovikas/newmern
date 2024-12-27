const users = require("../models/userSchema");
const moment = require("moment");

// Register User
exports.userpost = async (req, res) => {
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, location, status } = req.body;

  if (
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !location ||
    !status ||
    !file
  ) {
    res.status(401).json("All Inputs is Required");
  }

  try {
    const peruser = await users.findOne({ email: email });
    if (peruser) {
      res.status(401).json("This User Already Exist in our Database");
    } else {
      const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      const userData = new users({
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
        profile: file,
        datecreated,
      });
      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("Catch Block Error");
  }
};

//User Get

exports.userget = async (req, res) => {
  const search = req.query.search || "";
  const gender = req.query.gender || "";
  const status = req.query.status || "";
  const sort = req.query.sort || "";
  // console.log(req.query);

  // const query = {
  //   fname: { $regex: search, $options: "i" },
  // };

  const query = {
    $or: [
      { fname: { $regex: search, $options: "i" } }, // Search by fname
      { lname: { $regex: search, $options: "i" } }, // Search by lname
      { email: { $regex: search, $options: "i" } }, // Search by email
      { mobile: { $regex: search, $options: "i" } }, // Search by mobile
    ],
  };

  if (gender !== "All") {
    query.gender = gender;
  }

  if (status !== "All") {
    query.status = status;
  }

  try {
    const usersdata = await users
      .find(query)
      // below line for shorting the data by date -1 mean the top latest data 1 means by default data
      .sort({ datecreated: sort == "new" ? -1 : 1 });

    res.status(200).json(usersdata);
  } catch (error) {
    res.status(401).json(error);
  }
};

//singleuserget
exports.singleuserget = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const userdata = await users.findOne({ _id: id });
    res.status(200).json(userdata);
  } catch (error) {
    res.status(401).json(error);
  }
};

// user Edit
exports.useredit = async (req, res) => {
  const { id } = req.params;
  const {
    fname,
    lname,
    email,
    mobile,
    gender,
    location,
    status,
    user_profile,
  } = req.body;
  const file = req.file ? req.file.filename : user_profile;

  const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  try {
    const updateduser = await users.findByIdAndUpdate(
      { _id: id },

      {
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
        profile: file,
        dateUpdated,
      },
      {
        new: true,
      }
    );

    await updateduser.save();
    // Respond with the updated user
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(401).json(error);
  }
};

// Delete User
exports.userdelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteuser = await users.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteuser);
  } catch (error) {
    res.status(401).json(error);
  }
};

//change Status

exports.userstatus = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const userstatusupdate = await users.findByIdAndUpdate(
      { _id: id },
      { status: data },
      { new: true }
    );
    res.status(200).json(userstatusupdate);
  } catch (error) {
    res.status(401).json(error);
  }
};

//export user in csv

exports.userExport = async (req, res) => {};

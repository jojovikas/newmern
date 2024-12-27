const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/usersControllers");
const upload = require("../multerconfig/storageConfig");

// Routes
router.post(
  "/user/register",
  upload.single("user_profile"),
  controllers.userpost
);

router.get("/users/details", controllers.userget);
router.get("/user/:id", controllers.singleuserget);

//UPDATE USER DATA
router.put(
  "/user/edit/:id",
  upload.single("user_profile"),
  controllers.useredit
);

//Delete User Data
router.delete("/user/delete/:id", controllers.userdelete);

//update status
router.put("/user/status/:id", controllers.userstatus);

//api for export to csv

router.get("/user/export", controllers.userExport);

module.exports = router;

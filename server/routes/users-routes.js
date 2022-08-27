const express = require("express");
const router = express.Router();
const dbQuery = require('../DB/DB-query')
const jwtauth = require('../jwtauth');

// Get all users
router.get("/users-profile", async (req, res) => {
  // jwt
  const usersProfile = await dbQuery.getAllUsersProfile();
  res.send(usersProfile);
});

// Get user by id
router.get("/user-profile/:id", async (req, res) => {
  jwtauth.verifyToken(req, res, async (req, res) => {
    console.log(req.params.id);
    const userProfile = await dbQuery.getUserProfileById(req.params.id);

    if (userProfile.length === 0) {
      res.send("User proflie do not exist");
    } else if (userProfile !== null && userProfile !== undefined) {
      res.send(userProfile[0]);
    } else {
      res.send("Some error on the server or DB");
    }
  });
});


// update user by id
router.put("/user-profile/:id", async (req, res) => {
  // jwt

  const user = await dbQuery.UpdateUserProfileById(req.params.id, req.body);
  if (user.length === 0 || user !== null || user !== undefined) {
    res.send("User Updated");
  } else {
    res.send("Some error on the server or DB");
  }
});

module.exports = router;

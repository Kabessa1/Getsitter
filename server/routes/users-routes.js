const express = require("express");
const router = express.Router();
const dbQuery = require('../DB/DB-query')
const jwtauth = require('../jwtauth');

// Get all users
router.get("/users-profile", async (req, res) => {
  jwtauth.verifyToken(req, res, async (req, res) => {
    const usersProfile = await dbQuery.getAllUsersProfile();

    if (usersProfile.length === 0) {
    res.send("No users found");
    } else if (usersProfile !== null && usersProfile !== undefined) {
    res.send(usersProfile);
    } else {
    res.send("Some error on the server or DB");
    }
  });
});

// Get user by id
router.get("/user-profile/:id", async (req, res) => {
  jwtauth.verifyToken(req, res, async (req, res) => {
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
  jwtauth.verifyToken(req, res, async (req, res) => {
   try {
    console.log(req.body);
    const userProfile = await dbQuery.UpdateUserProfileById(req.params.id, req.body);
    res.send("User updated!");
   } catch (error) {
    res.send("Some error on the server or DB");
   }
  });

  const user = await dbQuery.UpdateUserProfileById(req.params.id, req.body);
  if (user.length === 0 || user !== null || user !== undefined) {
    res.send("User Updated");
  } else {
    res.send("Some error on the server or DB");
  }
});

module.exports = router;

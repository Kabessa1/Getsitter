const express = require("express");
const router = express.Router();
const dbQuery = require('../DB/DB-query');
const jwtauth = require('../jwtauth');


// Get all users
router.get("/users", async (req, res) => {
  jwtauth.verifyToken(req, res, async (req, res) => {
    const users = await dbQuery.getAll();
    res.send(users);
  });
});

// Get user by id
router.get("/user/:id", async (req, res) => {
  jwtauth.verifyToken(req, res, async (req, res) => {
    const user = await dbQuery.getUserById(req.params.id);

    if (user.length === 0) {
      res.send("User do not exist");
    } else if (user !== null && user !== undefined) {
      delete user[0].userpassword
      res.send(user[0]);
    } else {
      res.send("Some error on the server or DB");
    }
  });
});

// post user
router.post("/register", (req, res) => {
  return dbQuery.createUser(req, res);
});


// post user
router.post("/login", async (req, res) => {
  return await dbQuery.loginUser(req, res);
});
  
// delete user by id
// router.delete("/user/:id", async (req, res) => {
//   const user = await dbQuery.DeleteUserById(req.params.id);
//   res.send(user);
// });

// update user by id
// router.put("/user/:id", async (req, res) => {
//   // jwt
//   const user = await dbQuery.UpdateUserById(req.params.id, req.body);
//   if (user.length === 0 || user !== null || user !== undefined) {
//     res.send("User Updated");
//   } else {
//     res.send("Some error on the server or DB");
//   }
// });

module.exports = router;

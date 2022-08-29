const myDB = require("./init-DB");
const sql = require("mssql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/token");

async function getAllUsers() {
  try {
    let users = await myDB.client.query("SELECT * from system_users;");
    return users.rows;
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsersProfile() {
  try {
    let userProfile = await myDB.client.query("SELECT * from users;");
    return userProfile.rows;
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(id) {
  try {

    let user = await myDB.client.query(
      `SELECT * FROM system_users WHERE id= $1;`,
      [id]
    );
    
    return user.rows;
  } catch (error) {
    console.log(error);
  }
}

async function getUserProfileById(id) {
  try {
    let user = await myDB.client.query(
      `SELECT * FROM users WHERE id= $1;`,
      [id]
    );
    
    return user.rows;
  } catch (error) {
    console.log(error);
  }
}

// async function DeleteUserById(id) {
//   try {
//     let pool = await myDB.client.query(myDB.sqlConfig);
//     let user = await pool
//       .request()
//       .input("id_parameter", sql.VarChar, id)
//       .query("Delete from SystemUsers WHERE id = @id_parameter");
//     return user.recordsets;
//   } catch (error) {
//     console.log(error);
//   }
// }

// (`DELETE * FROM system_users WHERE id= $1;`,
// [id]);

async function createUser(req, res) {
  try {
    const { firstname, lastname, mail, password } = req.body;
    const data = await myDB.client.query(
      `SELECT * FROM system_users WHERE email= $1;`,
      [mail]
    ); //Checking if user already exists
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          return res.status(err).json({
            error: "Server error",
          });
        const user = {
          firstname,
          lastname,
          mail,
          password: hash,
        };

        myDB.client.query(
          `INSERT INTO system_users (Firstname, Lastname, Email, UserPassword) VALUES ($1,$2,$3,$4);`,
          [user.firstname, user.lastname, user.mail, user.password],
          async (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                error: "Database error",
              });
            } else {
                await myDB.client.query(
                    `INSERT INTO users (Firstname, Lastname, Email) VALUES ($1,$2,$3);`,
                    [user.firstname, user.lastname, user.mail])
              return res
                .status(200)
                .send({ message: "User added to database" });
            }
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Database error while registring user!", //Database connection error
    });
  }
}

// async function UpdateUserById(id, user) {
//   try {
//     let pool = await myDB.client.query(myDB.sqlConfig);
//     let products = await pool
//       .request()
//       .input("id_parameter", sql.Int, id)
//       .input("Firstname_p", sql.VarChar, user.firstname)
//       .input("Lastname_p", sql.VarChar, user.lastname)
//       .input("Email_p", sql.VarChar, user.mail)
//       .input("UserPassword_p", sql.VarChar, user.password)
//       .query(
//         "UPDATE SystemUsers SET Firstname = @Firstname_p, Lastname = @Lastname_p, Email = @Email_p, UserPassword = @UserPassword_p WHERE id = @id_parameter"
//       );
//     return products.recordsets;
//   } catch (error) {
//     console.log(error);
//   }
// }
// (`UPDATE system_users SET =(Firstname, Lastname, Email, UserPassword) VALUES ($1,$2,$3,$4);`,
          // [user.firstname, user.lastname, user.mail, user.password],


async function loginUser(req, res) {
  try {
    const { mail, password } = req.body;
    const data = await myDB.client.query(
      `SELECT * FROM system_users WHERE Email= $1;`,
      [mail]
    );
    const user = data.rows[0];
    console.log(user);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(password, user.userpassword);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: user.id }, config.token);

    res.status(200).send({
      id: user.id,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
  }
}

// TODO:: fileds names
async function UpdateUserProfileById(id, user) {
  try {
    console.log(id);
    console.log(user);
    const data = await myDB.client.query(
      `UPDATE "users" 
      SET "homeaddress" = $2, "city" = $3, "age" = $4, "phonenumber" = $5, "imgurl" = $6, "type" = $7, "about" = $8
      WHERE "id" = $1;`,
      [id, user.homeaddress, user.city, user.age, user.phonenumber, user.imgurl, user.type, user.about]
    );
      console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// (firstname, lastname, mail, homeaddress,city,age,phonenumber,imgurl,type) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`,
// [user.firstname, user.lastname, user.mail, user.homeaddress, user.city, user.age, user.phonenumber, user.imgurl, user.type],

module.exports = {
  getAll: getAllUsers,
  getAllUsersProfile,
  getUserById,
  getUserProfileById,
  // DeleteUserById,
  createUser,
  // UpdateUserById,
  UpdateUserProfileById,
  loginUser,
};

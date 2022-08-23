const myDB = require('./init-DB')
const sql = require('mssql')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require('../config/token');

async function getAllUsers() {
    try {
        let pool = await sql.connect(myDB.sqlConfig);
        let users = await pool.request().query("SELECT * from SystemUsers");
        return users.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllUsersProfile() {
    try {
        let pool = await sql.connect(myDB.sqlConfig);
        let userProfile = await pool.request().query("SELECT * from Users");
        return userProfile.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getUserById(id) {
    try {
        let pool = await sql.connect(myDB.sqlConfig);
        let users = await pool.request()
        .input('id_parameter',sql.VarChar,id)
        .query("SELECT * from SystemUsers WHERE id = @id_parameter");
        return users.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getUserProfileById(id) {
    try {
        let pool = await sql.connect(myDB.sqlConfig);
        let user = await pool.request()
        .input('input_parameter',sql.VarChar,id)
        .query("SELECT * from Users WHERE id = @input_parameter");
        console.log(user.recordsets[0]);
        return user.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function DeleteUserById(id) {
    try {
        let pool = await sql.connect(myDB.sqlConfig);
        let user = await pool.request().
        input('id_parameter',sql.VarChar,id)
        .query("Delete from SystemUsers WHERE id = @id_parameter");
        return user.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function createUser(user) {
    try {
        let pool = await sql.connect(myDB.sqlConfig);
        let products = await pool.request()
        .input('Firstname_p', sql.VarChar, user.firstname)
        .input('Lastname_p', sql.VarChar, user.lastname)
        .input('Email_p', sql.VarChar, user.mail)
        .input('UserPassword_p', sql.VarChar, bcrypt.hashSync(user.password, 8))
        .query('INSERT INTO SystemUsers (Firstname, Lastname, Email, UserPassword) VALUES (@Firstname_p, @Lastname_p, @Email_p, @UserPassword_p)'); //run stored procedure that created by me
        return products.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function UpdateUserById(id, user) {
    try {
        let pool = await sql.connect(myDB.sqlConfig);
        let products = await pool.request()               
        .input('id_parameter',sql.Int, id)
        .input('Firstname_p', sql.VarChar, user.firstname)
        .input('Lastname_p', sql.VarChar, user.lastname)
        .input('Email_p', sql.VarChar, user.mail)
        .input('UserPassword_p', sql.VarChar, user.password)
        .query("UPDATE SystemUsers SET Firstname = @Firstname_p, Lastname = @Lastname_p, Email = @Email_p, UserPassword = @UserPassword_p WHERE id = @id_parameter");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function loginUser(req, res) {
    try {
        const {mail, password } = req.body;
        console.log(mail);
        console.log(password);
        // let pool = await sql.connect(myDB.sqlConfig);
        // let userProfile = await pool.request()
        // .input('Email_p',sql.VarChar, email)
        // .input('Password_p',sql.VarChar, password)
        // .query("SELECT * from SystemUsers WHERE Email = @Email_p and UserPassword = @Password_p");
        // return userProfile.recordsets[0];

        // let pool = await sql.connect(myDB.sqlConfig);
        // let userProfile = await pool.request()
        // .input('Email_p',sql.VarChar, mail)
        // .query("SELECT * from SystemUsers WHERE Email = @Email_p");
        myDB.client.query('SELECT * FROM system_users;', (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
            myDB.client.end();
          });
        console.log(userProfile);
        const user = userProfile.recordsets[0][0];
        console.log(user);
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(password, user.UserPassword);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        console.log(config);
        var token = jwt.sign({ id: user.id }, config.token);

        res.status(200).send({
            id: user.id,
            accessToken: token
        });
    }
    catch (error) {
        console.log(error);
    }
}

// TODO:: fileds names 
async function UpdateUserProfileById(id, user) {
    try {
        let pool = await sql.connect(myDB.sqlConfig);
        let products = await pool.request()               
        .input('id_parameter',sql.Int, id)
        .input('Firstname_p', sql.VarChar, user.firstname)
        .input('Lastname_p', sql.VarChar, user.lastname)
        .input('Email_p', sql.VarChar, user.mail)
        .input('HomeAddress_p', sql.VarChar, user.homeaddress)
        .input('City_p', sql.VarChar, user.city)
        .input('Age_p', sql.Int, user.zipcode)
        .input('PhoneNumber_p', sql.VarChar, user.phonenumber)
        .input('ImgUrl_p', sql.VarChar, user.imgurl)
        .query("UPDATE Users SET Firstname = @Firstname_p, Lastname = @Lastname_p, Email = @Email_p, HomeAddress = @HomeAddress_p, City = @City_p, Age = @Age_p, PhoneNumber = @PhoneNumber_p, ImgUrl = @ImgUrl_p WHERE id = @id_parameter");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
       

module.exports = {
    getAll: getAllUsers,
    getAllUsersProfile,
    getUserById,
    getUserProfileById,
    DeleteUserById,
    createUser,
    UpdateUserById,
    UpdateUserProfileById,
    loginUser
}
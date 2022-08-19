CREATE DATABASE Getsitter;
USE Getsitter;

CREATE TABLE SystemUsers (
id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
Firstname varchar(255),
Lastname varchar(255),
Email varchar(255),
UserPassword varchar(255),
);

CREATE TABLE Users (
id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
Firstname varchar(255),
Lastname varchar(255),
Email varchar(255),
HomeAddress varchar(255),
City varchar(255),
Age int,
PhoneNumber varchar(25), 
ImgUrl varchar(MAX),
);

DROP TABLE SystemUsers
DROP TABLE Users


INSERT INTO SystemUsers (Firstname, Lastname, Email, UserPassword) VALUES ('noa','kabessa','noa@gmail.com','noa123123');
INSERT INTO Users (Firstname, Lastname, Email,HomeAddress,City,Age,PhoneNumber,ImgUrl) VALUES ('yuval','kabessa','yuval@gmail.com','almog','tirat karmel','23','0529530132','https://variety.com/wp-content/uploads/2022/06/Untitled-15-6.jpg?w=681&h=383&crop=1');

SELECT * FROM [Getsitter].[dbo].[SystemUsers]
SELECT * FROM [Getsitter].[dbo].[Users]
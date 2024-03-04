const jwt = require("jsonwebtoken");
require("dotenv").config();

// Payload data
const user = {
  id: 1,
  username: "john_snow",
  email: "john.snow@goit.com",
};

// Secret key
const secretKey = process.env.API_SECRET_KEY;

// Sign the JWT
const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

// console.log(token);

const tokenGeneratedFromTasks = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU2MTY5YmMwMTAxNTVlNjdlODYyZGIiLCJpYXQiOjE3MDk1NzgwMTYsImV4cCI6MTcwOTU4MTYxNn0.xpNIGApH2tt4s_Xu9AxvHUiOpRTMKxMEj-q0CdxwNdw`;

// Verify the token
try {
  const decoded = jwt.verify(tokenGeneratedFromTasks, secretKey);
  console.log(decoded);
} catch (error) {
  console.error("Invalid or expired token:", error.message);
}

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0Lm1hcmVzQGdvaXQuY29tIiwiaWF0IjoxNzA5NTc0NDY1LCJleHAiOjE3MDk1NzgwNjV9.
VRyR-F6mswsikqjbauwraAbJlSlZuCjgqST64bDuSlU
*/

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0Lm1hcmVzQGdvaXQuY29tIiwiaWF0IjoxNzA5NTc0NjU3LCJleHAiOjE3MDk1NzgyNTd9.
FAnYWQLTO8f8L2pXZ--iW5rLiEPjLyDowIAsEa9ZQaA
*/

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0Lm1hcmVzQGdvaXQuY29tIiwiaWF0IjoxNzA5NTc0NzMxLCJleHAiOjE3MDk1NzgzMzF9.
ia2hQTl9b8-23oR56A9ugpxtLC1gXTlZN3xVIA498hs
*/

import jwt from "jsonwebtoken";

const payload: jwt.JwtPayload = {
  iss: "atchuhta57@gmail.com",
  sub: "Southlaw33",
};

const secretKey = "hello@1234";

const token = jwt.sign(payload, secretKey, {
  algorithm: "HS256",
  expiresIn: "7d",
});


console.log(token);
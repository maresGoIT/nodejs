---
title: NodeJS - Lesson 7
description: Lectia 7 - NodeJS - JWT Authentication
tags:
  - nodejs
  - learning
  - goit
---

# 📚 Introduction to JWT and Basic Implementation

## 🎯 Objective:

- Understand what JWT (JSON Web Tokens) is, its structure, and how it can be utilized for authentication and authorization in web applications.

---

## 🕒 Part 1: Understanding JWT

### 📚 Introduction to Authentication & Authorization

#### 🔐 Authentication

  - Verifying identity: "Who are you?"
  - Examples: Username/password, biometrics, MFA (Multi-Factor Authentication)

#### 🚪 Authorization

  - Determining access rights: "What can you do?"
  - Examples: Admin vs user permissions, access control lists

#### 🛂 What ways of authentication there are?

   1. **Basic Authentication** 🔑
      - **What It Is**: Sending username and password with each request.
      - **Ideal For**: Simple, internal applications.

  2. **OAuth** 🔄
      - **What It Is**: A standard for access delegation without sharing passwords.
      - **Ideal For**: "Login with Facebook/Google/etc." scenarios.

   3. **OpenID Connect** 🆔
      - **What It Is**: Builds on OAuth 2.0 for user authentication.
      - **Ideal For**: Single Sign-On (SSO) across applications.

  4. **SAML (Security Assertion Markup Language)** 📄
      - **What It Is**: Exchanging auth and authorization data in XML format.
      - **Ideal For**: Enterprise-level SSO.
 
  5. **API Keys** 🔐
      - **What It Is**: Unique identifiers for API access control.
      - **Ideal For**: Managing access to APIs.
 
  6. **Multi-Factor Authentication (MFA)** 🚦
      - **What It Is**: Using multiple methods to verify identity.
      - **Ideal For**: Enhancing login security.

  7. **Biometric Authentication** 👤
      - **What It Is**: Using biological traits (fingerprint, face) for verification.
      - **Ideal For**: High-security access and mobile security.
 
  8. **Certificate-Based Authentication** 📜
      - **What It Is**: Using digital certificates for identification.
      - **Ideal For**: Secure network access (VPN, Wi-Fi).

   9. **WebAuthn (Web Authentication)** 🔒
      - **What It Is**: Passwordless or 2FA authentication for the web.
      - **Ideal For**: Modern web apps aiming for improved security and UX.

  10. **JWT (JSON Web Tokens)** 📲
      - **What It Is**: Compact, URL-safe tokens to securely transmit information between parties.
      - **Ideal For**: Authenticated and information exchange in web applications.

#### 🔑 Role of Tokens
  - Securely proving identity and permissions
  - Reduces need to repeatedly transmit credentials

### 🛠 What are JSON Web Tokens?

#### JWT Components

- **🗂 Header**: Token type + algorithm (e.g., HS256)

```bash
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- **📄 Payload**: Claims (user data + metadata)

```bash
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

- **✍️ Signature**: Encoded header + payload, signed

The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

### Example JWT

Putting it all together, a JWT might look like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

This string is a JWT, where:

- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` is the Base64Url encoded Header,
- `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9` is the Base64Url encoded Payload,
- `TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ` is the Signature.

Each part is distinctly separated by dots. While the header and payload are Base64Url encoded and can be easily decoded, the signature ensures the security of the data, verifying that it hasn't been tampered with.

- **🔧 Mechanics**:

  - Compact, URL-safe format
  - Encoded for transport, not encrypted
  - Verifiable with a digital signature

- **🔒 Security Benefits**:

  - Ensures data integrity and authentication
  - Can be encrypted for confidentiality

- **💡 Use Cases**:
  - **🚧 Authorization**: Token required for access control
  - **🔁 Information Exchange**: Securely sharing data between parties

---

## 🔑 Part 2: JWT Encoding/Decoding

This will guide you through the process of using the `jsonwebtoken` npm package for crafting, decoding, and verifying a JWT in a Node.js environment. This example assumes you have Node.js and npm installed on your system.

### 1. Installation of `jsonwebtoken`

First, you need to add the `jsonwebtoken` package to your project. Run the following command in your terminal within your project directory:

```bash
npm install jsonwebtoken
```

This command installs the `jsonwebtoken` package and adds it to your project's dependencies, making it available for use in your application.

### 2. Encoding a Payload into a JWT

Once `jsonwebtoken` is installed, you can use it to create (sign) a JWT. Here's a simple example of how to encode a payload into a JWT:

```javascript
const jwt = require("jsonwebtoken");

// Payload data
const user = {
  id: 1,
  username: "johndoe",
  email: "john.doe@example.com",
};

// Secret key
const secretKey = "your-256-bit-secret";

// Sign the JWT
const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

console.log(token);
```

This script demonstrates how to sign a JWT. The `jwt.sign()` method takes three arguments:

- The payload (user data in this case),
- A secret key for signing the token,
- Options, where you can set things like the token's expiration.

### 3. Decoding and Verifying a JWT

To decode and verify a JWT, ensuring it was signed with the correct secret key and hasn't been tampered with, you can use the `jwt.verify()` method. Here’s how:

```javascript
const jwt = require("jsonwebtoken");

// The JWT from the previous step
const token = "..."; // Use the token you got from the signing step

// Secret key (must be the same as used for signing)
const secretKey = "your-256-bit-secret";

// Verify the token
try {
  const decoded = jwt.verify(token, secretKey);
  console.log(decoded);
} catch (error) {
  console.error("Invalid or expired token:", error.message);
}
```

This script demonstrates how to verify a JWT using the `jwt.verify()` method. It takes two arguments:

- The token to verify,
- The secret key used to sign the token.

If the verification is successful, it will return the decoded payload. Otherwise, it will throw an error, for example, if the token is invalid or expired.

### Importance of Secret Keys

The secret key used to sign the token is crucial for its security. It ensures that only parties with access to the secret can generate or verify tokens, preventing unauthorized creation or alteration of the tokens. Always keep your secret keys secure and never expose them in your client-side code or version control systems.

### Step 4: Verifying a JWT

1. **Verification**:
   - Explain the significance of verifying tokens.
   - Use `jwt.verify(token, secretKey, callback)` to decode and verify the token.
   ```javascript
   try {
     const decoded = jwt.verify(token, "secret");
     console.log(decoded);
   } catch (error) {
     console.error("Token verification failed:", error.message);
   }
   ```
2. **Error Handling**:
   - Demonstrate how to handle errors (e.g., token expired, invalid signature).
3. **Security Tips**:
   - Stress the importance of keeping the secret key secure.
   - Discuss potential security risks and best practices (e.g., not storing sensitive information in the payload).

---

## 🚀 Part 3: Implementing Basic JWT Authentication in Express

Here are the steps required to implement basic JWT authentication in an Express app using ES6 imports, along with MongoDB Atlas for the database, Morgan for logging HTTP requests, and CORS for cross-origin resource sharing, follow this step-by-step guide. This setup assumes you are familiar with Express and have Node.js installed.

### Step 1: Setup Your Express App with Express Generator

1. **Install Express Generator Globally**: If you haven't already, install the Express Generator tool globally with npm to scaffold your project quickly.

   ```bash
   npm install -g express-generator
   ```

2. **Create Your Express App**: Use the Express Generator to create your app skeleton. Here, we'll use the `--no-view` option since this guide focuses on an API.

   ```bash
   express --no-view myExpressApp
   cd myExpressApp
   ```

3. **Update to Use ES6 Imports**: Modify your Express app to use ES6 imports. You'll need to change your `package.json` to include `"type": "module"` which allows the use of ES6 `import` and `export` syntax in your project.

   ```json
   {
     "name": "my-express-app",
     "version": "0.0.0",
     "private": true,
     "type": "module",
     ...
   }
   ```

### Step 2: Install Dependencies

Install necessary packages including `jsonwebtoken` for JWT handling, `mongoose` for MongoDB interactions, `morgan` for logging, and `cors` for enabling CORS.

```bash
npm install jsonwebtoken mongoose morgan cors dotenv
```

### Step 3: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas Account**: If you don't have one, sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a cluster.

2. **Connect Your Cluster**: In your Atlas dashboard, find the connection string to connect your application to your MongoDB cluster. Remember to replace `<password>` with your database user's password and `myFirstDatabase` with your database name.

3. **Configure Environment Variables**: Use the `dotenv` package to manage your environment variables. Create a `.env` file in your project root and add your MongoDB URI and a secret key for JWT.

   ```
   DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   ```

### Step 4: Implement JWT Authentication

1. **Configure Mongoose**: Create a `models/User.js` file to define your user model.

   ```javascript
   import mongoose from "mongoose";

   const userSchema = new mongoose.Schema({
     username: { type: String, required: true, unique: true },
     password: { type: String, required: true }, // In a real app, hash passwords
   });

   export const User = mongoose.model("User", userSchema);
   ```

2. **Set Up Authentication Routes**: Create an `auth.js` file in a `routes` directory for your signup and login routes.

   ```javascript
   import express from "express";
   import jwt from "jsonwebtoken";
   import { User } from "../models/User.js";
   import dotenv from "dotenv";

   dotenv.config();
   const router = express.Router();

   // Signup route
   router.post("/signup", async (req, res) => {
     // Implement signup logic
   });

   // Login route
   router.post("/login", async (req, res) => {
     // Implement login logic
   });

   export default router;
   ```

3. **Implement Signup and Login Logic**:

First, ensure you have `bcrypt` installed for password hashing:

```bash
npm install bcrypt
```

Here's a simplified example of how you might implement the signup and login logic in your `auth.js` file:

```javascript
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("Error creating the user");
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send("Login error");
  }
});

export default router;
```

### Key Points:

- **Signup**: When a user signs up, their password is hashed using `bcrypt` before being stored in the database. This ensures that plain text passwords are never stored, enhancing security.
- **Login**: During the login process, the provided password is compared against the stored hashed password using `bcrypt.compare()`. If the credentials are valid, a JWT is signed with `jwt.sign()` and sent back to the user. This token contains the user's ID (`userId`) and an expiration time (`expiresIn`).
- **Environment Variables**: The JWT secret key used for signing tokens is stored in an environment variable (`JWT_SECRET`). It's crucial to keep this key secure and not hard-code it in your application.
- **Error Handling**: Basic error handling is implemented, responding with appropriate status codes and messages for different failure conditions (e.g., user not found, incorrect password, etc.).

4. **Protect Routes Using Middleware**:
   To protect routes in your Express application and ensure they require a valid JWT for access, you can create a middleware function that verifies the JWT.

This middleware will check the `Authorization` header of incoming requests for a JWT, verify it, and allow access to the protected route if the token is valid. Here's how you can implement such a middleware using ES6 import/export syntax:

```javascript
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  // Get token from the Authorization header
  // Format of header is "Bearer <token>"
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, jwtSecret, (err, authData) => {
      if (err) {
        res.sendStatus(403); // Forbidden
      } else {
        req.user = authData;
        next();
      }
    });
  } else {
    // Unauthorized
    res.sendStatus(401);
  }
};

export default verifyToken;
```

### How to Use the Middleware

To use this middleware, import it into the file where you define your routes and apply it to any route you wish to protect. For example:

```javascript
import express from "express";
import verifyToken from "./path/to/your/middleware/verifyToken.js";

const router = express.Router();

// Example of a protected route
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This route is protected", user: req.user });
});

export default router;
```

### Explanation

- **Middleware Function `verifyToken`**: This function checks for a token in the `Authorization` header of the request. It expects the header to follow the format `Bearer <token>`. If the token is found, it attempts to verify it using `jwt.verify()` with the secret key.
- **Token Verification**: If the token is valid, the payload of the token (`authData`) is attached to `req.user`, and the request is allowed to proceed to the next middleware or route handler. If verification fails (e.g., token is expired or invalid), an appropriate HTTP status code (401 Unauthorized or 403 Forbidden) is sent back.
- **Applying the Middleware**: By applying the `verifyToken` middleware to a route, you are effectively protecting that route. Only requests with a valid JWT will be able to access the route.

This setup provides a basic yet effective way to secure routes in your Express application, ensuring that only authenticated users can access certain endpoints.

### Step 5: Integrate Middleware and Start the Server

1. **Use Morgan and CORS Middleware**: In your `app.js`, import and use `morgan` and `cors`.

   ```javascript
   import logger from "morgan";
   import cors from "cors";

   app.use(logger("dev"));
   app.use(cors());
   ```

2. **Connect to MongoDB and Use Routes**: Ensure your app connects to MongoDB at startup and uses your authentication routes.

3. **Start Your Server**: Run your server with `npm start` and test your authentication flow.

This setup provides a basic JWT authentication system in an Express app, leveraging MongoDB Atlas for storage, and incorporates best practices like environmental variables for configuration. Remember, for production applications, you should also implement password hashing and validation.

---

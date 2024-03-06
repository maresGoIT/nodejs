---
title: NodeJS - Lesson 8
description: 
tags:
  - 
---
# Lesson 8: Advanced JWT Strategies🔒

#### Objective:

Dive deeper into JWT strategies, including token storage and handling, and implementing a registration route and secure route access.

---

## Part 1: 🛡 JWT Strategy for Authentication

Today, we'll delve into how we can securely store and manage JSON Web Tokens (JWTs) 🗝 in our client applications. Understanding the implications of different storage strategies and how to handle token expiration effectively is crucial.

### Storing JWTs in a Client Application

When storing JWTs, we have two common options: **LocalStorage** and **Cookies**. Let's compare them:

#### LocalStorage 📦

- **Pros**:
  - Simple to implement. Easy access via JavaScript on the same domain.

- **Cons**:
  - Vulnerable to Cross-Site Scripting (XSS) attacks 🕸. If an attacker executes JavaScript on your site, they can access the tokens.

#### Cookies 🍪

- **Pros**:
  - Can be made `HTTPOnly`, inaccessible via JavaScript, reducing XSS risks.
  - Can be flagged as `Secure`, ensuring transmission over HTTPS only.

- **Cons**:
  - Must be protected against Cross-Site Request Forgery (CSRF) attacks 🛡.
  - Requires careful configuration for secure management.

### Handling JWT Expiration and Renewal ⏳

- **Expiration**: Set an expiration on tokens to minimize compromise impact. Prefer short-lived tokens for security.
- **Renewal**: Use refresh tokens securely stored on the client side. They help in obtaining new JWTs upon the current ones' expiration, ensuring uninterrupted user sessions.

## Security Considerations

Security in handling JWTs is paramount. Let's cover common pitfalls and essential best practices.

### Common Security Pitfalls

- **Not Using HTTPS 🔒**: Always encrypt data in transit to protect it from eavesdropping.
- **Exposure to XSS Attacks 🕸**: Storing JWTs in LocalStorage increases risk. Sanitize input/output to mitigate these threats.

### Best Practices for Secure JWT Usage

1. **Enforce HTTPS 🔒**: Ensure all data transmissions are encrypted.
2. **Use `HTTPOnly` and `Secure` Cookies 🍪**: Protect tokens from JavaScript access and ensure secure transmission.
3. **Implement Short-Lived Tokens ⌛**: Limits the usability window of compromised tokens.
4. **Sanitize Data 🧹**: Prevent both injection and XSS attacks.
5. **Strict CORS Policy 🚧**: Control which domains can access your resources.
6. **Refresh Token Rotation 🔁**: Change refresh tokens upon each use to limit compromise damage.

---
## Part 2: Refresh Tokens

### Understanding Refresh Tokens 🤔

In modern web development, keeping user sessions secure and efficient is essential. Here’s where **Refresh Tokens** come into play.

#### What Are Refresh Tokens? 🧩

While **Access Tokens** are short-lived and grant access to resources, **Refresh Tokens** are longer-lived and used to get new Access Tokens when they expire. This approach helps improve security and user experience by reducing the need for frequent logins.

### The Dual-Token Strategy 🛡

1. **Access Token**: Expires quickly to minimize risk if compromised.
2. **Refresh Token**: Lasts longer and is used to request new Access Tokens. It's more secure and can be invalidated if needed.

### Implementing Refresh Token Flow 🏗

Let’s integrate a refresh token flow in an Express app, assuming you already have a basic authentication setup.

#### Step 1: Issuing Tokens 🎟

When users log in, give them both an Access Token and a Refresh Token:

```javascript
const accessToken = generateAccessToken(user); // Short expiration
const refreshToken = generateRefreshToken(user); // Longer expiration
```

**Where to Store the Refresh Token?**

Store the Refresh Token in your database linked to the user. This is crucial for validating the token later and issuing new Access Tokens when needed.

#### Step 2: Using Refresh Tokens 🔁

When the Access Token is about to expire, the client requests a new one using the Refresh Token:

```javascript
app.post('/token', (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  const storedToken = findRefreshToken(token); // Function to find the token in DB
  if (!storedToken) return res.sendStatus(403);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});
```

#### Step 3: Token Expiry and Revocation 🚫

- **Expiry**: Refresh Tokens should have an expiration or be rotated regularly for better security.
- **Revocation**: Allow revoking Refresh Tokens when users log out or change their passwords.

#### Security Considerations 🔒

- Store Refresh Tokens securely in your database.
- Use HTTPOnly cookies for storing Refresh Tokens if you're sending them via browser to protect against XSS attacks.
- Protect against CSRF attacks when using cookies to store tokens.

### Real-World Example: Token Rotation 🔄

With token rotation, you issue a new Refresh Token each time an Access Token is refreshed, invalidating the old Refresh Token. This limits the lifespan of any token, enhancing security.

```javascript
app.post('/token', (req, res) => {
  // Verify the old refresh token...
  
  // If valid, generate new tokens...
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  
  // Replace the old refresh token with the new one in DB...
  
  // Send back the new tokens...
});
```

---

## Part 3: Implementing a Registration Route

In this section, we'll tackle the creation of a user registration route in an Express application, a crucial step in securing our application and providing a seamless user experience. 

The focal point will be not just on user creation but also on the secure handling of user credentials and the issuance of a JWT upon successful registration. Let’s dive into the details.

### User Registration and Token Issuance 🚀

#### Live Coding: Implement a Registration Route

- **Objective**: Create a route that allows new users to register. Upon successful registration, the user should be stored in the database with a hashed password, and a JWT should be issued to the user.

- **Steps**:
  1. **Set Up User Model**: Ensure you have a User model that includes fields for username, email, and password.
  2. **Create the Route**: Set up a POST route `/register` that will handle new user registrations.
  3. **Hash Passwords**: Utilize `bcrypt` to hash passwords before they are stored in the database.
  4. **Save the User**: If the user does not already exist, save the user to the database.
  5. **Issue JWT**: Once the user is successfully created, issue a JWT that can be used for authentication in subsequent requests.

- **Example Code**:

  ```javascript
  const express = require('express');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const User = require('../models/User'); // Assuming you have a User model set up
  const router = express.Router();

  router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).send('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).send({ token });
    } catch (error) {
      res.status(500).send('Error registering new user');
    }
  });

  module.exports = router;
  ```

#### Discuss the Importance of Hashing Passwords Before Storage 🔐

- **Security Measure**: Hashing passwords is a critical security measure. It ensures that even if the data is compromised, the actual passwords are not exposed.
- **One-Way Process**: Hashing is a one-way process; you cannot retrieve the original password from the hash. This adds a layer of security in case of data breaches.
- **bcrypt**: A widely used library that provides a strong mechanism for hashing passwords. It also offers salting to further protect against rainbow table attacks.

### Key Takeaways

Implementing a secure registration route is fundamental to any application that handles user data. Hashing passwords before storage is non-negotiable for securing user credentials, and issuing JWTs upon registration integrates seamlessly with the token-based authentication system we are building. This approach not only protects our users but also lays the groundwork for a robust and secure authentication system.

---

## Part 4: Full Authentication Flow in an Express App 🚀

Dive deep into the authentication journey, from obtaining tokens to securing your routes!

### Obtaining a Token for Authorization 🗝 (25 minutes)

#### 🔑 Revisiting the Login Route

Let's recap how users, after registering, can log in to receive a JWT:
- **Login Endpoint**: A POST request where users send their credentials.
- **Credential Verification**: Server checks against stored, hashed passwords.
- **Token Hand-off**: Successful login leads to JWT issuance.

#### 📬 Sending the JWT to Access Protected Routes

JWTs can be delivered in several manners, with the main contenders being:
- **Headers**: Commonly using `Authorization: Bearer <token>`.
- **Cookies**: An HTTPOnly cookie can carry the JWT, shielding it from XSS attacks.

### Implementing a "Route Closed" Strategy 🚧

#### Step 1: Create Your Middleware

First, ensure you have your middleware ready. For our example, let's use the `protectRoute` middleware we defined for JWT authentication:

```javascript
// authMiddleware.js
const jwt = require('jsonwebtoken');

const protectRoute = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1]; // Extracting the token

  if (!token) {
    return res.status(401).send('🚫 Access Denied: No token provided!');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('🚫 Invalid token.');
  }
};

module.exports = protectRoute;
```

#### Step 2: Import Your Middleware

Next, you'll want to import your middleware into the file where you're setting up your routes. This is typically done in the `routes` directory. For example, if you want to protect a route defined in `users.js`, you would do the following:

```javascript
const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/authMiddleware'); // Adjust the path as necessary

// Other imports or code...
```

#### Step 3: Use the Middleware in Your Routes

Now, apply the middleware to the routes you wish to protect. You can do this by passing the middleware function as an argument to the route handler, before defining the final function that handles the request.

For a specific route:

```javascript
// Using protectRoute middleware on a specific protected route
router.get('/profile', protectRoute, (req, res) => {
  res.send('Welcome to Your Profile');
});
```

Or for all routes in a router:

```javascript
// Applying protectRoute middleware to all routes in this router
router.use(protectRoute);

router.get('/profile', (req, res) => {
  res.send('Welcome to Your Profile');
});

// Define more protected routes here...
```

#### Step 4: Integrate Middleware Globally (Optional)

If you want your middleware to run for every request in your application, you can integrate it globally using `app.use()` in your main `app.js` (or `server.js`, depending on your setup) file:

```javascript
const protectRoute = require('./middleware/authMiddleware'); // Adjust the path as necessary

// After other app.use() calls for built-in middleware like express.json()
app.use(protectRoute);

// Now, every route after this app.use(protectRoute) call is protected
```

#### Step 5: Logout Route
Implementing a logout route typically involves invalidating the current user's session or tokens. Since JWTs are stateless and can't be invalidated directly in the same way traditional session tokens can be, the process usually involves client-side actions and, optionally, server-side handling if refresh tokens are stored in a database. Here's a basic approach to handle logout with both client and server considerations:

**Assuming Use of Refresh Tokens Stored in Database**

If you're using refresh tokens and storing them in a database, the logout route can remove the refresh token, effectively logging the user out by preventing further access token renewals.

**Server-Side: Express Route for Logout**

```javascript
app.post('/logout', async (req, res) => {
  // Assuming the refresh token or user's identifier is sent with the request
  const { token } = req.body;

  try {
    // Here you'd remove the refresh token from the database
    // This is a placeholder function, replace with your actual database call
    await removeRefreshTokenFromDB(token);

    res.status(204).send(); // No Content, indicating the logout was successful
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
```

In this example, `removeRefreshTokenFromDB(token)` represents a function you would implement to remove the token from wherever it's stored, such as a database. This effectively prevents the token from being used again to generate new access tokens.

#### Client-Side Considerations

On the client side, logging out generally involves clearing the stored access and refresh tokens, which might be stored in local storage, session storage, or cookies, depending on your application's architecture.

**Example: Clearing Tokens Stored in Local Storage**

```javascript
function logoutUser() {
  // Clear tokens from local storage or cookies
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  // Optionally, make a request to the server to invalidate the refresh token
  fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  })
  .then(() => {
    // Handle post-logout logic, like redirecting to the login page
  })
  .catch((error) => {
    console.error('Logout failed', error);
  });
}
```

This function removes the tokens from local storage and makes a POST request to the server's `/logout` route to ensure the refresh token is invalidated server-side. After calling this function, you would typically redirect the user to the login page or another public page.

#### Testing and Debugging: The Full Cycle 🔄

- **Sign Up 📝**: Register and securely store user details.
- **Log In 🔓**: Validate credentials to dispense a JWT.
- **Protected Access 🛂**: Use the JWT for entering secure zones.
- **Error Handling 🐞**: Showcase handling login mishaps and unauthorized entries.

### Key Insights

Crafting a thorough authentication flow in an Express app is pivotal for secure and effective user session management. Our exploration covers not just the mechanics of JWTs but also emphasizes secure practices and meticulous error handling to enhance user interaction. Get ready to empower your applications with solid authentication foundations! 🌟

---

## Conclusion 

We've covered a lot today, from **securely storing user credentials**, issuing **JWTs**, to protecting routes in our Express app. We've seen how **middleware** plays a crucial role in our security strategy and the importance of **best practices** like using HTTPS and handling tokens securely.
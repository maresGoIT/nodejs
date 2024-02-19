---
title: NodeJS - Lesson 3
description: Lectia 3 - NodeJS - Express Framework
tags:
  - nodejs
  - learning
  - goit
---
# Introduction to Express Framework 💻

## Outline

1. **Introduction to Express Framework**
2. **Understanding Middleware**
3. **Data Transfer to the Server**
4. **Routing in Express**
5. **Hands-On Practice**
6. **Wrap-Up**

---

## Introduction to Express Framework (15 minutes)

### What is Express.js and its Role in Node.js Applications?

Express.js is a minimalist web application framework for Node.js, designed to make building web applications and APIs easier and more efficient. It provides a robust set of features for web and mobile application development. 

Express.js simplifies the process of handling HTTP requests, routing, middleware integration, and more, allowing developers to focus on building the core functionality of their applications.

### Advantages of Using Express for Server-side Development

- **Simplicity:** Express.js provides a simple and minimalistic framework that is easy to learn and use, making it ideal for both beginners and experienced developers.
- **Flexibility:** It offers a wide range of features and middleware that can be easily integrated into applications, allowing developers to customize their applications according to specific requirements.
- **Performance:** Express.js is lightweight and fast, with minimal overhead, making it suitable for building high-performance web applications and APIs.
- **Community and Ecosystem:** It has a large and active community of developers, along with a vast ecosystem of plugins, middleware, and extensions that extend its functionality and capabilities.
- **Scalability:** Express.js is highly scalable and can be used to build both small-scale and large-scale applications, making it a popular choice for startups and enterprise-level projects alike.

### How to Install Express?

To install Express.js in a Node.js project, you can use npm (Node Package Manager), which is a package manager for Node.js. Here's how to install Express.js via npm.

Assuming you’ve already installed Node.js, create a directory to hold your application, and make that your working directory.
~~~~ bash
mkdir myapp
cd myapp
~~~~

Use the npm init command to create a package.json file for your application. For more information on how package.json works, see Specifics of npm’s package.json handling.

~~~ bash
npm init
~~~

This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

**entry point: (index.js)**

Enter app.js, or whatever you want the name of the main file to be. If you want it to be index.js, hit RETURN to accept the suggested default file name.

Now install Express in the myapp directory and save it in the dependencies list. For example:

```bash
npm install express
```

This command will install the latest version of Express.js and its dependencies in your Node.js project's `node_modules` directory.

### Brief Overview of Core Features of Express

- **Routing:** Express.js provides a powerful routing system that allows developers to define routes for handling HTTP requests (GET, POST, PUT, DELETE, etc.) and mapping them to specific handler functions.
- **Middleware:** Middleware functions are functions that have access to the request and response objects (req, res) and can modify them or perform additional tasks before passing them to the next middleware function in the chain. Express.js allows developers to use middleware for tasks such as logging, authentication, error handling, etc.
- **Template Engines:** Express.js supports various template engines (such as EJS, Pug, Handlebars, etc.) that allow developers to generate dynamic HTML content and render views on the server.
- **Error Handling:** Express.js provides built-in error handling middleware and allows developers to define custom error handling middleware for handling errors in their applications.
- **Static File Serving:** Express.js allows developers to serve static files (such as HTML, CSS, JavaScript, images, etc.) from a directory on the server using the `express.static` middleware.

Express.js combines these core features to provide a robust and efficient framework for building web applications and APIs in Node.js.

---

## Understanding Middleware (20 minutes)

### Definition and its role

Middleware in Express.js refers to functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle. 

Middleware functions can perform tasks such as modifying request and response objects, executing additional code, terminating the request-response cycle, or passing control to the next middleware function in the stack.

The primary role of middleware in Express applications is to enhance and modify the behavior of HTTP requests and responses. Middleware functions are executed sequentially in the order they are defined, allowing developers to modularize application logic, handle common tasks, and add functionality to specific routes or the entire application.

### Concept of Middleware Chaining

Middleware chaining in Express involves composing multiple middleware functions together to form a chain, where each middleware function is executed sequentially in the order they are defined. 

When an HTTP request is made to an Express application, it traverses through the middleware stack, with each middleware function having the option to modify the request, response, or pass control to the next middleware function.

Middleware chaining allows developers to break down complex application logic into smaller, reusable components, making code more maintainable and organized. It also provides a flexible and extensible architecture for adding new functionality to the application.

### Common Use Cases for Middleware:

- **Logging:** Middleware functions can log information about incoming requests, including request method, URL, headers, and timestamps. Logging middleware is useful for monitoring application activity, debugging, and performance analysis.
  
- **Error Handling:** Middleware functions can catch and handle errors that occur during the execution of the request-response cycle. Error handling middleware can log errors, customize error responses, and gracefully terminate the request-response cycle.
  
- **Authentication and Authorization:** Middleware functions can implement authentication and authorization mechanisms to restrict access to certain routes or resources based on user authentication status, roles, or permissions.
  
- **Request Parsing:** Middleware functions can parse incoming request data (e.g., JSON, URL-encoded data, multipart form data) and make it accessible to route handlers for processing.
  
- **Caching:** Middleware functions can implement caching mechanisms to cache responses from certain routes or API endpoints, reducing response times and server load.
  
### How to Create and Use Middleware Functions in Express

In this example, the `loggerMiddleware` function logs information about incoming requests, while the `errorHandlerMiddleware` function handles errors that occur during the execution of the request-response cycle. These middleware functions are registered using the `app.use()` method and executed for every incoming request.

```javascript
// Example of a logging middleware function
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware function
};

// Example of an error handling middleware function
const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
};

// Register middleware functions in Express application
const express = require('express');
const app = express();

// Use logging middleware
app.use(loggerMiddleware);

// Define routes and route handlers
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Use error handling middleware
app.use(errorHandlerMiddleware);

// Start the Express server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

---

## Data Transfer to the Server

### Methods for Transferring Data from Clients to the Server

- **Query Parameters:** Query parameters are key-value pairs appended to the end of a URL after a question mark (`?`). They are typically used for passing simple data from clients to the server in GET requests. For example, in the URL `http://example.com/api/users?id=123`, the query parameter `id` has the value `123`.

- **Request Body:** Request body is data sent by the client to the server in the body of an HTTP request message. It is commonly used for sending complex or larger amounts of data in POST requests, but can also be used in other HTTP methods like PUT and DELETE. Data in the request body can be in various formats such as JSON, form data, or binary data.

### Handling Data in Express Routes

Express provides us with some nice tools to handle data in routes. In this example:
- `req.query` is used to access query parameters in a GET request (`/api/users?id=123`).
- `req.params` is used to access route parameters in a GET request (`/api/users/123`).
- `req.body` is used to access data sent in the request body of a POST request.

```javascript
const express = require('express');
const app = express();

// Route handling for GET request with query parameters
app.get('/api/users', (req, res) => {
    const userId = req.query.id;
    res.send(`User ID: ${userId}`);
});

// Route handling for GET request with route parameters
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});

// Route handling for POST request with request body
app.post('/api/users', (req, res) => {
    const { username, email } = req.body;
    // Process the received data
    res.send(`Username: ${username}, Email: ${email}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

### Differences Between `GET` and `POST` Requests for Data Transfer

- **GET Requests:** GET requests are used to retrieve data from the server. Data is appended to the URL as query parameters, visible to users, and have length limitations. They are **idempotent**, meaning multiple identical requests should have the same effect as a single request. GET requests should not be used for sending sensitive data.

- **POST Requests:** POST requests are used to submit data to be processed to the server. Data is sent in the request body, not visible in the URL, and have no length limitations. They are not idempotent and are suitable for sending sensitive data like passwords.
---

## Routing in Express
### Concept of Routing and its Importance in Web Applications

Routing in web applications refers to the process of determining how an application responds to client requests to different URLs (Uniform Resource Locators). It defines the mapping between URLs and the actions to be taken by the server in response to those URLs. 

Routing is essential in web applications because it allows developers to create multiple pages or endpoints, each serving a specific purpose or content. It enables navigation between different views and defines the structure and behavior of the application's user interface.

Routing helps organize code and functionality logically, making it easier to maintain and scale web applications. It also enables the implementation of features such as authentication, authorization, and error handling based on the requested URL.

### How to Define Routes in an Express Application


In this example:
- `app.get()`, `app.post()`, `app.put()`, and `app.delete()` are methods provided by Express to define routes for handling different HTTP methods (GET, POST, PUT, DELETE) respectively.
- The first argument to these methods is the URL path pattern, and the second argument is the callback function that defines the behavior of the route.

```javascript
const express = require('express');
const app = express();

// Define a route for handling GET requests
app.get('/api/users', (req, res) => {
    res.send('GET request to /api/users');
});

// Define a route for handling POST requests
app.post('/api/users', (req, res) => {
    res.send('POST request to /api/users');
});

// Define a route for handling PUT requests
app.put('/api/users/:id', (req, res) => {
    res.send(`PUT request to /api/users/${req.params.id}`);
});

// Define a route for handling DELETE requests
app.delete('/api/users/:id', (req, res) => {
    res.send(`DELETE request to /api/users/${req.params.id}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

### Route Parameters and How to Access Them in Express Routes

Route parameters are placeholders in the route pattern that capture values from the URL and make them accessible in the route handler. Route parameters are defined by prefixing a colon (`:`) to the parameter name in the route pattern.

In this example, `:id` is a route parameter that captures the value from the URL. Route parameters are accessed using `req.params.<parameterName>` in the route handler function.

```javascript
// Define a route with a route parameter
app.get('/api/users/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});
```

### Examples of Route Organization and Separation of Concerns

Route organization and separation of concerns involve grouping related routes and handlers into separate modules or files to keep the codebase organized and maintainable. This can be achieved using Express's Router middleware.

In this example, user-related routes are defined in a separate module (`routes/users.js`). The routes are then mounted in the main Express application (`app.js`) using `app.use()`, with a base URL prefix (`/users`). This approach helps keep the codebase modular, facilitates team collaboration, and improves code readability and maintainability.

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

// Define routes for handling user-related requests
router.get('/', (req, res) => {
    res.send('Get all users');
});

router.post('/', (req, res) => {
    res.send('Create a new user');
});

router.get('/:id', (req, res) => {
    res.send(`Get user with ID: ${req.params.id}`);
});

module.exports = router;
```

```javascript
// app.js
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();

// Mount the users router at the /users route
app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

---

## Hands-On Practice
**Guided Exercise: Building a Simple Express Application**

**Objective:** 
Create a basic Express application that includes middleware for logging requests and errors, as well as routes for handling different HTTP methods and data transfer.

**Instructions:**

1. **Setup:**
   - Ensure that Node.js and npm are installed on your computer.
   - Create a new directory for the project and navigate into it.
   - Initialize a new Node.js project using `npm init -y`.
   - Install Express.js using `npm install express`.

2. **Project Structure:**
   - Create the following directory structure:
     ```
     project/
     ├── app.js
     ├── middleware/
     │   └── logger.js
     └── routes/
         └── users.js
     ```
   
3. **Middleware for Logging:**
   - Create a `logger.js` file in the `middleware` directory.
   - Inside `logger.js`, implement middleware for logging requests to the console:
     ```javascript
     // middleware/logger.js
     const loggerMiddleware = (req, res, next) => {
         console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
         next();
     };

     module.exports = loggerMiddleware;
     ```
   - This middleware will log the timestamp, HTTP method, and URL of each incoming request.

4. **Routes:**
   - Create a `users.js` file in the `routes` directory.
   - Inside `users.js`, define routes for handling different HTTP methods and data transfer:
     ```javascript
     // routes/users.js
     const express = require('express');
     const router = express.Router();

     // GET /users
     router.get('/', (req, res) => {
         res.send('Get all users');
     });

     // POST /users
     router.post('/', (req, res) => {
         res.send('Create a new user');
     });

     // GET /users/:id
     router.get('/:id', (req, res) => {
         res.send(`Get user with ID: ${req.params.id}`);
     });

     module.exports = router;
     ```

5. **Express Application:**
   - Create an `app.js` file in the project root directory.
   - Inside `app.js`, set up the Express application, apply middleware for logging, and define routes:
     ```javascript
     // app.js
     const express = require('express');
     const loggerMiddleware = require('./middleware/logger');
     const usersRouter = require('./routes/users');

     const app = express();

     // Apply middleware for logging
     app.use(loggerMiddleware);

     // Define routes
     app.use('/users', usersRouter);

     const PORT = process.env.PORT || 3000;
     app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
     });
     ```

6. **Testing:**
   - Run the Express application by executing `node app.js` in the terminal.
   - Use tools like cURL, Postman, or a web browser to send requests to the defined routes (`/users`, `/users/:id`) with different HTTP methods (GET, POST).
   - Observe the logged requests in the console and verify that the correct route handlers are invoked.

---

## Conclusion

### Key Concepts Covered in the Lesson

1. **Express.js Framework:** We learned about Express.js, a minimalist web application framework for Node.js, and its role in building web applications and APIs.

2. **Middleware:** The concept of middleware in Express.js was explained, including its role in processing HTTP requests and responses, middleware chaining, and common use cases such as logging and error handling.

3. **Data Transfer Methods:** Different methods for transferring data from clients to the server were discussed, including query parameters and request body.

4. **Routing:** Routing in Express.js was covered, including its importance in web applications, defining routes using `app.get()`, `app.post()`, etc., handling route parameters, and organizing routes for separation of concerns.

### Further Exploration

Explore more advanced features of Express.js on your own, such as:

- **Middleware Libraries:** Exploring and integrating third-party middleware libraries for authentication, authorization, validation, compression, etc.
  
- **Routing Techniques:** Experimenting with route grouping, route prefixing, and nested routing for better organization of routes.
  
- **Error Handling:** Implementing more sophisticated error handling strategies, such as centralized error handling middleware and custom error classes.
  
- **Template Engines:** Learning how to integrate template engines like EJS, Handlebars, or Pug for server-side rendering of dynamic HTML content.

- **Database Integration:** Integrating Express.js with databases like MongoDB, PostgreSQL, or MySQL using ORMs or query builders like Mongoose or Sequelize.

- **RESTful API Design:** Learning about RESTful API design principles and implementing RESTful APIs using Express.js.

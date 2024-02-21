---
title: NodeJS - Lesson 4
description: Lectia 4 - NodeJS - Rest API
tags:
  - nodejs
  - learning
  - goit
---
# Lesson 4: RESTful APIs and Basic HTTP Methods 🖥️

## What are we learning today?
- Understand the principles of RESTful APIs
- Learn about basic HTTP methods
- Explore the importance of environment variables and logging in web applications
- Understand CORS (Cross-Origin Resource Sharing)
- Practice forming URLs for RESTful APIs
- Implement a simple example of a RESTful API application

---

## 1. Introduction

### Understanding RESTful APIs

RESTful APIs (Representational State Transfer) are a set of architectural principles for designing networked applications. They are crucial in web development because they provide a standardized way for different systems to communicate with each other over the internet. RESTful APIs allow clients to access and manipulate resources using a uniform interface and predefined operations.

### Exploring HTTP Methods

HTTP (Hypertext Transfer Protocol) methods define the actions that clients can perform on resources. The main HTTP methods used in RESTful APIs are:

- **GET**: Used to retrieve data from a server. It is a safe and idempotent operation, meaning it does not modify data on the server.
- **POST**: Used to create new resources on the server. It is not idempotent, as repeated requests may result in multiple resource creations.
- **PUT**: Used to update or replace existing resources on the server. It is idempotent, meaning multiple identical requests will have the same effect as a single request.
- **DELETE**: Used to remove resources from the server. It is idempotent, as deleting a resource multiple times has no additional effect.

---

## 2. Environment Variables 

Environment variables are dynamic variables that are external to the application and are typically set at the operating system level. They are used to store configuration settings, sensitive information, and other variables that may vary between different environments (such as development, testing, and production). 

Here's how we can use environment variables:

1. **Storing Configuration Data**: Environment variables can store sensitive information like API keys, database credentials, and other configuration settings. This helps in keeping such information secure and prevents it from being hard-coded into the application code.

2. **Managing Environment-Specific Settings**: Since environment variables can be set differently for each environment (e.g., development, staging, production), they allow us to manage environment-specific settings easily.

3. **Accessing Configuration in Code**: In the application code, we can access environment variables using a language-specific method provided by the programming environment. For example, in Node.js, we access environment variables using `process.env.VARIABLE_NAME`.

4. **Securing Sensitive Data**: Environment variables are not stored within the application code or configuration files, reducing the risk of exposure to sensitive data. This is particularly important when working with version control systems like Git.

To use environment variables effectively, it's essential to follow best practices:

- **Adding to .gitignore**: Environment variables should never be committed to version control repositories like Git. Instead, developers should create a `.env` file to store environment variables locally. Additionally, the `.env` file should be added to the `.gitignore` file to prevent it from being accidentally committed.


### How does it know which file to use?

In Node.js, Express applications typically determine the environment (e.g., development, production) based on the `NODE_ENV` environment variable. This variable is commonly used to specify the environment in which the application is running.

In a typical setup, you might have different configuration settings for development, staging, and production environments. For example, you might want more verbose logging and error messages in development, but less so in production.

Express applications often load environment-specific configuration settings from separate files based on the value of `NODE_ENV`. For instance, you might have a `config` directory containing different configuration files like `development.js`, `production.js`, etc.

Here's how it works:

1. **Set `NODE_ENV` Environment Variable:**
   - When running your application, you can explicitly set the `NODE_ENV` variable. For example:
     ```bash
     NODE_ENV=production node app.js
     ```

2. **Load Environment-Specific Configuration:**
   - Your application code can then load environment-specific configuration settings based on the value of `NODE_ENV`. For example, in your Express application's entry file (`app.js`):
     ```javascript
     const env = process.env.NODE_ENV || 'development';
     const config = require(`./config/${env}.js`);
     ```

3. **Use Configuration Settings:**
   - You can now use the configuration settings loaded from the appropriate file (`development.js`, `production.js`, etc.) throughout your application.

By convention, if `NODE_ENV` is not explicitly set, it defaults to `'development'`. However, in a production environment, you typically set `NODE_ENV` to `'production'` either manually or through deployment scripts/configurations.

### How to use .env files?
1. **Create `.env` file**:
   - In your project directory, create a file named `.env`.
   - Add your environment variables to this file, with each variable on a new line and in the format `KEY=VALUE`. For example:
     ```
     LOG_LEVEL=debug
     ```

2. **Install dotenv package**:
   - Install the `dotenv` package using npm or yarn:
     ```
     npm install dotenv
     ```

3. **Configure Express application**:
   - Require the `dotenv` package at the top of your `app.js` file to load the environment variables from the `.env` file:
     ```javascript
     require('dotenv').config();
     ```

4. **Access environment variables in your Express application**:
   - You can now access the environment variables anywhere in your Express application using `process.env.VARIABLE_NAME`. For example, to access the `LOG_LEVEL` variable:
     ```javascript
     const logLevel = process.env.LOG_LEVEL || 'info'; // Default to 'info' if LOG_LEVEL variable is not defined
     ```

5. **Use environment variables in your application**:
   - Use the environment variables in your application's configuration, such as setting the log level for logging libraries. For example:
     ```javascript
     const logger = require('morgan');

     // Set log level based on environment variable
     app.use(logger(process.env.LOG_LEVEL || 'dev'));
     ```

6. **Add `.env` to .gitignore**:
   - Finally, ensure that the `.env` file is added to your `.gitignore` file to prevent it from being committed to version control. This is important to keep sensitive information private.

By following these steps, you can configure the log level for your Express application using an environment variable stored in an `.env` file. This allows you to easily adjust the log level without modifying your code, making your application more flexible and easier to manage.

----
## 3. Logging

### Logging

Logging is the process of recording events, actions, and errors that occur within an application. It plays a significant role in tracking the behavior of an application and diagnosing issues during development, testing, and production. 

By logging relevant information, developers can gain insights into how the application is performing, identify potential problems or anomalies, and troubleshoot issues more efficiently. Logging also helps in auditing and compliance, as it provides a record of actions taken by the application and its users.

#### Using Morgan.js for Logging

[Morgan](https://www.npmjs.com/package/morgan) is a popular logging middleware for Node.js web applications. It simplifies the process of logging HTTP requests and responses. To use Morgan:

1. Install Morgan using npm:
   ```bash
   npm install morgan
   ```
2. Require and configure Morgan in your application's entry point (e.g., `app.js` or `index.js`):
   ```javascript
   const express = require('express');
   const morgan = require('morgan');
   const app = express();

   // Use Morgan middleware for logging HTTP requests
   app.use(morgan('dev'));
   ```
3. Morgan provides different pre-defined formats for logging. The `'dev'` format is commonly used for development purposes, but you can choose other formats according to your requirements. These formats determine how the log entries are structured and what information is included in each entry. Here are some of the pre-defined formats that Morgan provides:

    - **'combined':** This format includes the standard Apache combined log output, which contains the remote IP address, date, HTTP method, URL, HTTP version, status code, response size, and referrer.

    - **'common':** Similar to the 'combined' format but excludes the referrer.

    - **'dev':** This format is optimized for development environments and includes concise output with colorful status codes and response times.

    - **'short':** A shorter format that includes only the remote IP address, HTTP method, URL, HTTP version, status code, and response time in milliseconds.

    - **'tiny':** The smallest format, providing minimal output with just the method, URL, and status code.

### How to use Morgan in an express app?

```javascript
const express = require('express');
const morgan = require('morgan');

const app = express();

// Use the 'combined' format for logging
app.use(morgan('combined'));

// Your Express app routes and middleware setup...
```

You can replace `'combined'` with any of the other formats mentioned above to customize the logging output according to your preferences or requirements.

---
## 4. What is REST?

REST, or Representational State Transfer, is an architectural style for designing networked applications. It was introduced by Roy Fielding in his doctoral dissertation in 2000 and has since become the predominant approach for building web APIs.

### Definition
  - REST (Representational State Transfer) is an architectural style that defines a set of constraints for creating web services. These constraints encourage a scalable, stateless, and uniform interface between clients and servers. RESTful APIs are designed to be simple, lightweight, and efficient, making them well-suited for distributed systems and the web.

### Architectural Principles of REST
  - **Client-Server:** RESTful systems are composed of clients and servers that interact through a uniform interface. This separation of concerns allows for the independent evolution of client and server components.
  - **Statelessness:** RESTful interactions are stateless, meaning that each request from a client to a server must contain all the information necessary to understand and process the request. The server does not maintain any client state between requests.
  - **Uniform Interface:** RESTful APIs expose a uniform interface to clients, typically using HTTP methods (GET, POST, PUT, DELETE) to perform CRUD (Create, Read, Update, Delete) operations on resources. Resources are identified by URIs (Uniform Resource Identifiers), and representations of these resources are transferred between client and server.
  - **Cacheability:** Responses from RESTful APIs can be explicitly marked as cacheable or non-cacheable, allowing clients to store and reuse representations of resources.
  - **Layered System:** RESTful systems can be composed of multiple layers of abstraction, such as proxies, gateways, and caches. These layers enhance scalability and performance without affecting the client's perception of the service.
  - **Code-On-Demand (Optional):** RESTful APIs can optionally support the transfer of executable code from the server to the client, allowing clients to extend their functionality dynamically.

### Resources, URIs, and Statelessness
  - In REST, resources are the key abstractions that clients interact with. A resource can be any information or functionality that can be named and addressed. Resources are identified by URIs, which are unique identifiers that represent the location or address of a resource on the web.
  - URIs follow a hierarchical structure, with each segment representing a specific resource or sub-resource. For example, in the URI `/users/123`, `users` is the resource collection, and `123` is the identifier of a specific user resource.
  - The statelessness of RESTful APIs means that each request sent from a client to a server must contain all the information necessary for the server to understand and process the request. The server does not maintain any client state between requests, which simplifies server implementation and enhances scalability.

---
## 5. Basic HTTP Methods

HTTP, or Hypertext Transfer Protocol, is the foundation of data communication on the World Wide Web. It defines a set of request methods, also known as HTTP verbs, that indicate the desired action to be performed on a resource. In the context of RESTful APIs, these methods are used to perform CRUD (Create, Read, Update, Delete) operations on resources.

### The methods

1. **GET:**
   - The GET method is used to retrieve data from a specified resource.
   - When a client sends a GET request to a server, the server retrieves the requested resource and sends it back to the client in the response body.
   -  GET requests are typically used for reading or fetching data. For example, retrieving a user's profile information, fetching a list of products from an online store, or accessing a blog post.

2. **POST:**
   - The POST method is used to submit data to be processed to a specified resource.
   - When a client sends a POST request to a server, the server receives the data included in the request body and processes it.
   - POST requests are commonly used for creating new resources or submitting form data. For example, creating a new user account, submitting a comment on a blog post, or adding a product to a shopping cart.

3. **PUT:**
   - The PUT method is used to update or replace a resource with the provided data.
   - When a client sends a PUT request to a server, the server updates the specified resource with the data included in the request body.
   - PUT requests are often used for updating existing resources with new data. For example, updating a user's profile information, modifying the contents of a blog post, or editing the details of a product.

4. **DELETE:**
   - The DELETE method is used to delete a specified resource.
   - When a client sends a DELETE request to a server, the server deletes the specified resource from its database.
   - DELETE requests are used to remove existing resources. For example, deleting a user account, removing a comment from a blog post, or deleting a product from a database.

### The Purpose of Each Method in the Context of RESTful APIs
   - **GET** requests are used for retrieving data without modifying the server's state.
   - **POST** requests are used for creating new resources or submitting data to be processed.
   - **PUT** requests are used for updating or replacing existing resources with new data.
   - **DELETE** requests are used for removing resources from the server.

---
## 6. CORS (Cross-Origin Resource Sharing)

Cross-Origin Resource Sharing (CORS) is a security feature implemented by web browsers to restrict or allow access to resources on a web server from a different origin. 

An origin consists of the combination of protocol (e.g., http:// or https://), domain (e.g., example.com), and port (e.g., :8080). When a web page makes a request to a different origin (e.g., when a JavaScript script running on domain A makes a request to domain B), the browser enforces the Same-Origin Policy by default, which prevents the request from being processed.

### Explanation of CORS
   - CORS is a mechanism that allows web servers to specify which origins are allowed to access their resources. It enables cross-origin requests to be made safely by browsers.
   - When a client sends a cross-origin request, the server must include specific CORS headers in its response to indicate whether the request is allowed or not.

### Role in Allowing or Restricting Access to Resources Across Different Origins
   - CORS headers, such as `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, and `Access-Control-Allow-Headers`, are used by servers to specify which origins, methods, and headers are allowed to access their resources.
   - If the server's CORS policy allows the client's origin, the browser allows the request to proceed. Otherwise, the request is blocked, and the browser throws a CORS error.

### Security Implications and Best Practices for Implementing CORS
   - Implementing CORS correctly is crucial for maintaining the security of web applications. Allowing unrestricted cross-origin requests can expose sensitive data and lead to security vulnerabilities, such as Cross-Site Request Forgery (CSRF) attacks.
   - Best practices for implementing CORS include:
     - Whitelisting specific origins that are allowed to access resources.
     - Restricting the methods and headers that can be used in cross-origin requests.
     - Implementing proper authentication and authorization mechanisms to control access to sensitive resources.
     - Regularly reviewing and updating CORS policies to ensure they align with security requirements and best practices.

By understanding and implementing CORS effectively, web developers can ensure that their applications are both secure and accessible to legitimate users across different origins.

----
## 7. Forming URL for REST API

When crafting URLs for RESTful API endpoints, adhering to best practices and naming conventions is essential for creating a clear, consistent, and intuitive API interface. Let's delve into some real-life examples and best practices for naming resources and HTTP methods:

1. **Resource Naming:**
   - Use clear, descriptive nouns to represent resources in the URL path.
   - Prefer plural nouns to represent collections of resources (e.g., `/users` instead of `/user`).
   - Choose meaningful names that accurately describe the nature of the resource.
   - Avoid unnecessary abbreviations or acronyms that may cause confusion.
   - Example: `/products`, `/customers`, `/orders`

2. **HTTP Method Usage:**
   - **GET:** Use for retrieving data from the server. It should be idempotent, meaning multiple identical requests should have the same effect as a single request.
   - **POST:** Use for creating new resources on the server. It is non-idempotent and may cause side effects.
   - **PUT:** Use for updating existing resources on the server. It should be idempotent and replace the entire resource.
   - **DELETE:** Use for removing resources from the server. It should also be idempotent.
  
3. **Example:**
   - Let's consider a real-life example of a RESTful API for managing a blog platform:
     - **Resource:** `posts`
     - **HTTP Methods:**
       - `GET /posts`: Retrieve a list of all blog posts.
       - `POST /posts`: Create a new blog post.
       - `GET /posts/{postId}`: Retrieve a specific blog post by its ID.
       - `PUT /posts/{postId}`: Update an existing blog post.
       - `DELETE /posts/{postId}`: Delete a blog post.
     
4. **Best Practices:**
   - Use consistent naming conventions across endpoints and resources.
   - Ensure that URLs are intuitive and easy to understand for developers.
   - Design URLs to be hierarchical and RESTful, reflecting the relationships between resources.
   - Keep URLs concise and avoid unnecessary complexity.
   - Use hyphens or underscores to separate words in URLs for improved readability.
   
5. **Security Considerations:**
   - Ensure that sensitive information, such as authentication tokens or user credentials, is not included in URLs.
   - Implement proper authentication and authorization mechanisms to secure API endpoints.
   - Use HTTPS to encrypt communication between clients and the server to protect against data interception and tampering.

By following these best practices and examples, developers can create well-designed and easy-to-use RESTful APIs that provide a seamless experience for consumers while maintaining security and scalability.

---
## 8. Example of REST API Application
 
In this section, we'll demonstrate the implementation of a simple RESTful API application, such as a Todo list manager or a user management system. 

We'll explore how HTTP methods are used to perform CRUD (Create, Read, Update, Delete) operations on resources and walk through the API endpoints and their functionalities.

### Setting Up the Environment
To initialize a new Node.js project and set up the project structure for building the API using Express generator, follow these steps:

1. **Initialize Node.js Project:**
   - Open your terminal or command prompt.
   - Navigate to the directory where you want to create your project.
   - Run the following command to initialize a new Node.js project:
     ```
     npm init -y
     ```
   - This command will create a `package.json` file with default values.

2. **Install Express Generator:**
   - Express Generator is a tool that helps to scaffold out an Express application quickly.
   - Install Express Generator globally by running the following command:
     ```
     npm install -g express-generator
     ```

3. **Create Express Application:**
   - Once Express Generator is installed, you can create a new Express application using the `express` command followed by the name of your project. For example:
     ```
     express todo-app
     ```

4. **Install Dependencies:**
   - Navigate into the newly created project directory:
     ```
     cd todo-app
     ```
   - Install the dependencies specified in the `package.json` file by running:
     ```
     npm install
     ```

5. **Project Structure:**
   - Express Generator sets up a basic project structure for you. The structure typically includes folders for routes, controllers, views (if using template engines like EJS or Pug), public assets, etc.
   - Here's an example of the project structure:
     ```
     todo-app/
     ├── bin/
     │   └── www                  # Entry point for the server
     ├── public/                   # Static assets (CSS, images, etc.)
     ├── routes/                   # Route handlers
     │   └── index.js              # Main router
     ├── views/                    # Views (if using template engine)
     ├── app.js                    # Main application file
     ├── package.json              # Project metadata and dependencies
     └── README.md                 # Project documentation
     ```

6. Add `nodemon` and the start scripts in your `package.json` file

     - If you haven't already installed `nodemon`, you can do so using npm:
     ```
     npm install nodemon --save-dev
     ```
    - Open your `package.json` file in a text editor.
    - Add the following scripts under the `"scripts"` section:
     ```json
     "scripts": {
       "start": "node ./bin/www",
       "start:dev": "nodemon ./bin/www"
     },
     ```
   - The `"start"` script will start your application in production mode using Node.js.
   - The `"start:dev"` script will start your application in development mode using `nodemon`, which automatically restarts the server when changes are detected in your files.

7. Logging (MorganJS) and CORS
   - First, install the `morgan` and `cors` packages using npm:
     ```
     npm install morgan cors
     ```
   - In your `app.js` or main application file, import the `morgan` and `cors` modules:
     ```javascript
     const express = require('express');
     const morgan = require('morgan');
     const cors = require('cors');
     ```
   - Use the imported middleware in your Express application by calling `app.use()`:
     ```javascript
     const app = express();

     // Log HTTP requests
     app.use(morgan('dev'));

     // Enable Cross-Origin Resource Sharing (CORS)
     app.use(cors());
     ```
   - `morgan` supports different formats for logging. You can customize the log format by passing a string parameter to the `morgan` function. For example, `'combined'` or `'tiny'`.
   - `cors` can be configured with options to control which origins, methods, or headers are allowed. You can pass an options object to the `cors()` function. For example:
     ```javascript
     const corsOptions = {
       origin: 'http://example.com', // Allow requests from this origin
       methods: 'GET,POST',           // Allow only specified HTTP methods
     };
     app.use(cors(corsOptions));
     ```

### Define API Endpoints
To create routes for handling CRUD operations on todo items in your Express application, you'll need to define endpoints for creating, reading, updating, and deleting todo items. Below is the code for how you can implement these routes:

```javascript
// routes/todos.js

const express = require('express');
const router = express.Router();

// Mock data
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build RESTful API', completed: false },
  { id: 3, title: 'Create Todo App', completed: true }
];

// GET all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// GET a specific todo by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === parseInt(id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

// POST a new todo
router.post('/', (req, res) => {
  const { title, completed } = req.body;
  const newTodo = { id: todos.length + 1, title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (update) a todo by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
  if (todoIndex === -1) return res.status(404).json({ message: 'Todo not found' });
  todos[todoIndex] = { id: parseInt(id), title, completed };
  res.json(todos[todoIndex]);
});

// DELETE a todo by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
  if (todoIndex === -1) return res.status(404).json({ message: 'Todo not found' });
  todos.splice(todoIndex, 1);
  res.sendStatus(204);
});

module.exports = router;
```
#### Notes
- The `GET` endpoint `/` returns all todo items.
- The `GET` endpoint `/:id` returns a specific todo item by its ID.
- The `POST` endpoint `/` creates a new todo item.
- The `PUT` endpoint `/:id` updates an existing todo item by its ID.
- The `DELETE` endpoint `/:id` deletes a todo item by its ID.

### Express App Code

In the main app.js file we will:
- First load environment variables from the `.env` file using `require('dotenv').config()`.
- Use `process.env.LOG_LEVEL` to read the logging level from the environment variables. If it's not specified, we default to `'dev'`.
- Similarly, we use `process.env.PORT` to read the port from the environment variables. If it's not specified, we default to `3000`.

```javascript
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware for logging HTTP requests
const logLevel = process.env.LOG_LEVEL || 'dev';
app.use(morgan(logLevel));

// Middleware for enabling CORS
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(500).send('Something went wrong!'); // Send a generic error response
});

// Define routes for todo API
const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);

// Define default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Walkthrough of API Endpoints
Certainly! Let's expand on each API endpoint:

1. **/api/todos (GET)**: This endpoint is used to retrieve all todo items. When a client makes a GET request to this endpoint, the server responds with a list of all todo items stored in the database. This endpoint does not require any parameters.

2. **/api/todos/:id (GET)**: This endpoint is used to retrieve a specific todo item by its ID. The client includes the ID of the todo item in the URL parameter. When a GET request is made to this endpoint with a specific ID, the server responds with the details of that particular todo item.

3. **/api/todos (POST)**: This endpoint is used to create a new todo item. The client sends a POST request to this endpoint with the details of the new todo item in the request body. The server then creates a new todo item based on the provided information and adds it to the database.

4. **/api/todos/:id (PUT)**: This endpoint is used to update an existing todo item. The client includes the ID of the todo item to be updated in the URL parameter and sends a PUT request with the updated details in the request body. The server then updates the todo item in the database with the new information.

5. **/api/todos/:id (DELETE)**: This endpoint is used to delete a todo item. The client includes the ID of the todo item to be deleted in the URL parameter and sends a DELETE request to this endpoint. The server then removes the specified todo item from the database.

These API endpoints allow clients to perform CRUD (Create, Read, Update, Delete) operations on todo items, providing a way to manage the todo list effectively.

----

## Conclusion

Today, we covered several key concepts and practices in building RESTful APIs using Express.js:

1. **Understanding RESTful APIs:**
   - The principles of REST (Representational State Transfer) and its importance in web development.
   - Resources, URIs, and the statelessness of RESTful APIs.

2. **Basic HTTP Methods:**
   - The four basic HTTP methods: GET, POST, PUT, and DELETE.
   - The purpose of each method in the context of RESTful APIs.

3. **Environment Variables and Logging:**
   - Environment variables and their significance in securing sensitive data.
   - Logging using the Morgan.js library and its importance in tracking and debugging applications.

4. **CORS (Cross-Origin Resource Sharing):**
   - CORS and its role in allowing or restricting access to resources across different origins.
   - Security implications and best practices for implementing CORS in web applications.

5. **Forming URLs for REST API:**
   - We practiced forming URLs for RESTful API endpoints, including resources and actions, using examples and best practices.

6. **Implementing CRUD Operations:**
   - We learned how to implement CRUD (Create, Read, Update, Delete) operations using HTTP methods in Express.js.
   - We defined API endpoints for creating, retrieving, updating, and deleting todo items.

7. **Logging and Error Handling:**
   - We implemented logging to track requests, responses, and errors for debugging purposes using Morgan.js.
   - We handled errors gracefully by returning appropriate HTTP status codes and error messages.

---

## Additional Resources
- MDN Web Docs: HTTP methods - https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
- Understanding CORS - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- Express.js documentation for creating RESTful APIs - https://expressjs.com/en/guide/routing.html
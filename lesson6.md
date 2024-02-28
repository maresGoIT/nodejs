---
title: NodeJS - Lesson 6
description: Lectia 5 - NodeJS - Mongoose
tags:
  - nodejs
  - learning
  - goit
---
# Introduction to Mongoose for MongoDB 🟩

## What are we going to learn today? 📖
We will learn how to connect and interact with MongoDB using Mongoose, a Node.js library. We will look over the basics of schema creation, defining unique and required fields, adding methods to schema objects, and performing CRUD operations.

---
## 1. Introduction to Mongoose 

🌟 *Mongoose* is an elegant Node.js object modeling library designed to work seamlessly with MongoDB. It offers a schema-based solution to model application data, making MongoDB interactions in Node.js applications more intuitive and organized.

### Significance in Node.js Applications

1. **Schema-Based Modeling:** 💼 Mongoose allows developers to define schemas for their data models. This ensures a consistent data structure and constraints, simplifying data management and enhancing readability.

2. **Data Validation:** ✅ With Mongoose, developers can set validation rules for schema fields, ensuring that data entering the database meets predefined criteria. This helps maintain data integrity and reduces the risk of errors.

3. **Middleware Support:** 🔄 Mongoose provides middleware hooks that enable developers to execute functions before or after certain operations, such as saving or querying data. This flexibility allows for the implementation of custom logic and additional tasks seamlessly.

4. **Query Building:** 🔍 Mongoose simplifies the process of constructing MongoDB queries with its fluent and expressive API. This facilitates the execution of complex queries and aggregate operations without dealing with raw MongoDB syntax.

5. **Built-in Features:** 🛠️ Mongoose includes built-in support for features like population (referencing documents from other collections), indexing, virtuals (computed properties), and transactions. These features enhance productivity and enable developers to build robust and scalable applications.

6. **Integration with Express.js:** 🚀 Mongoose integrates seamlessly with Express.js, a popular Node.js web framework. This promotes code reusability and streamlines the development process for full-stack applications.

### Advantages of Using Mongoose for MongoDB Operations

1. **Abstraction Layer:** 🧊 Mongoose provides a higher-level abstraction over MongoDB, simplifying database interactions and reducing boilerplate code. Developers can focus on application logic rather than dealing with low-level database operations.

2. **Schema Enforcement:** 🛡️ By defining schemas, Mongoose helps maintain data consistency and prevents unexpected data changes. This promotes better data organization and reduces the likelihood of runtime errors.

3. **Ease of Use:** 🎉 Mongoose's intuitive API and comprehensive documentation make it easy for developers to get started with MongoDB in their Node.js applications. It abstracts away the complexities of working directly with the MongoDB driver, offering a more user-friendly experience.

4. **Community Support:** 🤝 Mongoose boasts a vibrant community of developers who contribute to its ongoing development and provide support through forums, documentation, and online resources. This ensures that developers have access to assistance and guidance when working with Mongoose.
---

## 2. Setting Up Mongoose

**Objective:** In this section, we will learn how to install Mongoose via npm and connect to a MongoDB database using Mongoose.

**Steps:**

1. **Installing Mongoose via npm:**
   - Mongoose is available as an npm package, and it can be easily installed in a Node.js project using npm or yarn.
   - To install Mongoose, you should run the following command:

     ``` bash
     npm install mongoose
     ```

2. **Connecting to a MongoDB Database:**
   - First we need to establish a connection to a MongoDB database before performing any operations.
   - Import Mongoose into theNode.js application:
     ```javascript
     const mongoose = require('mongoose');
     ```

   - Setting up the connection to MongoDB using Mongoose. They should replace `<db-uri>` with the connection URI provided by MongoDB (local or remote).
     ```javascript
     mongoose.connect('<db-uri>', { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => {
         console.log('Connected to MongoDB');
       })
       .catch((err) => {
         console.error('Error connecting to MongoDB:', err);
       });
     ```

3. **Explanation:**
   - Briefly explain the parameters passed to `mongoose.connect()`:
     - `<db-uri>`: The URI of the MongoDB database. This could be a local MongoDB instance or a remote database hosted on services like MongoDB Atlas.
     - `{ useNewUrlParser: true, useUnifiedTopology: true }`: Additional options to ensure compatibility and avoid deprecation warnings. `useNewUrlParser` is used to parse connection strings using the new MongoDB Node.js driver URL parser. `useUnifiedTopology` is used to opt in to using the new topology engine.


---
## 3. Schema Creation

### Overview

Mongoose schemas play a pivotal role in defining the structure and organization of data within a MongoDB database. 

A schema in Mongoose acts as a blueprint that outlines the structure of documents within a collection in a MongoDB database. It defines the fields, their data types, validation rules, and default values, thus providing a structured framework for organizing data.

### Features

1. **Field Specification:**
   - Schemas specify the fields present in documents, representing properties or attributes of the data being stored.

2. **Data Type Definition:**
   - Each field in a schema is associated with a specific data type (e.g., String, Number, Date), which determines the kind of data that can be stored in that field.

3. **Validation Rules:**
   - Schemas allow developers to define validation rules for fields, ensuring data integrity and adherence to predefined criteria (e.g., required, unique, min/max values).

4. **Default Values:**
   - Developers can optionally set default values for fields, specifying a fallback value to be used if no value is provided during document creation.


### Benefits of Using Schemas in Mongoose

1. **Structured Organization:**
   - Schemas provide a structured approach to organizing data within MongoDB collections, enhancing readability and maintainability.

2. **Consistency Assurance:**
   - By enforcing a predefined schema, schemas ensure consistency in data structure and format across documents, reducing the risk of data inconsistency.

3. **Validation and Data Integrity:**
   - Schemas enable developers to enforce validation rules, thereby promoting data integrity and minimizing errors in the database.

4. **Flexibility and Adaptability:**
   - While providing structure, schemas also offer flexibility by allowing customization and adaptation to changing requirements, facilitating agile development.

--- 

## 4. Adding Methods to Schema Objects

Let's discuss about methods in Mongoose schemas. We can add custom methods to schema objects to implement specific functionality within their applications.

**Explanation:**

1. **Introduction to Methods in Mongoose Schema:**
   - Methods in Mongoose schemas allow developers to define custom functions that can be executed on document instances retrieved from the database.
   - These methods can encapsulate business logic or perform specific operations related to the document's data.

2. **Adding Custom Methods to Schema Objects:**
   - Demonstrate how to add custom methods to schema objects using the `Schema.methods` property.
   - Example:
     ```javascript
     const userSchema = new Schema({
       name: String,
       email: String,
       age: Number
     });

     // Define a custom method to display user information
     userSchema.methods.getUserInfo = function() {
       return `Name: ${this.name}, Email: ${this.email}, Age: ${this.age}`;
     };
     ```
   
3. **Usage of Custom Methods:**
   - Show how to utilize custom methods on document instances retrieved from the database.
   - Example:
     ```javascript
     const User = mongoose.model('User', userSchema);

     // Retrieve a user document from the database
     User.findOne({ name: 'John' }, (err, user) => {
       if (err) {
         console.error('Error finding user:', err);
         return;
       }
       if (user) {
         console.log(user.getUserInfo()); // Call the custom method
       }
     });
     ```

---

## 5. Basic Data Operations with Mongoose

The fundamental CRUD operations in Mongoose are: creating, retrieving, updating, and deleting documents from MongoDB collections. 

1. **Creating Documents:**
   - Create documents in MongoDB using Mongoose's `Model.create()` method.
   - Example:
     ```javascript
     const newUser = new User({
       name: 'Alice',
       email: 'alice@example.com',
       age: 30
     });

     newUser.save((err, user) => {
       if (err) {
         console.error('Error creating user:', err);
         return;
       }
       console.log('User created successfully:', user);
     });
     ```

2. **Retrieving Data:**
   - Retrieve data from MongoDB using Mongoose's querying methods such as `Model.find()` and `Model.findOne()`.
   - Example:
     ```javascript
     User.find({ age: { $gte: 18 } }, (err, users) => {
       if (err) {
         console.error('Error retrieving users:', err);
         return;
       }
       console.log('Users with age greater than or equal to 18:', users);
     });
     ```

3. **Updating Data:**
   - Update documents in MongoDB using Mongoose's `Model.updateOne()` or `Model.findOneAndUpdate()` methods.
   - Example:
     ```javascript
     User.updateOne({ name: 'Alice' }, { age: 31 }, (err, result) => {
       if (err) {
         console.error('Error updating user:', err);
         return;
       }
       console.log('User updated successfully:', result);
     });
     ```

4. **Deleting Data:**
   - Delete documents from MongoDB using Mongoose's `Model.deleteOne()` or `Model.findOneAndDelete()` methods.
   - Example:
     ```javascript
     User.deleteOne({ name: 'Alice' }, (err) => {
       if (err) {
         console.error('Error deleting user:', err);
         return;
       }
       console.log('User deleted successfully');
     });
     ```

---

## 6. File Structure
 
Proper file organization is crucial for maintaining clarity, scalability, and efficiency in your Node.js application. This page outlines best practices for structuring your files to ensure readability and maintainability.

**Key Points:**
1. **MVC Pattern:**
   - Discuss the MVC (Model-View-Controller) pattern, which divides your application into models (data), views (presentation layer), and controllers (business logic).
   - Emphasize the benefits of separating concerns and keeping code organized.

2. **Modularization:**
   - Explain the concept of modularization, where related functionality is grouped into separate modules (files).
   - Encourage breaking down large files into smaller, focused modules for better code management.

3. **Directory Structure:**
   - Provide guidance on creating a directory structure that reflects the MVC pattern or modularization approach.
   - Example directory structure:
     ```
     /project
     ├── models
     │   └── user.js
     ├── controllers
     │   └── userController.js
     ├── views
     │   └── index.ejs
     ├── routes
     │   └── userRoutes.js
     └── app.js
     ```

The main file of your Node.js application serves as the entry point and is responsible for initializing essential components, such as Express and database connections


## 7. Exploring Advanced Schema Features

Let's go into advanced features of Mongoose schemas, and how you can refine your schemas to enhance functionality and data integrity.

### Key Features
1. **Validation:**
   - Mongoose provides built-in validation options for ensuring data integrity. For instance, you can specify that a field must be of a certain type, have a minimum or maximum value, or match a regular expression pattern.
   - **Example:**
     ```javascript
     const userSchema = new Schema({
       username: {
         type: String,
         required: true, // Ensures username is provided
         minlength: 5,   // Username must be at least 5 characters long
         maxlength: 20   // Username cannot exceed 20 characters
       },
       email: {
         type: String,
         required: true, // Ensures email is provided
         unique: true,   // Ensures email is unique
         validate: {
           validator: function(value) {
             // Custom validation function to check if email format is valid
             return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
           },
           message: 'Invalid email format' // Error message if validation fails
         }
       },
       age: {
         type: Number,
         min: 18, // Age must be 18 or older
         max: 100 // Age cannot exceed 100
       }
     });
     ```
2. **Default Values:**
   - You can specify default values for schema fields, which will be used if no value is provided during document creation.
   - **Example:**
     ```javascript
     const userSchema = new Schema({
       role: {
         type: String,
         default: 'user' // Default role is set to 'user'
       },
       createdAt: {
         type: Date,
         default: Date.now // Default value is set to current date/time
       }
     });
     ```
3. **Virtuals:**
   - Virtual properties in Mongoose schemas are not persisted to the database but can be computed on the fly based on existing fields.
   - **Example:**
     ```javascript
     const userSchema = new Schema({
       firstName: String,
       lastName: String
     });

     // Define a virtual property for full name
     userSchema.virtual('fullName').get(function() {
       return this.firstName + ' ' + this.lastName;
     });
     ```
4. **Indexes:**
   - Indexes improve query performance by optimizing data retrieval. You can create indexes on schema fields to speed up queries.
   - **Example:**
     ```javascript
     const userSchema = new Schema({
       username: String,
       email: {
         type: String,
         index: true // Creates an index on the 'email' field
       }
     });
     ```

---

## 8. ToDo App with Mongoose

Below is a basic implementation of an Express app for a todo list application using Mongoose for database interaction and Morgan as a logger.

**File Structure:**
```
todo-app/
├── models/
│   └── todo.js
├── routes/
│   └── todoRoutes.js
├── controllers/
│   └── todoController.js
├── app.js
└── package.json
```

**Step 1: Setting up `package.json`**
```json
{
  "name": "todo-app",
  "version": "1.0.0",
  "description": "A todo list application built with Express and Mongoose",
  "main": "app.js",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^6.0.12",
    "morgan": "^1.10.0"
  }
}
```

**Step 2: Setting up `app.js`**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'YOUR_MONGODB_ATLAS_CONNECTION_STRING';

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api/todos', todoRoutes);

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });
```

Replace 'YOUR_MONGODB_ATLAS_CONNECTION_STRING' with the actual connection string provided by MongoDB Atlas. It should look something like this:

```javascript
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

Make sure to replace <username>, <password>, <cluster-url>, and <database-name> with your actual MongoDB Atlas credentials and database information.

**Step 3: Creating `models/todo.js`**
```javascript
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
```

**Step 4: Creating `controllers/todoController.js`**
```javascript
const Todo = require('../models/todo');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTodo = async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Todo not found' });
  }
};
```

**Step 5: Creating `routes/todoRoutes.js`**
```javascript
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
```

This sets up a basic Express application for a todo list, with CRUD operations implemented using Mongoose for database interaction and Morgan as a logger.

## Conclusion

**What we Learned Today:**
- Explored the fundamentals of using Mongoose with Express.js.
- Discussed how to structure an Express application with Mongoose for MongoDB operations.
- Explored advanced features of Mongoose schemas and how to implement them effectively.
- Learned about CRUD operations and how to perform them using Mongoose methods.
- Explored the MVC (Model-View-Controller) pattern and its implementation in an Express application with Mongoose.

**Key Takeaways:**
- Understanding the importance of Mongoose in integrating MongoDB with Node.js applications.
- Implementing CRUD operations using Mongoose methods for database interaction.
- Structuring an Express application with Mongoose models, routes, and controllers.
- Leveraging advanced features of Mongoose schemas for data validation, default values, virtuals, and indexes.
- Following the MVC pattern for better code organization and separation of concerns in Express applications.

By mastering Mongoose and its integration with Express.js, you are equipped to build scalable, robust, and efficient applications that leverage the power of MongoDB for data storage and retrieval. 
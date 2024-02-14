---
title: NodeJS - Lesson 2
description: Lectia 2 - NodeJS

tags:
  - 
---
# Lesson 2 - Command Line Scripting with Node.js

## What are we learning today?
- Learn to create and interact with command-line scripts in Node.js.
- Understand traditional method using `process.argv`.
- Explore interactive approaches using the `readline` module.
- Build complex command-line applications using multiple Node.js modules.

---

## Introduction to Command Line Scripting

Command-line applications, also known as command-line interfaces (CLI), are programs that interact with users through a command-line interface rather than a graphical user interface (GUI). 

Users interact with command-line applications by typing commands into a terminal or command prompt.

These applications are typically executed in a text-based environment, where users input commands as text strings, and the application responds with text output.

 Command-line applications are often preferred by developers and system administrators for tasks that require automation, scripting, or remote access, as they can be more efficient and lightweight than GUI-based alternatives.

Common examples of command-line applications include:
- System administration tools: Utilities for managing files, processes, users, and system configurations.
- Development tools: Compilers, interpreters, version control systems, and package managers.
- Networking utilities: Tools for network diagnostics, monitoring, and communication.
- Text processing tools: Programs for searching, sorting, filtering, and manipulating text files.
- Scripting languages: Interpreted languages like Python, Ruby, and Perl that can be executed from the command line.

Overall, command-line applications provide a powerful and flexible way to interact with computers and perform a wide range of tasks efficiently, especially for users comfortable with text-based interfaces.

- Overview of handling command-line arguments.

---

## Traditional Approach: `process.argv`
### What is process.argv?
process.argv is a property in Node.js that returns an array containing the command-line arguments passed when the Node.js process was launched.

The process.argv array contains the following elements:

- The absolute path of the Node.js executable.
- The absolute path of the JavaScript file being executed.
- Any additional command-line arguments passed to the script.

For example, if you run a Node.js script from the command line like this:
~~~ python
node script.js arg1 arg2 arg3
~~~

The n process.argv will be an array with the following elements:

~~~ javascript
[
  // Absolute path of the Node.js executable
  '/path/to/node',   
  // Absolute path of the script being executed
  '/path/to/script.js',
  // First command-line argument
  'arg1',             
  // Second command-line argument
  'arg2',       
  // Third command-line argument     
  'arg3'              
]
~~~

You can use process.argv to access and parse command-line arguments within your Node.js scripts.

### Example

Calculate the sum of two numbers.

~~~javascript
// sum.js

// Read the command line arguments
const number1 = parseFloat(process.argv[2]);
const number2 = parseFloat(process.argv[3]);

// Check if both arguments are valid numbers
if (isNaN(number1) || isNaN(number2)) {
    console.log("Please provide two valid numbers as command line arguments.");
} else {
    // Calculate the sum
    const sum = number1 + number2;
    console.log(`The sum of ${number1} and ${number2} is: ${sum}`);
}

~~~

~~~javascript
// command line
node sum.js 5 10
~~~

## Exercise
Create a script for basic arithmetic operation (addition, substraction, multiplication, division).

---

## Interactivity with `readline` Module
The `readline` module in Node.js provides an interface for reading data from a Readable stream (like `process.stdin`) one line at a time. It's particularly useful for building command-line interfaces (CLI) where you need to interact with users by prompting them for input and reading their responses.

Here's an introduction to the `readline` module:

1. **Initialization**: To use the `readline` module, you first need to require it in your Node.js script:

   ```javascript
   const readline = require('readline');
   ```

2. **Creating Interface**: After requiring the `readline` module, you can create an instance of the `Interface` class by calling the `createInterface()` method and passing it an object with `input` and `output` properties:

   ```javascript
   const rl = readline.createInterface({
     input: process.stdin,
     output: process.stdout
   });
   ```

   - `input`: Specifies the Readable stream from which to read input (usually `process.stdin`).
   - `output`: Specifies the Writable stream to which to write output (usually `process.stdout`).

3. **Listening for Input**: Once you have created the readline interface, you can listen for user input using the `on()` method and the `'line'` event:

   ```javascript
   rl.on('line', (input) => {
     console.log(`Received: ${input}`);
   });
   ```

   This code listens for user input and logs each line of input received.

4. **Asking Questions**: The `question()` method is used to ask questions to the user and wait for their response. It takes a string prompt as its first argument and a callback function that will be called with the user's response:

   ```javascript
   rl.question('What is your name? ', (name) => {
     console.log(`Hello, ${name}!`);
     rl.close();
   });
   ```

   After asking the question, the interface will pause and wait for the user to provide input. Once the user enters a response and presses Enter, the callback function will be called with the user's input.

5. **Closing Interface**: It's important to close the readline interface when you're done with it to release system resources. You can do this by calling the `close()` method:

   ```javascript
   rl.close();
   ```

   This will close the interface and stop listening for input.

The `readline` module is powerful for building interactive command-line applications and simplifies the process of reading user input in Node.js scripts.

Here's an interactive Node.js script that greets the user and explains the `rl.question()`, `rl.pause()`, and `rl.close()` methods:

```javascript
// Import the readline module
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask the user for their name
rl.question('What is your name? ', (name) => {
  // Once the user responds, greet them
  console.log(`Hello, ${name}!`);

  // Ask the user for their age
  rl.question('How old are you? ', (age) => {
    // Once the user responds, check if they are an adult
    if (parseInt(age) >= 18) {
      console.log('You are an adult.');
    } else {
      console.log('You are not an adult.');
    }

    // Pause the readline interface
    rl.pause();

    // Perform some asynchronous operation (simulated with setTimeout)
    setTimeout(() => {
      // Close the readline interface
      rl.close();
    }, 2000);
  });
});

// Listen for the 'close' event
rl.on('close', () => {
  console.log('Goodbye!');
});
```

Explanation:

1. We import the `readline` module.
2. We create a readline interface (`rl`) with `process.stdin` as the input stream and `process.stdout` as the output stream.
3. We ask the user for their name using `rl.question()`. When the user responds, we greet them and ask for their age.
4. Depending on the user's age, we provide a message indicating whether they are an adult.
5. We pause the readline interface using `rl.pause()` to prevent further user input.
6. We simulate an asynchronous operation (e.g., fetching data from a server) using `setTimeout`.
7. After the asynchronous operation is completed, we close the readline interface using `rl.close()` to release system resources.
8. We listen for the `'close'` event and print a goodbye message when the interface is closed.

This script demonstrates how to use `rl.question()` to prompt the user for input, `rl.pause()` to temporarily stop receiving input, and `rl.close()` to close the readline interface when it's no longer needed.

## Exercise: 
Build a number guessing game.

---

## Building Complex Command-Line Applications

Command-line applications (CLI) are powerful tools for interacting with a computer's operating system. In Node.js, you can build complex CLI applications using various modules and techniques.

### Benefits of CLI Applications

- **Efficiency**: Perform tasks quickly without the need for a graphical user interface.
- **Automation**: Automate repetitive tasks and workflows.
- **Portability**: Run applications across different operating systems without modification.
- **Flexibility**: Customize behavior and functionality based on user input.

### Node.js Modules for CLI Applications

1. **fs Module**
   - Read and write files.
   - Useful for configuration, data storage, and file manipulation.

2. **readline Module**
   - Interact with users through a command-line interface.
   - Collect input, validate responses, and provide feedback.

3. **commander Module**
   - Build command-line interfaces with ease.
   - Define commands, options, and arguments for your application.

4. **chalk Module**
   - Add color and styling to console output.
   - Improve readability and visual appeal of CLI applications.

---

### Example

Task Management CLI Application and for building this one we'll jump into VSCode.

---

### Conclusion

Building complex command-line applications in Node.js empowers you to create versatile tools for various tasks. By leveraging the capabilities of Node.js modules, you can streamline workflows, automate processes, and enhance productivity in the command line environment.

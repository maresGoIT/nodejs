---
title: NodeJS - Lesson 10
description: Fullstack Online - GoIT - Lesson
tags:
  - unit testing
  - nodejs
  - expressjs
---

# Lesson 10: Introduction to Testing ExpressJS Applications with Jest 🚀

## Objectives 🏆

By the end of this lesson, you'll be able to:

- Understand the importance of automated testing for complex applications.
- Distinguish between TDD and BDD methodologies.
- Different libraries used for testing applications
- Write basic unit tests for an ExpressJS application using Jest.
- Utilize Jest for mocking and spying on function calls.

## Introduction to Automated Testing 🤖

Automated testing is crucial for modern web development because it:

- **Ensures Reliability**: Catches errors early, making applications more stable.
- **Saves Time**: Automates repetitive tasks, allowing developers to focus on new features.
- **Supports CI/CD**: Enables frequent integration and automatic deployment of code changes.
- **Improves Code Quality**: Leads to cleaner, more modular code structures.
- **Boosts Confidence**: Increases developer and stakeholder confidence in the application.
- **Enhances User Satisfaction**: Delivers a more reliable product to the end-users.

---
## TDD vs. BDD  🤼

### TDD (Test-Driven Development)
- Focus: Developer's perspective.
- Approach: Write tests ➡️ Code to pass tests ➡️ Refactor.
- Benefits:
  - Bug-free codebase.
  - Thoughtful code design.
  - Maintainable code.

### BDD (Behavior-Driven Development)
- Focus: End user's perspective.
- Approach: Define behavior ➡️ Write tests ➡️ Code to implement behavior.
- Benefits:
  - Improved team communication.
  - Focus on user experience.
  - Tests understandable by non-developers.

### When to Use
- **TDD**: Unit level testing, rapid feedback, codebase quality.
- **BDD**: Collaboration importance, user-driven development.

---

## Exploring the Testing Ecosystem 🌐

The JavaScript testing ecosystem is rich with libraries and tools designed to suit various testing needs. Here’s a quick overview of some notable tools beyond Jest, each serving different aspects of testing:

#### Sinon
- **Purpose**: Standalone test spies, stubs, and mocks.
- **Key Features**:
  - No dependency on any testing framework.
  - Detailed behavior mocking and verification.
- **Best For**: Complex mocking scenarios where fine-grained control over function calls, return values, and behaviors is needed.

#### Mocha
- **Purpose**: Flexible test framework for Node.js and browser testing.
- **Key Features**:
  - Supports various assertion libraries (e.g., Chai).
  - Highly customizable and extensible.
- **Best For**: Projects requiring a specific setup or integration with various assertion and mocking libraries.

#### Istanbul (nyc)
- **Purpose**: JavaScript code coverage tool.
- **Key Features**:
  - Measures how much code is executed during tests.
  - Generates detailed coverage reports.
- **Best For**: Gaining insights into test coverage, identifying untested code, and ensuring thorough testing across the codebase.

#### Cypress
- **Purpose**: End-to-end testing for web applications.
- **Key Features**:
  - Real-time interactive test runner.
  - Simulates real user actions in a browser.
- **Best For**: Testing user interactions, network requests, and full user flows within a modern web application.

#### Playwright
- **Purpose**: Automation library for cross-browser testing.
- **Key Features**:
  - Supports testing on Chromium, Firefox, and WebKit.
  - Allows for testing on mobile versions of browsers.
- **Best For**: Ensuring web applications work seamlessly across all major browsers and platforms.

### Understanding Code Coverage 🎯

Code coverage is a crucial metric that helps maintain high-quality, well-tested applications. Here's how various tools help with coverage:

- **Istanbul/nyc**: Integrates with testing frameworks like Mocha and Jest to provide coverage metrics, including line, statement, branch, and function coverage.
- **Purpose**: Identifies untested parts of your codebase, ensuring comprehensive test coverage.

### Choosing the Right Tool 🛠️

Selecting the right testing tool depends on:

- **Project Needs**: Type of testing required (unit, integration, end-to-end).
- **Team Preferences**: Familiarity and experience with the tool.
- **Integration Capabilities**: Compatibility with other tools in your development stack.

The combination of these tools can create a robust testing environment that ensures your applications are tested thoroughly, from individual units to user interactions across different browsers.

---

## Getting Started with Jest in ExpressJS (20 minutes) 🛠

Integrating Jest into your ExpressJS project streamlines testing, from unit tests to integration tests. Here's a quick guide with code examples to get you started.

### Step 1: Install Jest

First, add Jest to your project:

```bash
npm install --save-dev jest
```

### Step 2: Configure Jest

Modify your `package.json` to include a script for running Jest:

```json
"scripts": {
  "test": "jest"
}
```

### Step 3: Setting Up Your First Test

Assume you have an Express route `/api/users` in `app.js` that returns a list of users:

```javascript
// app.js
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.status(200).json([{ name: 'John Doe' }]);
});

module.exports = app;
```

Create a test file `app.test.js` to test this route:

```javascript
// app.test.js
const request = require('supertest');
const app = require('./app');

describe('GET /api/users', () => {
  it('responds with a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ name: 'John Doe' }]);
  });
});
```

### Step 4: Running Your Tests

Execute your tests with:

```bash
npm test
```

Jest will automatically find and run files ending in `.test.js`, reporting the results in the terminal.

### Additional Tips:

- **Testing Asynchronous Code**: Use `async/await` for handling asynchronous operations in your tests.
- **Mocking**: Jest offers built-in functions for mocking external modules and APIs, enhancing test isolation and speed.
- **Integration Testing**: Beyond unit tests, use `supertest` with Jest to test Express routes, ensuring your API responses as expected.

### Example: Mocking with Jest

If your route interacts with a database or external service, you can mock these interactions. Assume you have a function `getUser` that you want to mock:

```javascript
// users.js
async function getUser(id) {
  // Imagine this function fetches a user from a database
}

module.exports = { getUser };
```

Your test file could mock `getUser` like this:

```javascript
// users.test.js
const users = require('./users');

jest.mock('./users', () => ({
  getUser: jest.fn().mockResolvedValue({ name: 'John Doe', id: 1 }),
}));

test('mocking getUser function', async () => {
  expect(await users.getUser(1)).toEqual({ name: 'John Doe', id: 1 });
});
```

This simple mock replaces the actual `getUser` function with a version that immediately resolves with a specified object, making your tests fast and predictable.

### Conclusion

Integrating Jest with ExpressJS simplifies the testing process, making it easier to ensure your applications behave as expected. By following these steps and utilizing Jest's features, you can build robust tests for your ExpressJS applications.

---

## Advanced Jest Features (20 minutes) 🧪

Diving deeper into Jest's capabilities can greatly enhance your testing suite, especially when it comes to isolating your tests and ensuring they run under controlled conditions. Let's explore mocking dependencies and spying on function calls with Jest.

### Mocking Dependencies with Jest

Mocking is crucial for unit testing, allowing you to replace parts of your system under test with mock implementations. This ensures tests run quickly and reliably by controlling the test environment.

**Example: Mocking an External Module**

Suppose you have a module `emailService` that sends an email, but you don't want to send actual emails when testing your function that uses this service.

**emailService.js**:
```javascript
class EmailService {
  sendEmail(recipient, content) {
    // Logic to send email
  }
}

module.exports = new EmailService();
```

**userNotifications.js**:
```javascript
const emailService = require('./emailService');

function sendWelcomeEmail(userEmail) {
  const message = "Welcome to our platform!";
  emailService.sendEmail(userEmail, message);
}

module.exports = { sendWelcomeEmail };
```

To mock the `emailService` in your tests:

**userNotifications.test.js**:
```javascript
jest.mock('./emailService');

const { sendWelcomeEmail } = require('./userNotifications');
const emailService = require('./emailService');

describe('sendWelcomeEmail', () => {
  it('calls sendEmail with the correct arguments', () => {
    sendWelcomeEmail('test@example.com');

    expect(emailService.sendEmail).toHaveBeenCalledWith('test@example.com', "Welcome to our platform!");
  });
});
```

### Spying on Function Calls

Sometimes, instead of fully mocking a function or a module, you want to observe calls to it, especially to ensure it's being called correctly. This is where Jest's spying functionality comes into play.

**Example: Spying on a Method Call**

Imagine you have a `logger` object with a method `info` that you want to spy on, but not necessarily mock entirely.

**logger.js**:
```javascript
const logger = {
  info(message) {
    console.log(`Info: ${message}`);
  }
}

module.exports = logger;
```

To spy on the `info` method:

**app.test.js**:
```javascript
const logger = require('./logger');

describe('logger.info', () => {
  it('is called with the correct message', () => {
    const spy = jest.spyOn(logger, 'info');
    
    logger.info('Test message');

    expect(spy).toHaveBeenCalledWith('Test message');

    spy.mockRestore(); // Optional: restores the original implementation
  });
});
```

### Key Takeaways

- **Mocking**: Use `jest.mock()` to replace entire modules or functions with mock implementations. This is useful for isolating your tests from external services or modules.
- **Spying**: Use `jest.spyOn()` to observe calls to functions without affecting their actual implementation. This is useful for verifying that functions are called correctly without altering their behavior.

---
## Key Points

### Testing Is Not an Afterthought 🚀
- **Integrate Early and Often**: Testing should be woven into the fabric of your development process from the beginning. It's not just a final hurdle before deployment.

### Embrace Testing Methodologies 📚
- **Understand TDD and BDD**: These aren't just buzzwords but methodologies that can guide your development process, making it more efficient and reliable. Choose the one that aligns with your project's needs and team dynamics.

### Automate Where You Can 🤖
- **Leverage Automation**: Automated tests save time and increase reliability. They're repeatable, fast, and help catch bugs early in the development cycle.

### Balance Is Key ⚖️
- **Unit, Integration, and E2E Tests**: Each type of testing serves a purpose. Unit tests for function logic, integration tests for module interactions, and end-to-end tests for user flow. A balanced test suite covers more ground.

### Quality Over Quantity 🌟
- **Meaningful Tests**: Writing hundreds of tests is less important than having meaningful ones. Each test should have a clear purpose and contribute to your understanding of the application's health.

### Continuous Learning 🌱
- **Keep Evolving**: The testing landscape is always changing. Stay curious and open to new tools, techniques, and practices that can enhance your testing strategy.

### Collaboration and Communication 🤝
- **Involve Everyone**: Testing isn't just for QA engineers. Developers, product managers, and designers all play a role in creating a quality product. Effective communication and collaboration across these roles are crucial.

### Real-World Complexity 🌍
- **Prepare for Complexity**: Real-world applications are complex and unpredictable. Testing helps you prepare for this complexity, ensuring your application behaves as expected under various conditions.

### Testing Shows Care 💌
- **Quality Shows You Care**: Beyond just avoiding bugs, a well-tested application shows your users that you care about their experience. It’s a reflection of your commitment to quality and reliability.

### Never Stop Testing 🛤️
- **Continuous Improvement**: As your application grows and evolves, so should your tests. Regularly review and update your tests to match new features and changes in your application
---

## Additional Resources 📖

- [Jest Official Documentation](https://jestjs.io/)
- [ExpressJS Testing Best Practices](https://expressjs.com/en/advanced/best-practice-testing.html)
- [Understanding TDD and BDD](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

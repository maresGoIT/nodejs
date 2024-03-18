---
title: NodeJS - Lesson 11
description: Fullstack Online - GoIT - Lesson
tags:
  - nodemail
  - sendgrid
  - docker
---

# Lesson 11 - Integrating NodeMailer, SendGrid, & Dockerizing Express Apps 📬🐳

## Objective 🎯

By the end of this lesson you should know how to:

1. Implement NodeMailer for sending emails in Express apps.
2. Utilize SendGrid for enhanced email delivery.
3. Containerize the Express app with Docker for deployment.

## Part 1: NodeMailer Introduction 📧

### Key Concepts

- **NodeMailer**: A module for Node.js that simplifies email sending.
- **SMTP**: The protocol NodeMailer uses to send emails.

### How an email is sent

![Image](https://sendgrid.com/content/dam/sendgrid/legacy/2019/07/Screen-Shot-2021-02-05-at-2.23.04-PM.png)

### Code Example

```javascript
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "youremail@gmail.com",
    pass: "yourpassword",
  },
});

let mailOptions = {
  from: "youremail@gmail.com",
  to: "recipient@example.com",
  subject: "Test Email",
  text: "Hello from NodeMailer!",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
```

### Tips

-The importance of using environment variables for sensitive information like email credentials.

## Part 2: Enhancing Delivery with SendGrid 🚀

### Key Concepts

- **SendGrid**: A cloud-based service offering reliable email delivery, scalability, and detailed analytics.
- **API Key**: A secure way to authenticate with SendGrid's API.

### Code Example

First, install the SendGrid Node.js client library: `npm install @sendgrid/mail`

```javascript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "recipient@example.com",
  from: "youremail@example.com",
  subject: "Using SendGrid with NodeMailer",
  text: "Hello, this is a test email sent using SendGrid.",
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
```

### Tips

- Highlight the transition from SMTP to using SendGrid for reliability and scalability.
- Discuss the setup process for SendGrid and the generation of API keys.

## Part 3: Dockerizing the Application 🐳

### Key Concepts

- **Docker**: A platform for developing, shipping, and running applications in containers.
- **Dockerfile**: A text document that contains all the commands to assemble an image.

### Dockerfile Example

```Dockerfile
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

### Tips

- The benefits of Docker, such as consistent environments and simplified deployment.
- Demonstrate the process of building and running a Docker container.

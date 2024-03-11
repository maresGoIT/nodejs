---
title: NodeJS - Lesson 9
description: 
tags:
  - 
---
# Lesson 9: Handling File Uploads with Node.js 🚀

## Introduction 🌟

Welcome to a deep dive into managing file uploads from an HTML form to a server, focusing on encoding types and the Node.js environment using Express. Get ready to unlock the power of file uploads in your web applications!

## Importance of File Uploads 🗂

File uploads enrich web applications by allowing users to share content like images, documents, and videos, making interactions more dynamic and personalized.

## Encoding Types Explained 🔍

HTML forms use different encoding types for data submission:

- **`application/x-www-form-urlencoded`**: The default type, great for text but not for files.
- **`multipart/form-data`**: The go-to for uploading files due to its ability to handle binary data alongside text.

## Express and `multipart/form-data` 🛠

Express doesn't handle `multipart/form-data` natively. For file uploads, we turn to additional tools like Multer and Formidable.

## File Upload Approaches 📤

Post-upload, choose between:
1. **Direct Response**: Immediate HTML or JSON feedback.
2. **Redirection**: Using status codes like 303 for a smoother UX.
---

### Implementing File Uploads with Multer 🚚

Multer is an Express middleware that simplifies handling `multipart/form-data`, ideal for uploading files within Express applications.

### Installation 📦
```bash
npm install multer
```

### Setting Up Multer in an Express Application 🛠

#### Client side
```html
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
```

#### Server side
```javascript
const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})
```

### Multer's Flexibility 🌟

Multer provides several functions to control how files are stored, including `multer.diskStorage` for disk-based storage and `multer.memoryStorage` for storing files in memory. It also supports file filtering through the `fileFilter` option, allowing you to specify which files should be accepted.

### Testing the Implementation 🧪

You can test the file upload functionality using tools like Postman or by creating a simple HTML form that posts data to your `/upload` endpoint. Ensure the form's `enctype` is set to `multipart/form-data`.

---

## Implementing File Uploads with Formidable 🚀

Formidable excels in flexibility and performance, ideal for large file handling across any Node.js framework.

### Installation 📥
```bash
npm install formidable
```

### Express Integration Example 🛠
```javascript
import express from 'express';
import formidable from 'formidable';

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

app.post('/api/upload', (req, res, next) => {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000 ...');
});
```


---
## Multer vs. Formidable: A Comparison 🤼

### Multer 📦

**Pros:**
- Easy Express integration.
- Custom storage options.
- Auto-parses files and fields.
- Built-in file filtering.

**Cons:**
- Express-only.
- One storage engine per instance.

### Formidable 🦸

**Pros:**
- Framework-agnostic.
- Powerful file parsing.
- Event-driven.
- Full control over file handling.

**Cons:**
- More setup required.
- No built-in middleware.
- Manual handling for different storage options.

## Decision Time: Multer or Formidable? 💡

Choose **Multer** for Express-based projects needing straightforward file handling. Opt for **Formidable** for more complex scenarios or non-Express environments.

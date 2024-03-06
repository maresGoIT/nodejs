Pentru a construi un REST API care include autentificarea și autorizarea utilizatorilor folosind JWT și permite utilizatorilor să interacționeze cu o colecție de contacte, vom urma pașii descriși mai jos, utilizând Node.js, Express, Mongoose pentru MongoDB, și pachetele `jsonwebtoken` și `bcryptjs` pentru gestionarea token-urilor și a hash-ului parolelor.

### Pasul 1: Crearea Modelului Utilizator

Începeți prin definirea modelului pentru utilizatori și contacte în baza de date MongoDB folosind Mongoose.

**Model Utilizator (`User.js`):**

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
```

**Model Contact (`Contact.js`):**

```javascript
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  // Alte câmpuri necesare pentru contact
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
```

### Pasul 2: Înregistrarea și Logarea

**Înregistrarea (`/users/signup`):**

```javascript
const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res
      .status(201)
      .send({ user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    if (error.code === 11000) {
      // Verifică dacă emailul este unic
      res.status(409).send({ message: "Email in use" });
    } else {
      res.status(400).send(error);
    }
  }
});
```

**Logarea (`/users/login`):**

```javascript
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    user.token = token;
    await user.save();
    res.send({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
```

### Pasul 3: Verificarea Token-ului

**Middleware pentru verificarea token-ului (`auth.js`):**

```javascript
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, token: token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ message: "Not authorized" });
  }
};

module.exports = auth;
```

### Pasul 4: Logout

**Endpoint-ul `/users/logout` pentru deconectarea utilizatorilor:**

```javascript
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
```

### Pasul 5: Current User - Obținerea Datelor Utilizatorului

\*\*Endpoint-ul `/users/current` pentru

a obține datele utilizatorului curent bazat pe token:\*\*

```javascript
router.get("/current", auth, (req, res) => {
  res.send({ email: req.user.email, subscription: req.user.subscription });
});
```

Asigurați-vă că adăugați middleware-ul `auth` la rutele care necesită autentificare pentru a proteja accesul doar la utilizatorii autorizați. Nu uitați să setați variabila de mediu `JWT_SECRET` pentru semnătura token-ului JWT.

Această bază vă oferă un API REST complet pentru gestionarea utilizatorilor și a contactelor lor, cu suport pentru autentificare și autorizare bazată pe JWT.

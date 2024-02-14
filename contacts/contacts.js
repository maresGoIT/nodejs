const fs = require("fs");
const path = require("path");
const contactsPath = path.resolve(__dirname, "db", "contacts.json");

function listContacts() {
  const contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  console.table(contacts);
}

function getContactById(contactId) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  const contact = contacts.find((c) => c.id === contactId);
  console.log(contact);
}

function removeContact(contactId) {
  let contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  contacts = contacts.filter((c) => c.id !== contactId);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(`Contact with ID ${contactId} has been removed.`);
}

function addContact(name, email, phone) {
  let contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  console.log("Contact has been added.");
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

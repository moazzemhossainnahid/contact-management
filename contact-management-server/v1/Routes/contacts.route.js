const express = require("express");
const contactsController = require("../Controllers/contacts.controller");
// const validateRequest = require("../../Utilities/validateRequest");
// const contactSchema = require("../Validations/contacts.validation");
const router = express.Router();

// add a contact
router.post("/create-contact", contactsController.AddAContact);

// update a contact
router.patch("/:id", contactsController.updateAContact);

// get all contacts
router.get("/", contactsController.getAllContacts);

// get single contact
router.get("/:id", contactsController.getSingleContact);

// delete a contact
router.delete("/:id", contactsController.deleteAContact);

module.exports = router;

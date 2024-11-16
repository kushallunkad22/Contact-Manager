const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { contactSchema } = require('./validation');
const { z } = require("zod");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => res.json({ msg: "Hello World with Prisma and Validation!" }));

// GET all contacts
app.get("/contacts", async (req, res) => {
    try {
        const contacts = await prisma.contact.findMany();
        res.json({ contacts });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// POST: Add a new contact
app.post("/contacts", async (req, res) => {
    try {
        // Validate input data
        const validatedData = contactSchema.parse(req.body);

        // Save the new contact
        const contact = await prisma.contact.create({
            data: validatedData,
        });

        res.json({ message: "Contact created successfully", contactId: contact.id });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// PUT: Update a contact
app.put("/contacts/:contactId", async (req, res) => {
    try {
        const contactId = req.params.contactId;
        console.log(contactId);
        const validatedData = contactSchema.parse(req.body);

// Use normalizedId in Prisma queries
const contact = await prisma.contact.update({
    where: { id: contactId },
    data: validatedData,
});

     
        res.json({ message: "Contact updated successfully", contact });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// GET: Fetch a specific contact
app.get("/contacts/:contactId", async (req, res) => {
    try {
        const contactId = req.params.contactId;

        const contact = await prisma.contact.findUnique({
            where: { id: contactId },
        });

        if (contact) {
            res.json({ contact });
        } else {
            res.status(404).json({ message: "Contact not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// DELETE: Delete a contact
app.delete("/contacts/:contactId", async (req, res) => {
    try {
        const contactId = req.params.contactId;

        const contact = await prisma.contact.delete({
            where: { id: contactId },
        });

        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Start the server
app.listen(8787, () => console.log('Server running on port 8787'));

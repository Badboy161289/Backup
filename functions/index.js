const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Set up Firestore database
const db = admin.firestore();

// Create an Express app
const app = express();
app.use(cors({ origin: true }));

// Define a route for creating an invoice
app.post('/createInvoice', async (req, res) => {
    try {
        const data = req.body;
        const docRef = await db.collection('invoices').add(data);
        res.status(201).send({ id: docRef.id });
    } catch (error) {
        console.error('Error adding document:', error);
        res.status(500).send(error.toString());
    }
});

// Define a route for retrieving all invoices
app.get('/getInvoices', async (req, res) => {
    try {
        const snapshot = await db.collection('invoices').get();
        const invoices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(invoices);
    } catch (error) {
        console.error('Error getting documents:', error);
        res.status(500).send(error.toString());
    }
});

// Export the Express app as a Firebase Function
exports.api = functions.https.onRequest(app);

import express from "express";
const app = express();
const port = 4000;

app.use(express.json());

let bookings = [];
let nextId = 1;

//Get all event bookings
app.get('/api/bookings', (req, res) => {
    res.json(bookings);
});

//Create a new booking
app.post('/api/bookings', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const newBooking = { id: nextId++, name, email };
    bookings.push(newBooking);
    res.status(201).json(newBooking);
});

//Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const booking = bookings.find(b => b.id === id);
    if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
});

//Update participant details
app.put('/api/bookings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const bookingIndex = bookings.findIndex(b => b.id === id);
    if (bookingIndex === -1) {
        return res.status(404).json({ error: 'Booking not found' });
    }
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    bookings[bookingIndex] = { id, name, email };
    res.json(bookings[bookingIndex]);
});

//Cancel a booking
app.delete('/api/bookings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookingIndex = bookings.findIndex(b => b.id === id);
    if (bookingIndex === -1) {
        return res.status(404).json({ error: 'Booking not found' });
    }
    bookings.splice(bookingIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

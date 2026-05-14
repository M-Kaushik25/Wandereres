const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('./wanderers.db');

// API: Get all packages
app.get('/api/packages', (req, res) => {
  db.all('SELECT * FROM packages', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// API: Get a single package
app.get('/api/packages/:id', (req, res) => {
  db.get('SELECT * FROM packages WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

// API: Create a booking
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, package_id, travel_date, passengers } = req.body;
  
  // Basic Normalization Handling: Ensure User exists or create new
  db.get('SELECT id FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (user) {
      insertBooking(user.id, package_id, travel_date, passengers, res);
    } else {
      db.run('INSERT INTO users (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        insertBooking(this.lastID, package_id, travel_date, passengers, res);
      });
    }
  });
});

function insertBooking(user_id, package_id, travel_date, passengers, res) {
  db.run('INSERT INTO bookings (user_id, package_id, travel_date, passengers) VALUES (?, ?, ?, ?)', 
    [user_id, package_id, travel_date, passengers], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Booking successful', booking_id: this.lastID });
    }
  );
}

// API: Get all bookings (for Admin)
app.get('/api/admin/bookings', (req, res) => {
  const query = `
    SELECT bookings.id, bookings.booking_date, bookings.travel_date, bookings.passengers, bookings.status,
           users.name as user_name, users.email as user_email,
           packages.title as package_title, packages.price as package_price
    FROM bookings
    JOIN users ON bookings.user_id = users.id
    JOIN packages ON bookings.package_id = packages.id
    ORDER BY bookings.booking_date DESC
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

app.listen(port, () => {
  console.log(`Wanderers server running at http://localhost:${port}`);
});

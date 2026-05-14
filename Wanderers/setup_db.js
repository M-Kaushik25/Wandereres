const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./wanderers.db');

db.serialize(() => {
  // Table: users
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL
  )`);

  // Table: packages
  db.run(`CREATE TABLE IF NOT EXISTS packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    destination TEXT NOT NULL,
    duration_days INTEGER NOT NULL,
    price REAL NOT NULL,
    image_url TEXT NOT NULL
  )`);

  // Table: bookings (Normalization: many-to-many relationship tracking via a junction table essentially, linking users to packages)
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    package_id INTEGER,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'Pending',
    travel_date DATE NOT NULL,
    passengers INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(package_id) REFERENCES packages(id)
  )`);

  // Insert initial package data
  const stmt = db.prepare(`INSERT INTO packages (title, description, destination, duration_days, price, image_url) VALUES (?, ?, ?, ?, ?, ?)`);
  stmt.run('Taj Mahal Heritage Tour', 'Witness the majestic beauty of the Taj Mahal and explore the Mughal architecture of Agra.', 'Agra, UP', 3, 300.00, 'https://images.unsplash.com/photo-1564507592208-528756c60205?w=800');
  stmt.run('Kerala Backwaters Retreat', 'Relax on the serene houseboats and enjoy the lush green landscapes of Kerala.', 'Kerala', 5, 500.00, 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800');
  stmt.run('Goa Beach Holidays', 'Experience the vibrant nightlife and beautiful sandy beaches of Goa.', 'Goa', 4, 400.00, 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800');
  stmt.run('Jaipur Royal Palace Tour', 'Discover the Pink City, royal palaces, and rich cultural heritage of Rajasthan.', 'Jaipur, Rajasthan', 4, 450.00, 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800');
  stmt.run('Himalayan Trek - Manali', 'Embark on a thrilling trekking adventure in the snow-capped Himalayan mountains.', 'Manali, HP', 6, 600.00, 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800');
  stmt.run('Varanasi Spiritual Journey', 'Feel the spiritual aura with Ganga Aarti and boat rides on the sacred river Ganges.', 'Varanasi, UP', 3, 250.00, 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800');
  stmt.finalize();

  console.log("Database and tables created successfully with dummy data.");
});

db.close();

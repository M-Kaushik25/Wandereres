# Wanderers – Tour Package Management System

Wanderers is a responsive, modern web application designed for browsing, booking, and managing curated tour packages. It features a beautiful, dynamic frontend alongside a robust backend built to demonstrate database management system (DBMS) normalization concepts.

## 🌟 Features

* **Beautiful UI:** A visually stunning frontend utilizing Tailwind CSS, modern typography, glassmorphism, and responsive layouts.
* **Tour Browsing:** Dynamic loading of beautifully curated tour destinations.
* **Booking System:** Seamless and intuitive booking form that captures user and travel details.
* **Admin Dashboard:** A dedicated management panel to view overarching booking statistics, track revenue, and monitor booking statuses.
* **Relational Database:** Backend powered by SQLite, fully normalized with `users`, `packages`, and a many-to-many relationship tracked via `bookings`.

## 🛠️ Tech Stack

* **Frontend:** HTML5, Vanilla CSS, JavaScript, Tailwind CSS (via CDN)
* **Backend:** Node.js, Express.js, CORS
* **Database:** SQLite3

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd "Wanderers"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize the database:**
   This will create the `wanderers.db` file and populate it with initial data (exclusive Indian destinations).
   ```bash
   npm run setup
   ```

4. **Start the application:**
   ```bash
   npm start
   ```

5. **View in Browser:**
   Open your browser and navigate to `http://localhost:3000`.

## 📁 Project Structure

* `server.js` - Express backend API serving endpoints for packages and bookings.
* `setup_db.js` - Database schema initialization and data seeding script.
* `wanderers.db` - SQLite database file (generated after setup).
* `public/` - Static frontend files:
  * `index.html` - The main landing page.
  * `booking.html` - The package booking form interface.
  * `admin.html` - The admin dashboard for viewing metrics and bookings.

## 📝 DBMS Normalization
The database utilizes relational concepts to ensure data integrity:
- **`users` Table:** Stores unique user profiles (Name, Email, Phone).
- **`packages` Table:** Stores tour details (Destination, Price, Duration).
- **`bookings` Table:** A junction table connecting Users and Packages. It captures the transaction state (Booking Date, Travel Date, Passengers, Status) mapping foreign keys to ensure strong relational boundaries.

---
*Developed for the Wanderers Tour Package Management System project.*

const express = require('express'); // include express
const mysql = require('mysql2'); // include mysql
const cors = require('cors'); // include cors

const app = express();

// CORS
app.use(cors());

// JSON requests
app.use(express.json());

// MySQL connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // MySQL username
    password: 'qwe#@!123', // MySQL password
    database: 'crowdfunding_db', // database
    port: 3306 // MySQL port
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('sucess');
});

// Get active fundraisers with categories --- home
app.get('/api/fundraisers', (req, res) => {
    const query = `
        SELECT f.*, c.NAME
        FROM fundraiser f
        JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
        WHERE f.ACTIVE = 1`;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Get categories ---search
app.get('/api/categories', (req, res) => {
    const query = 'SELECT * FROM category';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Query to select active fundraisers ---- search
app.get('/api/search', (req, res) => {
    // Filtering criteria from query parameters
    const {
        category,
        organizer,
        city
    } = req.query;

    // Select active fundraisers
    let query = `
        SELECT f.*, c.NAME 
        FROM fundraiser f
        JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
        WHERE f.ACTIVE = 1`;

    // Add conditions to the query based on the provided parameters
    const queryParams = [];

    if (category) {
        query += ` AND f.CATEGORY_ID = ?`;
        queryParams.push(category);
    }

    if (organizer) {
        query += ` AND f.ORGANIZER LIKE ?`;
        queryParams.push(`%${organizer}%`);
    }

    if (city) {
        query += ` AND f.CITY LIKE ?`;
        queryParams.push(`%${city}%`);
    }

    // Database query
    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Get detail by ID ---- fundraiser
app.get('/api/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id;

    const query = `
      SELECT f.*, c.NAME
      FROM fundraiser f
      JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
      WHERE f.FUNDRAISER_ID = ?`;

    db.query(query, [fundraiserId], (err, fundraiser) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        if (fundraiser.length === 0) {
            return res.status(404).send('Fundraiser not found');
        }

        // Search donation list by fundraiserId
        const donationsQuery = `
        SELECT * FROM donation WHERE FUNDRAISER_ID = ?`;

        db.query(donationsQuery, [fundraiserId], (err, donations) => {
            if (err) {
                return res.status(500).send('Database error');
            }
            res.json({
                fundraiser: fundraiser[0],
                donations: donations
            });
        });
    });
});

// Insert new donation for a specified fundraiser  ---- donation
app.post('/api/donation', (req, res) => {
    const {
        date,
        amount,
        giver,
        fundraiserId
    } = req.body;

    // Insert query
    const donationQuery = `
      INSERT INTO donation (DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES (?, ?, ?, ?)`;

    db.query(donationQuery, [date, amount, giver, fundraiserId], (err, result) => {
        if (err) {
            return res.status(500).send('Insert error');
        }
        res.json({
            donationId: result.insertId
        });
    });
});

// Insert new fundraiser ---- admin
app.post('/api/admin/fundraiser', (req, res) => {
    const {
        organizer,
        caption,
        targetFunding,
        currentFunding,
        city,
        active,
        categoryId
    } = req.body;
    
    // Insert fundraiser query
    const fundraiserQuery = `
      INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(fundraiserQuery, [organizer, caption, targetFunding, currentFunding, city, active, categoryId], (err, result) => {
        if (err) {
            return res.status(500).send('Insert error');
        }
        res.json({
            fundraiserId: result.insertId
        });
    });
});

// Update fundraiser by id ---- admin
app.put('/api/admin/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id;
    const {
        organizer,
        caption,
        targetFunding,
        currentFunding,
        city,
        active,
        categoryId
    } = req.body;

    // Update fundraiser query
    const updateQuery = `
      UPDATE fundraiser 
      SET ORGANIZER = ?, CAPTION = ?, TARGET_FUNDING = ?, CURRENT_FUNDING = ?, CITY = ?, ACTIVE = ?, CATEGORY_ID = ?
      WHERE FUNDRAISER_ID = ?`;

    db.query(updateQuery, [organizer, caption, targetFunding, currentFunding, city, categoryId, active, fundraiserId], (err, result) => {
        if (err) {
            return res.status(500).send('Update error');
        }
        res.send('Fundraiser updated successfully');
    });
});

// Delete fundraiser by iD ---- admin
app.delete('/api/admin/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id;

    // Check any donations associated with the fundraiser
    const checkDonationsQuery = `
      SELECT COUNT(*) AS count FROM donation WHERE FUNDRAISER_ID = ?`;

    db.query(checkDonationsQuery, [fundraiserId], (err, results) => {
        if (err) {
            return res.status(500).send('Delete error');
        }

        if (results[0].count > 0) {
            return res.status(400).send('Cannot delete fundraiser with existing donations');
        }

        // Proceed to delete the fundraiser
        const deleteQuery = `
        DELETE FROM fundraiser WHERE FUNDRAISER_ID = ?`;

        db.query(deleteQuery, [fundraiserId], (err, result) => {
            if (err) {
                return res.status(500).send('Delete error');
            }
            res.send('Fundraiser deleted successfully');
        });
    });
});

// server listen
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`localhost:${PORT}`);
});
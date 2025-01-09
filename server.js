import express from 'express';
import pg from 'pg';
const {Pool} = pg;
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authenticateToken from './middleware/authenticateToken.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use authRoutes for authentication endpoints
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/todos', authenticateToken, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM todos WHERE user_id = $1', [req.user.id]);
  res.json(rows);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
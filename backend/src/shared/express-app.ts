import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Azure Function with Express!' });
});

export default app; 
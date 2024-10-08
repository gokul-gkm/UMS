import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDb from './config/db.js';

connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });

  app.use('/api/admin', adminRoutes);
  app.use('/api/users', userRoutes);


app.get('/', (req, res) => res.send(`Server is ready`))

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running  on port ${port}`));
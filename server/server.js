import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const connection = async () => {
  await mongoose.connect(databaseURL).then(() => {
    console.log('Connected to the database');
  });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

connection();

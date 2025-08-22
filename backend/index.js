import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/admin.js';
import ownerRoutes from "./routes/owner.js";
import storeRoutes from "./routes/store.js";
import ratingRoutes from "./routes/rating.js";
import ownerRoutes from "./routes/owner.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/users', authRoutes);
app.use('/admin',adminRoutes);
app.use('/owner',ownerRoutes)
app.use(storeRoutes);
app.use(ratingRoutes);

app.use("/owner", ownerRoutes);

console.log(process.env.JWT_SECRET)
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
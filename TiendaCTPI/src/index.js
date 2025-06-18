import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoutes from './routers/auth.js';
import userRoutes from './routers/user.js';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido a mi app");
});


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(" Conectado a MongoDB Atlas");

    
    app.use("/api", userRoutes);
    app.use("/auth", authRoutes);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error.message);
  });

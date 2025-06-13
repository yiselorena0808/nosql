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

// Conexión a MongoDB y levantamiento del servidor solo si tiene éxito
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Conectado a MongoDB Atlas");

  // Aquí se monta el router después de conectar a la BD
  app.use("/api", userRoutes);
  app.use("/auth", authRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  });
})
.catch((error) => {
  console.error("❌ Error al conectar a MongoDB:", error.message);
});


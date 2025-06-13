import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js'; 

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
   
    const hashedPassword = await bcrypt.hash(req.body.password, 10);


    const newUser = new User({
      ...req.body,
      password: hashedPassword
    });


    const savedUser = await newUser.save();

    res.json(savedUser);
  }  catch (error) {
  console.error("Error al guardar usuario:", error.message);
  res.status(500).json({ error: error.message });
  }
});

export default router;


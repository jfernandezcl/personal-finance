import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Solo el usuario autenticado puede ver su perfil
router.get('/profile', authMiddleware, getUserProfile);

export default router;
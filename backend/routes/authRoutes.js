import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  res.send('Registro de usuario');
});

router.post('/login', (req, res) => {
  res.send('Inicio de sesión');
});

export default router;


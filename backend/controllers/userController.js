export const getUserProfile = (req, res) => {
  const userIdData = req.userId; // Este valor viene del middleware (verifica si es un Buffer o un objeto)

  // Si es un objeto con una propiedad "data", convierte ese array a Buffer y luego a hexadecimal
  let userIdHex;
  if (userIdData && userIdData.data) {
    userIdHex = Buffer.from(userIdData.data).toString('hex');
  } else if (Buffer.isBuffer(userIdData)) {
    userIdHex = userIdData.toString('hex');
  } else {
    userIdHex = String(userIdData);
  }

  res.json({
    msg: 'User profile',
    userId: userIdHex
  });
};

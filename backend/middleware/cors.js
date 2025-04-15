import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173", // Asegúrate de poner la URL correcta de tu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Si estás utilizando autenticación basada en cookies o sesiones
};

export default cors(corsOptions);

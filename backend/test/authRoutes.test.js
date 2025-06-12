import request from "supertest";
import express from "express";
import authRoutes from "../routes/authRoutes.js";
import db from "../database/db.js"; // Ajusta si tu ruta es distinta

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Routes", () => {
  const timestamp = Date.now();
  const testUsers = [
    {
      username: `testuser_${timestamp}`,
      email: `testuser_${timestamp}@example.com`,
      password: "testpassword",
    },
    {
      username: `loginuser_${timestamp}`,
      email: `loginuser_${timestamp}@example.com`,
      password: "securepassword",
    },
  ];

  afterAll(async () => {
    // Limpia los usuarios de prueba de la base de datos
    await db.query("DELETE FROM users WHERE email IN (?, ?)", [
      testUsers[0].email,
      testUsers[1].email,
    ]);

    // Cierra la conexión a la base de datos
    await db.end();
  });

  test("POST /register responde con 201", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUsers[0]);
    expect(response.statusCode).toBe(201);
  });

  test("POST /login responde con 200", async () => {
    // Asegura que el usuario existe antes del login
    await request(app).post("/api/auth/register").send(testUsers[1]);

    const response = await request(app).post("/api/auth/login").send({
      email: testUsers[1].email,
      password: testUsers[1].password,
    });

    expect(response.statusCode).toBe(200);
  });
});

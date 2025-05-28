# 💸 Aplicación de Finanzas Personales

Esta aplicación permite a los usuarios gestionar sus transacciones financieras, registrarse e iniciar sesión de forma segura, incluyendo autenticación con Google.

---

## 📝 Resumen

La aplicación permite a los usuarios:

- Registrarse e iniciar sesión con email y contraseña
- Iniciar sesión con su cuenta de Google usando OAuth 2.0
- Gestionar transacciones financieras agregando, visualizando y eliminando ingresos o gastos
- Actualizar su perfil y cambiar su contraseña de forma segura
- Interactuar con una interfaz amigable, moderna y responsiva

---

## ⚙️ Arquitectura

El proyecto está dividido en dos partes principales:

### Backend

- Construido con **Node.js**, **Express** y **MySQL**
- Provee endpoints RESTful para autenticación, gestión de usuarios y transacciones
- Maneja la encriptación de contraseñas con **bcrypt** y la autenticación mediante **JWT**
- Soporta inicio de sesión vía Google OAuth 2.0

### Frontend

- Construido con **React** y **Vite**
- Utiliza la API **fetch** para comunicarse con el backend
- Estilizado con **Tailwind CSS** para una UI moderna y responsiva
- Soporta flujos de autenticación y gestión de transacciones

---

## 🔧 Tecnologías

- Node.js, Express, MySQL, JWT, bcrypt, Google OAuth
- React, Vite, Tailwind CSS, Fetch API

---

## 👤 Autor

Javi Fernández

---

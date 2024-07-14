const mysql = require('mysql2');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conexión a la base de datos MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.static('public'));

// Definir rutas y lógica del servidor aquí
app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM your_table', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

io.on('connection', (socket) => {
  console.log('New client connected');
  // Lógica de Socket.IO aquí

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3311;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

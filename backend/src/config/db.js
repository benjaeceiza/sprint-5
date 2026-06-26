

const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

// Función que inicializa y devuelve la conexión a la base de datos
const connectDB = async () => {
    return open({
        // El archivo se va a crear en la raíz de tu carpeta backend
        filename: './ecommerce.sqlite', 
        driver: sqlite3.Database
    });
};

module.exports = connectDB;
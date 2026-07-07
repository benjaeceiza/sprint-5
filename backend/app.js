const express = require('express');
const dotenv = require('dotenv');
const productRouter = require("./src/routes/product.router");
const categoryRouter = require('./src/routes/category.router.js'); 
const storeRouter = require('./src/routes/store.router.js');
const cors = require('cors'); 
const initDB = require('./src/config/initDB'); 

dotenv.config();
const app = express();

// --- MIDDLEWARES ---
app.use(cors()); 
app.use(express.json());

// --- RUTAS ---
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter); 
app.use('/api/stores', storeRouter);

// --- LEVANTAMOS EL SERVIDOR Y LA DB ---
app.listen(process.env.PORT, async () => {
    console.log(`🚀 Servidor escuchando en el puerto ${process.env.PORT}`);
    
    // Ejecutamos la creación de tablas y carga de datos
    await initDB(); 
});
const connectDB = require('./db');


const categoriesData = [
    { "id": 1, "name": "Comida", "slug": "comida" },
    { "id": 2, "name": "Bebidas", "slug": "bebidas" },
    { "id": 3, "name": "Tecnología", "slug": "tecnologia" },
    { "id": 4, "name": "Ropa", "slug": "ropa" },
    { "id": 5, "name": "Belleza", "slug": "belleza" }
];

const productsData = [
    { "id": 1, "name": "Alfajores Havanna 70% Cacao (12 un.)", "code": "#1001", "price": 25000, "stock": 45, "category": "comida", "description": "Caja de 12 alfajores rellenos con mucho dulce de leche y cubiertos con chocolate 70% cacao puro.", "imageUrl": "https://picsum.photos/seed/havanna/300", "images": ["https://picsum.photos/seed/havanna1/300", "https://picsum.photos/seed/havanna2/300"] },
    { "id": 2, "name": "Yerba Mate Playadito 1Kg", "code": "#1002", "price": 4500, "stock": 120, "category": "comida", "description": "Yerba mate suave y duradera con palo, ideal para tomar mates todos los días sin que se lave rápido.", "imageUrl": "https://picsum.photos/seed/yerba/300", "images": ["https://picsum.photos/seed/yerba1/300", "https://picsum.photos/seed/yerba2/300"] },
    { "id": 3, "name": "Dulce de Leche La Serenísima Estilo Colonial 400g", "code": "#1003", "price": 3200, "stock": 80, "category": "comida", "description": "Dulce de leche clásico argentino, textura suave y un sabor inconfundible. Perfecto para postres o comer a cucharadas.", "imageUrl": "https://picsum.photos/seed/ddl/300", "images": ["https://picsum.photos/seed/ddl1/300"] },
    { "id": 4, "name": "Papas Fritas Lay's Clásicas 145g", "code": "#1004", "price": 2800, "stock": 60, "category": "comida", "description": "Las clásicas e inigualables papas fritas Lay's, crujientes y con el punto justo de sal.", "imageUrl": "https://picsum.photos/seed/lays/300", "images": ["https://picsum.photos/seed/lays1/300"] },
    { "id": 5, "name": "Fernet Branca 750ml", "code": "#2001", "price": 11500, "stock": 200, "category": "bebidas", "description": "El clásico aperitivo italiano, infaltable para preparar con bebida cola en las juntadas con amigos.", "imageUrl": "https://picsum.photos/seed/fernet/300", "images": ["https://picsum.photos/seed/fernet1/300", "https://picsum.photos/seed/fernet2/300"] },
    { "id": 6, "name": "Vino Malbec Rutini Reserva", "code": "#2002", "price": 18500, "stock": 35, "category": "bebidas", "description": "Un Malbec de excelente cuerpo y notas a frutos rojos, ideal para acompañar un buen asado.", "imageUrl": "https://picsum.photos/seed/vino/300", "images": ["https://picsum.photos/seed/vino1/300"] },
    { "id": 7, "name": "Cerveza Quilmes Clásica 1L", "code": "#2003", "price": 2400, "stock": 300, "category": "bebidas", "description": "Cerveza rubia tradicional argentina. Retornable, para compartir bien helada.", "imageUrl": "https://picsum.photos/seed/cerveza/300", "images": ["https://picsum.photos/seed/cerveza1/300"] },
    { "id": 8, "name": "Coca-Cola Sabor Original 2.25L", "code": "#2004", "price": 3500, "stock": 150, "category": "bebidas", "description": "Gaseosa cola de siempre. Envase familiar no retornable.", "imageUrl": "https://picsum.photos/seed/coca/300", "images": ["https://picsum.photos/seed/coca1/300"] },
    { "id": 9, "name": "Procesador AMD Ryzen 5 8600G", "code": "#3001", "price": 350000, "stock": 15, "category": "tecnologia", "description": "Excelente procesador con gráficos integrados potentes, ideal para armar una PC gamer económica y jugar a todo en 1080p sin placa de video dedicada.", "imageUrl": "https://picsum.photos/seed/ryzen/300", "images": ["https://picsum.photos/seed/ryzen1/300", "https://picsum.photos/seed/ryzen2/300"] },
    { "id": 10, "name": "Monitor LG UltraGear 24\" 144Hz", "code": "#3002", "price": 280000, "stock": 8, "category": "tecnologia", "description": "Monitor diseñado para gaming fluido, panel IPS con colores vibrantes y tiempo de respuesta de 1ms.", "imageUrl": "https://picsum.photos/seed/monitor/300", "images": ["https://picsum.photos/seed/monitor1/300", "https://picsum.photos/seed/monitor2/300"] },
    { "id": 11, "name": "Teclado Mecánico Redragon Kumara K552", "code": "#3003", "price": 55000, "stock": 25, "category": "tecnologia", "description": "Teclado TKL compacto, switches Outemu Red y retroiluminación RGB. Resistente y duradero.", "imageUrl": "https://picsum.photos/seed/teclado/300", "images": ["https://picsum.photos/seed/teclado1/300"] },
    { "id": 12, "name": "Mouse Logitech G203 Lightsync", "code": "#3004", "price": 38000, "stock": 40, "category": "tecnologia", "description": "Mouse gamer con sensor de 8000 DPI de precisión, iluminación RGB personalizable y diseño ergonómico clásico.", "imageUrl": "https://picsum.photos/seed/mouse/300", "images": ["https://picsum.photos/seed/mouse1/300"] },
    { "id": 13, "name": "Remera Oversize Negra Lisa", "code": "#4001", "price": 18000, "stock": 50, "category": "ropa", "description": "Remera de corte holgado 100% algodón premium. Un básico infaltable en el placard.", "imageUrl": "https://picsum.photos/seed/remera/300", "images": ["https://picsum.photos/seed/remera1/300", "https://picsum.photos/seed/remera2/300"] },
    { "id": 14, "name": "Zapatillas Urbanas Blancas", "code": "#4002", "price": 85000, "stock": 22, "category": "ropa", "description": "Calzado cómodo y versátil, combina con cualquier estilo. Base antideslizante y diseño minimalista.", "imageUrl": "https://picsum.photos/seed/zapatillas/300", "images": ["https://picsum.photos/seed/zapatillas1/300"] },
    { "id": 15, "name": "Pantalón Cargo Beige", "code": "#4003", "price": 42000, "stock": 30, "category": "ropa", "description": "Pantalón estilo cargo con múltiples bolsillos, corte recto y tela resistente al desgaste.", "imageUrl": "https://picsum.photos/seed/cargo/300", "images": ["https://picsum.photos/seed/cargo1/300"] },
    { "id": 16, "name": "Campera de Jean Clásica", "code": "#4004", "price": 65000, "stock": 15, "category": "ropa", "description": "Campera de denim azul oscuro con botones metálicos. Ideal para media estación.", "imageUrl": "https://picsum.photos/seed/campera/300", "images": ["https://picsum.photos/seed/campera1/300"] },
    { "id": 17, "name": "Perfume Importado Sauvage 100ml", "code": "#5001", "price": 190000, "stock": 10, "category": "belleza", "description": "Fragancia masculina fresca y especiada, con excelente fijación y duración en la piel.", "imageUrl": "https://picsum.photos/seed/perfume/300", "images": ["https://picsum.photos/seed/perfume1/300", "https://picsum.photos/seed/perfume2/300"] },
    { "id": 18, "name": "Crema Hidratante Facial Cerave 454g", "code": "#5002", "price": 28000, "stock": 40, "category": "belleza", "description": "Crema hidratante con 3 ceramidas esenciales y ácido hialurónico. Restaura la barrera protectora de la piel.", "imageUrl": "https://picsum.photos/seed/crema/300", "images": ["https://picsum.photos/seed/crema1/300"] },
    { "id": 19, "name": "Protector Solar La Roche-Posay FPS 50+", "code": "#5003", "price": 32000, "stock": 25, "category": "belleza", "description": "Protección de amplio espectro, toque seco y resistente al agua. Ideal para uso diario.", "imageUrl": "https://picsum.photos/seed/solar/300", "images": ["https://picsum.photos/seed/solar1/300"] },
    { "id": 20, "name": "Serum Facial Vitamina C Antimanchas", "code": "#5004", "price": 25000, "stock": 35, "category": "belleza", "description": "Serum concentrado antioxidante que unifica el tono de la piel y aporta luminosidad instantánea.", "imageUrl": "https://picsum.photos/seed/serum/300", "images": ["https://picsum.photos/seed/serum1/300"] }
];

const initDB = async () => {
    try {
        const db = await connectDB();
        
        // ACTIVAR EL SOPORTE DE CLAVES FORÁNEAS EN SQLITE
        await db.get("PRAGMA foreign_keys = ON");
        console.log("📦 Conectado a la base de datos SQLite Relacional");

        // 1. CREACIÓN DE TABLAS
        await db.exec(`
            
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS stores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                slug TEXT NOT NULL UNIQUE,
                user_id INTEGER NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                slug TEXT NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                code TEXT NOT NULL,
                price REAL NOT NULL,
                stock INTEGER NOT NULL,
                description TEXT,
                imageUrl TEXT,
                category_id INTEGER NOT NULL,
                store_id INTEGER NOT NULL,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
                FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS product_images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id INTEGER NOT NULL,
                url TEXT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            );
        `);

        // --- CARGA DE DATOS SEMILLA (SEEDERS) ---
        const userCheck = await db.get("SELECT COUNT(*) as count FROM users");
        if (userCheck.count === 0) {
            await db.run("INSERT INTO users (id, username, email, name) VALUES (?, ?, ?, ?)", [1, "benja_eceiza", "benja@example.com", "Benjamin Eceiza"]);
            console.log("👤 Usuario administrador cargado.");
        }

        const storeCheck = await db.get("SELECT COUNT(*) as count FROM stores");
        if (storeCheck.count === 0) {
            await db.run("INSERT INTO stores (id, name, slug, user_id) VALUES (?, ?, ?, ?)", [1, "Tienda Principal", "tienda-principal", 1]);
            console.log("🏪 Tienda Principal vinculada al usuario 1 cargada.");
        }

        const catCheck = await db.get("SELECT COUNT(*) as count FROM categories");
        if (catCheck.count === 0) {
            for (const cat of categoriesData) {
                await db.run("INSERT INTO categories (id, name, slug) VALUES (?, ?, ?)", [cat.id, cat.name, cat.slug]);
            }
            console.log("🗂️ Categorías iniciales creadas.");
        }

        const prodCheck = await db.get("SELECT COUNT(*) as count FROM products");
        if (prodCheck.count === 0) {
            console.log("⚙️ Cargando productos relacionales...");
            for (const prod of productsData) {
                const categoryRow = await db.get("SELECT id FROM categories WHERE slug = ?", [prod.category]);
                const categoryId = categoryRow ? categoryRow.id : 1;

                await db.run(`
                    INSERT INTO products (id, name, code, price, stock, description, imageUrl, category_id, store_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [prod.id, prod.name, prod.code, prod.price, prod.stock, prod.description, prod.imageUrl, categoryId, 1]
                );

                if (prod.images && prod.images.length > 0) {
                    for (const imgUrl of prod.images) {
                        await db.run("INSERT INTO product_images (product_id, url) VALUES (?, ?)", [prod.id, imgUrl]);
                    }
                }
            }
            console.log("✅ ¡20 Productos y sus galerías mapeados de forma relacional!");
        }

    } catch (error) {
        console.error("❌ Error inicializando la base de datos:", error);
    }
};

// Exportamos la función para que app.js la pueda llamar
module.exports = initDB;
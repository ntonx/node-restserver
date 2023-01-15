// ==================
//Puerto
// ===================

process.env.PORT = process.env.PORT || 3000;

// ==================
//Entorno
// ===================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==================
//Caducidad del token
// ===================
process.env.CADUCIDAD_TOKEN = '48h';

// ==================
//Seed de autenticación
// ===================
process.env.SEED = process.env.SEED || 'seed-de-desarrollo';

// ==================
//Base de datos
// ===================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

// commented to use local storage for Jenkins environment
//process.env.URLDB = urlDB;

//
process.env.urlDB = 'mongodb://127.0.0.1:27017/cafe';

// ==================
//Google client id
// ===================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1098198210953-saj52eul4ue14oen8dul7dd44e466nio.apps.googleusercontent.com';

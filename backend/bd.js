const { Pool } = require('pg');

// Carrega variáveis de ambiente
require('dotenv').config();

// Cria o pool de conexões
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

console.log(rocess.env.DATABASE_URL)

module.exports = pool;
// Exporta o pool para uso em outros arquivos
// module.exports = {
//   query: (text, params) => pool.query(text, params),
//   pool,
// };

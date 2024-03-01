import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    port:  3307,
    user: 'Isabella2207',
    database: 'blog',
    password: 'Isa22293',
})

export default pool

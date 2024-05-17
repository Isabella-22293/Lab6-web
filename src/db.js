import conn from './conn.js'

export async function getAllPosts() {
 const [rows] = await conn.query('SELECT * FROM blog_posts')
 return rows
}

export async function getpost(id) {
    const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?',[id]) 
    return rows
}

export async function actualizarpost(id) {
    const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?',[id]) 
    return rows
}


export async function createPost(title, content, created_at, Preparacion, Descripcion, Ingredientes ) {
    const [result] = await conn.query('INSERT INTO blog_posts (title, content, created_at, Preparacion, Descripcion, Ingredientes ) VALUES (?, ?, ?, ?, ?, ?)', [title, content, created_at, Preparacion, Descripcion, Ingredientes])
    return result
 }

 export async function createUser(usuario, contraseña ) {
    const [result] = await conn.query('INSERT INTO login (Usuario, contrasena ) VALUES (?, ?)', [usuario, contraseña])
    return result
 }

 export async function getUser(usuario) {
    const [result] = await conn.query('SELECT * FROM login WHERE Usuario = ?', [usuario])
    return result
 }
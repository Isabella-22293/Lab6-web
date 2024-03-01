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


export async function createPost(title, content, created_at, tipo, Imagen, Preparacion, Descripcion, Ingredientes ) {
    const [result] = await conn.query('INSERT INTO blog_posts (title, content, created_at, tipo, Imagen, Preparacion, Descripcion, Ingredientes ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, content, created_at, tipo, Imagen, Preparacion, Descripcion, Ingredientes])
    return result
 }
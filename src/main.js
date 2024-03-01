import express from 'express'
import  {getAllPosts, getpost, createPost} from './db.js'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

const app = express()
const port = 5000


app.use(bodyParser.json()) 
app.use(cors());
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener todos los posts
 *     description: Retorna todos los posts almacenados en la base de datos.
 *     responses:
 *       200:
 *         description: Éxito. Retorna una lista de posts.
 *       500:
 *         description: Error interno del servidor.
 */
app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error al obtener todos los posts:', error);
    res.status(500).send('Error interno del servidor');
  }
});

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener todos los posts
 *     description: Retorna todos los posts almacenados en la base de datos.
 *     responses:
 *       200:
 *         description: Éxito. Retorna una lista de posts.
 *       500:
 *         description: Error interno del servidor.
 */
app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error al obtener todos los posts:', error);
    res.status(500).send('Error interno del servidor');
  }
});

/**
 * @swagger
 * /posts/{postid}:
 *   get:
 *     summary: Obtener un post por su ID
 *     description: Retorna un post específico según su ID.
 *     parameters:
 *       - in: path
 *         name: postid
 *         description: ID del post a obtener.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito. Retorna el post solicitado.
 *       400:
 *         description: Post no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
app.get('/posts/:postid', async (req, res) => {
  try {
    const id = req.params.postid;
    const post = await getPost(id);
    if (!post) {
      return res.status(400).send('Post no encontrado');
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(`Error al obtener el post con id ${req.params.postid}:`, error);
    res.status(500).send('Error interno del servidor');
  }
});

app.use(express.json());
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear un nuevo post
 *     description: Crea un nuevo post con la información proporcionada en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tipo:
 *                 type: string
 *               Imagen:
 *                 type: string
 *               Preparacion:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               Ingredientes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Éxito. Retorna el post creado.
 *       400:
 *         description: Faltan datos obligatorios en el cuerpo de la solicitud.
 *       500:
 *         description: Error interno del servidor.
 */
app.post('/posts', async (req, res) => {
  try {
    const nuevoPost = req.body;
    const titulo = nuevoPost.title;
    const contenido = nuevoPost.content;
    const hora = new Date();
    const creado = hora.toISOString().slice(0, 19).replace('T', ' ');
    const tipo = nuevoPost.tipo;
    const Imagen = nuevoPost.Imagen;
    const Preparacion = nuevoPost.Preparacion;
    const Descripcion = nuevoPost.Descripcion;
    const Ingredientes = nuevoPost.Ingredientes;
    await createPost(titulo, contenido, creado, tipo, Imagen, Preparacion, Descripcion, Ingredientes);
    res.status(200).json(nuevoPost); 
    if (!nuevoPost.title || !nuevoPost.content || !nuevoPost.tipo) {
      return res.status(400).send('Faltan datos obligatorios en el cuerpo de la solicitud');
    }
  } catch (error) {
    console.error('Error al crear un nuevo post:', error);
    res.status(500).send('Error interno del servidor');
  }
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualizar un post existente
 *     description: Actualiza un post existente según su ID con la información proporcionada en el cuerpo de la solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del post a actualizar.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tipo:
 *                 type: string
 *               Imagen:
 *                 type: string
 *               Preparacion:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               Ingredientes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Éxito. Retorna el post actualizado.
 *       400:
 *         description: Faltan datos obligatorios en el cuerpo de la solicitud.
 *       500:
 *         description: Error interno del servidor.
 */
app.put('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, tipo, Imagen, Preparacion, Descripcion, Ingredientes } = req.body;
    const hora = new Date();
    const creado = hora.toISOString().slice(0, 19).replace('T', ' ');
    const post = await createPost(title, content, creado, tipo, Imagen, Preparacion, Descripcion, Ingredientes);
    res.status(200).json(post);
    if (!title || !content || !tipo) {
      return res.status(400).send('Faltan datos obligatorios en el cuerpo de la solicitud');
    }
  } catch (error) {
    console.error(`Error al actualizar el post con id ${req.params.id}:`, error);
    res.status(500).send('Error interno del servidor');
  }
});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación de mi API',
    },
  },
  apis: ['./src/main.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use((req, res, next) => {
  res.status(501).send('Método no implementado');
});


  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(400).send('El cuerpo de la solicitud contiene datos con formato incorrecto');
    } else {
      next();
    }
  });

  app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
  })

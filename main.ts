import express, {Request, Response} from 'express'
import mongoose from 'mongoose'

//Conexão com o banco
mongoose.connect('mongodb+srv://playground:playground@cluster-node-teste.m87tj.mongodb.net/?retryWrites=true&w=majority&appName=cluster-node-teste', {})

//Tratamento de erro
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error(err))

//Criando um servidor
const app = express()
const port = 3000

//Exemplo de Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    canRent: {
        type: Boolean,
        default: true
    }
})

//Instanciação
export const BookModel = mongoose.model('Book', bookSchema)

//Criando rotas

//GET ALL - Retorna todos os livros salvos
app.get('/', (req: Request, res: Response) => {
    const books = BookModel.find()
    res.send({books})
})

//GET ONE - Retorna apenas um livro
app.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    console.log({id})
    const book = await BookModel.findById(id)
    res.send({book})
})


//POST
app.post('/', async (req: Request, res: Response) => {
    const {title, author} = req.body
    const year = req.body.year
    const newBook = new BookModel({title, author, year})
    await newBook.save()

    res.status(201).send({newBook})
})

// Status
// 201 created
// 200 ok
// 404 not found
// 500 internal server error
// 400 bad request
// 422 unprocessable entity

//Testa se o servidor está ativo
app.listen(port, () => {
    console.log(`Server running at ${port}`)
})
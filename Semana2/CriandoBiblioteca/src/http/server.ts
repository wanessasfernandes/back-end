import fastify from 'fastify';
import { randomUUID } from 'node:crypto';

const app = fastify()

interface Livros {
    id: string 
    nome: string 
    autor: string
    preco: number
    quantidade: number
}

// array pra armazenar os livros simulando um banco de dados 
const livros: Livros[] = []

// rota para criar um livro
app.post('/livros', (request, reply) => {
    const { nome, autor, preco, quantidade } = request.body as Livros // cria o body da requisição, as informações que o cliente vai enviar para criar um livro

    // caso alguma informaçao esteja faltando, retorna um erro 400 - Bad Request
    if (!nome || !autor || !preco || !quantidade ){ 
        reply.status(400).send({ error: 'Todos os campos são obrigatórios' })
        return
    }

    // cria o livro com um id unico e aleatoria e adiciona ao array de livros
    const livro: Livros = {
        id: randomUUID(),
        nome,
        autor,
        preco,
        quantidade
    }
    livros.push(livro) 

    return reply.status(201).send({message: 'Livro criado com sucesso'})
})

// rota para buscar todos os livros 
app.get('/livros', () => {
    return livros
})

// rota pra atualizar um livro
app.put('/livros/:id', (request, reply) => {
    const { id } = request.params as Livros  // pega o id do livro que vai ser atualizado a partir dos parametros de rota
    const { nome, autor, preco, quantidade } = request.body as Livros 
    const livroIndex = livros.findIndex(livro => livro.id === id) // procura o livro no array de livros pelo id e retorna o indice do livro encontrado

    // se o livro nao for encontrado, retorna um erro 404 - Not Found
    if (livroIndex === -1) {
        reply.status(404).send({ error: 'Livro não encontrado' })
        return
    }

    if (!nome || !autor || !preco || !quantidade ){
        reply.status(400).send({ error: 'Todos os campos são obrigatórios' })
        return
    }

    // atualiza o livro no array de livros com as novas informações
    livros[livroIndex] = { id, nome, autor, preco, quantidade }

    return reply.status(200).send({message: 'Livro atualizado com sucesso'})
})

// rota para deletar um livro
app.delete('/livros/:id', (request, reply) => {
    const { id } = request.params as Livros
    const index = livros.findIndex(livro => livro.id === id)

    if (index === -1) {
        reply.status(404).send({ error: 'Livro não encontrado' })
        return
    }

    livros.splice(index, 1)
    return reply.status(200).send({message: 'Livro deletado com sucesso'})
})
app.listen({ port: 3333}).then(() => {
    console.log('HTTP server running!')
})

// .then() é uma função promessa que é chamada quando a promessa é resolvida com sucesso. 
// app.listen() retorna uma promessa que é resolvida quando o servidor HTTP é iniciado com sucesso. 
// O código dentro do .then() será executado após o servidor estar rodando

//app.get são rotas 

// Métodos https: get, post, put, delete, patch, options, head

// GET: buscar informações 
// POST: criar informações
// PUT: atualizar informações
// DELETE: remover informações
// PATCH: atualizar informações específicas

// corpo da requisição - post ou put, informações de formulário, json, etc
// parametros de busca - filtragem de dados
// parametros de rota - deletes, identificação de recursos
// cabeçalhos - contexto 

//status code
// 200 - OK
// 201 - Created
// 400 - Bad Request
// 404 - Not Found
// 500 - Internal Server Error

// /sobre, /contato - estaticas 
// /usuarios/:id - dinamica, id é um parametro de rota

// /produtos?categoria=eletronicos - parametros de busca, categoria é um parametro de busca

// parametros de rota:
// Path params: /usuarios/:id (put, delete) - identificação de recursos
// Query params: /produtos?categoria=eletronicos ()
// Body params: {informações enviadas no corpo da requisição, geralmente em POST ou PUT}

//CRUD - Create, Read, Update, Delete
// Create - POST 
// Read - GET
// Update - PUT ou PATCH
// Delete - DELETE
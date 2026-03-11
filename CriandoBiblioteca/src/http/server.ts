import fastify from 'fastify';
import bookController from './routes/booksController.js';

const app = fastify()

app.register(bookController)

app.listen({ port: 3000}).then(() => {
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
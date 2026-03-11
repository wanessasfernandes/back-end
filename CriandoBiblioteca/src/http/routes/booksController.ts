import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";

interface Book {
    id: string
    title: string
    author: string
}

export default async function bookController(app: FastifyInstance) {
    app.post('/book', async (request, reply) => {
        const { title, author } = request.body as Book

        if (!title || !author) {
            return reply.status(400).send({ error: 'Titulo e autor são obrigatórios '})
        }

        try {
            const newBook = await prisma.book.create({
                data: {
                    title, 
                    author
                }
            })
            reply.status(201).send(newBook)
        } catch (error) {
            reply.status(400).send({error: 'Erro ao adicionar livro!'})
        }
    })

    // rota para buscar todos os book 
    app.get('/book', async (_, reply) => {
        try {
            const books = await prisma.book.findMany()
            reply.send(books)
        } catch (error) {
            reply.status(400).send({error: 'Erro ao adicionar livro!'})
        }
    })

    // rota pra atualizar um livro
    app.put('/book/:id', async (request, reply) => {
        const { id } = request.params as Book  // pega o id do livro que vai ser atualizado a partir dos parametros de rota
        const { title, author } = request.body as Book 
        const bookId = parseInt(id)
        
        try {
            const updatedBook = await prisma.book.update({
                where: { id: bookId },
                data: {
                    title, 
                    author
                }
            })
            reply.status(200).send(updatedBook)
        } catch (error) {
            reply.status(500).send({error: 'Erro ao atualizar livro!'})
        }
    })

    // rota para deletar um livro
    app.delete('/book/:id', async (request, reply) => {
        const { id } = request.params as Book
        const bookId = parseInt(id)
        
        try {
            await prisma.book.delete({
                where: {id: bookId}
            })
        } catch (error) {
            return reply.status(500).send({error: 'Erro ao remover livro'})
        }
        reply.send({message: 'Livro removido com sucesso'})
    })
}
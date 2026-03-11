import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";

interface Rooms {
    id: string
    nome: string
    capacidade: number
    local: string
    descricao: string
}

export default async function roomController(app: FastifyInstance) {
    app.post('/room', async (request, reply) => {
    const { nome, capacidade, local, descricao} = request.body as Rooms
    
    if (!nome || !capacidade || !local){
        reply.status(400).send({error: 'Todos os campos são obrigatórios'})
        return
    }

    try {
        const newRoom = await prisma.room.create({
            data: {
                nome,
                capacidade,
                local,
                descricao
            }
        })
        reply.status(201).send(newRoom)
    } catch (error) {
        reply.status(400).send({error: 'Erro ao adicionar sala'})
    }
    })

    app.get('/room', async (_, reply) => {
        try {
            const rooms = await prisma.room.findMany()
            reply.send(rooms)
        } catch (error) {
            reply.status(400).send({error: 'Erro ao adicionar sala'})
        }
    })

    app.put('/room/:id', async (request, reply) => {
        const { id } = request.params as Rooms
        const { nome, capacidade, local, descricao } = request.body as Rooms
        const RoomsId = parseInt(id)

        try {
            const updatedRoom = await prisma.room.update({
                where: {id: RoomsId},
                data: {
                    nome, 
                    capacidade, 
                    local, 
                    descricao
                }
            })
            reply.status(200).send(updatedRoom)
        } catch (error) {
            reply.status(500).send({error: 'Erro ao atualizar sala.'})
        }
    })

    app.delete ('/room/:id', async (request, reply) => {
        const { id } = request.params as Rooms
        const RoomsId = parseInt(id)

        try {
            await prisma.room.delete({
                where: {id: RoomsId}
            })
        } catch (error) {
            return reply.status(500).send({error: 'Erro ao remover sala.'})
        }
        reply.send({message: 'Sala removida com sucesso'})
    })
}

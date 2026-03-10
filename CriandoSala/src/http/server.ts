import fastify from 'fastify';
import { randomUUID } from 'node:crypto';

const app = fastify();

interface Rooms {
    id: string
    nome: string
    capacidade: number
    local: string
    descricao: string
}

const rooms: Rooms[] = []

interface RoomParams {
    id: string
}

app.post('/room', (request, reply) => {
    const { nome, capacidade, local, descricao} = request.body as Rooms
    
    if (!nome || !capacidade || !local || !descricao){
        reply.status(400).send({error: 'Todos os campos são obrigatórios'})
        return
    }

    const room: Rooms = {
        id: randomUUID(),
        nome,
        capacidade,
        local,
        descricao
    }
    rooms.push(room) 
    return reply.status(201).send({message: 'Sala criada com sucesso'})
})

app.get('/room', () => {
    return rooms
})

app.put('/room/:id', (request, reply) => {
    const { id } = request.params as RoomParams
    const { nome, capacidade, local, descricao } = request.body as Rooms
    const roomIndex = rooms.findIndex(room => room.id == id)

    if (roomIndex === -1) {
        reply.status(404).send({ error: 'Sala não encontrada' })
        return
    }

    if (!nome || !capacidade || !local || !descricao){
        reply.status(400).send({error: 'Todos os campos são obrigatórios'})
        return
    }

    rooms[roomIndex] = { id, nome, capacidade, local, descricao }
    return reply.status(200).send({message: 'Sala atualizada com sucesso'})
})

app.patch('/room/:id', async (request, reply) => {
    const { id } = request.params as RoomParams
    const { capacidade, descricao } = request.body as Partial<Rooms>
    const roomIndex = rooms.findIndex(room => room.id == id)


    if (roomIndex == -1) {
        reply.status(404).send({ error: 'Sala não encontrada' })
        return
    }

    const currentRoom = rooms[roomIndex];

    if (!currentRoom){
        reply.status(500).send({ error: 'Erro interno ao acessar os dados da sala' })
        return
    }

    rooms[roomIndex] = {
        ...currentRoom,
        capacidade: capacidade ?? currentRoom.capacidade,
        descricao: descricao ?? currentRoom.descricao
    };

    return reply.status(200).send({message: 'Sala atualizada com sucesso'})

})

app.delete('/room/:id', (request, reply) => {
    const { id } = request.params as Rooms
    const roomIndex = rooms.findIndex(room => room.id == id)

    if (roomIndex === -1) {
        reply.status(404).send({ error: 'Sala não encontrada' })
        return
    }

    rooms.splice(roomIndex, 1)
    return reply.status(200).send({message: 'Sala deletada com sucesso'})
})

app.listen({ port: 3000}).then(() => {
    console.log('Servidor rodando na porta 3000')
}) 
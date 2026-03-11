import fastify from 'fastify';
import roomController from './routes/roomsController.js';

const app = fastify();

app.register(roomController)

app.listen({ port: 3000}).then(() => {
    console.log('Servidor rodando na porta 3000')
}) 
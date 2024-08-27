import { FastifyInstance } from 'fastify'

export async function routes(app: FastifyInstance) {
  app.get('/measures', (request, reply) => {
    return reply.send('Hello world')
  })
}

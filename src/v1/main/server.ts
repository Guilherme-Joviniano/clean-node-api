import fastify from 'fastify'

const app = fastify()

app.server.listen(3333, () => {
  console.log('running on port http://localhost:3333')
})

import Fastify from 'fastify'
import fs from 'fs'

const fastify = Fastify({
    logger: true
})

fastify.get('/', async function handler() {
    const data = fs.readFileSync('db.json')
    return JSON.parse(data)
})

try {
    await fastify.listen({port: 3000})
} catch (err) {
    fastify.log.error(err)
}
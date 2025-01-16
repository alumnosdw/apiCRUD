import Fastify from "fastify"
import { connectDB } from "./database/DB.js"
import routes from "./routes/routes.js"

const fastify = Fastify({
    logger:true
})

fastify.register(routes, {prefix:"/api/asignaturas"})

const port = process.env.PORT
const uri = process.env.MONGO_URI

const startServer = async () => {
    try {
        await connectDB(uri); 
        await fastify.listen({ port }, (err) => {
        if (err) {
          fastify.log.error(err);
        } else {
          console.log(`Servidor activo en http://localhost:${port}/api/asignaturas`);
        }
      });
    } catch (err) {
        fastify.log.error(err)
    }
}

startServer()

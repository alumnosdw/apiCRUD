import { createAsignatura, deleteAsignatura, getAsignatura, getAsignaturas, updateAsignatura } from "../controllers/AsignaturaController.js";


const routes = async (fastify, options) => {
    fastify.get("/", getAsignaturas)
    fastify.get("/:id", getAsignatura)
    fastify.post("/", createAsignatura)
    fastify.put("/:id", updateAsignatura)
    fastify.delete("/:id", deleteAsignatura)
}

export default routes
import { AsignaturaModel } from "../models/AsignaturaModel.js"

export const getAsignaturas = async (request, reply) => {
    try {
        const asignaturas =  await AsignaturaModel.find()
        reply.status(200).send(asignaturas)    
    } catch (error) {
        reply.status(500).send({message:error.message})
    }
}

export const getAsignatura = async (request, reply) => {
    try {
        const {id} = request.params
        const asignatura = await AsignaturaModel.findById(id)
        if(!asignatura){
            reply.status(404).send(`Asignatura con ID: ${id} not found`)
        }
        reply.status(200).send(asignatura)
    } catch (error) {
        reply.status(500).send({message:error.message})
    }
}

export const createAsignatura = async (request, reply) => {
    try {
        const asignatura = await AsignaturaModel.create(request.body)
        reply.status(201).send(asignatura)
    } catch (error) {
        if(error.name === 'ValidationError'){
            const errors = Object.values(error.errors).map(error => error.message)
            reply.status(400).send({message:'Error de validación', errors})
        }else {
            reply.status(500).send({message:"Ha ocurrido un error."})
        }
    }
}

export const updateAsignatura = async (request, reply) => {
    try {
        const {id} = request.params
        const updatedAsignatura = await AsignaturaModel.findOneAndUpdate(
            {_id: id},
            request.body,
            {new:true, runValidators:true}
        )
        if(updatedAsignatura){
            reply.status(200).send(updatedAsignatura)
        } else {
            reply.status(404).send({message:'Asignatura not found'})
        }
    } catch (error) {
        if(error.name === 'ValidationError'){
            const errors = Object.values(error.errors).map(error => error.message)
            reply.status(400).send({message:'Error de validación', errors})
        }else {
            reply.status(500).send({message:"Ha ocurrido un error."})
        }
    }
}

export const deleteAsignatura = async (request, reply) => {
    try {
        const {id} = request.params
        const asignatura = await AsignaturaModel.findByIdAndDelete(id)
        if(!asignatura) {
            reply.status(404).send(`Asignatura con ID: ${id} not found`)
        }
        reply.status(200).send("Asignatura borrada correctamente")
    } catch (error) {
        reply.status(500).send({message: error.message})
    }
}
import express from "express"
import cors from "cors"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors("http://localhost:5173/"))

// Cria um usuário
// Request (req) e Response (res)
app.post('/users', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
    })

    res.status(201).json(req.body)
})

// Retorna lista de Usuários
app.get('/users', async (req, res) => {

    let users = []

    // Retorna usuário por nome ou email, também retorna todos os usuários
    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
            }
        })

    } else {
         users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

// Editando um Usuário
app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },

        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
    })

    res.status(201).json(req.body)
})

// Deletando um Usuário
app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id:req.params.id
        }
    })

    res.status(200).json({message: "Usuário foi deletado!."})
})

app.listen(3000)


/*
    1) Tipo de rota / HTTP
    2) Endereço
*/
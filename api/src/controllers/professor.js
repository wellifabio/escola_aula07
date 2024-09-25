const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const login = async (req, res) => {
    const { email, senha } = req.body;
    const professor = await prisma.professor.findFirst({
        where: {
            email: email,
            senha: senha
        },
        select: {
            "id": true,
            "nome": true,
            "email": true,
            "turmas": true
        }
    });
    if (professor) {
        return res.json(professor);
    } else {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
    }
};

const create = async (req, res) => {
    try {
        const professor = await prisma.professor.create({
            data: {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            }
        });
        return res.status(201).json(professor);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const read = async (req, res) => {
    if (req.params.id !== undefined) {
        const professor = await prisma.professor.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                "id": true,
                "nome": true,
                "email": true,
                "turmas": true
            }
        });
        return res.json(professor);
    } else {
        const professores = await prisma.professor.findMany({
            select: {
                "id": true,
                "nome": true,
                "email": true
            }
        });
        return res.json(professores);
    }
};

const update = async (req, res) => {
    try {
        const professor = await prisma.professor.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: req.body
        });
        return res.status(202).json(professor);
    } catch (error) {
        return res.status(404).json({ message: "Professor não encontrado" });
    }
};

const del = async (req, res) => {
    try {
        const professor = await prisma.professor.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).json(professor);
    } catch (error) {
        return res.status(404).json({ message: "Professor não encontrado" });
    }
}

module.exports = {
    login,
    create,
    read,
    update,
    del
};
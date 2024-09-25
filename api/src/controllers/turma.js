const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const create = async (req, res) => {
    try {
        const turma = await prisma.turma.create({
            data: {
                nome: req.body.nome,
                professorId: req.body.professorId,
            }
        });
        return res.status(201).json(turma);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const read = async (req, res) => {
    if (req.params.id !== undefined) {
        const turma = await prisma.turma.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                "id": true,
                "nome": true,
                "professorId": true,
                "atividades": true
            }
        });
        return res.json(turma);
    } else {
        const turmaes = await prisma.turma.findMany({});
        return res.json(turmaes);
    }
};

const update = async (req, res) => {
    try {
        const turma = await prisma.turma.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: req.body
        });
        return res.status(202).json(turma);
    } catch (error) {
        return res.status(404).json({ message: "Turma não encontrada" });
    }
};

const del = async (req, res) => {
    try {
        const turma = await prisma.turma.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).json(turma);
    } catch (error) {
        return res.status(404).json({ message: "Turma não encontrada" });
    }
}

module.exports = {
    create,
    read,
    update,
    del
};
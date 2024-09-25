const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const create = async (req, res) => {
    try {
        const atividade = await prisma.atividade.create({
            data: {
                descricao: req.body.descricao,
                turmaId: req.body.turmaId,
            }
        });
        return res.status(201).json(atividade);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const read = async (req, res) => {
    if (req.params.id !== undefined) {
        const atividade = await prisma.atividade.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.json(atividade);
    } else {
        const atividades = await prisma.atividade.findMany({});
        return res.json(atividades);
    }
};

const update = async (req, res) => {
    try {
        const atividade = await prisma.atividade.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: req.body
        });
        return res.status(202).json(atividade);
    } catch (error) {
        return res.status(404).json({ message: "atividade ou turma não encontrada" });
    }
};

const del = async (req, res) => {
    try {
        const atividade = await prisma.atividade.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).json(atividade);
    } catch (error) {
        return res.status(404).json({ message: "atividade não encontrada" });
    }
}

module.exports = {
    create,
    read,
    update,
    del
};
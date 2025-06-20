"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const app_1 = __importDefault(require("../app"));
// -- // -- // -- // -- //
// visų renginių gavimas
async function getAllEvents(_, res) {
    try {
        const events = await app_1.default.event.findMany({
            where: { status: 1 }, // aktyvūs renginiai
            orderBy: { date: 'asc' },
        });
        res.status(200).json(events);
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Serverio klaida');
    }
}
// vartojo renginių gavimas
async function getUserEvents(req, res) {
    try {
        const events = await app_1.default.event.findMany({
            where: { status: 1, userId: parseInt(req.params.userId) },
            orderBy: { date: 'asc' },
        });
        res.status(200).json(events);
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Serverio klaida');
    }
}
// vieno renginio gavimas
async function getEvent(req, res) {
    try {
        const event = await app_1.default.event.findFirst({
            where: { id: Number(req.params.id) }
        });
        if (!event) {
            res.status(404).json('Renginys nerastas');
            return;
        }
        ;
        res.status(200).json(event);
    }
    catch {
        res.status(500).json('Serverio klaida');
    }
}
// naujo renginio sukūrimas
async function storeEvent(req, res) {
    try {
        const validation = (0, express_validator_1.validationResult)(req);
        if (!validation.isEmpty()) {
            res.status(400).json(validation.array());
            return;
        }
        const data = (0, express_validator_1.matchedData)(req);
        const existing = await app_1.default.event.findFirst({
            where: { slug: data.slug }
        });
        if (existing) {
            res.status(400).json('Renginys su tokiu slug jau egzistuoja');
            return;
        }
        const event = await app_1.default.event.create({
            data: {
                userId: Number(data.userId),
                slug: data.slug,
                name: data.name,
                date: new Date(data.date),
                place: data.place,
                description: data.description,
                img: data.img || null,
                status: Number(data.status) || 2
            }
        });
        res.status(201).json({
            message: 'Renginys sukurtas',
            id: event.id
        });
    }
    catch {
        res.status(500).json('Serverio klaida');
    }
}
// renginio atnaujinimas
async function updateEvent(req, res) {
    try {
        const event = await app_1.default.event.findFirst({
            where: { id: Number(req.params.id) }
        });
        if (!event) {
            res.status(404).json('Renginys nerastas');
            return;
        }
        const validation = (0, express_validator_1.validationResult)(req);
        if (!validation.isEmpty()) {
            res.status(400).json(validation.array());
            return;
        }
        const data = (0, express_validator_1.matchedData)(req);
        if (data.slug && data.slug !== event.slug) {
            const slugExists = await app_1.default.event.findFirst({
                where: { slug: data.slug }
            });
            if (slugExists) {
                res.status(400).json('Slug jau naudojamas kitam renginiui');
                return;
            }
        }
        const updated = await app_1.default.event.update({
            where: { id: event.id },
            data: {
                userId: Number(data.userId) || event.userId,
                slug: data.slug || event.slug,
                name: data.name || event.name,
                date: data.date ? new Date(data.date) : event.date,
                place: data.place || event.place,
                description: data.description || event.description,
                img: data.img ?? event.img,
                status: typeof data.status !== 'undefined' ? Number(data.status) : event.status
            }
        });
        res.status(200).json({
            message: 'Renginys atnaujintas',
            id: updated.id
        });
    }
    catch {
        res.status(500).json('Serverio klaida');
    }
}
// renginio ištrynimas
async function deleteEvent(req, res) {
    try {
        res.status(200).json({ message: 'Renginys ištrintas' });
    }
    catch {
        res.status(500).json('Serverio klaida');
    }
}
// validacija
const validateStore = () => [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Pavadinimas yra privalomas').escape(),
    (0, express_validator_1.body)('date').notEmpty().withMessage('Data yra privaloma').isDate().withMessage('Neteisinga data'),
    (0, express_validator_1.body)('place').trim().notEmpty().withMessage('Vieta yra privaloma').escape(),
    (0, express_validator_1.body)('description').trim().notEmpty().withMessage('Aprašymas yra privalomas').escape(),
    (0, express_validator_1.body)('img').trim().optional().isURL().withMessage('Neteisingas paveikslėlio URL')
];
// atnaujinimo validacija
const validateUpdate = () => [
    ...validateStore(),
    (0, express_validator_1.body)('status').trim().isInt().withMessage('Būsenos numeris yra privalomas')
];
exports.default = {
    getAllEvents,
    getUserEvents,
    getEvent,
    storeEvent,
    updateEvent,
    deleteEvent,
    validateStore,
    validateUpdate,
};

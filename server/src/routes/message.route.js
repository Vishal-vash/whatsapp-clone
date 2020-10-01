import express from 'express';
import Message from '../models/message.model.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello World")
})

router.post('/api/messages/new', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.status(201).send(message);
    } catch (error) {
        res.status(500).send({})
    }
})

router.get('/api/messages/sync', async (req, res) => {
    try {
        const messages = await Message.find({})
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send({})
    }

})

export default router;
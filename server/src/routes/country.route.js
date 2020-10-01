import express from 'express';
import Country from '../models/country.model.js';

const router = express.Router();

router.get('/api/countries', async (req, res) => {
    try {
        const countries = await Country.find({});
        res.send(countries)
    } catch (error) {
        res.status(404).send({})
    }
})

export default router;
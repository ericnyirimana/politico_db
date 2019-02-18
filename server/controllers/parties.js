import { validator, validationErrors } from '../helpers/index';
import db from '../models/db';

const Parties = {
    async addParty(req, res) {
        if (req.user.role !== 'admin') {
            return res.status(401).send({ status: 401, error: 'Unauthorized Access' });
        }
        // Validate Data
        const { error } = validator('parties', req.body);
        if (error) {
            return validationErrors(res, error);
        }
        const text = 'INSERT INTO party (name, hqaddress, logourl) VALUES ($1, $2, $3)';
        const values = [
            req.body.name,
            req.body.hqaddress,
            req.body.logourl,
        ];
        try {
            await db.query(text, values);
            const response = {
                status: 201,
                data: [{
                    name: req.body.name,
                    hqaddress: req.body.hqaddress,
                    logourl: req.body.logourl,
                }],
            };
            return res.status(201).send(response);
        } catch (errorMessage) {
            return res.status(400).send({ status: 400, error: errorMessage });
        }
    },
};

export default Parties;
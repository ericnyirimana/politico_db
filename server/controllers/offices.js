import { validator, validationErrors } from '../helpers';
import db from '../models/db';

const Offices = {
    async addOffice(req, res) {
        if (req.user.role !== 'admin') {
            return res.status(401).send({ status: 401, error: 'Unauthorized Access' });
        }
        // Validate Data
        const { error } = validator('offices', req.body);
        if (error) {
            return validationErrors(res, error);
        }
        const findofficeQuery = 'SELECT * FROM office WHERE name=$1';
        const officeResult = await db.query(findofficeQuery, [req.body.name]);
        const officeData = officeResult.rows;
        if (officeData[0]) {
            return res.status(409).send({
                status: 409,
                error: 'Political office name already taken',
            });
        }
        const text = 'INSERT INTO office (type, name) VALUES ($1, $2)';
        const values = [
            req.body.type,
            req.body.name,
        ];
        try {
            await db.query(text, values);
            const response = {
                status: 201,
                data: [{
                    type: req.body.type,
                    name: req.body.name,
                }],
            };
            return res.status(201).send(response);
        } catch (errorMessage) {
            return res.status(400).send({ status: 400, error: errorMessage });
        }
    },
};

export default Offices;
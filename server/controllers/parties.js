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
        const findUsernameQuery = 'SELECT * FROM party WHERE name=$1';
        const userResult = await db.query(findUsernameQuery, [req.body.name]);
        const userData = userResult.rows;
        if (userData[0]) {
            return res.status(409).send({
                status: 409,
                error: 'Political party name already taken',
            });
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
    async getParties(req, res) {
        const findAllQuery = 'SELECT * FROM party ORDER BY id DESC';
        try {
            const { rows } = await db.query(findAllQuery);
            const response = {
                status: 200,
                data: rows,
            };
            return res.send(response);
        } catch (error) {
            return res.status(400).send({ status: 400, error });
        }
    },
    async specificParty(req, res) {
        const text = 'SELECT * FROM party WHERE id = $1';
        try {
            const { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({
                    status: 404,
                    error: 'Party with given ID was not found',
                });
            }
            const response = {
                status: 200,
                data: rows[0],
            };
            return res.send(response);
        } catch (error) {
            return res.status(400).send({
                status: 400,
                error,
            });
        }
    },
};

export default Parties;
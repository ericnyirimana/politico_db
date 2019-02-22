import moment from 'moment';
import { validator, validationErrors } from '../helpers/index';
import db from '../models/db';

const Petition = {
    async addPetition(req, res) {
        // Validate Data
        const { error } = validator('petition', req.body);
        if (error) {
            return validationErrors(res, error);
        }
        const findpartyQuery = 'SELECT * FROM party WHERE name=$1';
        const partyResult = await db.query(findpartyQuery, [req.body.name]);
        const partyData = partyResult.rows;
        if (partyData[0]) {
            return res.status(409).send({
                status: 409,
                error: 'Political party name already taken',
            });
        }
        const text = 'INSERT INTO petition (createdon, createdby, office, body, evidence) VALUES ($1, $2, $3, $4, $5) returning *';
        const values = [
            moment().format('YYYY-MM-DD'),
            req.user.id,
            req.body.office,
            req.body.body,
            req.body.evidence,
        ];
        try {
            const { rows } = await db.query(text, values);
            const response = {
                status: 201,
                data: [{ rows }],
            };
            console.log(rows);
            return res.status(201).send(response);
        } catch (errorMessage) {
            return res.status(400).send({ status: 400, error: errorMessage });
        }
    },
};

export default Petition;
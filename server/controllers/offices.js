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
    async getOffices(req, res) {
        const findAllQuery = 'SELECT * FROM office ORDER BY id DESC';
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
    async specificOffices(req, res) {
        const text = 'SELECT * FROM office WHERE id = $1';
        try {
            const { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({
                    status: 404,
                    error: 'Office with given ID was not found',
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
    async addCandidate(req, res) {
        if (req.user.role !== 'admin') {
            return res.status(401).send({ status: 401, error: 'Unauthorized Access' });
        }
        // Validate Data
        const { error } = validator('candidate', req.body);
        if (error) {
            return validationErrors(res, error);
        }
        const findpofficeQuery = 'SELECT * FROM office WHERE id=$1';
        const officeResult = await db.query(findpofficeQuery, [req.params.id]);
        const officeData = officeResult.rows;
        if (!officeData[0]) {
            return res.status(404).send({
                status: 404,
                error: 'Office with given ID was not found',
            });
        }
        const findpuserQuery = 'SELECT * FROM users WHERE id=$1';
        const userResult = await db.query(findpuserQuery, [req.body.user]);
        const userData = userResult.rows;
        if (!userData[0]) {
            return res.status(404).send({
                status: 404,
                error: 'User with given ID was not found',
            });
        }
        const findppartyQuery = 'SELECT * FROM party WHERE id=$1';
        const partyResult = await db.query(findppartyQuery, [req.body.party]);
        const partyData = partyResult.rows;
        if (!partyData[0]) {
            return res.status(404).send({
                status: 404,
                error: 'Party with given ID was not found',
            });
        }
        const findpcandidateQuery = 'SELECT * FROM candidate WHERE office=$1 AND candidate=$2';
        const candidatevalues = [
            req.params.id,
            req.body.user,
        ];
        const candidateResult = await db.query(findpcandidateQuery, candidatevalues);
        const candidateData = candidateResult.rows;
        if (candidateData[0]) {
            return res.status(409).send({
                status: 409,
                error: 'The candidate already exist',
            });
        }
        const text = 'INSERT INTO candidate (office, party, candidate) VALUES ($1, $2, $3)';
        const values = [
            req.params.id,
            req.body.party,
            req.body.user,
        ];
        try {
            await db.query(text, values);
            const response = {
                status: 201,
                data: [{
                    office: req.params.id,
                    user: req.body.user,
                }],
            };
            return res.status(201).send(response);
        } catch (errorMessage) {
            return res.status(400).send({ status: 400, error: errorMessage });
        }
    },
    async getVotes(req, res) {
        const findpofficeQuery = 'SELECT * FROM votes WHERE office = $1';
        const officeResult = await db.query(findpofficeQuery, [req.params.id]);
        let data = [];
        for (const office of officeResult.rows) {
            const findAllVotes = 'SELECT * FROM votes WHERE office = $1 AND candidate = $2';
            const resultVotes = await db.query(findAllVotes, [req.params.id, office.candidate]);
            console.log(resultVotes.rows);
                data.push({
                    office: office.office,
                    candidate: office.candidate,
                    result: resultVotes.rows.length,
                  });
            }
        // Filtering duplicated objects
        data = data.filter((item, index, self) => index === self.findIndex(office => (
        office.office === item.office && office.candidate === item.candidate
        )));
        try {
            const response = {
                status: 200,
                data
            };
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, error });
        }
    },
};

export default Offices;
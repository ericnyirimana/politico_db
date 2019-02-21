import moment from 'moment';

import { validator, validationErrors } from '../helpers';
import db from '../models/db';

const Votes = {
    async voteCandidate(req, res) {
        const { error } = validator('votes', req.body);
        if (error) {
            return validationErrors(res, error);
        }
        const findpofficeQuery = 'SELECT * FROM candidate WHERE office=$1 AND id=$2';
        const officevalues = [
            req.body.office,
            req.body.candidate,
        ];
        const officeResult = await db.query(findpofficeQuery, officevalues);
        const officeData = officeResult.rows;
        if (!officeData[0]) {
            return res.status(400).send({
                status: 400,
                error: 'The candidate with the given ID is not a candidate on this office',
            });
        }
        const findpvoteQuery = 'SELECT * FROM votes WHERE office=$1 AND createdby=$2';
        const votevalues = [
            req.body.office,
            req.user.id,
        ];
        const voteResult = await db.query(findpvoteQuery, votevalues);
        const voteData = voteResult.rows;
        if (voteData[0]) {
            return res.status(409).send({
                status: 409,
                error: 'Oop! You have already made a vote in this office',
            });
        }
        const text = 'INSERT INTO votes (createdon, createdby, office, candidate) VALUES ($1, $2, $3, $4)';
        const values = [
            moment().format('YYYY-MM-DD'),
            req.user.id,
            req.body.office,
            req.body.candidate,
        ];
        try {
            await db.query(text, values);
            const response = {
                status: 201,
                data: [{
                    office: req.body.office,
                    candidate: req.body.candidate,
                    voter: req.user.id,
                }],
            };
            return res.status(201).send(response);
        } catch (errorMessage) {
            return res.status(400).send({ status: 400, error: errorMessage });
        }
    },
};

export default Votes;
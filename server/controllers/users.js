import {
    validator, validationErrors, hashPassword, comparePassword, generateToken
} from '../helpers/index';
import db from '../models/db';

const Users = {
    async userSignup(req, res) {
        // Validate Data
        const { error } = validator('user', req.body);
        if (error) {
            return validationErrors(res, error);
        }
        const findUsernameQuery = 'SELECT * FROM users WHERE username=$1';
        const userResult = await db.query(findUsernameQuery, [req.body.username]);
        const userData = userResult.rows;
        if (userData[0]) {
            return res.status(400).send({
                status: 400,
                error: 'Username already taken',
            });
        }

        const findEmailQuery = 'SELECT * FROM users WHERE email=$1';
        const userEmailResult = await db.query(findEmailQuery, [req.body.email]);
        const userEmailData = userEmailResult.rows;
        if (userEmailData[0]) {
            return res.status(400).send({
                status: 400,
                error: 'Email already taken',
            });
        }

        const hashedPassword = hashPassword(req.body.password);

        const text = 'INSERT INTO users (firstname, lastname, othername, email, phonenumber, username, passporturl, password, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
        const values = [
            req.body.firstname,
            req.body.lastname,
            req.body.othername,
            req.body.email,
            req.body.phonenumber,
            req.body.username,
            req.body.passporturl,
            hashedPassword,
            req.body.isadmin,
        ];
        try {
            const { rows } = await db.query(text, values);

            const role = ((rows[0].isadmin) ? 'admin' : 'standard');

            const issueToken = generateToken({
                user: rows[0].id,
                username: rows[0].username,
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                othername: rows[0].othername,
                email: rows[0].email,
                phonenumber: rows[0].phonenumber,
                passporturl: rows[0].passporturl,
                role,
            });

            const response = {
                status: 201,
                token: issueToken,
                user: [{ rows }],
            };
            return res.status(201).send(response);
        } catch (errorMessage) { console.log(errorMessage);
            return res.status(400).send({ status: 400, error: errorMessage });
        }
    },
    async userLogin(req, res) {
        // Validate Data
        // const { error } = validator('login', req.body);
        // if (error) {
        //     return validationErrors(res, error);
        // }
        const findAllQuery = 'SELECT * FROM users WHERE username = $1 LIMIT 1';
        try {
            const { rows } = await db.query(findAllQuery, [req.body.username]);
            if (!rows[0]) {
                return res.status(401).send({
                    status: 401,
                    error: 'Invalid username or password',
                });
            }
            if (!comparePassword(rows[0].password, req.body.password)) {
                return res.status(401).send({
                    status: 401,
                    error: 'Invalid username or password',
                });
            }
            const role = ((rows[0].isadmin) ? 'admin' : 'standard');
            const issueToken = generateToken({
                user: rows[0].id,
                username: rows[0].username,
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                othername: rows[0].othername,
                email: rows[0].email,
                phonenumber: rows[0].phonenumber,
                passporturl: rows[0].passporturl,
                role,
            });

            const response = {
                status: 201,
                data: [{ issueToken }],
            };
            return res.send(response);
        } catch (errorMessage) {
            return res.status(400).send({ status: 400, error: errorMessage });
        }
    },
};

export default Users;
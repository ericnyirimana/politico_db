import Joi from 'joi';
import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const validator = (identifier, data) => {
    let schema = false;
    const options = {
        allowUnknown: true,
        abortEarly: false
    };
    switch (identifier) {
        case 'parties': {
            schema = {
                name: Joi.string().regex(/^[a-z]+$/).lowercase().trim()
                .min(2)
                .required(),
                hqaddress: Joi.string().required(),
                logourl: Joi.string().trim().required()
            };
            break;
        }
        case 'offices': {
            schema = {
                name: Joi.string().regex(/^[a-z]+$/).lowercase().trim()
                .min(2)
                .required(),
                type: Joi.string().required()
            };
            break;
        }
        case 'user': {
            schema = {
                firstname: Joi.string().regex(/^[a-z]+$/).lowercase().trim()
                .min(3)
                .required(),
                lastname: Joi.string().regex(/^[a-z]+$/).lowercase().trim()
                .min(3)
                .required(),
                othername: Joi.string().regex(/^[a-z]+$/).lowercase().trim(),
                email: Joi.string().trim().email({
                    minDomainAtoms: 2,
                }).required(),
                phonenumber: Joi.number().required(),
                username: Joi.string().trim().min(5).required(),
                password: Joi.string().trim().min(8).required(),
                passporturl: Joi.string().trim(),
                isadmin: Joi.boolean().required(),
            };
            break;
        }
        case 'candidate': {
            schema = {
                party: Joi.number().required(),
                user: Joi.number().required(),
            };
            break;
        }
        case 'login': {
            schema = {
                username: Joi.string().trim().min(5).required(),
                password: Joi.string().trim().min(8).required(),
            };
            break;
        }
        case 'votes': {
            schema = {
                office: Joi.number().required(),
                candidate: Joi.number().required(),
            };
            break;
        }
        case 'updateParty': {
            schema = {
                name: Joi.string().regex(/^[a-z]+$/).lowercase().trim()
                .min(2),
                hqaddress: Joi.string().trim().min(5),
                logourl: Joi.string().trim(),
            };
            break;
        }
        case 'petition': {
            schema = {
                office: Joi.number().required(),
                body: Joi.string().trim().min(5).required(),
            };
            break;
        }
        default: {
            schema = false;
        }
    }
    return Joi.validate(data, schema, options);
};
const validationErrors = (res, error) => {
    const errorMessage = error.details.map(d => d.message);
    return res.status(400).send({
        status: 400,
        error: errorMessage
    });
};

const hashPassword = (password) => {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    return hashedPassword;
};

const comparePassword = (passwordHash, password) => {
    const comparedPassword = bcrypt.compareSync(password, passwordHash);
    return comparedPassword;
};

const generateToken = (userinfo) => {
    const Issuetoken = jwt.sign(userinfo,
        'hdj%^&.)#', { expiresIn: '1d' });
    return Issuetoken;
};

export { validator, hashPassword, comparePassword, generateToken, validationErrors };
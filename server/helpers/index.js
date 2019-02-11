import Joi from 'joi';
import fs from 'fs';

import parties from './parties';
import offices from './offices';

const validator = (identifier, data) => {
    let schema = false;
    const options = {
        allowUnknown: true,
        abortEarly: false
    };
    switch (identifier) {
        case 'parties': {
            schema = {
                name: Joi.string().trim().min(2).required(),
                hqAddress: Joi.string().required(),
                logoUrl: Joi.string().trim().required()
            };
            break;
        }
        case 'offices': {
            schema = {
                name: Joi.string().trim().min(2).required(),
                type: Joi.string().required()
            };
            break;
        }
        default: {
            schema = false;
        }
    }
    return Joi.validate(data, schema, options);
};

const writeInFile = (file, data) => {
    fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return {
                status: 500,
                error: err
            };
        }
        return true;
    });
    return true;
};

const writeInDb = (identifier, data) => {
    let file = '';
    switch (identifier) {
        case 'parties': {
            file = './server/models/parties.json';
            break;
        }
        case 'offices': {
            file = './server/models/offices.json';
            break;
        }
        default: {
            file = 'unknown.json';
        }
    }
    return writeInFile(file, data);
};

const validationErrors = (res, error) => {
    const errorMessage = error.details.map(d => d.message);
    return res.status(400).send({
        status: 400,
        error: errorMessage
    });
};

export { parties, offices, validator, writeInDb, validationErrors };
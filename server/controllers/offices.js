import { offices, validator, writeInDb, validationErrors } from '../helpers';

const addOffice = (req, res) => {
    // Validate Data
    const {
        error
    } = validator('offices', req.body);
    if (error) {
        return validationErrors(res, error);
    }
    const name = offices.find(n => (n.name === req.body.name.replace(/\s+/g, ' ').trim()));
    if (name) {
        return res.status(400).send({
            status: 409,
            error: 'Oops! Political office name already exist'
        });
    }
    const office = {
        id: offices.length + 1,
        type: req.body.type.replace(/\s+/g, ' ').trim(),
        name: req.body.name.replace(/\s+/g, ' ').trim()
    };
    offices.push(office);
    if (writeInDb('offices', offices)) {
        const response = {
            status: 201,
            data: [{
                type: req.body.type.replace(/\s+/g, ' ').trim(),
                name: req.body.name.replace(/\s+/g, ' ').trim()
            }]
        };
        res.send(response);
    }
    return true;
};

const getOffices = (req, res) => {
    const response = {
        status: 200,
        data: offices
    };
    res.send(response);
};

const specificOffices = (req, res) => {
    const office = offices.find(m => m.id === parseInt(req.params.id, 10));
    if (!office) {
        return res.status(404).send({
            status: 404,
            error: 'Political offices with given ID was not found'
        });
    }
    const response = {
        status: 200,
        data: [{
            id: office.id,
            type: office.type,
            name: office.name
        }]
    };
    return res.send(response);
};

export { addOffice, getOffices, specificOffices };
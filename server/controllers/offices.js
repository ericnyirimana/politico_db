import { offices, validator, writeInDb, validationErrors } from '../helpers';

const addOffice = (req, res) => {
    // Validate Data
    const {
        error
    } = validator('offices', req.body);
    if (error) {
        return validationErrors(res, error);
    }
    const office = {
        id: offices.length + 1,
        type: req.body.type,
        name: req.body.name
    };
    offices.push(office);
    if (writeInDb('offices', offices)) {
        const response = {
            status: 200,
            data: [{
                type: req.body.type,
                name: req.body.name
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
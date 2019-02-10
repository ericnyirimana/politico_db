import { parties, validator, writeInDb, validationErrors } from '../helpers/index';

const addParty = (req, res) => {
    // Validate Data
    const {
        error
    } = validator('parties', req.body);
    if (error) {
        return validationErrors(res, error);
    }
    const party = {
        id: parties.length + 1,
        name: req.body.name,
        hqAddress: req.body.hqAddress,
        logoUrl: req.body.logoUrl,
    };
    parties.push(party);
    if (writeInDb('parties', parties)) {
        const response = {
            status: 200,
            data: [{
                name: req.body.name,
                hqAddress: req.body.hqAddress,
                logoUrl: req.body.logoUrl
            }]
        };
        res.send(response);
    }
    return true;
};

const getParties = (req, res) => {
    const response = {
        status: 200,
        data: parties
    };
    res.send(response);
};

const specificParty = (req, res) => {
    const party = parties.find(m => m.id === parseInt(req.params.id, 10));
    if (!party) {
        return res.status(404).send({
            status: 404,
            error: 'Political with given ID was not found'
        });
    }
    const response = {
        status: 200,
        data: [{
            id: party.id,
            names: party.name,
            hqAddress: party.hqAddress,
            logoUrl: party.logoUrl
        }]
    };
    return res.send(response);
};

const updateParty = (req, res) => {
    const arrIndex = parties.findIndex(q => q.id === parseInt(req.params.id, 10));
    const party = parties.find(q => q.id === parseInt(req.params.id, 10));
    if (!party) {
        return res.status(404).send({
            status: 404,
            error: 'Political Party with given ID was not found'
        });
    }
    // update political party name name
    parties[arrIndex].name = req.body.name;
    if (writeInDb('parties', parties)) {
        const response = {
            status: 200,
            data: [{
                id: party.id,
                name: party.name
            }]
        };
        res.send(response);
    }
    return true;
};

const deleteParty = (req, res) => {
    // Validate Data
    const party = parties.find(m => m.id === parseInt(req.params.id, 10));
    if (!party) {
        return res.status(404).send({
            status: 404,
            error: 'Political Party with given ID was not found'
        });
    }
    const index = parties.indexOf(party);
    parties.splice(index, 1);
    if (writeInDb('parties', parties)) {
        const response = {
            status: 200,
            data: 'Political Party deleted'
        };
        res.send(response);
    }
    return true;
};

export { addParty, getParties, specificParty, deleteParty, updateParty };
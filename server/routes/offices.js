import express from 'express';

import { addOffice, getOffices, specificOffices } from '../controllers/offices';

const router = express.Router();

// Create a political office record
router.post('/', addOffice);
// Get all political offices record
router.get('/', getOffices);
// Get specific political offices record
router.get('/:id', specificOffices);

export default router;